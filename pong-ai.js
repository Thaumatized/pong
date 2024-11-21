function processAI(ballPos, padlePos)
{
    return Math.min(Math.max(ballPos-padlePos, -1), 1);
}

let isAI = {1: false, 2: false}

function setAI(playerNumber)
{
    isAI[playerNumber] = document.getElementById("ai-checkbox-" + playerNumber).checked;
    console.warn(isAI[playerNumber]);
}