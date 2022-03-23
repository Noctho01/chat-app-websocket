import Services from './Services.js'

// connection to websocket server ws://host:port/
const HOST = location.origin.replace(/^http/, 'ws');
const client = new WebSocket(HOST);

client.onopen = () => {
    const services = new Services(client);
    const statusRooms = { rooms: null };
    const userContent = {
        id: null,
        nickname: null,
        roomName: null,
        color: null
    }

    // DOO Elements
    const container = document.getElementById("container");

    // Init Process
    services.initChooseRooms(userContent, container);
    services.requestStatusRooms();

    // Event Message On
    client.onmessage = msg => {
        const { header, content } = JSON.parse(msg.data);
        const { type } = header;

        switch(type) {
            case 'response-status-rooms':
                services.updateStatusRooms(userContent, content, statusRooms);
                break;

            case 'response-register':
                if (content.accept) {
                    userContent.id = content.id;
                    userContent.color = content.color;
                    services.initChatInRoom(userContent, container);
                    services.requestListMembers(userContent.roomName);
                    return;
                }
                alert('Registro negado')
                break;
            
            case 'response-list-members':
                console.log('baba')
                services.responseListMembers(userContent.nickname, content);
                break;

            case 'user-msg-room':
                services.userMsgRoom(header, content);
                break;
        }
    }

    // Event Close On
    client.onclose = () => {
        alert('Você foi desconectado do servidor, tente uma nova conexão.');
    }
}