class Components {
    static roomContainer() {
        return (`
            <div id="room-container">
                <div id="list-members"></div>
                <div id="chat-container"></div>
                <div id="chatBar-buttonSend">
                    <textarea id="sender" cols="40" rows="5" maxlength="419" wrap="hard"></textarea>
                    <button id="buttonSend">SEND</button>
                </div>
            </div>
        `);
    }

    static chooseRoomsContainer() {
        return (`
            <div id="chooseRooms-container">
                <div id="set-nickname"></div>
                <div id="rooms"></div>
            </div>
        `);
    }

    static setNickname() {
        return (`
            <input type="text" name="nick" id="nickname" placeholder="nick name">
            <button id="buttonNickname">ok</button>
        `);
    }

    static room(room) {
        const { inRoom, limitPlaces, roomName } = room;
        const inLimit = inRoom < limitPlaces ? "inLimit_yes" : "inLimit_no"

        return (`
            <div class="room">
                <div class="roomName">${roomName}</div>
                <div class=${inLimit}>    
                    <div class="inRoom">${inRoom}</div>
                    /
                    <div class="roomLimite">${limitPlaces}</div>
                </div>
            </div>
        `);
    }

    static msgClientTracted(msg) {
        return (`<div align="right" class="msg-user"><p>${msg}</p></div>`);
    }

    static msgServerTracted(msg) {
        return (`<div class="msg-server"><p>${msg}</p></div>`);
    }

    static msgOutherUserTracted(msg, nickname, color) {

        return (`
            <div class="msg-outher-user">
                <div style="color:${color}; opacity: 0.5">${nickname}</div>
                <p>${msg}</p>
            </div>
        `);
    }

    static memberIcon(nameOutherUser, color, nameUser) {
        const name = nameUser == nameOutherUser ? `${nameUser} (You)` : `${nameOutherUser}`;
        return (`<div class="member-icon" style="color:${color};">${name}</div>`);
    }
}

export default Components;