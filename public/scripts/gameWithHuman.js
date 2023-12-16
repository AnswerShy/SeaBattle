let p_nickname;
let p_id;
let enemyId;
let enemyNickname;
const socket = io();
const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

function generateRandomId() {
  let text = "";
  for(let i = 0; i < 5; i++)  {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
function getUserNickname() {
    if(document.querySelector("#playerName").value == ""){
      console.log("false")
      return false
    }
    else{
      p_nickname = String(document.querySelector("#playerName").value)
      return true
    } 
}
function createLobby(lobbyId) {
  socket.emit('createLobby', lobbyId);
}
function joinLobby(lobbyId, p_nickname) {
  socket.emit('joinLobby', lobbyId, p_nickname);
}

//Server dialog

socket.on('lobbyCreated', (data) => {
  p_id = data.playerID
  console.log(`Lobby created: ${data.lobbyID}`);
});
socket.on('lobbyNotFound', (lobbyId) => {
  alert(`Lobby not found: ${lobbyId} `)
});
socket.on(`leave`, (data) => {
  document.querySelector(".mLobbySearch").style.display = "grid"
  document.querySelector(".mLobby").style.display = "none"
  alert(`User ${data.player} disconnected from your server(${data.lobbyID})`)
});
socket.on('lobbyStack', (data) => {
  alert(`Lobby ${data} is full`)
});
socket.on('playerJoined', (data) => {
  curId = data.id
  if(data.lobby.playersNicks[1] != null) {
    if(data.lobby.playersNicks[0] == p_nickname) {
      document.querySelector("#startLobbyGame").style.display = "grid"
    }
    document.querySelector(".mLobbySearch").style.display = "none"
    document.querySelector(".mLobby").style.display = "grid"
    document.querySelector("#playerList").innerHTML = `${data.lobby.playersNicks[0]} vs ${data.lobby.playersNicks[1]}` 
  }
  else {
    document.querySelector("#playerList").innerHTML = `${p_nickname} is waiting for enemy...` 
  }
});
socket.on(`readyChecker`, (data) => {
  readyCount = data.readyCount
  if(p_id == data.player) {
    readyField("0")
  }
  else {
    readyField("1")
  }
  alert("not all players ready")
});
socket.on('readyDone', (data) => {
  playerFieldRender("player")
  playerFieldRender("human")
  gameWHumanStart()
});
socket.on('gameStart', (data) => {
  document.querySelector(".madalM").style.display = "none"
  console.log(data.whoMove)
  if(data.whoMove == p_nickname) {
    isPlayerMove = true
  }
  else {
    isPlayerMove = false
  }
});
socket.on("moveAt", (data) => {
  if(data.from != p_id) {
    if(battlefield[9-data.y][data.x] == "x") {
      socket.emit("attack", curId, "x", data.x, data.y)
    }
    else {
      socket.emit("attack", curId, "o", data.x, data.y)
    }
  }
})
socket.on("attackIn", (data) => {
  if(data.from != p_id) {
    document.querySelector(`[player="enemy"]`).querySelector(`[x="${data.x}"][y="${data.y}"]`).innerHTML = data.damage
    if(data.damage == "x") {
      playerCount++
    }
    isPlayerMove = true
    playerMove()
  }
  else {
    document.querySelector(`[player="player"]`).querySelector(`[x="${data.x}"][y="${data.y}"]`).innerHTML = data.damage
    if(data.damage == "x") {
      enemyCount++
    }
    isPlayerMove = false
    playerMove()
  }
  gameEnd()
})
socket.on("win", (data) => {
  alert(`${data.winner} is win`)
  document.querySelector(".menu").style.display = "grid"
  document.querySelector(".madalM").style.display = "grid"
})
function gameWHumanStart() {
  document.querySelector(".menu").style.display = "none"
  playerFieldRender("player")
  playerMove()
  stepOfGame = 1
  isGameContinue = true
}