class Components {
    static roomContainer() {
        return (`
            <div id="room-container">
                <div id="chat-container">
                </div>
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
        return (`
            <div class="msg-user">
                <div>${msg}</div>
            </div>
        `);
    }

    static msgServerTracted(msg) {
        return (`
            <div class="msg-server">
                <div>${msg}</div>
            </div>
        `);
    }

    static msgOutherUserTracted(msg, nickname) {
        return (`
            <div class="msg-outher-user">
                <div style="color:red">${nickname}</div>
                <div>${msg}</div>
            </div>
        `);
    }
}

export default Components;