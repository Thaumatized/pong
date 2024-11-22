var pedal1;
var pedal2;
var player1pos;
var player2pos;
var playerSpeed = 5;

var ball;
var ballAngle = 0;
var ballPos = [0,0];
var ballSpeed = 5;

var keys = [0,0];
let isAI = [false,false]

const PEDAL_MAX_ANGLE = Math.PI / 4;

function setAI(playerNumber)
{
    isAI[playerNumber] = document.getElementById("ai-checkbox-" + playerNumber).checked;
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

    resetBall();
    document.addEventListener('keydown', function(event) {
        if(event.key == "w")
        {
            keys[0] = 1;
        }
        else if(event.key == "s")
        {
            keys[0] = -1;
        }
        if(event.key == "ArrowUp")
        {
            keys[1] = 1;
        }
        else if(event.key == "ArrowDown")
        {
            keys[1] = -1;
        }
    });
    document.addEventListener('keyup', function(event) {
        if(event.key == "w")
        {
            keys[0] = 0;
        }
        if(event.key == "s")
        {
            keys[0] = 0;
        }
        if(event.key == "ArrowUp")
        {
            keys[1] = 0;
        }
        if(event.key == "ArrowDown")
        {
            keys[1] = 0;
        }
    });

    // Browsers can remeber the values of checkboxes, so js needs to check
    setAI(0);
    setAI(1);

    setInterval(update, 1000 / 60);
}

function horizontalFlip(angle) { return (Math.PI - angle) }

function verticalFlip(angle) { return (2*Math.PI - angle) }

function processAI()
{
    if(isAI[0])
    {
        move(0, -Math.min(Math.max(ballPos[1]-player1pos-64, -1), 1));
    }
    if(isAI[1])
    {
        move(1, -Math.min(Math.max(ballPos[1]-player2pos-64, -1), 1));
    }
}

function update()
{
    if(!isAI[0])
    {
        move(0,keys[0]);
    }
    if(!isAI[1])
    {
        move(1,keys[1]);
    }

    processAI();

    var oldPos = ballPos.slice();
    ballPos[0] += Math.cos(ballAngle) * ballSpeed;
    ballPos[1] += Math.sin(ballAngle) * ballSpeed;

    //Collider to left
    if(
        oldPos[0] > (8 + 32 + 4) &&
        ballPos[0] <= (8 + 32 + 4) &&
        ballPos[1] > player1pos &&
        ballPos[1] < player1pos + 128)
    {
        ballAngle = horizontalFlip(ballAngle);

        ballAngle += ((player1pos - ballPos[1] - 16)/64 + 1) * PEDAL_MAX_ANGLE;
    }

    //Collider to right
    if(
        oldPos[0] < (512 - 8 - 32 - 32) &&
        ballPos[0] >= (512 - 8 - 32 - 32) &&
        ballPos[1] > player2pos &&
        ballPos[1] < player2pos + 128 - 32)
    {
        ballAngle = horizontalFlip(ballAngle);
        ballAngle -= ((player2pos - ballPos[1] - 16)/64 + 1)* PEDAL_MAX_ANGLE;
    }
    
    //Topwall   y angle is flipped
    if(oldPos[1] > 0 && ballPos[1] <= 0)
    {
        ballAngle = verticalFlip(ballAngle);
    }

    //Bottom
    if(oldPos[1] < 512 - 32 && ballPos[1] > 512 - 32)
    {
        ballAngle = verticalFlip(ballAngle);
    }

    ball.style.left = ballPos[0];
    ball.style.top = ballPos[1];

    if(ballPos[0] < 0)
    {
        console.log("Player 2 won!");
        resetBall();
    }
    if(ballPos[0] > 512)
    {
        console.log("Player 1 won!");
        resetBall();
    }
}

function resetBall()
{
    ballPos[0] = 512 / 2 - 32 / 2;
    ballPos[1] = 512 / 2 - 32 / 2;
    ball.style.top = ballPos[1];
    ball.style.left = ballPos[0];
    ballAngle = Math.round(Math.random()) * Math.PI;
}

function move(index,dir)
{
    if(index == 0)
    {
        player1pos -= dir * playerSpeed;
        if(player1pos < 0)
        {
            player1pos = 0;
        }
        if(player1pos > 512 - 128)
        {
            player1pos = 512 - 128;
        }
        pedal1.style.top = player1pos;
    }
    if(index == 1)
    {
        player2pos -= dir * playerSpeed;
        if(player2pos < 0)
        {
            player2pos = 0;
        }
        if(player2pos > 512 - 128)
        {
            player2pos = 512 - 128;
        }
        pedal2.style.top = player2pos;
    }
}

start();