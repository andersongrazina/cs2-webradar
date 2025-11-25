const { getSpawnPosition } = require('./spawn-points');

/**
 * Transforma dados brutos do CS2 GSI para o formato esperado pelo frontend
 * SEMPRE retorna um objeto válido, mesmo que incompleto
 * 
 * NOTA IMPORTANTE: CS2 versão 2024+ NÃO envia campo "position" via GSI.
 * Quando position não está disponível, usamos spawn points aproximados como fallback.
 */
function transformGSIData(gsiData) {
  // Retorna objeto vazio se não houver dados
  if (!gsiData || typeof gsiData !== 'object') {
    return getDefaultGameData();
  }

  // Se já está no formato transformado e válido, retorna
  if (gsiData.local_player && Array.isArray(gsiData.players)) {
    return gsiData;
  }

  // Transforma do formato GSI do CS2
  const mapName = gsiData.map?.name || '';
  
  // Pega o portador da bomba (para marcar nos dados)
  const bombCarrier = gsiData.bomb?.player || null;
  
  // Pega o jogador local
  const localPlayer = transformPlayer(gsiData.player, true, 0, bombCarrier, mapName);
  
  // Debug
  if (localPlayer) {
    console.log(`[Transform] Local player: ${localPlayer.nickname}`);
    console.log(`  Position: x=${localPlayer.position?.x}, y=${localPlayer.position?.y}, z=${localPlayer.position?.z}`);
    console.log(`  Health: ${localPlayer.health}, Alive: ${localPlayer.alive}`);
    console.log(`  Team: ${localPlayer.team}, State: ${localPlayer.state}`);
  } else {
    console.log(`[Transform] ⚠️  Local player é null/undefined!`);
    console.log(`  gsiData.player:`, gsiData.player);
  }
  
  // Pega todos os outros jogadores (se houver)
  // CS2 GSI envia em "allplayers" ou "players" dependendo da versão
  let allPlayers = [];
  const playersData = gsiData.allplayers || gsiData.players || {};
  
  if (playersData && typeof playersData === 'object' && Object.keys(playersData).length > 0) {
    const localSteamId = gsiData.player?.steamid;
    let playerIndex = 1;
    
    allPlayers = Object.entries(playersData)
      .filter(([steamId, p]) => {
        // Filtra o jogador local para não duplicar
        return steamId !== localSteamId && p;
      })
      .map(([steamId, p]) => {
        const transformed = transformPlayer(p, false, playerIndex, bombCarrier, mapName);
        playerIndex++;
        return transformed;
      })
      .filter(p => p !== null); // Remove qualquer jogador null
  }

  // Garante que local_player é válido
  if (!localPlayer) {
    console.log(`[Transform] ⚠️  Local player é null!`);
    return getDefaultGameData();
  }

  // Transforma dados da bomba
  const bomb = transformBomb(gsiData.bomb);

  return {
    map: mapName,
    bomb: bomb,
    grenades: gsiData.grenades || {},
    local_player: localPlayer,
    players: Array.isArray(allPlayers) ? allPlayers : []
  };
}

/**
 * Retorna um objeto gameData padrão/vazio
 */
function getDefaultGameData() {
  return {
    map: '',
    bomb: {
      state: 'unknown',
      position: { x: 0, y: 0, z: 0 },
      player: null,
      planted_at: null,
      defused_at: null,
      exploded_at: null
    },
    grenades: {},
    local_player: null,
    players: []
  };
}

/**
 * Transforma dados de um jogador individual
 */
