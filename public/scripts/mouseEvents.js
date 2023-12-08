var ship = document.querySelectorAll(".ship")
var curShip;

if (stepOfGame == 0) {
    ship.forEach((div) =>{
        div.addEventListener("click", (e) =>{
            if(curShip == null) {
                curShip = e.target
                battlefieldFiller(e.target)
                curShip.className += " selectedShip"
                placeTargetOnField()
                whereCanIPlaceIt(true)
            }
            else if (e.target.className.match(" selectedShip")) 
            {
                curShip.className = curShip.className.replace(" selectedShip", "")
                curShip = null
            }
        })

        div.addEventListener('dblclick', (e) => {
            
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
                if (canIPlace(e, curShip, "player")) {
                    if(curShip.className.match(" onMapShip")) { console.log("currently on map") }
                    else { curShip.className += " onMapShip" }
                    curShip.className = curShip.className.replace(" selectedShip", "")
                    targetToDoc(e, curShip)
                    e.target.append(curShip)
                    whereCanIPlaceIt(false)
                    curShip = null 
                }
            }            
        }
    })
}

// function shipInfoDetector(posX, posY){
//     for(let s = 0; s <= 3; s++){
//         for(let n = 0; n <= 4; n++){
//             if(shipInfo[s][n] != null){
//                 if(shipInfo[s][n].posX == posX && shipInfo[s][n].posY == posY){
//                     return shipInfo[s][n]
//                 }
//             }
//         }
//     }    
// }

// function debugCollision(dir, x, y, i){
//     if (dir == "right"){
//         console.clear()
//         console.log(y, x)

//         console.log(battlefield[y+1][x-i] != null, battlefield[y+1][x-i])
//         console.log(battlefield[y]  [x-i] != null, battlefield[y][x-i])
//         console.log(battlefield[y-1][x-i] != null, battlefield[y-1][x-i])
//         console.log("--------------------------------------------------")
//         console.log(battlefield[y+1][x+i] != null, battlefield[y+1][x+i])
//         console.log(battlefield[y]  [x+i] != null, battlefield[y][x+i])
//         console.log(battlefield[y-1][x+i] != null, battlefield[y-1][x+i])
//     }
//     else {
//         console.clear()
//         console.log(y, x, i)

//         console.log(battlefield[y+i][x-1] != null, battlefield[y+1][x+i])
//         console.log(battlefield[y+i][x] != null, battlefield[y][x+i])
//         console.log(battlefield[y+i][x+i] != null, battlefield[y-1][x+i])
//     }
    
// }