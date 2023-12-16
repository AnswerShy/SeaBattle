document.querySelector(`#buttonLB`).addEventListener("click", () => {
    document.querySelector(`.mLeaderBoard`).style.display = "grid"
})

document.querySelector(`#backButtonLB`).addEventListener("click", () => {
    document.querySelector(`.mLeaderBoard`).style.display = "none"
})

document.querySelector("[play=\"bot\"]").addEventListener("click", () => {
    document.querySelector(".madalM").style.display = "none"
    reFiller()
    isGameWBotStart()
    stepOfGame = 0
    gameMode = "bot"
})

//muliplayer buttons on menu
document.querySelector("[play=\"human\"]").addEventListener("click", () => {
    gameMode = "human"
    document.querySelector(".mMultiplayer").style.display = "grid"
    document.querySelector(".mMenu").style.display = "none"
    reFiller()
})

document.querySelector(`#backButtonMulti`).addEventListener("click", () => {
    document.querySelector(".mMenu").style.display = "grid"
    document.querySelector(".mMultiplayer").style.display = "none"
})

let curId;
let curCode;

document.querySelector("#multiplayerNext").addEventListener("click", () => {
    if(getUserNickname()) {
        curId = generateRandomId()
        document.querySelector("#lobbyCode").innerHTML = curId
        socket.emit(`getNick`, p_nickname)
        createLobby(curId)
        joinLobby(curId)
        document.querySelector(".mLobbySearch").style.display = "grid"
        document.querySelector(`.mMultiplayer`).style.display = "none"
    }
    else {
        document.querySelector("#wrongNick").style.display = "grid"
    }
})

document.querySelector("#enterToLobbyAccept").addEventListener("click", () => {
    curCode = document.querySelector("#enterToLobby").value
    if(curCode == ""){
        alert("Invalid lobby code")
    }
    else {
        joinLobby(curCode)
        console.log(curCode)
    }
})

document.querySelector("#backToLobbySearch").addEventListener("click", () => {
    socket.emit(`disonnect`, curCode)
    curId = generateRandomId()
    document.querySelector("#lobbyCode").innerHTML = curId
    socket.emit(`getNick`, p_nickname)
    createLobby(curId)
    joinLobby(curId)
    document.querySelector("#startLobbyGame").style.display = "grid"
    document.querySelector(".mLobbySearch").style.display = "grid"
})

document.querySelector("#startLobbyGame").addEventListener("click", () => {
    socket.emit("gameStart", curId)
})