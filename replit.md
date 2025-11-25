# CS2 Webradar

## Overview
This is a real-time web-based radar application for Counter-Strike 2 (CS2) that displays player positions, health, weapons, bomb status, and map information in a clean web interface. Built with Next.js 14, React, TypeScript, and Tailwind CSS.

## Purpose
Provides a secondary screen radar overlay for CS2 matches, showing:
- Real-time player positions on radar maps
- Player health, armor, and equipment status
- Bomb plant/defuse status
- Support for 18+ official and community maps

## Current State
- Frontend is fully functional and running on port 5000
- Configured for Replit environment with proper host bindings
- **Backend server portátil criado** na pasta `backend-server/` - pronto para rodar do pendrive
- Backend recebe dados do CS2 via Game State Integration (GSI)
- Ambos SSE e Socket.IO implementados no backend
- Configuração GSI incluída para fácil setup no CS2

## Project Architecture

### Tech Stack
- **Framework**: Next.js 14.2.1 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.1
- **State Management**: React Context API
- **Real-time Communication**: Socket.IO client & SSE (Server-Sent Events)
- **Data Fetching**: SWR

### Key Dependencies
- `socket.io-client`: WebSocket connections to game data server
- `react-select`: Map and settings selection UI
- `@uidotdev/usehooks`: Utility hooks for React
- `sharp`: Image optimization

### Project Structure
```
Frontend (Next.js):
src/
├── app/              # Next.js App Router pages
├── components/       # React components (Radar, Players, Bomb, etc.)
├── contexts/         # Context providers (Game state, Settings)
├── lib/              # Utilities and custom hooks
├── types/            # TypeScript type definitions
└── constants/        # Configuration constants

public/
└── maps/            # Map images and data files for 18+ maps

Backend (Portátil - para pendrive):
backend-server/
├── server.js                          # Servidor Express + Socket.IO + SSE
├── package.json                       # Dependências do backend
├── INICIAR.bat                        # Script para iniciar (Windows)
├── TESTAR.bat                         # Script para testar o servidor
├── test-data.json                     # Dados mock do CS2 para testes
├── README.md                          # Instruções completas do backend
├── INSTRUÇÕES-PENDRIVE.md            # Guia para uso em pendrive
└── config/
    └── gamestate_integration_webradar.cfg  # Configuração GSI para CS2
```

### Connection Methods
The application supports two connection types to the backend server:
1. **Server-Sent Events (SSE)** - Default connection method
2. **WebSocket** - Enabled via `?socket` query parameter

### Environment Variables
Development and production environments require:
- `NEXT_PUBLIC_WEBRADAR_HTTP`: HTTP endpoint for SSE connection
- `NEXT_PUBLIC_WEBRADAR_SOCKET`: WebSocket endpoint
- `NEXT_PUBLIC_WEBRADAR_SSE_ENDPOINT`: SSE path (default: `/webradar/sse`)
- `NEXT_PUBLIC_WEBRADAR_SOCKET_ENDPOINT`: Socket.IO path (default: `/webradar/socket`)

**Configuração atual do frontend:**
- HTTP: `http://localhost:3000` (desenvolvimento)
- WebSocket: `ws://localhost:3000` (desenvolvimento)
- Endpoints: `/webradar/sse` e `/webradar/socket`

O backend portátil está configurado para rodar na porta 3000 localmente.

## Recent Changes
- **2025-11-25**: Configured for Replit environment
  - Updated dev server to bind to `0.0.0.0:5000` for Replit proxy
  - Updated production server to use port 5000
  - Installed all npm dependencies
  - Set up workflow for automatic server startup

- **2025-11-25**: Created portable backend server
  - Complete Node.js backend server in `backend-server/` folder
  - Receives CS2 game data via Game State Integration (GSI) HTTP POST
  - Transmits data to frontend via Socket.IO and Server-Sent Events (SSE)
  - Includes Windows batch scripts for easy startup
  - GSI configuration file for CS2 included
  - Test scripts and mock data for validation
  - Complete Portuguese documentation for pendrive usage
  - Configured environment variables to connect to localhost:3000

## Development

### Running Locally
```bash
npm run dev
```
Starts the development server on http://0.0.0.0:5000

### Building for Production
```bash
npm run build
npm start
```

### Code Quality
- ESLint with Next.js and Prettier configs
- Prettier with Tailwind CSS plugin for formatting
- TypeScript strict mode enabled

## Backend Server (Portátil)

### Uso em Pendrive
O backend foi desenvolvido para rodar diretamente do pendrive:
1. Copie a pasta `backend-server/` para o pendrive
2. Copie o arquivo GSI para a pasta cfg do CS2
3. Execute `INICIAR.bat` no pendrive
4. Abra o frontend no navegador
5. Inicie o CS2 e jogue normalmente

### Como Funciona
1. **CS2 Game State Integration (GSI)** envia dados para o backend via HTTP POST
2. **Backend** (porta 3000) recebe, processa e retransmite os dados
3. **Frontend** se conecta ao backend via SSE ou Socket.IO
4. **Radar** atualiza em tempo real durante as partidas

### Arquivos Importantes
- `INICIAR.bat`: Inicia o servidor (Windows)
- `TESTAR.bat`: Testa o servidor com dados mock
- `README.md`: Documentação completa do backend
- `INSTRUÇÕES-PENDRIVE.md`: Guia para uso portátil
- `config/gamestate_integration_webradar.cfg`: Arquivo de configuração para CS2

### Requisitos
- Node.js 16+ instalado no computador
- Counter-Strike 2 instalado
- Pendrive com ~100 MB livres

## Notes
- Frontend e backend são separados - frontend roda no Replit, backend roda localmente
- Backend portátil funciona em qualquer PC com Node.js
- Map data files are included for all supported maps in `public/maps/`
- The application will show "Not in match" state when disconnected or when no game is active
- Suporta conexão via SSE (padrão) ou Socket.IO (adicione `?socket` na URL)
