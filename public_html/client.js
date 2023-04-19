var socket = io.connect('http://localhost:3000')

var username = document.querySelector('#username')
var message = document.querySelector('#message')
var chat = document.querySelector('#chat')
var broadcast = document.querySelector('#broadcast')
var send = document.querySelector('#send')

send.onclick = function () {
    socket.emit('message', {
        username: username.value,
        message: message.value,
    })
}

message.addEventListener('keypress' , function  () {
    socket.emit('broad', {
        username: username.value,
    })
})

socket.on('new_message', function (data) {
    broadcast.innerHTML = ''
    chat.innerHTML += `
    <div class="container">
    <strong> ${data.username}</strong>
    ${data.message}
    </div>  
    `
})
socket.on('new_broad', function (data) {
    broadcast.innerHTML = `
    <strong>${data.username}</strong> Write Message   
    `
})