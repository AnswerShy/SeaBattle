let stepOfGame = 0 //Визначення етапу гри
var gameMode //Визначення ігрового режиму
var playerGenerateChecker = false //Визначення, чи не генерується поле грацвя в поточний час
var playerGenerateIs = false //Визначення, згенеровано поле гравця чи ні
var enemyCount = 0 //Визначення рахунку противника
var playerCount = 0 //Визначення рахунку гравця
var isGameContinue = false
var readyCount = 0
var isPlayerMove = false
var urReady = false

function randomShipPlaceGenerate(player) {
    for(let size = 4; size > -1; size--){
        for(let num = 4; num > -1; num--){
            if(shipInfo[size] && shipInfo[size][num] !== undefined){
                var end = false
                while(!end){
                    var posX = parseInt(Math.random() * 10) 
                    var posY = parseInt(Math.random() * 10)
                    var posXLast
                    var posYLast
                    var dir = parseInt(Math.random() * 2) //0 - right, 1 - bottom
                    dir = 0
                    if(dir == 0){
                        posXLast = parseInt(posX + size)
                        posYLast = parseInt(posY)
                    }
                    else {
                        posXLast = parseInt(posX)
                        posYLast = parseInt(posY + size)
                    }
                    var integ = "x"
                    if(player != "bot" && canIPlace(posX, posY, "playerGenerate", size, dir)) {
                        shipInfo[size][num] = new shipParams(posX, posY, size, dir, posXLast, posYLast, null)
                        end = true
                        battlefield[posY][posX] = integ
                        for(let s = 1; s <= size; s++) {
                            if(posX+s < 10 && dir == 0){
                                battlefield[posY][posX+s] = integ
                            }
                            else if(posY-s >= 0 && dir == 1){
                                battlefield[posY-s][posX] = integ
                            }
                        }
                        playerGenerateChecker = true
                    }
                    else if(player == "bot" && canIPlace(posX, posY, "bot", size, dir)){
                        shipInfoEnemy[size][num] = new shipParams(posX, posY, size, dir, posXLast, posYLast, null)
                        end = true
                        battlefieldEnemy[posY][posX] = integ
                        for(let s = 1; s <= size; s++) {
                            if(posX+s < 10 && dir == 0){
                                battlefieldEnemy[posY][posX+s] = integ
                            }
                            else if(posY-s >= 0 && dir == 1){
                                battlefieldEnemy[posY-s][posX] = integ
                            }
                        }
                    }
                    else {end = false}
                }
            }
            if (player != "bot") {
                playerFieldRender("player")
            }
        }
    }
    
    if (playerGenerateChecker == true) {
        playerGenerateIs = true
    }
    else {
        playerGenerateIs = false
    }
}
function canIPlace(e, curShip, player, size, dir) {
    if(player == "bot") {
        var x = parseInt(e)
        var y = parseInt(curShip)
        size++
        if(dir == 0){
            if(x+size > 10) {
                return false
            }
            for(var i = -1; i < size+1; i++)
            {
                if(y-1 < 0) {
                    if(battlefieldEnemy[y+1][x+i] != null || battlefieldEnemy[y][x+i] != null){
                        return false
                    } 
                }
                if(y+1 > 9) {
                    if(battlefieldEnemy[y-1][x+i] != null || battlefieldEnemy[y][x+i] != null){
                        return false
                    }
                }
                if(y-1 >= 0 && y+1 < 10) {
                    if(battlefieldEnemy[y-1][x+i] != null || battlefieldEnemy[y][x+i] != null || battlefieldEnemy[y+1][x+i] != null){
                        return false
                    }
                }
            }
        }
        else if(dir == 1) {
            if(y-size < 0) {
                return false
            }
            for(var i = -1; i < size+1; i++)
            {
                if(battlefieldEnemy[y][x] != null) {
                    return false
                }
                else if(battlefieldEnemy[y-i] !== undefined){
                    if(battlefieldEnemy[y-i][x-1] !== undefined && battlefieldEnemy[y-i][x-1] != null) {
                        return false
                    }
                    else if(battlefieldEnemy[y-i][x+1] !== undefined && battlefieldEnemy[y-i][x+1] != null) {
                        return false
                    }
                    else if (battlefieldEnemy[y-i][x] != null) {
                        return false
                    }
                }
            }
        }
        return true
        
    }
    else if(player == "playerGenerate" && !playerGenerateIs)
    {
        var ship = document.querySelectorAll(".ship")
        ship.forEach((elem) => {
            elem.style.display = "none"
        })
        var x = parseInt(e)
        var y = parseInt(curShip)
        size++
        
        if(dir == 0){
            if(x+size > 10) {
                return false
            }
            for(var i = -1; i < size+1; i++)
            {
                if(y-1 < 0) {
                    if(battlefield[y+1][x+i] != null || battlefield[y][x+i] != null){
                        return false
                    } 
                }
                if(y+1 > 9) {
                    if(battlefield[y-1][x+i] != null || battlefield[y][x+i] != null){
                        return false
                    }
                }
                if(y-1 >= 0 && y+1 < 10) {
                    if(battlefield[y-1][x+i] != null || battlefield[y][x+i] != null || battlefield[y+1][x+i] != null){
                        return false
                    }
                }
            }
        }
        else if(dir == 1) {
            for(var i = -1; i < size+1; i++)
            {
                if(y-size < 0) {
                    return false
                }
                else if(battlefield[y][x] != null) {
                    return false
                }
                else if(battlefield[y-i] !== undefined){
                    if(battlefield[y-i][x-1] !== undefined && battlefield[y-i][x-1] != null) {
                        return false
                    }
                    else if(battlefield[y-i][x+1] !== undefined && battlefield[y-i][x+1] != null) {
                        return false
                    }
                    else if (battlefield[y-i][x] != null) {
                        return false
                    }
                }
            }
            
        }
        return true
        
    }
    else { 
        var x = parseInt(e.target.getAttribute("x"))
        var y = 9 - parseInt(e.target.getAttribute("y"))

        var size = parseInt(curShip.getAttribute("size"))

        if(curShip.getAttribute("direction") == "right"){
            if(x+size > 10) {
                return false
            }
            for(var i = -1; i < size+1; i++)
            {
                if(y-1 < 0) {
                    if(battlefield[y+1][x+i] != null || battlefield[y][x+i] != null){
                        return false
                    } 
                }
                if(y+1 > 9) {
                    if(battlefield[y-1][x+i] != null || battlefield[y][x+i] != null){
                        return false
                    }
                }
                if(y-1 >= 0 && y+1 < 10) {
                    if(battlefield[y-1][x+i] != null || battlefield[y][x+i] != null || battlefield[y+1][x+i] != null){
                        return false
                    }
                }
            }
            return true
        }
        else if(curShip.getAttribute("direction") == "bottom") {
            for(var i = -1; i <= size; i++)
            {
                if(y+size > 10 && x+1 > 9){
                    return false
                }
                if(battlefield[y][x] != null) {
                    return false
                }
                if (y+i < 10 && x-1 > -1 && x+1 < 10){
                    if(battlefield[y+i][x] != null || battlefield[y+i][x+1] != null || battlefield[y+i][x-1] != null) {
                        return false
                    }
                }
            }
            return true
        }
    }
}
document.getElementById("generatePlayerField").addEventListener('click', randomShipPlaceGenerate)
document.querySelector("#startButton").addEventListener('click', () => {
    if(startButton()){
        document.querySelector("#startButton").style.display = "none"
        stepOfGame = 1
        if (gameMode == "bot") {
            isGameWBotStart()
        }
    }
})
function startButton() {
    var countSS = 0
    shipInfo.forEach((element) => {
        element.forEach((cli) => {
            if (cli != null){
                countSS++
            }
        })
    })
    if(countSS == 10 && stepOfGame == 0) {
        var ship = document.querySelectorAll(".ship")
        ship.forEach((elem) => {
            elem.style.display = "none"
        })
        playerFieldRender("player")
        readyField("player")
        if(gameMode == "human") {
            socket.emit(`readyCheck`, curId, readyCount)
        }
        urReady = true
        return true
    }
    else if(!urReady) {
        alert("There is not all ships on field")
        return false
    }
    else {
        alert("Not all players ready")
    }
}
function gameEnd() {
    if(playerCount == 20) {
        stepOfGame = 3
        playerFieldRender("enemy")
        alert("You win")
        if(gameMode == "human") {
            socket.emit("win", curId, p_nickname)
        }
        document.querySelector("#startButton").style.display = "block"
        document.querySelector(".madalM").style.display = "flex"
    }
    else if(enemyCount == 20) {
        stepOfGame = 3
        playerFieldRender("enemy")
        alert("You lose")
        document.querySelector("#startButton").style.display = "block"
        document.querySelector(".madalM").style.display = "flex"
    }
}
document.querySelector("[player=enemy]").addEventListener("click", (e)=> {
    if (e.target.tagName == "TD") {
        if(isGameContinue && stepOfGame == 1 && gameMode == "bot") {
            var eX = e.target.getAttribute("x")
            var eY = e.target.getAttribute("y")
            let td = document.querySelector(`[player="enemy"]`).querySelector(`[x="${eX}"][y="${eY}"]`)

            if(td.innerHTML == "x" || td.innerHTML == "o") {}
            else if(battlefieldEnemy[eY][eX] == "x") {
                td.innerHTML = "x"
                td.classList += "enemyShiped damaged"
                playerCount++
                randomAttack()
                gameEnd()
            }
            else {
                td.innerHTML = "o"
                randomAttack()
                gameEnd()
            } 
        }
        else if (gameMode == "human"){
            var eX = e.target.getAttribute("x")
            var eY = e.target.getAttribute("y")
            if(!isPlayerMove && battlefieldEnemy[eY][eX] == null) {
                battlefieldEnemy[eY][eX] = "o"
                socket.emit("move", curId, eX, eY)
                isPlayerMove = false
                playerMove()
            }
            gameEnd()
        }
    }
})
function randomAttack(){
    var isGoing = true
    while(isGoing) {
        var posX = parseInt(Math.random() * 10) 
        var posY = parseInt(Math.random() * 10)

        var td = document.querySelector(`[player="player"]`).querySelector(`[x="${posX}"][y="${posY}"]`)

        if(battlefieldPlayerTry[9-posY][posX] == null) {
            if(battlefield[9-posY][posX] == "x") {
                td.innerHTML = "x"
                td.classList += " damaged"
                battlefieldPlayerTry[9-posY][posX] = "x"
                enemyCount++
            }
            else {
                td.innerHTML = "o"
                battlefieldPlayerTry[9-posY][posX] = "0"
            }
            isGoing = false
        }
    }
}
function playerMove() {
    if(isPlayerMove) {
        document.querySelector(`[player="enemy"]`).classList = "field"
        document.querySelector(`[player="player"]`).classList = "field ismove"
    }
    else {
        document.querySelector(`[player="enemy"]`).classList = "field ismove"
        document.querySelector(`[player="player"]`).classList = "field"
    }
}
function reFiller() {
    for(let y = 0; y < 10; y++){
        for(let x = 0; x < 10; x++){
            battlefield[9-y][x] = null
            battlefieldEnemy[y][x] = null
        }
    }
    for(let size = 4; size > -1; size--){
        for(let num = 4; num > -1; num--){
            if(shipInfo[size] && shipInfo[size][num] !== undefined) {
                shipInfo[size][num] = null
            }
        }
    }
    playerFieldRender("player")
    playerFieldRender("enemy")
}