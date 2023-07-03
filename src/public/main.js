const socket=io('http://localhost:3000')

socket.on('ping',()=>{
    console.log('Conectado!')
    socket.emit('pong')
})