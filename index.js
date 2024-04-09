const gameBoard = document.getElementById("gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.getElementById("score");
const buttonReset = document.getElementById("resetButton")
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "lightyellow";
const snakeColor = "green";
const snakeBorder = "black";
const unitSize = 25;
let running = false;
let foodEaten = false;
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


// textures
const snakeHeadPaths = {
    "UP": "snake_textures/snake_head_top.png",
    "DOWN": "snake_textures/snake_head_bottom.png",
    "LEFT": "snake_textures/snake_head_left.png",
    "RIGHT": "snake_textures/snake_head_right.png"
};

const snakeHeads = {};
Object.keys(snakeHeadPaths).forEach((direction) => {
    const img = new Image();
    img.src = snakeHeadPaths[direction];
    snakeHeads[direction] = img;
});

function drawSnakeHead(direction, x, y) {
    ctx.drawImage(snakeHeads[direction], x, y, unitSize, unitSize);
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

function drawSnake() {
    const body_light = new Image()
    const body_dark = new Image()
    body_light.src = "snake_textures/snake_body_light.png"
    body_dark.src = "snake_textures/snake_body_dark.png"
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach((snakePart, index) => {
        if (index === 0) {
            drawSnakeHead(direction, snakePart.x, snakePart.y);
        } else {
            if (index % 2 == 0){
                ctx.drawImage(body_light, snakePart.x, snakePart.y, unitSize, unitSize)
            }else{
                ctx.drawImage(body_dark, snakePart.x, snakePart.y, unitSize, unitSize)
            }
        }
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });
}

function checkIfLost() {
    for (var i = snake.length - 1; i > 0; i--) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            running = false;
            direction = "RIGHT"
        }
    }
    if (snake[0].x == gameWidth || snake[0].x == -unitSize) {
        running = false;
        direction = "RIGHT"
    }
    if (snake[0].y == gameHeight || snake[0].y == -unitSize) {
        running = false;
        direction = "RIGHT"
    }
}
function steering() {
    window.addEventListener("keydown", function(event) {
        if ((event.key === "ArrowDown" || event.key === "s") && direction != "UP") {
            direction = "DOWN";
            xVelocity = 0;
            yVelocity = unitSize;
        }
        if ((event.key === "ArrowRight" || event.key === "d") && direction != "LEFT") {
            direction = "RIGHT";
            xVelocity = unitSize;
            yVelocity = 0;
        }
        if ((event.key === "ArrowLeft" || event.key === "a") && direction != "RIGHT") {
            direction = "LEFT";
            xVelocity = -unitSize;
            yVelocity = 0;
        }
        if ((event.key === "ArrowUp" || event.key === "w") && direction != "DOWN") {
            direction = "UP";
            xVelocity = 0;
            yVelocity = -unitSize;
        }
        if (event.key === "r") {
            restartGame();
            direction = "RIGHT"
        }
    });
}


function getfoodcords(){
        foodX = Math.floor(Math.random() * 20)  * unitSize
        foodY = Math.floor(Math.random() * 20) * unitSize
}

function paintFood(){
    const imgapple = new Image()
    imgapple.src = "snake_textures/food_texture.png"
    ctx.drawImage(imgapple, foodX, foodY, unitSize, unitSize);
}

function restartGame(){
    clearInterval(interval);
    snake = [
        {x: unitSize * 2, y: 0},
        {x: unitSize, y: 0},
        {x: 0, y: 0}
    ];
    score = 0;
    running = true;
    xVelocity = unitSize;
    yVelocity = 0;
    scoreText.innerText = score
    startInterval();
}

function checkIfFoodEaten() {
    if (foodX === snake[0].x && foodY === snake[0].y && !foodEaten) {
        getfoodcords();
        snake.forEach(snakePart => {
            while(snakePart.x == foodX & snakePart.y == foodY){
                getfoodcords();
                console.log("food-changed")
            }
        })
        foodEaten = true;
        snake.push({ x: snake[0].x + xVelocity, y: snake[0].y + yVelocity });
        score += 1;
        scoreText.innerText = score
    } else {
        foodEaten = false; 
    }
}

const startInterval = () => {
    interval = setInterval(() => {
        steering()
        moveSnake();
        checkIfLost();
        checkIfFoodEaten();
        if (!running) {
            clearInterval(interval);
            direction = "RIGHT"
            ctx.drawImage(backboardimg,0, 0, gameBoard.width, gameBoard.height);
            scoreText.innerText = 0
        } else {
            drawSnake();
            paintFood();
        }
    }, 125);
};

startInterval();
getfoodcords()
buttonReset.addEventListener("click", () => {
    restartGame();
});


const backboardimg = new Image()
backboardimg.src = "snake_textures/back_board_texture.png"
ctx.drawImage(backboardimg,0, 0, gameBoard.width, gameBoard.height);