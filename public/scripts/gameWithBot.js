/*Variables for game with bot*/
var battlefieldPlayerTry = [
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null,null,null],
]



function isGameWBotStart()
{
    if(stepOfGame == 0) {
        randomShipPlaceGenerate("bot")
    }
    if(stepOfGame == 1){
        playerFieldRender("player")
        enemyCount = 0
        playerCount = 0
        isGameContinue = true
    }
}

