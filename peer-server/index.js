var PeerServer = require('peer').PeerServer;

var server = PeerServer({ port: 9000 });
console.info('Listening on port 9000')