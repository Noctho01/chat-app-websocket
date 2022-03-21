import Components from './components.js';
import Room from './Room.js'

export default (cliente, user) => {

    const container = document.getElementById("container");

    container.innerHTML = Components.swithRoomContainer();
    const swithRoom = document.getElementById("swithRoom-container");

    cliente.onopen = () => {
        cliente.onmessage = msg => {
            let data = JSON.parse(msg.data);

            switch(data.header.type) {
                case 'msg-to-client-room':
                    let chat = document.getElementById("chat-container");
                    chat.innerHTML += Components.msgOutherUserTracted(data.content.message, data.header.clientName);
                    chat.scrollTo(chat.scrollWidth, chat.scrollHeight + 1000);
                break;
                case 'list-rooms':
                    listRoomsCase(data, swithRoom);
                    break;
                case 'init-chat':
                    initChatCase(data)
            }
        }
    }
}