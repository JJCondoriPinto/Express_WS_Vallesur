import express from "express";
import { Server as WebSocketServer } from 'socket.io';
import http from 'http';
import cors from 'cors';

const app = express();
const httpServer = http.createServer(app);
const io = new WebSocketServer(httpServer);
app.use(express.static(__dirname + '/public'));
app.use(cors()); // Habilitar CORS para todas las rutas

app.get('/api', (req, res) => {
    res.status(200).json({
        "test": "funciona"
    });
});

io.on('connection', (socket) => {
    console.log('Nueva Conexión: ', socket.id);
    socket.broadcast.emit('ping');

    socket.on("cancelScan",(data)=>{
        socket.emit("cancelScan");
        socket.broadcast.emit("cancelScan");
    })
    socket.on("sendToVue",(data)=>{
        console.log("Mensaje de Flutter: ",data);
        //socket.emit('sendToFlutter',data);
        socket.broadcast.emit('sendToVue',data);
    })
    socket.on("sendToFlutter",(data)=>{
        console.log("Mensaje de Vue: ",data);
        //socket.emit('sendToVue',data);
        socket.broadcast.emit("sendToFlutter",data);
    })
});


httpServer.listen(3000, '0.0.0.0', () => {
    console.log("Servidor Node.js escuchando en todas las direcciones IP en el puerto 3000");
});



console.log('Server on port', 3000);
