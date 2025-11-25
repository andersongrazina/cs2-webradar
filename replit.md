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
- Requires external backend server connection for live game data (not included in this repository)

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
src/
├── app/              # Next.js App Router pages
├── components/       # React components (Radar, Players, Bomb, etc.)
├── contexts/         # Context providers (Game state, Settings)
├── lib/              # Utilities and custom hooks
├── types/            # TypeScript type definitions
└── constants/        # Configuration constants

public/
└── maps/            # Map images and data files for 18+ maps
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

Current configuration uses placeholder values that need to be updated to point to an actual CS2 game state integration backend.

## Recent Changes
- **2025-11-25**: Configured for Replit environment
  - Updated dev server to bind to `0.0.0.0:5000` for Replit proxy
  - Updated production server to use port 5000
  - Installed all npm dependencies
  - Set up workflow for automatic server startup

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

## Notes
- This is a frontend-only application that requires a separate CS2 Game State Integration (GSI) backend server
- The backend server must implement either SSE or Socket.IO endpoints that provide real-time game data
- Map data files are included for all supported maps in `public/maps/`
- The application will show "Not in match" state when disconnected or when no game is active
