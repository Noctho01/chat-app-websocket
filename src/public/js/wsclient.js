const HOST = location.origin.replace(/^http/, 'ws');
const client = new WebSocket(HOST);

export default client;