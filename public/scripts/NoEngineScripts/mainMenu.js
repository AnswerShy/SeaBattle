document.querySelector(`#buttonLB`).addEventListener("click", () => {
    document.querySelector(`.mLeaderBoard`).style.display = "grid"
})

document.querySelector(`#backButtonLB`).addEventListener("click", () => {
    document.querySelector(`.mLeaderBoard`).style.display = "none"
})

document.querySelector("[play=\"bot\"]").addEventListener("click", () => {
    document.querySelector(".madalM").style.display = "none"
    isGameWBotStart()
    stepOfGame = 0
    gameMode = "bot"
})