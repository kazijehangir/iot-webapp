var PORT = 5001;

var dgram = require('dgram');
var server = dgram.createSocket('udp4');
server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);
    server.send(message, 0, message.length, PORT, remote.address, function(err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + remote.address +':'+ PORT + message);
    });
});

server.bind(PORT);