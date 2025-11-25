import { useEffect, useState, useRef, useMemo, memo, Fragment } from "react";

import { PLAYER_COLORS } from "@/constants/player";

import { useGameContext } from "@/lib/hooks/use-game-context";
import { useSettingsContext } from "@/lib/hooks/use-settings-context";
import { getRadarPosition } from "@/lib/radar";
import { getPlayerRotationAngle } from "@/lib/player";
import { getImportantWeapons } from "@/lib/weapon";

import { BombIcon, PlayerIcon } from "@/components/Icons";

import { Player } from "@/types/player";
import { Team } from "@/types/team";
import { Bomb } from "@/types/bomb";

const calculateRadarEffectiveDimensions = (radar: {
  width: number;
  height: number;
}) => {
  const aspectRatio = 1024 / 1024; // Aspect ratio of the radar image
  const containerAspectRatio = radar.width / radar.height;

  let effectiveWidth = radar.width;
  let effectiveHeight = radar.height;

  if (containerAspectRatio > aspectRatio) {
    // Container is wider than the image aspect ratio
    effectiveWidth = radar.height * aspectRatio;
  } else {
    // Container is taller than the image aspect ratio
    effectiveHeight = radar.width / aspectRatio;
  }

  const offsetX = (radar.width - effectiveWidth) / 2;
  const offsetY = (radar.height - effectiveHeight) / 2;

  return { effectiveWidth, effectiveHeight, offsetX, offsetY };
};

type CustomPlayer = {
  importantWeapon: string;
  rotationAngle: number;
} & Player;

type RadarMainProps = {
  radar: {
    width: number;
    height: number;
    rotation: number;
    scaleFactor: number;
  };
};

