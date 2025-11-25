#!/usr/bin/env node

const fs = require('fs');
const http = require('http');

const testDataPath = `${__dirname}/test-data.json`;

if (!fs.existsSync(testDataPath)) {
  console.error('❌ Arquivo test-data.json não encontrado!');
  process.exit(1);
}

const testData = fs.readFileSync(testDataPath, 'utf-8');

console.log('============================================');
console.log('  CS2 WEBRADAR - TESTE DO BACKEND');
console.log('============================================\n');

function makeRequest(method, path, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.headers['Content-Length'] = Buffer.byteLength(data);
    }

    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          data: responseData,
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(data);
    }
    req.end();
  });
}

async function runTests() {
  try {
    console.log('📤 Enviando dados de teste para /webradar...\n');
    const response1 = await makeRequest('POST', '/webradar', testData);
    
    if (response1.statusCode === 200) {
      console.log('✅ Status: ' + response1.statusCode);
      console.log('✅ Dados de teste enviados com sucesso!\n');
    } else {
      console.log('⚠️  Status: ' + response1.statusCode);
      console.log('Response: ' + response1.data + '\n');
    }

    console.log('🏥 Testando endpoint de saúde /health...\n');
    const response2 = await makeRequest('GET', '/health');
    
    if (response2.statusCode === 200) {
      console.log('✅ Status: ' + response2.statusCode);
      console.log('Server Health:');
      console.log(response2.data + '\n');
    } else {
      console.log('⚠️  Status: ' + response2.statusCode);
      console.log('Response: ' + response2.data + '\n');
    }

    console.log('============================================');
    console.log('  ✅ TESTE CONCLUÍDO COM SUCESSO!');
    console.log('============================================\n');
    console.log('🎮 Se você vir dados acima, o backend está funcionando!');
    console.log('   Agora abra o frontend no navegador.\n');
    process.exit(0);

  } catch (error) {
    console.error('❌ Erro ao conectar ao servidor!\n');
    console.error('Verifique se:');
    console.error('  1. O servidor está rodando (execute INICIAR.bat)');
    console.error('  2. O servidor está na porta 3000');
    console.error('  3. Nenhum firewall está bloqueando localhost:3000\n');
    console.error('Erro:', error.message + '\n');
    process.exit(1);
  }
}

runTests();
