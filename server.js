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
const io = require('socket.io').listen(server)
server.listen(SERVER_PORT, () => console.log('Listening on port: ' + SERVER_PORT))
io.on('connection', (socket) => {
  fs.readFile('config.json', (err,data) => {
    if (err) {throw err}
    console.log('Read config.json')
    dataJSON = JSON.parse(data)
    socket.emit('to_client', dataJSON)
  })
  socket.on('to_server', data => {
    strJSON = data.stringify()
    fs.writeFile('config2.json', strJSON, 'utf8', () => console.log('Config File written'));
  })
  socket.on('disconnect', () => {
    console.log('a user disconnected')
  })
})