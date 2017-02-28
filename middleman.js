var fs = require('fs')
var net = require('net')
var http = require('http')

fs.readFile('config.json', (err,data) => {
    if (err) {throw err}
    console.log('Read config.json')
    dataJSON = JSON.parse(data)
    for (flow of dataJSON) {
        setupListener(flow)
    }
})

function setupListener(flow) {
    // console.log(flow)
    var PORT = flow['port']
    var dgram = require('dgram')
    var server = dgram.createSocket('udp4')
    var packetCount = 0
    var allowedRate = getAllowedRate(flow['policy'])

    server.on('listening', function () {
        var address = server.address()
        console.log('UDP Server listening on ' + address.address + ":" + address.port)
    })
    server.on('message', function (message, remote) {
        // console.log(remote.address + ':' + remote.port +' - ' + message)
        if (packetCount++ % allowedRate == 0) {
            HOST = (remote.address == flow['srcIP']) ? flow['dstIP'] : flow['srcIP']
             //message = simulateComputation(message)
            var client = dgram.createSocket('udp4')
            client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
                if (err) throw err
                console.log('UDP message sent to ' + HOST +':'+ PORT + ' Packet Num: ' + packetCount)
                client.close()
            })
        } else {
            console.log(message + ' FROM ' + remote.address + ':' + remote.port +' - DROPPED')
        }
    })
    server.bind(PORT)
}
function simulateComputation(message) {
    var crypto = require('crypto');
    var name = message.toString('utf8');
    var hash = crypto.createHash('md5').update(name).digest('hex');
    console.log(hash); // 9b74c9897bac770ffc029102a200c5de
    return message
}
function getAllowedRate(policy) {
    if (policy == 'coursegrain1') {
        return 2
    } else if (policy == 'coursegrain2') {
        return 5
    } else if (policy == 'coursegrain3') {
        return 10
    } else {
        return 1
    }
}
