import message from "./message";

export default class Cases {
    
    static statusRooms(rooms, ws) {
        const header = { type: 'response-status-rooms'};
        const content = { rooms: [] };

        rooms.forEach(room => {
            content.rooms.push({
                roomName: room.roomName,
                inRoom: room.clients.length,
                limitPlaces: room.limitPlaces
            });
        });

        ws.send(message(header, content));
    }
}