import Cases from './cases/index.js'

// connection to websocket server ws://host:port/
const HOST = location.origin.replace(/^http/, 'ws');
const client = new WebSocket(HOST);

client.onopen = () => {
    // instancia entidades necessarios aqui...

    client.onmessage = msg => {
        // convertendo msg
        const { header, content } = JSON.parse(msg.data);
        const type = header.type;

        // Switch de tipos de msg
        switch(type) {
            case '':
                break;
            case '':
                break;
            case '':
                break;
            case '':
                break;
            case '':
                break;
            default:
                break;
        }
    }

    client.onclose = () => {
        alert('Você foi desconectado do servidor, tente uma nova conexão.');
    }
}