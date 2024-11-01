import express from 'express'
import WebSocket, { WebSocketServer } from 'ws'
import http from 'http'

const app =express();
const server =  http.createServer(app)


const wss = new WebSocketServer({server});

wss.on('connection', (ws) => {
    console.log('Новый клиент подключился');
  
    ws.on('message', (msg) => {
      const messageData = JSON.parse(msg);
      console.log(`Получено сообщение от ${messageData.username}: ${messageData.text}`);
  
      // Рассылка сообщения всем клиентам
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(messageData));
        }
      });
    });
  
    ws.on('close', () => {
      console.log('Клиент отключился');
    });
  });
const PORT = 8080;
server.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`);
    
})