function transformPlayer(playerData, isLocal = false, index = 0, bombCarrier = null, mapName = '') {
  if (!playerData) {
    console.log(`[Transform] PlayerData é null! isLocal=${isLocal}`);
    return null;
  }

  if (isLocal) {
    console.log(`[Transform] RAW CS2 player data:`, {
      name: playerData.name,
      team: playerData.team,
      position_raw: playerData.position,
      position_type: typeof playerData.position,
      state: playerData.state,
      alive: (playerData.state?.health || 0) > 0
    });
  }

  // Mapeia time do CS2 para o sistema interno
  const teamMap = {
    'CT': 'CT',
    'T': 'T',
    'Unassigned': 'Unassigned',
    'Spectator': 'Spectator'
  };

  const team = teamMap[playerData.team] || playerData.team;

  // Parse de posição - GARANTE que sempre tem valores
  let position = { x: 0, y: 0, z: 0 };
  if (playerData.position) {
    if (typeof playerData.position === 'string') {
      // CS2 GSI pode enviar como "x, y, z"
      const coords = playerData.position.split(',').map(c => parseFloat(c.trim()));
      if (coords.length >= 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
        position = { x: coords[0], y: coords[1], z: coords[2] || 0 };
        if (isLocal) console.log(`[Transform] Position parsed from string:`, position);
      }
    } else if (typeof playerData.position === 'object' && playerData.position !== null) {
      position = {
        x: typeof playerData.position.x === 'number' ? playerData.position.x : parseFloat(playerData.position.x) || 0,
        y: typeof playerData.position.y === 'number' ? playerData.position.y : parseFloat(playerData.position.y) || 0,
        z: typeof playerData.position.z === 'number' ? playerData.position.z : parseFloat(playerData.position.z) || 0
      };
      if (isLocal) console.log(`[Transform] Position parsed from object:`, position);
    }
  } else {
    // CS2 2024+ não envia position via GSI - usar spawn points como fallback
    const slot = playerData.observer_slot || index || 0;
    position = getSpawnPosition(mapName, team, slot);
    if (isLocal) {
      console.log(`[Transform] ⚠️ Position não enviado pelo CS2! Usando spawn point de fallback (mapa: ${mapName}, time: ${team}, slot: ${slot}):`, position);
    }
  }

  // Parse de direção
  let forward = { x: 0, y: 0, z: 0 };
  if (playerData.forward && typeof playerData.forward === 'string') {
    const coords = playerData.forward.split(',').map(c => parseFloat(c.trim()));
    if (coords.length >= 3) {
      forward = { x: coords[0], y: coords[1], z: coords[2] };
    }
  } else if (playerData.forward && typeof playerData.forward === 'object') {
    forward = playerData.forward;
  }

  // Extrai armas
  const weapons = [];
  if (playerData.weapons && typeof playerData.weapons === 'object') {
    Object.entries(playerData.weapons).forEach(([key, weapon]) => {
      if (weapon && weapon.name) {
        weapons.push({
          id: key,
          name: weapon.name,
          type: weapon.type || 'Unknown',
          state: weapon.state || 'holstered',
          ammo_clip: weapon.ammo_clip || 0,
          ammo_clip_max: weapon.ammo_clip_max || 0,
          ammo_reserve: weapon.ammo_reserve || 0,
          paintkit: weapon.paintkit || 'default'
        });
      }
    });
  }

  const state = playerData.state || {};
  const stats = playerData.match_stats || {};

  // Converte colorString para número
  const colorString = getPlayerColor(team, index);
  const colorNum = parseInt(colorString.replace('#', ''), 16);

  return {
    index: index,
    steamid3: parseInt(playerData.steamid?.replace(/[^\d]/g, '') || index, 10),
    alive: (state.health || 0) > 0,
    color: colorNum,
    nickname: playerData.name || `Player ${index}`,
    team: team,
    health: Math.max(0, state.health || 0),
    armor: Math.max(0, state.armor || 0),
    has_helmet: state.helmet || false,
    money: Math.max(0, state.money || 0),
    weapons: weapons.map(w => w.id) || [],
    has_bomb: playerData.steamid === bombCarrier ? true : false,
    has_defuser: state.defusekit || false,
    flash_alpha: Math.max(0, state.flashed || 0),
    position: position || { x: 0, y: 0, z: 0 },
    view_angles: { x: 0, y: 0 }
  };
}

/**
 * Transforma dados da bomba
 */
function transformBomb(bombData) {
  if (!bombData) {
    return {
      state: 'unknown',
      position: { x: 0, y: 0, z: 0 },
      planted_at: null,
      defused_at: null,
      exploded_at: null,
      carrier: null
    };
  }

  let position = { x: 0, y: 0, z: 0 };
  if (bombData.position && typeof bombData.position === 'string') {
    const coords = bombData.position.split(',').map(c => parseFloat(c.trim()));
    if (coords.length >= 3) {
      position = { x: coords[0], y: coords[1], z: coords[2] };
    }
  } else if (bombData.position && typeof bombData.position === 'object') {
    position = bombData.position;
  }

  return {
    state: bombData.state || 'unknown',
    position: position,
    player: bombData.player || null,
    planted_at: bombData.planted_at || null,
    defused_at: bombData.defused_at || null,
    exploded_at: bombData.exploded_at || null
  };
}

/**
 * Gera cor para o jogador baseado no time
 */
function getPlayerColor(team, index) {
  const colors = {
    'CT': [
      '#4A90E2',
      '#357ABD',
      '#2563D9',
      '#1E5ACE',
      '#1A4BA8'
    ],
    'T': [
      '#FF9500',
      '#E68700',
      '#CC7A00',
      '#B26D00',
      '#996000'
    ]
  };

  const teamColors = colors[team] || colors['CT'];
  return teamColors[index % teamColors.length];
}

module.exports = { transformGSIData };
