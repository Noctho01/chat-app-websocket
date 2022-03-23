export default class Rooms {
    constructor(roomName, server) {
        this.roomName = roomName;
        this.server = server;
        this.limitPlaces = 4;
        this.colors = ["#98092b","#df931b", "#45ada8","#0a996f", "#7b6ed6", "#fd65a0", "#8e3f65", "#a8c030", "#836177"];
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