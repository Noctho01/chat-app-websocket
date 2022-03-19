export default class Rooms {
    constructor(roomName, server) {
        this.roomName = roomName;
        this.server = server;
        this.limitPlaces = 4;
        this.places = [];
    }

    addClientToPlace(ws) {
        if (this.places.length < this.limitPlaces) {
            this.places.push(ws);
            console.log(ws.header.clientName, 'entrou na sala', this.roomName);
        }
    }

    removeClienteToPlace(ws) {
        const index = this.places.indexOf(ws);
        this.places.splice(index, 1);
        console.log(ws.header.clientName, 'foi removido da sala', this.roomName);
    }
}