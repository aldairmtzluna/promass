const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// Endpoint de notificacuines

app.post('/notify', (req, res) => {
  try {
    const { event, data } = req.body;
    
    if (event === 'nuevo_usuario') {
      // Envio todos los clientes conectados
      io.emit('nuevo_usuario', data);
      console.log(' Notificación enviada:', data);
      
      return res.status(200).json({
        success: true,
        message: 'Notificación enviada exitosamente'
      });
    }
    
    return res.status(400).json({
      success: false,
      message: 'Evento no reconocido'
    });
    
  } catch (error) {
    console.error('Error en /notify:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

//conexiones 
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
  
  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
});

// Endpoint de estado
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Servidor WebSocket funcionando',
    clients: io.engine.clientsCount
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Servidor WebSocket escuchando en puerto ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});