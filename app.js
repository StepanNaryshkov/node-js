const http = require('http');
const handleServer = require('./route');

const server = http.createServer(handleServer);

server.listen(3000);
