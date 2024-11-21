var pedal1;
var pedal2;
var player1pos;
var player2pos;
var playerSpeed = 5;

var ball;
var ballAngle = 0;
var ballPos = [0,0];
var ballSpeed = 5;

let isAI = {1: false, 2: false}

function setAI(playerNumber)
{
    isAI[playerNumber] = document.getElementById("ai-checkbox-" + playerNumber).checked;
    console.warn(isAI[playerNumber]);
}

function start()
{
    pedal1 = document.getElementById("player1");
    pedal2 = document.getElementById("player2");
    ball = document.getElementById("ball");

    pedal1.style.left = 8 + 32;
    pedal1.style.top = 512 / 2 - 128 / 2;
    player1pos = 512 / 2 - 128 / 2;

    pedal2.style.left = 512 - 8 - 32;
    pedal2.style.top = 512 / 2 - 128 / 2;
    player2pos = 512 / 2 - 128 / 2;

    ball.style.top = 512 / 2 - 32 / 2;
    ball.style.left = 512 / 2 - 32 / 2;
    ballPos[0] = 512 / 2 - 32 / 2;
    ballPos[1] = 512 / 2 - 32 / 2;

    ballAngle = Math.round(Math.random()) * Math.PI;

    document.addEventListener('keydown', function(event) {
        if(!isAI[1]){
            if(event.key == "w")
            {
                move(0,1);
            }
            if(event.key == "s")
            {
                move(0,-1);
            }
        }
        if(!isAI[2]){
            if(event.key == "ArrowUp")
            {
                move(1,1);
            }
            if(event.key == "ArrowDown")
            {
                move(1,-1);
            }
        }
    });

    // Browsers can remeber the values of checkboxes, so js needs to check
    setAI(1);
    setAI(2);

    setInterval(update, 1000 / 60);
}


function processAI()
{
    if(isAI[1])
    {
        move(0, -Math.min(Math.max(ballPos[1]-player1pos-64, -1), 1));
    }
    if(isAI[2])
    {
        console.warn(ballPos[1] + " " + player2pos)
        move(1, -Math.min(Math.max(ballPos[1]-player2pos-64, -1), 1));
    }
}

function update()
{
    processAI();

    console.log(ballAngle);
    var oldPos = ballPos.slice();
    ballPos[0] += Math.cos(ballAngle) * ballSpeed;
    ballPos[1] += Math.sin(ballAngle) * ballSpeed;

    //Collider to right
    if(
        (ballAngle < Math.PI / 2 || ballAngle > Math.PI * 1.5) &&
        oldPos[0] > (512 - 8 - 32 - 32) &&
        ballPos[0] >= (512 - 8 - 32 - 32) &&
        ballPos[1] > player2pos &&
        ballPos[1] < player2pos + 128)
    {
        ballAngle = (ballAngle + Math.PI + Math.random() * 0.25 * Math.PI) % (Math.PI * 2);
    }

    //Collider to left
    if(
        ballAngle > Math.PI / 2 &&
        ballAngle < Math.PI * 1.5 &&
        oldPos[0] > (8 + 32 + 4) &&
        ballPos[0] <= (8 + 32 + 4) &&
        ballPos[1] > player1pos &&
        ballPos[1] < player1pos + 128)
    {
        ballAngle = (ballAngle + Math.PI + Math.random() * 0.25 * Math.PI) % (Math.PI * 2);
    }
    
    //Topwall
    

    ball.style.left = ballPos[0];
    ball.style.top = ballPos[1];
}

function move(index,dir)
{
    if(index == 0)
    {
        player1pos -= dir * playerSpeed;
        pedal1.style.top = player1pos;
    }
    if(index == 1)
    {
        player2pos -= dir * playerSpeed;
        pedal2.style.top = player2pos;
    }
}

start();