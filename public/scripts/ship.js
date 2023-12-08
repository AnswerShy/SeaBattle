/* 
    Определение корабля, как класс.
    Перенос корабля на поле боя
*/

class shipParams {
    constructor(posX, posY, size, dir, posXLast, posYLast, posYonBattlefield){
        this.posX = posX
        this.posY = posY
        this.size = size
        this.dir  = dir
        this.posXLast = posXLast
        this.posYLast = posYLast
        this.posYonBattlefield = posYonBattlefield
    }
}

function targetToDoc(e, shipToDoc) {
    var posX = parseInt(e.target.getAttribute("x"))
    var posY = parseInt(e.target.getAttribute("y"))
    var size = parseInt(shipToDoc.getAttribute("size"))
    var dir = shipToDoc.getAttribute("direction")
    var posXLast
    var posYLast
    if(dir == "right"){
        posXLast = parseInt(posX + size-1)
        posYLast = parseInt(posY)
    }
    else {
        posXLast = parseInt(posX)
        posYLast = parseInt(posY + size-1)
    }
    var posYonBattlefield = 9 - posY

    shipToDoc.setAttribute("x", posX)
    shipToDoc.setAttribute("y", posY)

    shipInfo[size-1][shipToDoc.getAttribute("number")-1] = new shipParams(posX, posY, size, dir, posXLast, posYLast, posYonBattlefield)
    battlefieldFiller(shipToDoc, posX, posYonBattlefield)
}

function battlefieldFiller(curShip, posX, posY) { 
    if(curShip.getAttribute("isPlaced") == "true" && curShip.getAttribute("x") != null && curShip.getAttribute("y") != null)
    {
        var thisX = parseInt(curShip.getAttribute("x"))
        var thisY = 9 - parseInt(curShip.getAttribute("y"))

        battlefield[thisY][thisX] = null

        for(let s = 1; s <= curShip.getAttribute("size"); s++) {
           if(curShip.getAttribute("direction") == "right"){
               battlefield[thisY][thisX+s] = null
           }
           if(curShip.getAttribute("direction") == "bottom"){
               battlefield[thisY+s][thisX] = null
           }
        }
        curShip.setAttribute("isPlaced", "false")
    }
    else if (posX != null && posY != null)
    {
        battlefield[posY][posX] = "x"   

        for(let s = 1; s < curShip.getAttribute("size"); s++) {
            if(posX+s < 10 && curShip.getAttribute("direction") == "right"){
                battlefield[posY][posX+s] = "x"
            }
            else if(posY+s < 10 && curShip.getAttribute("direction") == "bottom"){
                battlefield[posY+s][posX] = "x"
            }
        }

        curShip.setAttribute("isplaced", true)
    } 
}