function RadarMain({ radar }: RadarMainProps) {
  const playerRotationsRef = useRef<Map<number, number>>(new Map());

  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const { gameData, mapData } = useGameContext();
  const { settings, radarTheme } = useSettingsContext();

  const showHealth = settings.player.showHealth;
  const showWeapon = settings.player.showWeapon;
  const dotSize = settings.player.dotSize;
  const labelSize = settings.player.labelSize;
  const importantWeapons = settings.player.importantWeapons;

  const localPlayerTeam = useMemo(() => {
    if (!gameData || !gameData.local_player) return Team.None;

    return gameData.local_player.team;
  }, [gameData]);

  const { effectiveWidth, effectiveHeight, offsetX, offsetY } = useMemo(() => {
    return calculateRadarEffectiveDimensions({
      width: radar.width,
      height: radar.height,
    });
  }, [radar.width, radar.height]);

  const bombInfo: Bomb = useMemo(() => {
    if (
      !gameData ||
      !gameData.bomb ||
      !gameData.bomb.position.x ||
      !gameData.bomb.position.y ||
      !mapData
    )
      return null;

    const bombRadarPosition = getRadarPosition(gameData.bomb.position, mapData);

    const scaledX =
      (bombRadarPosition.x / mapData.width) * effectiveWidth + offsetX;
    const scaledY =
      (bombRadarPosition.y / mapData.height) * effectiveHeight + offsetY;

    return {
      ...gameData.bomb,
      position: {
        ...bombRadarPosition,
        x: scaledX,
        y: scaledY,
      },
    };
  }, [gameData, mapData, effectiveWidth, effectiveHeight, offsetX, offsetY]);

  const players: CustomPlayer[] = useMemo(() => {
    if (!gameData || !mapData) return [];

    const allPlayers = [];
    if (gameData.local_player) allPlayers.push(gameData.local_player);
    if (gameData.players && Array.isArray(gameData.players)) {
      allPlayers.push(...gameData.players);
    }

    console.debug(`[RadarMain] Total players to filter: ${allPlayers.length}`, {
      localPlayer: gameData.local_player?.nickname,
      otherPlayers: gameData.players?.length || 0
    });

    const players = allPlayers
      .filter(
        (player) => {
          const passes = player &&
            typeof player === 'object' &&
            player.alive &&
            (player.health || player.health === 0) &&
            player.position &&
            (player.position.x !== 0 || player.position.y !== 0);
          
          if (!passes) {
            console.debug(`[RadarMain] Player filtered out:`, {
              nickname: player?.nickname,
              alive: player?.alive,
              health: player?.health,
              position: player?.position
            });
          }
          return passes;
        }
      )
      .map((player) => {
        const customPlayer = player as CustomPlayer;
        const playerRadarPosition = getRadarPosition(
          customPlayer.position,
          mapData
        );

        const scaledX =
          (playerRadarPosition.x / mapData.width) * effectiveWidth + offsetX;
        const scaledY =
          (playerRadarPosition.y / mapData.height) * effectiveHeight + offsetY;

        const importantWeapon = getImportantWeapons(
          importantWeapons,
          customPlayer.weapons
        );

        const previousRotation =
          playerRotationsRef.current.get(customPlayer.index) ?? 0;

        const newRotation = getPlayerRotationAngle(
          customPlayer.view_angles,
          previousRotation
        );

        playerRotationsRef.current.set(customPlayer.index, newRotation);

        return {
          ...customPlayer,
          position: {
            ...playerRadarPosition,
            x: scaledX,
            y: scaledY,
          },
          importantWeapon,
          rotationAngle: newRotation,
        };
      });

    return players;
  }, [
    gameData,
    mapData,
    importantWeapons,
    effectiveWidth,
    effectiveHeight,
    offsetX,
    offsetY,
  ]);

  useEffect(() => {
    const handleZoom = () => {
      const zoom = window.devicePixelRatio || 1;
      setZoomLevel(zoom);
    };

    window.addEventListener("resize", handleZoom);
    handleZoom();

    return () => {
      window.removeEventListener("resize", handleZoom);
    };
  }, []);

  return (
    <div
      id="radar-main"
      className="absolute inset-0 border-yellow-700"
      style={{
        transform: `rotate(${radar.rotation}deg) scale(${radar.scaleFactor})`,
      }}
    >
      {players.map((player) => {
        const isTeammate = player.team === localPlayerTeam;
        const dotColor =
          radarTheme === "default"
            ? isTeammate
              ? PLAYER_COLORS[player.color]
              : "#ff0000"
            : isTeammate
              ? "#00ff00"
              : "#ff0000";
        const arrowColor =
          radarTheme === "default" && !isTeammate
            ? PLAYER_COLORS[player.color]
            : null;

        return (
          <Fragment key={`player-radar-${player.index}`}>
            <div
              className="pointer-events-none absolute z-[1] select-none text-center"
              style={{
                left: `${player.position.x}px`,
                top: `${player.position.y}px`,
                transform: `translate(-50%, -50%) scale(${1 / zoomLevel})`,
                transition:
                  "left 0.1s ease, top 0.1s ease, transform 0.1s ease",
              }}
            >
              {showHealth && !isTeammate && (
                <div
                  className="absolute z-[2] text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
                  style={{
                    bottom: `${dotSize}px`,
                    left: "50%",
                    transform: `translate(-50%, -50%)`,
                    fontVariant: "unicase",
                    fontSize: `${labelSize}px`,
                  }}
                >
                  {player.health}
                </div>
              )}
              <PlayerIcon
                size={dotSize}
                dotColor={dotColor}
                {...(arrowColor && { arrowColor })}
                className="z-[2]"
                style={{
                  transform: `rotate(${player.rotationAngle}deg)`,
                  transition: "transform 0.1s ease",
                }}
              />
              {showWeapon && (
                <div
                  className="absolute z-[2] text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]"
                  style={{
                    top: `${dotSize}px`,
                    left: "50%",
                    transform: `translateX(-50%)`,
                    fontVariant: "unicase",
                    fontSize: `${labelSize}px`,
                  }}
                >
                  {player.importantWeapon}
                </div>
              )}
            </div>
          </Fragment>
        );
      })}

      {bombInfo && (
        <div
          id="bomb"
          className="pointer-events-none absolute z-[1] select-none"
          style={{
            left: `${bombInfo.position.x}px`,
            top: `${bombInfo.position.y}px`,
            transform: `translate(-50%, -50%) scale(${1 / zoomLevel})`,
            transition: "left 0.1s ease, top 0.1s ease, transform 0.1s ease",
          }}
        >
          <BombIcon size={16} className="text-[#FFD700]" />
        </div>
      )}
    </div>
  );
}

export default memo(RadarMain);
