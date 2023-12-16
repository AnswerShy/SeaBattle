$(document).ready(() => {
    var json = 'scripts/NoEngineScripts/leaderboard.json'
    $.getJSON(json, function(data){
        for(let i = 0; i < data.length; i++){
            document.getElementById("leaderboard").innerHTML += `${data[i].nickname}: ${data[i].wins}`
        }
    })
})