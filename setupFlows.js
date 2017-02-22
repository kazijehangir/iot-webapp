var fs = require('fs')
var net = require('net')
var http = require('http')

fs.readFile('config.json', (err,data) => {
    if (err) {throw err}
    console.log('Read config.json')
    dataJSON = JSON.parse(data)
    for (flow of dataJSON) {
        sendFlowRules(flow)
        setupListener(flow)
    }
})

var options = {
  hostname: '192.168.22.137',
  port: 8080,
  path: '/wm/staticflowpusher/json',
  method: 'POST',
  headers: {
      'Content-Type': 'application/json',
  }
}

function sendFlowRules(flow) {
    var req1 = http.request(options, function(res) {
        console.log('Status: ' + res.statusCode)
        // console.log('Headers: ' + JSON.stringify(res.headers))
        res.setEncoding('utf8')
        res.on('data', function (body) {
            console.log('Body: ' + body)
        })
    })
    req1.on('error', function(e) {
        console.log('problem with request: ' + e.message)
    })
    message = '{"switch":"00:00:00:00:00:00:00:01","name":"'
        +flow['flowname']+'","priority":"32768","in_port":"'
        +flow['srcIP'].split('.')[3]+'","active":"true", "eth_type":"0x0800","eth_src":"'
        +flow['srcMAC']+'", "eth_dst":"'+flow['dstMAC']+'", "ipv4_src":"'
        +flow['srcIP']+'", "ipv4_dst":"'+flow['dstIP']+
        '", "actions":"set_field=eth_dst->32:ee:14:eb:de:4e,set_field=ipv4_dst->10.0.0.3,output=3"}'
    
    // write data to request body
    req1.write(message)
    // console.log(message)
    req1.end()
    console.log('Flow: ' + flow['flowname'] + ' pushed.')


    var req2 = http.request(options, function(res) {
        console.log('Status: ' + res.statusCode)
        // console.log('Headers: ' + JSON.stringify(res.headers))
        res.setEncoding('utf8')
        res.on('data', function (body) {
            console.log('Body: ' + body)
        })
    })
    req2.on('error', function(e) {
        console.log('problem with request: ' + e.message)
    })

    message2 = '{"switch":"00:00:00:00:00:00:00:01","name":"'+flow['flowname']+
    '-rev","priority":"32768","in_port":"3","active":"true", "eth_type":"0x0800","eth_src":"32:ee:14:eb:de:4e", "eth_dst":"'
        +flow['srcMAC']+'", "ipv4_src":"10.0.0.3", "ipv4_dst":"'+flow['srcIP']+
        '", "actions":"set_field=eth_src->'+flow['dstMAC']+',set_field=ipv4_src->'+flow['dstIP']+
        ',output='+flow['srcIP'].split('.')[3]+'"}'
    
    // write data to request body
    req2.write(message2)
    // console.log(message2)
    req2.end()
    console.log('Flow: ' + flow['flowname'] + '-rev pushed.')
    
}