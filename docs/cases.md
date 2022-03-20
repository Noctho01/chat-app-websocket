##

# CASES DE SOCKET-MSG

<br>

- SERVER **S**
- CLIENT **C** 
- SEND **>**

<br>
<br>

# Init Process

## (1) 'request-status-rooms' C > S
- Cliente solicita os dados das rooms ao Servidor;

## (2) 'response-status-rooms' S > C
- Servidor envia os dados das rooms ao Cliente;

## (3) 'request-register' C > S
- Cliente envia os dados do novo usuario ao Servidor
- *estes dados consistem em nickname e nome id da room*
- *Servidor inicia processo de registro de usuario a room*

## (4) 'response-register' S > C
- Servidor envia ao Cliente a resposta resultado do registro
- *caso aprovado o cliente inicia o serviço de chat*

<br>
<br>

# Server Msg

## (A) 'server-msg-room' S > C
- Servidor envia menssagem para um room especifico

## (B) 'server-msg-rooms' S > C
- Servidor envia menssagem para todos os room do servidor

## (C) 'server-msg-user' S > C
- Servidor envia menssagem para usuario especifico

<br>
<br>

# Client Msg

## (A-1) 'user-msg-server' C > S
- Cliente envia menssagem do usuario para o Servidor
- *Servidor inicia processo de envio de volta para os membros da room*

## (A-2) 'user-msg-room' S > C
- Servidor envia a menssagem do usuario para o Cliente
