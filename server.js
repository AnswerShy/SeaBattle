const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app)

const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));
app.use('/socket.io', express.static(__dirname + '/node_modules/socket.io-client/dist'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

let lobbies=[];
let playerNick;

io.on("connection", (socket) => {
    socket.on(`getNick`, (e) => {
        playerNick = e
    })
    socket.on(`createLobby`, (lobbyID) => {
        lobbies[lobbyID] = {players: [null, null], playersNicks: [null, null]}
        lobbies[lobbyID].players[0] = socket.id;
        lobbies[lobbyID].playersNicks[0] = playerNick;
        socket.join(lobbyID)
        socket.emit('lobbyCreated', {lobbyID: lobbyID, playerID: socket.id})
    })
    socket.on(`joinLobby`, (lobbyID) => {
        if (lobbies[lobbyID]) {
            if (lobbies[lobbyID].players[1] != null) {
                socket.emit('lobbyStack', lobbyID)
            }
            else {
                if (lobbies[lobbyID].players[0] != socket.id) {
                    lobbies[lobbyID].players[1] = socket.id;
                    lobbies[lobbyID].playersNicks[1] = playerNick;
                }
                socket.join(lobbyID);
                io.to(lobbyID).emit('playerJoined', { lobby: lobbies[lobbyID], id: lobbyID })
            }
        } 
        else {
            socket.emit('lobbyNotFound', lobbyID);
        }
    })
    socket.on(`disonnect`, (lobbyID) => {
        if(lobbies[lobbyID].playersNicks[1] !== undefined) {
            io.to(lobbyID).emit('leave', { lobbyID: lobbyID, player: lobbies[lobbyID].playersNicks[1]} )
        }
        lobbies[lobbyID].players[1] = null
        lobbies[lobbyID].playersNicks[1] = null
        socket.leave(lobbyID)
    })
    socket.on(`readyCheck`, (lobbyID, readyCount) => {
        if(readyCount != 1) {
            readyCount++
            io.to(lobbyID).emit(`readyChecker`, { readyCount: readyCount, player: socket.id} )
        }
        else {
            io.to(lobbyID).emit('readyDone')
        }
    })
    socket.on("gameStart", (lobbyID) => {
        io.to(lobbyID).emit('gameStart', { whoMove: lobbies[lobbyID].players[0] })
    })
    socket.on("move", (lobbyID, x, y) => {
        io.to(lobbyID).emit('moveAt', { from: socket.id, x: x, y: y })
    })
    socket.on("attack", (lobbyID, symbol, x, y) => {
        io.to(lobbyID).emit('attackIn', { from: socket.id, damage: symbol, x: x, y: y })
    })
    socket.on("win", (lobbyID, nick) => {
        io.to(lobbyID).emit("win", {winner: nick} )
    })
})

server.listen(3000)