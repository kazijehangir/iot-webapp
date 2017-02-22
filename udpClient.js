var PORT = 5001;
var HOST = '10.0.0.2';

var dgram = require('dgram');
var message = new Buffer('My KungFu is Good!');
var client = dgram.createSocket('udp4');

for (var i = 0; i < 100; i++) {
    client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + HOST +':'+ PORT + ' i: ' + i);
    });
}
