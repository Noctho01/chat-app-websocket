import Components from './components.js';

export default (container, cliente, data) => {
    delete data.header.type;
    const user = data.header;

    container.innerHTML = Components.roomContainer();
    var chat = document.getElementById("chat-container");
    var sender = document.getElementById("sender");
    var buttonSend = document.getElementById("buttonSend");

    // Mandando menssagem
    buttonSend.addEventListener('click', () => {
        let msg = sender.value;
        let charEpecial = "&#13;&#10;";
        let newMsg = "";
        let cont = 0;

        for (let i=0; i < (msg.length + 1); i++) {
            if (i < msg.length) {
                if (cont === 39) {
                    newMsg += charEpecial;
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

        cliente.send(JSON.stringify({
            header: {
                clientName: user.clientName,
                clientId: user.clientId,
                type: 'msg-to-room'
            },
            content: { message:  newMsg}
        }));

    });

    return chat;

}
