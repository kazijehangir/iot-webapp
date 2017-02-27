var PORT = 5001;
var HOST = '10.0.0.2';

var dgram = require('dgram');
var message = new Buffer('packet#');
var client = dgram.createSocket('udp4');

client.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});
client.on('message', function (message, remote) {
    // console.log(remote.address + ':' + remote.port +' - ' + message);
    // server.send(message, 0, message.length, PORT, remote.address, function(err, bytes) {
    //     if (err) throw err;
    //     console.log('UDP message sent to ' + remote.address +':'+ PORT + message);
    // });
    console.timeEnd(Buffer.toString(message))
});
for (var i = 0; i < 100; i++) {
    message = Buffer.concat([message, new Buffer(i.toString())])
    client.send(message , 0, message.length, PORT, HOST, function(err, bytes) {
        if (err) throw err;
        console.log('UDP message sent to ' + HOST +':'+ PORT + ' i: ' + i);
        console.time(Buffer.toString(message))
    });
}
