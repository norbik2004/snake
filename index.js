const gameBoard = document.getElementById("gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.getElementById("score");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = true;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX = 0;
let foodY = 0;
let direction = "RIGHT"
let score = 0;
let snake = [
    {x:unitSize*2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];


function drawSnake(){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
}

function paintCanvasWhite(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);
}

function moveSnake(){
        const head = {x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity}
        snake.unshift(head)
        snake.pop()
        paintCanvasWhite()
}

function steering(){
    window.addEventListener("keydown", function(event){
        if(event.key ==="ArrowDown" & direction !="UP"){
            direction = "DOWN"
            xVelocity = 0
            yVelocity = unitSize
        }
        if(event.key ==="ArrowRight" & direction !="LEFT"){
            direction = "RIGHT"
            xVelocity = unitSize
            yVelocity = 0
        }
        if(event.key ==="ArrowLeft" & direction !="RIGHT"){
            direction = "LEFT"
            xVelocity = -unitSize
            yVelocity = 0
        }
        if(event.key ==="ArrowUp" & direction !="DOWN"){
            direction = "UP"
            xVelocity = 0
            yVelocity = -unitSize
        }
    })
}

function checkIfLost(){
    if(snake[0].x == (gameWidth) || snake[0].x == (-unitSize)){
        running = false
    }
    if(snake[0].y == gameHeight || snake[0].y == (-unitSize)){
        running = false
    }
}


function getfoodcords(){
    foodX = Math.floor(Math.random() * 13) * unitSize
    foodY = Math.floor(Math.random() * 13) * unitSize
}
function paintfood(){
    ctx.fillStyle = foodColor
    ctx.fillRect(foodX, foodY, unitSize,unitSize)
    ctx.strokeRect(foodX, foodY, unitSize, unitSize);
}

let foodEaten = false;

function checkIfFoodEaten() {
    if (foodX === snake[0].x && foodY === snake[0].y && !foodEaten) {
        getfoodcords();
        foodEaten = true;
        snake.push({ x: snake[0].x + xVelocity, y: snake[0].y + yVelocity });
        score += 1;
    } else {
        foodEaten = false; 
    }
}

const interval = setInterval(() => {
    checkIfLost();
    checkIfFoodEaten();
    console.log(snake.length, snake)
    if (!running) {
        clearInterval(interval);
        alert("game over!")
    }else{
        moveSnake();
        drawSnake();
        paintfood()
    }
    scoreText.innerText = score
}, 150);
getfoodcords()
steering()