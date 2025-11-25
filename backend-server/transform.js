/**
 * Transforma dados brutos do CS2 GSI para o formato esperado pelo frontend
 */
function transformGSIData(gsiData) {
  if (!gsiData || typeof gsiData !== 'object') {
    return null;
  }

  // Se já está no formato transformado, retorna
  if (gsiData.local_player && Array.isArray(gsiData.players)) {
    return gsiData;
  }

  // Transforma do formato GSI do CS2
  const mapName = gsiData.map?.name || '';
  
  // Pega o jogador local
  const localPlayer = transformPlayer(gsiData.player, true);
  
  // Pega todos os outros jogadores (se houver)
  let allPlayers = [];
  if (gsiData.players && typeof gsiData.players === 'object') {
    // GSI envia jogadores como um objeto com keys numéricas
    allPlayers = Object.values(gsiData.players)
      .filter(p => p && p.steamid !== gsiData.player?.steamid)
      .map((p, index) => transformPlayer(p, false, index));
  }

  // Transforma dados da bomba
  const bomb = transformBomb(gsiData.bomb);

  return {
    map: mapName,
    bomb: bomb,
    grenades: gsiData.grenades || {},
    local_player: localPlayer,
    players: allPlayers
  };
}

/**
 * Transforma dados de um jogador individual
 */
function transformPlayer(playerData, isLocal = false, index = 0) {
  if (!playerData) {
    return null;
  }

  // Mapeia time do CS2 para o sistema interno
  const teamMap = {
    'CT': 'CT',
    'T': 'T',
    'Unassigned': 'Unassigned',
    'Spectator': 'Spectator'
  };

  const team = teamMap[playerData.team] || playerData.team;

  // Parse de posição
  let position = { x: 0, y: 0, z: 0 };
  if (playerData.position && typeof playerData.position === 'string') {
    const coords = playerData.position.split(',').map(c => parseFloat(c.trim()));
    if (coords.length >= 3) {
      position = { x: coords[0], y: coords[1], z: coords[2] };
    }
  } else if (playerData.position && typeof playerData.position === 'object') {
    position = playerData.position;
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

  return {
    steamid: playerData.steamid || `bot_${index}`,
    index: index,
    nickname: playerData.name || `Player ${index}`,
    team: team,
    color: getPlayerColor(team, index),
    
    // Saúde e armadura
    health: state.health || 0,
    armor: state.armor || 0,
    has_helmet: state.helmet || false,
    
    // Dinheiro
    money: state.money || 0,
    
    // Kit de desarmador
    has_defuser: state.defusekit || false,
    
    // Armas
    weapons: weapons,
    
    // Posição
    position: position,
    forward: forward,
    
    // Status
    is_alive: (state.health || 0) > 0,
    is_bot: !playerData.steamid || playerData.steamid === '0',
    
    // Stats da rodada
    round_kills: state.round_kills || 0,
    round_killhs: state.round_killhs || 0,
    round_totaldmg: state.round_totaldmg || 0,
    
    // Stats gerais
    kills: stats.kills || 0,
    assists: stats.assists || 0,
    deaths: stats.deaths || 0,
    mvps: stats.mvps || 0,
    score: stats.score || 0,
    
    // Status de efeitos
    flashed: state.flashed || 0,
    smoked: state.smoked || 0,
    burning: state.burning || 0
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
