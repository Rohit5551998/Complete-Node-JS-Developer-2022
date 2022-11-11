const http = require('http');
const io = require('socket.io');

const apiServer = require('./api');
const httpServer = http.createServer(apiServer.api);
const socketServer = io(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

const sockets = require('./socket');

const PORT = 3000;
httpServer.listen(PORT);
console.log(`Listening on PORT ${PORT}...`);

sockets.listen(socketServer);