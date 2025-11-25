const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { transformGSIData } = require('./transform');

const app = express();
const httpServer = createServer(app);

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let latestGameData = null;
const sseClients = [];

const io = new Server(httpServer, {
  path: '/webradar/socket',
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  },
  transports: ['websocket', 'polling']
});

io.on('connection', (socket) => {
  console.log(`[Socket.IO] Cliente conectado (ID: ${socket.id})`);
  
  if (latestGameData) {
    socket.emit('data', latestGameData);
  }
  
  socket.on('disconnect', () => {
    console.log(`[Socket.IO] Cliente desconectado (ID: ${socket.id})`);
  });
});

app.post('/webradar', (req, res) => {
  // Transforma dados brutos do GSI para o formato do frontend
  const transformedData = transformGSIData(req.body);
  
  if (transformedData) {
    latestGameData = transformedData;
    
    console.log(`[GSI] Dados recebidos do CS2 - Mapa: ${transformedData.map || 'N/A'} - Jogadores: ${transformedData.players.length}`);
    
    io.emit('data', latestGameData);
    
    sseClients.forEach(client => {
      client.write(`data: ${JSON.stringify(latestGameData)}\n\n`);
    });
  }
  
  res.sendStatus(200);
});

app.get('/webradar/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  res.write('retry: 10000\n\n');
  
  if (latestGameData) {
    res.write(`data: ${JSON.stringify(latestGameData)}\n\n`);
  }
  
  sseClients.push(res);
  console.log(`[SSE] Cliente conectado (Total: ${sseClients.length})`);
  
  const keepAliveInterval = setInterval(() => {
    res.write(':keep-alive\n\n');
  }, 30000);
  
  req.on('close', () => {
    clearInterval(keepAliveInterval);
    const index = sseClients.indexOf(res);
    if (index !== -1) {
      sseClients.splice(index, 1);
    }
    console.log(`[SSE] Cliente desconectado (Total: ${sseClients.length})`);
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    connections: {
      sse: sseClients.length,
      socketio: io.engine.clientsCount
    },
    hasGameData: latestGameData !== null
  });
});

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log('===========================================');
  console.log('  CS2 WEBRADAR BACKEND - SERVIDOR ATIVO');
  console.log('===========================================');
  console.log(`Porta: ${PORT}`);
  console.log(`Endpoint GSI: http://localhost:${PORT}/webradar`);
  console.log(`Socket.IO: http://localhost:${PORT}/webradar/socket`);
  console.log(`SSE: http://localhost:${PORT}/webradar/sse`);
  console.log(`Health Check: http://localhost:${PORT}/health`);
  console.log('===========================================');
  console.log('Aguardando dados do CS2...');
  console.log('');
});
