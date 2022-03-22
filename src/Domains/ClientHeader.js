export default class ClientHeader {
    constructor(id, nickname, roomName) {
        this._id = id;
        this._color = "red";
        this._nickname = nickname;
        this._roomName = roomName;
    }

    get id() { return this._id }
    get color() { return this._color }
    get nickname() { return this._nickname }
    get roomName() { return this._roomName }

    set color(colorValue) { this._color = colorValue }
}