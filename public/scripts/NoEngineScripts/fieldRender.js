/*
    Самое первое, что прогружается на экране, при выборе режима игры.
    Отображение на экране всех частей интерфейса, которые должны присувствовать при игре.
*/
function generate(player, isGenerated) { 
    let main = document.body.querySelector(`[player="${player}"]`)
    var html = `<table>`
    for (let y = 9; y >= 0; y--) {
        html += `<tr>`
        for(let x = 0; x < 10; x++) {
            html += `<td x=${x} y=${y}></td>`  
        }
        html += `</tr>`
    }
    html += `</table></div>`
    main.innerHTML += html    
}

function shipGenerate() {
    let main = document.querySelector('.arsenal')
    for (let i = 4; i > 0; i--) 
    {
        main.innerHTML += `<div class="ship" size="1" number="${i}"  direction="right" isplaced=false></div>`
    }
    for (let i = 3; i > 0; i--) 
    {
        main.innerHTML += `<div class="ship row-2" size="2" number="${i}" direction="right" isplaced=false></div>`
    }
    for (let i = 2; i > 0; i--) 
    {
        main.innerHTML += `<div class="ship row-3" size="3" number="${i}" direction="right" isplaced=false></div>`
    }
    main.innerHTML += `<div class="ship row-4" size="4" number="1" direction="right" isplaced=false></div>`
}

generate("player")
generate("enemy")
shipGenerate()

function playerFieldRender(player) {
    for(let y = 0; y < 10; y++){
        for(let x = 0; x < 10; x++){
            if (player == "player") {
                if(battlefield[9-y][x] == "x") {
                    document.querySelector(`[player="player"]`).querySelector(`td[x="${x}"][y="${y}"]`).classList = "shiped"
                }
            }
            else if(player == "enemy") {
                if(battlefieldEnemy[y][x] == "x") {
                    document.querySelector(`[player="enemy"]`).querySelector(`td[x="${x}"][y="${y}"]`).classList = "shiped"
                }
            }
        }
    }
}

