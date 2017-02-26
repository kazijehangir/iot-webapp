var PORT = 5001;
var HOST = '10.0.0.2';

var dgram = require('dgram');
var message = new Buffer('My KungFu is Good! i:   ');
var client = dgram.createSocket('udp4');

client.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});
for (var i = 0; i < 100; i++) {
    message = Buffer.concat([message, new Buffer(i)])
    client.send(message , 0, message.length, PORT, HOST, function(err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + HOST +':'+ PORT + ' i: ' + i);
        console.time("packetSent" + str(i))
    });
}
