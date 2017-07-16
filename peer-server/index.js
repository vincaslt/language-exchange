var PeerServer = require('peer').PeerServer;

var server = PeerServer({ port: 9000 });
console.log('Listening on port 9000')