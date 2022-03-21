import message from "../jobs/message.js";
import ClientHeader from "./ClientHeader.js";

export default class Services {
    constructor(ws) { this._ws = ws }
    
    responseStatusRooms(rooms) {
        const header = { type: 'response-status-rooms'};
        const content = { rooms: [] };

        rooms.forEach(room => {
            content.rooms.push({
                roomName: room.roomName,
                inRoom: room.clients.length,
                limitPlaces: room.limitPlaces
            });
        });

        this._ws.send(message(header, content));
        console.log('socket-msg: server | type: response-status-rooms ');
    }


    requestRegister(request, content, rooms) {
        this._ws.header = new ClientHeader(
            request.headers['sec-websocket-key'],
            content.nickname,
            content.roomName
        );

        const room = rooms.find(room => room.roomName === content.roomName);
        room.addClientToPlace(this._ws);

        const resContent = {
            accept: true,
            id: this._ws.header.id
        }

        this._ws.send(message({ type: 'response-register' }, resContent));
        console.log('socket-msg: server | type: response-register ');
    }


    userMsgServer(header, content, server, rooms){
        const idUserMsg = header.id;
        const userMsgRoomName = header.roomName;
        const userMsg = content.message;
        
        let wsUserMsg;

        // Pegando o socket do usuario que enviou a msg
        server.clients.forEach(client => {
            if (server.clients.header) {
                if (client.header.id === idUserMsg) wsUserMsg = client;
            }
        });

        // Enviando a msg para os membros da Room "sala"
        const room = rooms.find(room => room.roomName === userMsgRoomName);
        room.clients.forEach(client => {
            if (client.header.id != idUserMsg) {
                header.type = 'user-msg-room'
                client.send(message(header, { message: userMsg }));
                
                console.log('socket-msg: server | type: user-msg-room ');
                console.log(`User ${idUserMsg} send msg to room ${userMsgRoomName}`);
            }
        });
    }
}