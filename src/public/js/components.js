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

    static swithRoomContainer() {
        return (`
            <div id="swithRoom-container">
            </div>
        `);
    }

    static setNameUser() {
        return (`
            <div id="set-name">
                <input type="text" name="nick" id="nick" placeholder="nick name">
                <button id="buttonNick">ok</button>
            </div>
        `);
    }

    static room(room) {
        const inLimit = room.inRoom < room.limitPlaces
                ? "inLimit_yes"
                : "inLimit_no"

        return (`
            <div class="room">
                <div class="roomName">${room.roomName}</div>
                <div class=${inLimit}>    
                    <div class="inRoom">${room.inRoom}</div>
                    /
                    <div class="roomLimite">${room.limitPlaces}</div>
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

    static msgOutherUserTracted(msg, userName) {
        return (`
            <div class="msg-outher-user">
                <div style="color:red">${userName}</div>
                <div>${msg}</div>
            </div>
        `);
    }
}

export default Components;