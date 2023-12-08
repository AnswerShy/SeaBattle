var battlefield = [
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

const shipInfo = [
    [null,null,null,null],
    [null,null,null],
    [null,null],
    [null]
]


let count = 0
shipInfo.forEach((x) => {
    if (x != null) {
        count++
    }
    else {
        return false
    }
})
if (count == 10) {
    document.getElementById("startButton").classList = "display: block;"
    stepOfGame++
}
