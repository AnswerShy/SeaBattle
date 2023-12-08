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

var isGameContinue = true

function isGameWBotStart()
{
    if(stepOfGame == 0) {
        randomShipPlaceGenerate("bot")
        
    }
    if(stepOfGame == 1){
        botCount = 0
        playerCount = 0
        isPlayerMove = true
        isGameContinue = true
    }
}

