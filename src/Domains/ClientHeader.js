export default class ClientHeader {
    constructor() {
        this._id = null;
        this._name = null;
        this._room = null;
    }

    set clientName(name) { this._name = name }
    set room(room) { this._room = room }
    set clientId(id) { this._id = id }

    get clientName() { return this._name }
    get clientId() { return this._id }
    get room() { return this._room }
}