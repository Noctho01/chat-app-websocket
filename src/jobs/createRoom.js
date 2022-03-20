import Rooms from '../Domains/Rooms.js'

export default (server, limit) => {
    const rooms = [];

    for (let num=1; num <= limit; num++) {
        let roomName = 'sala' + num;
        rooms.push(new Rooms(roomName, server));
    }

    return rooms;
}