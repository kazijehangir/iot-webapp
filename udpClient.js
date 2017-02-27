var PORT = 5001;
var HOST = '10.0.0.2';

var dgram = require('dgram');
var client = dgram.createSocket('udp4');
var times = new Array(100)
client.bind(PORT)

client.on('listening', function () {
    var address = client.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});
client.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);
    // console.log(message.toString())
    console.timeEnd(message)
    var j = message.toString().split(' ').toInteger()
    var duration = Date.now() - times[j]
    console.log(j.toString() + ',' + duration)
});
for (var i = 0; i < 100; i++) { 
    (j => {
        message = Buffer.concat([Buffer.from('packet# '), Buffer.from(j.toString())])
        client.send(message , 0, message.length, PORT, HOST, function(err, bytes) {
            if (err) throw err;
            console.log('UDP message sent to ' + HOST +':'+ PORT + ' message: ' + message);
            console.time(message)
            times[j] = Date.now()
        });
    })(i) 
}
