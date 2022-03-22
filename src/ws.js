import { WebSocketServer } from 'ws'
import Services from './Domains/Services.js'
import createRoom from './jobs/createRoom.js'


const WebSocketRuning = app => {
    console.log(' --server-log: "WebSocketRuning Function is Started"');

    const server = new WebSocketServer({ server: app });
    const rooms = createRoom(server, 3);

    // connection init
    server.on('connection', (ws, request) => {
        console.log(' --server-log: "server-ws got a connection"');

        const services = new Services(ws, server);

        // Event Message On
        ws.on('message', msg => {
            const { header, content } = JSON.parse(msg.toString());
            const { type } = header;

            switch(type) {
                case 'request-status-rooms':
                    console.log('socket-msg: client | type: request-status-rooms ');
                    services.responseStatusRooms(rooms);
                    break;
                    
                case 'request-register':
                    console.log('socket-msg: client | type: request-register ');
                    services.requestRegister(request, content, rooms);
                    break;
                
                case 'user-msg-server':
                    console.log('socket-msg: client | type: user-msg-server ');
                    services.userMsgServer(header, content, server, rooms);
                    break;
            }
        });

        // Event Close On
        ws.on('close', () => {
            if (ws.header) {
                console.log(ws.header);
                const room = rooms.find(room => room.roomName === ws.header.roomName);
                room.removeClienteToPlace(ws);
                console.log(`client ${ws.header.id} desconnected`);
            }
        
            console.log(`client ${request.headers['sec-websocket-key']} desconnected`);
        });
    });
}

export default WebSocketRuning;