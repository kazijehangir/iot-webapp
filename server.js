var http = require ('http')
var fs = require('fs')
const path = require('path')

const server = http.createServer((req, resp) => {
  if (req.url === '/') {
    fs.readFile('client.html', (err, data) => {
        console.log('Sending client.html')
        resp.end(data)
    })
  } else {
    fs.readFile(path.basename(req.url), (err, data) => {
        console.log('Sending: ' + req.url)
        resp.end(data)
    })
  }
})
const SERVER_PORT = 8008
server.listen(SERVER_PORT, () => console.log('Listening on port: ' + SERVER_PORT))