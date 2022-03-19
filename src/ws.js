import message from './jobs/message.js'
import ClientHeader from './Domains/ClientHeader.js'
import Rooms from './Domains/Rooms.js'
import { WebSocketServer } from 'ws'

const WebSocketRuning = (app) => {
    const server = new WebSocketServer({ server: app });
    const rooms = [];
    const limitRooms = 3;

    // creating rooms
    for (let num=1; num <= limitRooms; num++) {
        let roomName = 'sala' + num;
        rooms.push(new Rooms(roomName, server));
    }

    server.on('connection', (ws, request) => {

        ws.header = new ClientHeader();
        ws.header.clientId = request.headers['sec-websocket-key'];
        ws.header.clientName = 'Vinicius';
        ws.header.room = rooms[0].roomName;

        rooms[0].addClientToPlace(ws);

        let header = { type: 'list-rooms' }
        let content = { rooms: [] }

        rooms.forEach(room => {
            content.rooms.push({
                roomName: room.roomName,
                inRoom: room.places.length,
                limitPlaces: room.limitPlaces
            });
        });

        ws.send(message(header, content));

        onmessage(ws, server);
        onclose(ws, server);
    });
}

function onmessage(ws, server) {
    ws.on('message', msg => {
    });
}

function onclose(ws, server) {
    ws.on('close', () => {
        console.log(`client ${ws.id} desconnected`);
    });
}

export default WebSocketRuning;