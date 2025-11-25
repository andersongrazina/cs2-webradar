/**
 * Posições de spawn para cada mapa e team
 * Quando o CS2 não envia position via GSI, usamos spawn points como fallback
 */

const SPAWN_POINTS = {
  de_mirage: {
    CT: [
      { x: 385, y: 2810, z: 64 },
      { x: 520, y: 2840, z: 64 },
      { x: 430, y: 2970, z: 64 },
      { x: 570, y: 2970, z: 64 },
      { x: 280, y: 2970, z: 64 }
    ],
    T: [
      { x: -400, y: -1900, z: 64 },
      { x: -300, y: -2000, z: 64 },
      { x: -500, y: -2000, z: 64 },
      { x: -200, y: -1900, z: 64 },
      { x: -350, y: -2100, z: 64 }
    ]
  },
  de_inferno: {
    CT: [
      { x: 1850, y: 2500, z: 64 },
      { x: 1950, y: 2400, z: 64 },
      { x: 2050, y: 2500, z: 64 },
      { x: 1900, y: 2600, z: 64 },
      { x: 1750, y: 2500, z: 64 }
    ],
    T: [
      { x: -1850, y: -2200, z: 64 },
      { x: -1950, y: -2100, z: 64 },
      { x: -1750, y: -2100, z: 64 },
      { x: -2000, y: -2300, z: 64 },
      { x: -1700, y: -2300, z: 64 }
    ]
  },
  de_dust2: {
    CT: [
      { x: 600, y: -1200, z: 64 },
      { x: 700, y: -1300, z: 64 },
      { x: 500, y: -1300, z: 64 },
      { x: 650, y: -1100, z: 64 },
      { x: 550, y: -1400, z: 64 }
    ],
    T: [
      { x: -1850, y: 800, z: 64 },
      { x: -1950, y: 900, z: 64 },
      { x: -1750, y: 900, z: 64 },
      { x: -2000, y: 700, z: 64 },
      { x: -1800, y: 1000, z: 64 }
    ]
  },
  de_nuke: {
    CT: [
      { x: 300, y: 1900, z: 64 },
      { x: 400, y: 2000, z: 64 },
      { x: 200, y: 2000, z: 64 },
      { x: 350, y: 1800, z: 64 },
      { x: 250, y: 2100, z: 64 }
    ],
    T: [
      { x: -600, y: -1500, z: 64 },
      { x: -700, y: -1400, z: 64 },
      { x: -500, y: -1400, z: 64 },
      { x: -650, y: -1600, z: 64 },
      { x: -550, y: -1300, z: 64 }
    ]
  },
  de_cache: {
    CT: [
      { x: -550, y: 2300, z: 64 },
      { x: -650, y: 2400, z: 64 },
      { x: -450, y: 2400, z: 64 },
      { x: -600, y: 2200, z: 64 },
      { x: -500, y: 2500, z: 64 }
    ],
    T: [
      { x: 1900, y: -800, z: 64 },
      { x: 2000, y: -700, z: 64 },
      { x: 1800, y: -700, z: 64 },
      { x: 1950, y: -900, z: 64 },
      { x: 1850, y: -600, z: 64 }
    ]
  }
};

/**
 * Obtém posição de spawn baseada em mapa, time e observer_slot
 */
function getSpawnPosition(mapName, team, observerSlot = 0) {
  const mapSpawns = SPAWN_POINTS[mapName];
  
  if (!mapSpawns || !mapSpawns[team]) {
    // Fallback para mapa desconhecido
    return { x: 0, y: 0, z: 64 };
  }
  
  const spawns = mapSpawns[team];
  const index = observerSlot % spawns.length; // Cicla entre spawns disponíveis
  return spawns[index];
}

module.exports = {
  SPAWN_POINTS,
  getSpawnPosition
};
