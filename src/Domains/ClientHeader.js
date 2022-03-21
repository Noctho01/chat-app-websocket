export default class ClientHeader {
    constructor(id, nickname, roomName) {
        this._id = id;
        this._nickname = nickname;
        this._roomName = roomName;
    }

    get id() { return this._id }
    get nickname() { return this._nickname }
    get roomName() { return this._roomName }
}