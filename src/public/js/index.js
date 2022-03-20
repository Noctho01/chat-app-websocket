import SwithRoom from './SwithRoom.js'
import cliente from './wsclient.js'

const user = {
    clientId: null,
    clientName: null,
    roomName: null
}

SwithRoom(cliente, user);