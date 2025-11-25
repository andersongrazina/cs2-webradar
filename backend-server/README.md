# CS2 Webradar - Backend Server (Portátil)

Este é o servidor backend portátil para o CS2 Webradar. Ele recebe dados do Counter-Strike 2 através do Game State Integration (GSI) e transmite para o frontend em tempo real.

## 📋 Requisitos

- **Node.js** (versão 16 ou superior) - [Baixar aqui](https://nodejs.org)
- **Counter-Strike 2** instalado
- Windows (testado) ou Linux/Mac

## 🚀 Instalação Rápida

### ⚠️ ANTES DE COPIAR - LEIA PREPARAR-PENDRIVE.md

**IMPORTANTE:** Antes de copiar para o pendrive, você **DEVE** executar `npm install` nesta pasta para instalar as dependências. Veja instruções detalhadas em `PREPARAR-PENDRIVE.md`.

### 1. Copiar para o Pendrive
Copie toda a pasta `backend-server` (incluindo a pasta `node_modules` após executar `npm install`) para seu pendrive.

### 2. Instalar Node.js (se ainda não tiver)
- Baixe de: https://nodejs.org (versão LTS recomendada)
- Instale normalmente
- Reinicie o computador se solicitado

### 3. Configurar o CS2

Copie o arquivo de configuração GSI para a pasta do CS2:

**Arquivo:** `config/gamestate_integration_webradar.cfg`

**Destino:** 
```
C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\game\csgo\cfg\
```

Ou no caminho onde você tem o CS2 instalado, dentro da pasta `game/csgo/cfg/`

### 4. Iniciar o Servidor

**Windows:**
- Dê duplo clique em `INICIAR.bat`

**Linux/Mac:**
- Abra o terminal na pasta backend-server
- Execute: `npm start`

## 🎮 Como Usar

### Passo 1: Iniciar o Backend
Execute o `INICIAR.bat` (Windows) ou `npm start` (Linux/Mac)

Você verá algo assim:
```
===========================================
  CS2 WEBRADAR BACKEND - SERVIDOR ATIVO
===========================================
Porta: 3000
Endpoint GSI: http://localhost:3000/webradar
Socket.IO: http://localhost:3000/webradar/socket
SSE: http://localhost:3000/webradar/sse
Health Check: http://localhost:3000/health
===========================================
Aguardando dados do CS2...
```

### Passo 2: Abrir o Frontend
Acesse o frontend no Replit ou qualquer navegador apontando para o servidor frontend.

Certifique-se de que está configurado para conectar em:
- HTTP: `http://localhost:3000`
- WebSocket: `ws://localhost:3000`

### Passo 3: Iniciar o CS2
Abra o Counter-Strike 2 e entre em uma partida.

O servidor começará a receber dados automaticamente e você verá mensagens como:
```
[GSI] Dados recebidos do CS2 - Mapa: de_dust2
```

## 🔧 Configuração Avançada

### Alterar a Porta
Edite o arquivo `server.js` e mude a linha:
```javascript
const PORT = 3000;
```

**Importante:** Se mudar a porta, você precisa:
1. Atualizar o arquivo `gamestate_integration_webradar.cfg`
2. Atualizar as variáveis de ambiente do frontend

### Teste de Conectividade
Abra seu navegador e acesse:
```
http://localhost:3000/health
```

Você deve ver:
```json
{
  "status": "ok",
  "uptime": 123.45,
  "connections": {
    "sse": 0,
    "socketio": 0
  },
  "hasGameData": false
}
```

## 📡 Endpoints Disponíveis

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/webradar` | POST | Recebe dados do CS2 GSI |
| `/webradar/sse` | GET | Server-Sent Events para frontend |
| `/webradar/socket` | WebSocket | Socket.IO para frontend |
| `/health` | GET | Status do servidor |

## ❓ Solução de Problemas

### "Node.js não encontrado"
- Instale o Node.js de https://nodejs.org
- Reinicie o terminal/computador
- Tente novamente

### "Nenhum dado sendo recebido"
1. Verifique se o arquivo GSI está na pasta correta do CS2
2. Reinicie o CS2 após copiar o arquivo
3. Verifique se o servidor está rodando (deve mostrar "Aguardando dados...")
4. Entre em uma partida (treino/casual/competitivo)

### "Frontend não conecta"
1. Certifique-se de que o backend está rodando
2. Verifique se as variáveis de ambiente do frontend apontam para `localhost:3000`
3. Teste o endpoint `/health` no navegador

### Porta já em uso
Se a porta 3000 já estiver em uso:
1. Feche outros programas que possam estar usando a porta 3000
2. Ou altere a porta no `server.js` (ver Configuração Avançada)

## 🎯 Estrutura do Projeto

```
backend-server/
├── server.js                          # Servidor principal
├── package.json                       # Dependências Node.js
├── INICIAR.bat                        # Script de inicialização (Windows)
├── README.md                          # Este arquivo
└── config/
    └── gamestate_integration_webradar.cfg  # Configuração GSI para CS2
```

## 💡 Dicas

- Mantenha o servidor rodando enquanto joga
- Você pode minimizar a janela do servidor
- O servidor funciona em qualquer PC que tenha Node.js
- Ideal para rodar em segundo monitor ou tablet/celular com o frontend

## 📝 Notas

- Os dados são transmitidos em tempo real (delay ~500ms configurável no GSI)
- Funciona com qualquer modo de jogo do CS2
- Suporta múltiplos clientes conectados simultaneamente
- Não modifica o jogo, apenas lê dados públicos via API oficial da Valve

## 🆘 Suporte

Se tiver problemas:
1. Verifique se seguiu todos os passos
2. Teste o endpoint `/health`
3. Verifique os logs no console do servidor
4. Certifique-se de que o CS2 está rodando e você está em uma partida
