var ship = document.querySelectorAll(".ship")
var curShip;

if (stepOfGame == 0) {
    ship.forEach((div) =>{
        div.addEventListener("click", (e) =>{
            if (curShip == null) 
            {
                whereCanIPlaceIt(true)
                curShip = e.target
                curShip.className += " selectedShip"
                placeTargetOnField()
            }
            else if (e.target.className.match(" selectedShip")) 
            {
                curShip.className = curShip.className.replace(" selectedShip", "")
                curShip = null
            }        
        })

        div.addEventListener('dblclick', (e) => { //Переворот корабля
            
            var h = getComputedStyle(e.target).height
            var w = getComputedStyle(e.target).width

            var xCoord = e.target.getAttribute("x")
            var yCoord = e.target.getAttribute("y")

            function rotate(direction) {
                for(let size = 0; size < 4; size++) {
                    for(let num = 0; num < 4; num++) {
                        if(shipInfo[size][num] != null) {
                            if(shipInfo[size][num].posX == xCoord && shipInfo[size][num].posY == yCoord) {
                                shipInfo[size][num].dir = direction
                            }
                        }
                    }
                }
            }

            if (e.target.getAttribute('direction') == "right") 
            {
                e.target.setAttribute('direction', "bottom")

                e.target.style.height = w
                e.target.style.width = h

                rotate("bottom")

                if (e.target.className.match(" selectedShip")) {e.target.className = e.target.className.replace(" selectedShip", ""); curShip = null} 


            }
            else 
            {
                e.target.setAttribute('direction', "right")

                e.target.style.width = h
                e.target.style.height = w

                rotate("right")

                if (e.target.className.match(" selectedShip")) {e.target.className = e.target.className.replace(" selectedShip", ""); curShip = null} 
            }
        })
    })
}
function whereCanIPlaceIt(isWork) {
    if (isWork == true) {
        for(let size = 3; size >= 0; size--) {
            for(let number = 3; number >= 0; number--) {
                if(shipInfo[size][number] != null) {
                    var regionX = parseInt(shipInfo[size][number].posX)
                    var regionY = parseInt(shipInfo[size][number].posY)
                    var regionDir = shipInfo[size][number].dir
                    var regionSize = parseInt(shipInfo[size][number].size)

                    for(let x = -1; x <= regionSize; x++) {
                        for(let y = -1; y <= 1; y++){
                            if (regionDir == "right") {
                                if (regionX + x >= 10 || regionY + y >= 10 || regionX + x < 0 || regionY + y < 0) {}
                                else {
                                    document.querySelector(`[x="${regionX + x}"][y="${regionY + y}"]`).className = "wrongPlace"
                                }
                            }
                            else {
                                if (regionY - x >= 10 || regionX + y >= 10 || regionX + y < 0 || regionY - x < 0) {}
                                else {
                                    document.querySelector(`[x="${regionX + y}"][y="${regionY - x}"]`).className = "wrongPlace"
                                }
                            }
                        }
                    } 
                }
                else {
                }
            }
        }
    }
    else {
        document.querySelectorAll("td").forEach ((td) => {
            td.removeAttribute("class")
        })
    }
}

function placeTargetOnField() {
    document.querySelector("[player=player]").addEventListener("click", (e)=> {
        if (e.target.tagName == "TD") {
            if (curShip != null){
                if (canIPlace(e, curShip) == true) {
                    if (parseInt(e.target.getAttribute("x")) + parseInt(curShip.getAttribute("size")) > 10 && curShip.getAttribute("direction") == "right"){}
                    else if (parseInt(e.target.getAttribute("y")) - parseInt(curShip.getAttribute("size")) < 0 && curShip.getAttribute("direction") == "bottom"){}
                    else {
                        if(curShip.className.match(" onMapShip")) { console.log("currently on map") }
                        else { curShip.className += " onMapShip" }
                        curShip.className = curShip.className.replace(" selectedShip", "")
                        curShip.setAttribute("isplaced", true)
                        targetToDoc(e, curShip)
                        e.target.append(curShip)

                        whereCanIPlaceIt(false)
                        curShip = null 
                    }
                }
            }            
        }
    })
}



function canIPlace(e, curShip) {
     var x = parseInt(e.target.getAttribute("x"))
     var y = 9 - parseInt(e.target.getAttribute("y"))

     var size = parseInt(curShip.getAttribute("size"))

     if(curShip.getAttribute("direction") == "right"){
         for(var i = 0; i <= size; i++){
             if(y-1 != -1 && y+1 < 10) {
                 if(battlefield[y+1][x-1] != null || battlefield[y][x-1] != null  || battlefield[y-1][x-1] != null) {
                     return false
                 }
                 else if(battlefield[y+1][x+i] != null || battlefield[y][x+i] != null  || battlefield[y-1][x+i] != null) {
                     return false
                 }
             }
         }
         return true
     }
     else if(curShip.getAttribute("direction") == "bottom") {
         for(var i = 0; i <= size; i++){
             if(x+1 < 10 && y+i < 10 && x-1 >= 0 && y-1 >= 0) {  

                 if(battlefield[y+i][x-1] != null || battlefield[y+i][x] != null  || battlefield[y+i][x+1] != null) {
                     return false
                 }
             }
         }
         return true
     }

}