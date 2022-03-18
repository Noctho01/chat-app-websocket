const { WebSocketServer } = require('ws');
const express = require('express');
const path = require('path');

// create and config http server with express
const indexPath = '/index.html';
const PORT = process.env.PORT || 3000;
const app = express()
    .use((req, res) => res.sendFile(indexPath, {root: path.join(__dirname, 'public')}))
    .listen(PORT, () => console.log(`Server listening in PORT ${PORT}`));

// create ws server with app:express instance
const server = new WebSocketServer({ server: app });

// WebSocket Events
server.on('connection', (ws, request) => {
    console.log(request.client.remoteAddress);

    ws.id = !ws.id ? parseInt(Math.random() * 1000).toString() : ws.id;

    console.log(`client ${ws.id} connected`);

    ws.send(JSON.stringify({
        content: { id: ws.id },
        type: 'set-id'
    }));

    ws.on('message', msg => {
        let data = JSON.parse(msg.toString());
        
        server.clients.forEach(client => {
            if (client.id != data.content.id) {
                console.log(`client ${client.id} send msg "${data.content.message}"`);
                client.send(JSON.stringify({
                    content: data.content,
                    type: 'chat'
                }));
            }
        }); 
    });

    ws.on('close', () => {
        console.log(`client ${ws.id} desconnected`);
    });
});