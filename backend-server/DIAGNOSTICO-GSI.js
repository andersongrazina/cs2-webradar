/**
 * Script de diagnóstico para verificar quais campos o CS2 está realmente enviando
 * Copie para o arquivo backend-server/test-diagnostics.js e rode:
 * node backend-server/test-diagnostics.js
 */

const fs = require('fs');
const path = require('path');

console.log('='.repeat(50));
console.log('DIAGNOSTICO DE CAMPOS GSI DO CS2');
console.log('='.repeat(50));
console.log();

// Ler os logs de exemplo
const logFile = process.argv[2] || './test-data.json';

console.log(`Lendo arquivo: ${logFile}`);
console.log();

let data;
try {
  const content = fs.readFileSync(logFile, 'utf8');
  data = JSON.parse(content);
} catch (err) {
  console.error('❌ Erro ao ler arquivo:', err.message);
  process.exit(1);
}

// Analisar estrutura
console.log('📊 ESTRUTURA RECEBIDA DO CS2:');
console.log();

console.log('1. Campos raiz:', Object.keys(data).join(', '));
console.log();

if (data.player) {
  console.log('2. Campos do PLAYER:');
  Object.keys(data.player).forEach(key => {
    const value = data.player[key];
    const type = Array.isArray(value) ? 'array' : typeof value;
    const preview = type === 'object' ? `{...}` : String(value).substring(0, 40);
    console.log(`   - ${key}: ${type} = ${preview}`);
  });
  console.log();
}

if (data.allplayers) {
  console.log('3. Campos dos ALLPLAYERS (primeiros):', Object.keys(data.allplayers[Object.keys(data.allplayers)[0]] || {}).join(', '));
  console.log();
}

console.log('⚠️  CHECKLIST DE POSIÇÃO:');
console.log();
console.log('☐ player.position?', data.player?.position ? '✓ SIM' : '✗ NÃO');
console.log('☐ player.forward?', data.player?.forward ? '✓ SIM' : '✗ NÃO');
console.log('☐ player.view_angles?', data.player?.view_angles ? '✓ SIM' : '✗ NÃO');
console.log('☐ player.position_index_1?', data.player?.position_index_1 ? '✓ SIM' : '✗ NÃO');
console.log();

console.log('🔍 INVESTIGAÇÃO:');
if (!data.player?.position) {
  console.log('❌ Campo "position" NÃO ENCONTRADO');
  console.log('   Possíveis causas:');
  console.log('   1. Arquivo GSI não foi reconhecido pelo CS2');
  console.log('   2. CS2 versão 2024+ mudou estrutura de GSI');
  console.log('   3. Campo só aparece durante live play (não em menu)');
  console.log();
  console.log('💡 Sugestões:');
  console.log('   - Execute: FORCAR-GSI-RESET.bat (como ADMIN)');
  console.log('   - Reinicie o Steam completamente');
  console.log('   - Teste em uma partida COMPETITIVA (não deathmatch)');
}

console.log();
console.log('='.repeat(50));
