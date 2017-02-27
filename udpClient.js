var PORT = 5001;
var HOST = '10.0.0.2';

var dgram = require('dgram');
var client = dgram.createSocket('udp4');
client.bind(PORT)

client.on('listening', function () {
    var address = client.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});
client.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);
    // console.log(message.toString())
    console.timeEnd(message.toString())
});
messages = []
for (var i = 0; i < 100; i++) {
    messages.push(Buffer.concat([Buffer.from('packet#'), Buffer.from(i.toString())]))
}
for (var i = 0; i < 100; i++) {
    // message = Buffer.concat([Buffer.from('packet#'), Buffer.from(i.toString())])
    client.send(messages[i] , 0, messages[i].length, PORT, HOST, function(err, bytes) {
        if (err) throw err;
        // console.log('UDP message sent to ' + HOST +':'+ PORT + ' i: ' + i);
        console.time(messages[i].toString())
    });
}
