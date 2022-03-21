export default class Rooms {
    constructor(roomName, server) {
        this.roomName = roomName;
        this.server = server;
        this.limitPlaces = 4;
        this.clients = [];
    }

    addClientToPlace(ws) {
        if (this.clients.length < this.limitPlaces) {
            this.clients.push(ws);
            console.log(ws.header.nickname, 'entrou na sala', this.roomName);
        }
    }

    removeClienteToPlace(ws) {
        const index = this.clients.indexOf(ws);
        this.clients.splice(index, 1);
        console.log(ws.header.nickname, 'foi removido da sala', this.roomName);
    }
}