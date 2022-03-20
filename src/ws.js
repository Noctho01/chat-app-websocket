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

        let serverHeader = { type: 'list-rooms' }
        let serverContent = { rooms: [] }

        rooms.forEach(room => {
            serverContent.rooms.push({
                roomName: room.roomName,
                inRoom: room.clients.length,
                limitPlaces: room.limitPlaces
            });
        });

        ws.send(message(serverHeader, serverContent));

        ws.on('message', msg => {
            const data = JSON.parse(msg.toString());
            switch(data.header.type) {
                case 'room-is-defined':
                    roomIsDefinedCase(data);
                    break;
                case 'msg-to-room':
                    msgToRoomCase(data);
                    break;
            }
        });

        ws.on('close', () => {
            console.log(`client ${ws.id} desconnected`);
        });

        // Case room-is-defined
        function roomIsDefinedCase(data) {
            // definindo dados do usuario
            ws.header = new ClientHeader();
            ws.header.clientId = request.headers['sec-websocket-key'];
            ws.header.clientName = data.content.clientName;
            ws.header.room = data.content.roomName;
            
            let room = rooms.find(room => room.roomName === data.content.roomName);
            room.addClientToPlace(ws);

            // enviando solicitação de acesso ao chat
            let clientHeader = {
                clientId : ws.header.clientId,
                clientName : ws.header.clientName,
                type : 'init-chat'
            }
            ws.send(message(clientHeader));
        }

        // Case msg-to-room
        function msgToRoomCase(data) {
            let idClientMsg = data.header.clientId;
            let nameClientMsg = data.header.clientName;
            let clientMsg = data.content.message;
            let wsClientMsg;

            // Pegando client socket que enviou a msg
            server.clients.forEach(client => {
                if (client.header.clientId === idClientMsg) {
                    wsClientMsg = client;
                }
            });

            // Enviando a msg para os membros do grupo
            rooms.forEach(room => {
                if (room.clients.includes(wsClientMsg)) {
                    room.clients.forEach(client => {
                        if (client.header.clientId != idClientMsg) {
                            let clientHeader = {
                                clientId: idClientMsg,
                                clientName: nameClientMsg,
                                type: 'msg-to-client-room'
                            }

                            client.send(message(clientHeader, { message: clientMsg }));
                            console.log('menssagem enviada')
                        }
                    })
                }
            });
        }
    });
}

export default WebSocketRuning;