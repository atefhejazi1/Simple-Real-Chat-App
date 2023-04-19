const express = require('express')
const socket = require('socket.io')

const application = express()
const port = 3000

var server = application.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


application.use(express.static('public_html'))

var sio = socket(server)

sio.on('connection', function (visitor) {
    console.log('we have a new visitor as id ', visitor.id);

    visitor.on('message', function (data) {
        sio.sockets.emit('new_message', data)
    })

    visitor.on('broad', function (data) {
        visitor.broadcast.emit('new_broad', data)
    })
})