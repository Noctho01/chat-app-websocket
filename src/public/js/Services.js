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

    requestListMembers(roomName) {
        this._client.send(message({ type: 'request-list-members' }, { roomName: roomName }));
    }

    responseListMembers(nickname, content) {
        const { members } = content;
        const listMembers = document.getElementById('list-members');
        listMembers.innerHTML = "";

        members.forEach(member => {
            listMembers.innerHTML += Components.memberIcon(member.nickname, member.color, nickname);
        });
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
                this.requestStatusRooms();
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
            if (sender.value != "" || sender.value != " " || sender.value != undefined || sender.value != null) {
                const charQuebraLinha = "<br>";
                const msg = sender.value
                    .replace(/ /g, "&nbsp;")
                    .replace(/\n/g, charQuebraLinha);

                chat.innerHTML += Components.msgClientTracted(msg);
                sender.value = '';
                sender.select();

                chat.scrollTo(chat.scrollWidth, chat.scrollHeight + 1000);

                const header = {
                    id: userContent.id,
                    nickname: userContent.nickname,
                    roomName: userContent.roomName,
                    color: userContent.color,
                    type: 'user-msg-server'
                }

                this._client.send(message(header, { message: msg }));
            }
        });
    }


    // SERVICE 5
    userMsgRoom(header, content) {
        const msg = content.message;
        const nicknameUserMsg = header.nickname;
        const colorUserMsg = header.color;
        const chat = document.getElementById("chat-container");
        chat.innerHTML += Components.msgOutherUserTracted(msg, nicknameUserMsg, colorUserMsg);
        chat.scrollTo(chat.scrollWidth, chat.scrollHeight + 1000);
    }
}