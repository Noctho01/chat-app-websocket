# MESSAGE MODEL
Modelo contrato do corpo das socket-msg

As menssagens são caracterizadas em 3 tipos:
- chat-msg
- server-msg
- client-msg

## chat-msg
~~~json
{
    "header": {
        "clientId": "sd24fs5d6sdf4f56s4d==",
        "clientName": "Mari-321",
        "type": "user-msg-room"
    },
    "content": {
        "message": "olá, Como vai?"
    }
}
~~~

<br>

## server-msg
~~~json
{
    "header": {
        "type": "response-status-rooms"
    },
    "content": {
        "rooms": [Array]
    }
}
~~~

<br>

## client-msg
~~~json
{
    "header": {
        "type": "request-register"
    },
    "content": {
        "user": {
            "nickname": "Mari-321",
            "roomName": "sala1",
        }
    }
}
~~~