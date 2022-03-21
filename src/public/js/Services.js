import Components from "./components.js";
import message from "./message.js";

export default class Services {
    constructor(client) {
        this._client = client;
    }

    
    // SERVICE 1
    requestStatusRooms() {
        this._client.send(message({ type: 'request-status-rooms' }));
    }


    // SERVICE 2
    updateStatusRooms(userContent, content, statusRooms) {
        const roomsDoomElement = document.getElementById('rooms');
        roomsDoomElement.innerHTML = '';

        statusRooms.rooms = content.rooms;

        // adicionando salas ao componente rooms
        statusRooms.rooms.forEach(room => {
            roomsDoomElement.innerHTML += Components.room(room);
        });

        // escolhendo a sala
        const inRoom = roomsDoomElement.getElementsByClassName("inRoom");
        const roomNames = roomsDoomElement.getElementsByClassName("roomName");
        const roomLimite = roomsDoomElement.getElementsByClassName("roomLimite");

        for (let i=0; i < roomNames.length; i++) {
            roomNames[i].addEventListener('click', () => {
                if (!userContent.nickname) {
                    alert('Defina um nickname');
                    return;
                }

                if (parseInt(inRoom[i].outerText) === parseInt(roomLimite[i].outerText)) {
                    alert('Sala completa');
                    return;
                }

                userContent.roomName = roomNames[i].outerText;
                this._client.send(message({ type: 'request-register' }, userContent));
            });
        }
    }


    // SERVICE 3
    initChooseRooms(reqContent, container) {
        container.innerHTML = Components.chooseRoomsContainer();
        document.getElementById("chooseRooms-container");
        document.getElementById('set-nickname').innerHTML = Components.setNickname();

        // campo de alteração de nickname usuario
        document.getElementById('buttonNickname').addEventListener('click', () => {
            const nickname = document.getElementById('nickname').value;
            if (nickname !== "") {
                reqContent.nickname = nickname;
                alert('nickname definido com sucesso')
                return
            }

            alert('Defina um nickname');
        });
    }

    
    // SERVICE 4
    initChatInRoom(userContent, container) {
        container.innerHTML = Components.roomContainer();
        const chat = document.getElementById("chat-container");
        const sender = document.getElementById("sender");
        const buttonSend = document.getElementById("buttonSend");

        // Mandando menssagem
        buttonSend.addEventListener('click', () => {
            const msg = sender.value;
            const charEspecial = "&#13;&#10;";
            
            let newMsg = "";
            let cont = 0;

            for (let i=0; i < (msg.length + 1); i++) {
                if (i < msg.length) {
                    if (cont === 39) {
                        newMsg += charEspecial;
                        cont = 0;
                    } else {
                        newMsg += msg[i];
                        cont ++;
                    }
                }
            }

            chat.innerHTML += Components.msgClientTracted(newMsg);
            sender.value = '';

            chat.scrollTo(chat.scrollWidth, chat.scrollHeight + 1000);

            const header = {
                id: userContent.id,
                nickname: userContent.nickname,
                roomName: userContent.roomName,
                type: 'user-msg-server'
            }

            this._client.send(message(header, { message: newMsg }));
        });
    }


    // SERVICE 5
    userMsgRoom(header, content) {
        const msg = content.message;
        const nicknameUserMsg = header.nickname;
        const chat = document.getElementById("chat-container");
        chat.innerHTML += Components.msgOutherUserTracted(msg, nicknameUserMsg);
        chat.scrollTo(chat.scrollWidth, chat.scrollHeight + 1000);
    }
}