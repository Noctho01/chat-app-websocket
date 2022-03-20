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

    // Case 'list-rooms'
    function listRoomsCase(data, swithRoom) {
        swithRoom.innerHTML = Components.setNameUser();
        data.content.rooms.forEach(room => {
            swithRoom.innerHTML += Components.room(room);
        });

        // alterando o nome do usuario
        document.getElementById("buttonNick").addEventListener('click', () => {
            let nick = document.getElementById('nick').value;
            console.log(nick)
            if (nick !== "") {
                user.clientName = nick
                alert('nome definido com sucesso!');
                return
            }

            alert('Defina um nome');
        });

        // escolhendo a sala
        const roomNames = swithRoom.getElementsByClassName("roomName");
        for (let i=0; i < roomNames.length; i++) {
            roomNames[i].addEventListener('click', () => {
                user.roomName = roomNames[i].outerText; //pegando nome do lugar e adicionando aos dados do usuario
                cliente.send(JSON.stringify({
                    header: {
                        type: 'room-is-defined'
                    },
                    content: {
                        roomName: user.roomName,
                        clientName: user.clientName
                    }
                }));
            });
        }
    }

    // Case 'init-chat'
    function initChatCase(data) {
        Room(container, cliente, data);
    }
}