// all the variables

let inputDir = {x:0, y:0};
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let speed = 3;
let lastPaintTime = 0;
let snakeArr = [
    {x:13, y:15}
]
let score = 0;

let food = {x: 5, y:5};

let board = document.querySelector('#board');

let upButton = document.querySelector('#upButton')
let leftButton = document.querySelector('#leftButton')
let rightButton = document.querySelector('#rightButton')
let downButton = document.querySelector('#downButton')
let scoreSpan = document.querySelector('#score')

scoreSpan.innerHTML = score;


musicSound.play()

// helper game function
function main(ctime)
{
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime - lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


function isCollide(snakeArr)
{
    for(let i=1;i<snakeArr.length;i++){
        if((snakeArr[0].x + inputDir.x) === snakeArr[i].x && (snakeArr[0].y + inputDir.y) === snakeArr[i].y)
        {
            return true
        }
    }
    if(snakeArr[0].x <= 0 || snakeArr[0].x >= 18)
    {
        return true;
    }

    if(snakeArr[0].y <= 0 || snakeArr[0].y >= 18)
    {
        return true;
    }


    return false;
}

function gameEngine()
{
    //////////////////// update snake

    // -> if collide
    if(isCollide(snakeArr))
    {
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0, y:0};
        alert("Game Over");
        snakeArr = [
            {x:13, y:15}
        ]
        // musicSound.play();
        score = 0;
        scoreSpan.innerHTML = score;
    }

    // -> eat the food and locate new food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x)
    {
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        food = {x: Math.round(Math.random() * ((16-2) + 2)), y: Math.round(Math.random() * ((16-2+ 1) + 2))};
        console.log('eaten')
        console.log(food)
        score +=1;
        scoreSpan.innerHTML = score;

    }

    // moving the snake
    for (let i = snakeArr.length-2; i >= 0; i--) {
        // const element = array[i];
        snakeArr[i+1] = {...snakeArr[i]};
        let temp = snakeArr.map(e => ({...e}))
        // console.log("increment: ", temp);
        
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // console.log("moving: ", snakeArr);
    

    //////////////////// display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index == 0)
        {
            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snake');
        }  
        board.appendChild(snakeElement);
    })

    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

// game start
window.requestAnimationFrame(main);


// button movement

leftButton.addEventListener("click", function() {
    // Add your left action logic here
    moveSound.play();
    inputDir.x = -1;
    inputDir.y = 0;
    console.log("Left button clicked");
});

rightButton.addEventListener("click", function() {
    // Add your right action logic here
    moveSound.play();
    inputDir.x = 1;
    inputDir.y = 0;
    console.log("Right button clicked");
});

upButton.addEventListener("click", function() {
    // Add your up action logic here\
    moveSound.play();
    inputDir.x = 0;
    inputDir.y = -1;
    console.log("Up button clicked");
});

downButton.addEventListener("click", function() {
    // Add your down action logic here
    moveSound.play();
    inputDir.x = 0;
    inputDir.y = 1;
    console.log("Down button clicked");
});


// keyboard movement
window.addEventListener('keydown', e => {
    inputDir = {x:0, y:1};
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
    
        default:
            break;
    }
})