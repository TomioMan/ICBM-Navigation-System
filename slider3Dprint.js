const X = document.getElementById("rangeX")
const Y = document.getElementById("rangeY")

const inputX = document.getElementById("X-input")
const inputY = document.getElementById("Y-input")

const axisX = document.getElementById("X-axis-input")
const axisY = document.getElementById("Y-axis-input")

function initialize(){
    changePlaygroundSize()
    updateAxis()

    inputX.value = X.max / 2;
    inputY.value = Y.max / 2;
    X.value = inputX.value;
    Y.value = inputY.value;
    
    positionDot()
}

const dot = document.getElementById("dot");
const additionX = 149.5;
const additionY = 245;
let isArrayInitialized = false;

const startingMarkArray = [
    {
        id: 1 ,
        coordinates: {x: 12, y:10 },
        snake: {
            isSnake: true,
            segmentNumber: 0
        },
        point: false,
        initial: true
    },
    {
        id: 2 ,
        coordinates: {x: 11, y:10 },
        snake: {
            isSnake: true,
            segmentNumber: 1
        },
        point: false,
        initial: true
    },
    {
        id: 3 ,
        coordinates: {x: 10, y:10 },
        snake: {
            isSnake: true,
            segmentNumber: 2
        },
        point: false,
        initial: true
    }, 
    {
        id: 4 ,
        coordinates: {x: 5, y:5 },
        snake: {
            isSnake: false,
        },
        point: true,
        initial: true
    }, 
    {
        id: 5 ,
        coordinates: {x: 15, y:15 },
        snake: {
            isSnake: false,
        },
        point: true,
        initial: true
    }, 
    {
        id: 6 ,
        coordinates: {x: 5, y:15 },
        snake: {
            isSnake: false,
        },
        point: true,
        initial: true
    }, 
    {
        id: 7 ,
        coordinates: {x: 15, y:5 },
        snake: {
            isSnake: false,
        },
        point: true,
        initial: true
    }, 
    {
        id: 8 ,
        coordinates: {x: 15, y:10 },
        snake: {
            isSnake: false,
        },
        point: true,
        initial: true
    }, 
    {
        id: 9 ,
        coordinates: {x: 10, y:5 },
        snake: {
            isSnake: false,
        },
        point: true,
        initial: true
    }, 
    {
        id: 10 ,
        coordinates: {x: 10, y:15 },
        snake: {
            isSnake: false,
        },
        point: true,
        initial: true
    }, 
    {
        id: 11 ,
        coordinates: {x: 5, y:10 },
        snake: {
            isSnake: false,
        },
        point: true,
        initial: true
    },
    {
        id: 12 ,
        coordinates: {x: 9, y:10 },
        snake: {
            isSnake: true,
            segmentNumber: 3
        },
        point: false,
        initial: true
    },
    {
        id: 13 ,
        coordinates: {x: 8, y:10 },
        snake: {
            isSnake: true,
            segmentNumber: 4
        },
        point: false,
        initial: true
    }
]
let markArray = JSON.parse(JSON.stringify(startingMarkArray));

function addMarkEntry(x, y, State, isInitial){
    const finalX = (x - additionX) / 10;
    const finalY = (y - additionY) / 10;

    const id = markArray.length + 1;

    let snakeLenght = 0;

    let pushArray;

    if (State == "snake") {
        markArray.forEach((mark)=>{
            if (mark.snake.isSnake = true){
                snakeLenght++;
            }
        });

        pushArray = {
            id: id ,
            coordinates: {x: finalX, y:finalY },
            snake: {
                isSnake: true,
                segmentNumber: snakeLenght
            },
            point: false,
            initial: false
        }

    }
    else if (State == "apple") {

        pushArray ={
            id: id ,
            coordinates: {x: finalX, y:finalY },
            snake: {
                isSnake: false
            },
            point: true,
            initial: false
        }

    } else {
        pushArray ={
            id: id ,
            coordinates: {x: finalX, y:finalY },
            snake: {
                isSnake: false
            },
            point: false,
            initial: false
        }
    }

    if (!isInitial){
        markArray.push(pushArray);
    }
}

function spawnMark(id){

    let coords = {x: 0, y:0 }
    let isApple = false;
    let isSnake = false;

    let isInitial = false;

    markArray.forEach((mark) => {
        if (mark.id == id) {
            coords = mark.coordinates;

            if (mark.point == true){
                isApple = true;
            }
            else if (mark.snake.isSnake == true) {
                isSnake = true;
            }
            else if (mark.initial == true) {
                isInitial = true;
            }
        }
    });

    const finalX = additionX + (10 * coords.x);
    const finalY = additionY + (10 * coords.y);

    if (isApple){
        createMark(finalX, finalY, "apple", isInitial);
    }
    else if (isSnake) {
        createMark(finalX, finalY, "snake", isInitial);
    }
}
function spawnAllMarks(){
    markArray.forEach((mark) => {
        spawnMark(mark.id)
    });
}

if (window.innerWidth < 670){
    axisX.value = 40;
    axisY.value = 20;
    changePlaygroundSize()
}

function positionDot(){
    dot.style.left = additionX + (inputX.value * 10) + "px";
    dot.style.top = additionY + (inputY.value * 10) + "px";
}

const playground = document.querySelector(".playground");
let snakeMode = false;
const snakeModeToggle = document.getElementById("snakeModeToggle")
snakeModeToggle.addEventListener("change", () => {
    snakeMode = !snakeMode
});
function createMark(x, y, additionalClass, isInitial){
    const mark = document.createElement("div");
    mark.classList.add("mark", additionalClass);
    mark.style.left = x + "px";
    mark.style.top = y + "px";
    mark.addEventListener("click", () => mark.remove());
    playground.appendChild(mark);
    if (!isInitial){
        addMarkEntry(x, y, additionalClass)
    }
}
function createMarkAtDot(){
    if (!snakeGame) {
        const mark = document.createElement("div");
        mark.className = "mark";
        mark.style.left = dot.style.left;
        mark.style.top = dot.style.top;
        mark.addEventListener("click", () => mark.remove());
        playground.appendChild(mark);

        const x = parseInt(dot.style.top);
        const y= parseInt(dot.style.left);

        addMarkEntry(x, y)
    }
}
dot.addEventListener("click", createMarkAtDot);
document.addEventListener('keydown', (event) => {
    if (event.keyCode == '32') {
        createMarkAtDot()
    }
});
function deleteMarks(){
    const marks = document.querySelectorAll(".mark")
    marks.forEach((mark) => {
        mark.remove();
    });
    markArray = [];
    console.log("markArray reset:", markArray, marks)
};
function snakeCollision(){
    const xValue = parseInt(inputX.value) || 0;
    const yValue = parseInt(inputY.value) || 0;

    markArray.forEach((mark) => {
        if (mark.coordinates && mark.coordinates.x === xValue && mark.coordinates.y === yValue) {
            let itemType = (mark.point) ? "Apple" : "Snake Segment"
            //console.log("collided with " + itemType + " on:\nX:" + mark.coordinates.x, "Y:" + mark.coordinates.y)
            if (mark.point){
                RepositionApple(mark);
                addSegment();
            }
            else if (mark.snake.isSnake){
                const snakeArray = document.querySelectorAll(".snake");
                if (mark.snake.segmentNumber == snakeArray.length - 1) {  
                }
                else{
                    showLoseScreen();
                }
            }
        }
    })
}
function showLoseScreen(){
    const canCollide = document.getElementById("canCollide");
    if (snakeGame && canCollide.checked){
        stopSnakeAutoMove()
        popUp.style.display = "flex"
        popUp.innerHTML = `
        <h1>You lost!</h1>
        <div style="display: flex; flex-direction: row; gap: 10px;">
            <button style="cursor: pointer;" onclick="newSnakeGame()">New Game</button>
            <button style="cursor: pointer;" onclick="reload()">Back to ICBMNS</button>
        </div>`
    }
}
//calculating the path of all the snake segments
function snakeStep(){
    const xValue = parseInt(inputX.value) || 0;
    const yValue = parseInt(inputY.value) || 0;

    let nextStep = {x: xValue, y:yValue}


    for (let i = 0; i < countSegments(); i++){
        const nextX = nextStep.x;
        const nextY = nextStep.y;
        markArray.forEach((mark)=>{
            if (mark.snake.segmentNumber != null && 
                mark.snake.segmentNumber == i){
                
                nextStep.x = mark.coordinates.x;
                nextStep.y = mark.coordinates.y;
            }
        });
        //console.log("Segment", i, "moved prom:\n", nextStep.x, nextStep.y, "\n", nextX, nextY)
        updateSegmentPosition(i, nextX, nextY)
    }
}
function addSegment(){
    let tailSegment = null;
    let maxSegmentNumber = -1;
    
    markArray.forEach((mark) => {
        if (mark.snake && mark.snake.isSnake && mark.snake.segmentNumber > maxSegmentNumber) {
            maxSegmentNumber = mark.snake.segmentNumber;
            tailSegment = mark;
        }
    });
    
    if (!tailSegment) return;
    
    const newSegmentNumber = maxSegmentNumber + 1;
    const newSegment = {
        id: markArray.length + 1,
        coordinates: {x: tailSegment.coordinates.x, y: tailSegment.coordinates.y},
        snake: {
            isSnake: true,
            segmentNumber: newSegmentNumber
        },
        point: false,
        initial: false
    };
    
    markArray.push(newSegment);
    
    //push into html
    const finalX = additionX + (newSegment.coordinates.x * 10);
    const finalY = additionY + (newSegment.coordinates.y * 10);
    createMark(finalX, finalY, "snake", true);
    
    //rotate
    const snakeArray = document.querySelectorAll(".snake");
    const lastSegment = snakeArray[newSegmentNumber]
    if (snakeArray[newSegmentNumber - 1].style.transform == "translate(-5px, 3.6px) rotate(90deg)"){
        setTimeout(() => {
            //console.log("rotated end segment:", lastSegment)
            lastSegment.style.transform = "translate(-5px, 3.6px) rotate(90deg)";
        }, 10);
    }
}

const applesCollected = document.getElementById("applesCollected")

function RepositionApple(mark){
    const appleArray = document.querySelectorAll(".apple");
    const movedApple = appleArray[mark.id - 4];

    const Xvalue = parseInt(axisX.value);
    const Yvalue = parseInt(axisY.value);

    let newX = Math.floor(Math.random() * Xvalue + 2) - 1;
    let newY = Math.floor(Math.random() * Yvalue + 2) - 1;

    applesCollected.innerText = parseInt(applesCollected.innerText) + 1

    markArray.forEach((mark)=>{
        if (mark.coordinates.x == newX && mark.coordinates.y == newY) {
            let cycle = true
            while (cycle){
                newX = Math.floor(Math.random() * Xvalue + 2) - 1
                newY = Math.floor(Math.random() * Yvalue + 2) - 1

                console.log("overlapped! newX/existingX\nX:" + newX + "/" + mark.coordinates.x, " Y:" + newY + "/" + mark.coordinates.y)
                if (mark.coordinates.x == newX && mark.coordinates.y == newY) {
                    cycle = true;
                } else {
                    cycle = false;
                }
            }
        }
    });

    const finalX = additionX + (newX * 10);
    const finalY = additionY + (newY * 10);
    movedApple.style.left = finalX + "px";
    movedApple.style.top = finalY + "px";
    mark.coordinates.x = newX;
    mark.coordinates.y = newY;
}

function countSegments(){
    const segmentArray = document.querySelectorAll(".snake");
    return segmentArray.length
}

//actually moving the segments and writing down their data
function updateSegmentPosition(specificSegmentNumber, newX, newY){
    markArray.forEach((mark)=>{
        if (mark.snake.segmentNumber != null && 
            mark.snake.segmentNumber == specificSegmentNumber){
            
            let segmentArray = document.querySelectorAll(".snake")
            const movedSegment = segmentArray[specificSegmentNumber]

            const finalX = additionX + (newX * 10);
            const finalY = additionY + (newY * 10);
            movedSegment.style.left = finalX + "px";
            movedSegment.style.top = finalY + "px";
            //rotate logic
            if (mark.coordinates.y != newY){
                movedSegment.style.transform = "translate( -5px, 3.6px) rotate(90deg)"
            } else {
                movedSegment.style.transform = "translate( -5px, 3.2px) rotate(0)"
            }/*
            if (segmentArray[specificSegmentNumber + 1] != null && segmentArray[specificSegmentNumber - 1] != null) {
                console.log("→", segmentArray[specificSegmentNumber + 1], "\n•", segmentArray[specificSegmentNumber], "\n←", segmentArray[specificSegmentNumber - 1])
                if (parseInt(segmentArray[specificSegmentNumber + 1].style.left) == parseInt(movedSegment.style.left) - 10 &&
                    parseInt(segmentArray[specificSegmentNumber - 1].style.top) == parseInt(movedSegment.style.top) - 10){
                    movedSegment.style.transform = "translate( -5px, 3.6px) rotate(135deg)"
                }
            }*/

            mark.coordinates.x = newX;
            mark.coordinates.y = newY;
        }
    });
}

function AutoSize(id){
    const element = document.getElementById(id)
    const chars = (element.value || "").length;

    element.style.width = (15 + (chars * 5)) + "px";
}
function changePlaygroundSize(){
    const Xvalue = parseInt(axisX.value);
    const Yvalue = parseInt(axisY.value);

    X.max = Xvalue;
    Y.max = Yvalue;

    X.style.width = (Xvalue * 10) + "px";
    Y.style.top = (250 + (Yvalue * 5)) + "px";
    Y.style.left = (150 + (Yvalue * (-5))) + "px";
    Y.style.width = (Yvalue * 10) + "px";;

    positionDot()
}
function updateAxis(){
    const xValue = parseInt(inputX.value) || 0;
    const yValue = parseInt(inputY.value) || 0;
    X.value = xValue;
    Y.value = yValue;
}   

const commandQueue = [];
let snakeDirection = "ArrowRight";
let snakeMoveIntervalId = null;
let justMoved = "ArrowRight";

function startSnakeAutoMove(){
    if (snakeMoveIntervalId !== null) return;
    const advanceTime = document.getElementById("advanceTime")
    snakeMoveIntervalId = setInterval(processSnakeCommands, advanceTime.value);
}
function stopSnakeAutoMove(){
    if (snakeMoveIntervalId === null) return;
    clearInterval(snakeMoveIntervalId);
    snakeMoveIntervalId = null;
}
function processSnakeCommands(){
    if (!snakeGame) return;

    const xValue = parseInt(inputX.value) || 0;
    const yValue = parseInt(inputY.value) || 0;
    const Xmin = parseInt(X.min);
    const Ymin = parseInt(Y.min);
    const Xmax = parseInt(X.max);
    const Ymax = parseInt(Y.max);

    const command = commandQueue.length > 0 ? commandQueue.shift() : snakeDirection;
    if (!command) return;

    snakeDirection = command;

    let nextX = xValue;
    let nextY = yValue;

    if (command === 'ArrowUp' && justMoved != 'ArrowDown') {
        nextY = Math.max(Ymin, yValue - 1);
        justMoved = "ArrowUp";
    } else if (command === 'ArrowDown' && justMoved != 'ArrowUp') {
        nextY = Math.min(Ymax, yValue + 1);
        justMoved = "ArrowDown";
    } else if (command === 'ArrowRight' && justMoved != 'ArrowLeft') {
        nextX = Math.min(Xmax, xValue + 1);
        justMoved = "ArrowRight";
    } else if (command === 'ArrowLeft' && justMoved != 'ArrowRight') {
        nextX = Math.max(Xmin, xValue - 1);
        justMoved = "ArrowLeft";
    } 
    else if (justMoved === 'ArrowUp') {
        nextY = Math.max(Ymin, yValue - 1);
    } else if (justMoved === 'ArrowDown') {
        nextY = Math.min(Ymax, yValue + 1);
    } else if (justMoved === 'ArrowRight') {
        nextX = Math.min(Xmax, xValue + 1);
    } else if (justMoved === 'ArrowLeft') {
        nextX = Math.max(Xmin, xValue - 1);
    }

    inputX.value = nextX;
    inputY.value = nextY;

    if (command === 'ArrowUp' || command === 'ArrowDown') {
        AutoSize('Y-input');
    } else {
        AutoSize('X-input');
    }

    updateAxis();
    positionDot();

    snakeCollision();
    snakeStep();

    if (snakeMode) {
        createMarkAtDot();
    }
}

document.addEventListener('keydown', (event) => {
    const xValue = parseInt(inputX.value) || 0;
    const yValue = parseInt(inputY.value) || 0;

    const Xmin = parseInt(X.min);
    const Ymin = parseInt(Y.min);
    const Xmax = parseInt(X.max);
    const Ymax = parseInt(Y.max);

    if (event.key === "-"){
        console.log(markArray)
    }

    if (canMove) {
        if (!snakeGame){
            justMoved = ""
        }

        if (snakeGame && (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
            commandQueue.push(event.key);
            snakeDirection = event.key;
        }

        if (!snakeGame) {
            if (event.key === 'ArrowUp' && justMoved != 'ArrowUp') {
                if (event.shiftKey) {
                    inputY.value = yValue - 5;
                } else {
                    inputY.value = yValue - 1;
                }
                if (inputY.value < Ymin) {
                    inputY.value = Ymin;
                } else if (inputY.value > Ymax) {
                    inputY.value = Ymax;
                }
                AutoSize("Y-input");
                justMoved = "ArrowDown";
            }

            if (event.key === 'ArrowDown' && justMoved != 'ArrowDown') {
                if (event.shiftKey) {
                    inputY.value = yValue + 5;
                } else {
                    inputY.value = yValue + 1;
                }
                if (inputY.value < Ymin) {
                    inputY.value = Ymin;
                } else if (inputY.value > Ymax) {
                    inputY.value = Ymax;
                }
                AutoSize("Y-input");
                justMoved = "ArrowUp";
            }
            
            if (event.key === 'ArrowRight' && justMoved != 'ArrowRight') {
                if (event.shiftKey) {
                    inputX.value = xValue + 5;
                } else {
                    inputX.value = xValue + 1;
                }
                if (inputX.value < Xmin) {
                    inputX.value = Xmin;
                } else if (inputX.value > Xmax) {
                    inputX.value = Xmax;
                }
                AutoSize("X-input");
                justMoved = "ArrowLeft";
            }
            
            if (event.key === 'ArrowLeft' && justMoved != 'ArrowLeft') {
                if (event.shiftKey) {
                    inputX.value = xValue - 5;
                } else {
                    inputX.value = xValue - 1;
                }
                if (inputX.value < Xmin) {
                    inputX.value = Xmin;
                } else if (inputX.value > Xmax) {
                    inputX.value = Xmax;
                }
                AutoSize("X-input");
                justMoved = "ArrowRight";
            }
        }
    }

    if (!snakeGame && (event.key === 'ArrowLeft'  && justMoved != 'ArrowLeft' ||
        event.key === 'ArrowRight' && justMoved != 'ArrowRight' ||
        event.key === 'ArrowUp'    && justMoved != 'ArrowUp' ||
        event.key === 'ArrowDown'  && justMoved != 'ArrowDown')) {

        snakeCollision()
        snakeStep()
    }

    updateAxis()
    positionDot()
    if (snakeMode){
        createMarkAtDot()
    }
});

initialize()

const TargetX = document.getElementById("TargetX")
const TargetY = document.getElementById("TargetY")

let canMove = true;

function moveTo(x, y){
    inputX.value = x
    X.value = x
    inputY.value = y
    Y.value = y
    positionDot()
}

function initiateNavigation(){

    if (canMove){
        const currentX = inputX.value;
        const currentY = inputY.value;
        const targetX = TargetX.value;
        const targetY = TargetY.value;

        goToTarget(currentX, currentY, targetX, targetY)
    }
        
}

function goToTarget(currentX, currentY, targetX, targetY){

    canMove = false

    currentX = parseInt(currentX, 10) || 0
    currentY = parseInt(currentY, 10) || 0
    targetX = parseInt(targetX, 10) || 0
    targetY = parseInt(targetY, 10) || 0

    let Xdifference = targetX - currentX
    let Ydifference = targetY - currentY

    const totalMoves = Math.abs(Ydifference) + Math.abs(Xdifference)

    console.log("Transfer: \n  X:", Xdifference, "\n  Y:", Ydifference)

    if (totalMoves <= 0) {
        canMove = true
        return
    }

    let moveCount = 0
    const intervalId = setInterval(() => {
        let whereMove = ""

        if (Xdifference !== 0 && Ydifference !== 0) {
            const random = Math.floor(Math.random() * 2) + 1
            whereMove = random == 1 ? "X" : "Y"
        } else if (Xdifference !== 0) {
            whereMove = "X"
        } else if (Ydifference !== 0) {
            whereMove = "Y"
        }

        if (whereMove == "X") {
            const step = Xdifference > 0 ? 1 : -1
            currentX += step
            Xdifference = targetX - currentX
            moveTo(currentX, currentY)
        } else if (whereMove == "Y") {
            const step = Ydifference > 0 ? 1 : -1
            currentY += step
            Ydifference = targetY - currentY
            moveTo(currentX, currentY)
        }

        if (snakeMode) {
            createMarkAtDot()
        }

        moveCount += 1
        if (moveCount >= totalMoves) {
            clearInterval(intervalId)
            canMove = true
        }
    }, 75)
}

let isCursorLarge = false;
const largeCursorToggle = document.getElementById("largeCursorToggle")

largeCursorToggle.addEventListener("change", ()=>{
    if (largeCursorToggle.checked == true) {
        dot.style.transform = "scale(2) translate(1.8px, 5px)"
    } else {
        dot.style.transform = "none"
    }
});



const keyWord1 = [83, 78, 65, 75, 69];
const keyWord2 = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
let list1 = [];
let list2 = [];

function arraysEqual(a, b) {
    if (a.length !== b.length) {
        return false; 
    };
    for (let i = 0; i < a.length; i += 1) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

window.addEventListener('keydown', (e) => {
    list1.push(e.keyCode);
    list2.push(e.keyCode);

    if (list1.length > keyWord1.length) {
        list1.splice(0, list1.length - keyWord1.length);
    }
    if (list2.length > keyWord2.length) {
        list2.splice(0, list2.length - keyWord2.length);
    }

    if (arraysEqual(list1, keyWord1)) {
        initializeSnake();
    }
    if (arraysEqual(list2, keyWord2)) {
        easterEgg();
    }
});

let snakeGame = false;
const snakeGameGUI = document.querySelectorAll(".snakeGameGUI")
snakeGameGUI.forEach((element)=>{
    element.style.display = "none"
})

triggerSnakeGame()
function triggerSnakeGame(){
    if (snakeGame == true){
        deleteMarks()
        markArray = JSON.parse(JSON.stringify(startingMarkArray));
        spawnAllMarks()
        snakeDirection = "ArrowRight";
        justMoved = "ArrowRight";

        inputX.value = 12;
        inputY.value = 10;
        axisX.value = 20;
        axisY.value = 20;
        
        applesCollected.innerText = 0

        updateAxis()
        positionDot()
        changePlaygroundSize()

        setTimeout(() => {
            for (let i = 1; i < markArray.length ; i++){
                markArray.pop();
            }

            console.log("Initialized List:", markArray)

            isArrayInitialized = true;
        }, 100);
        const snakeGameUI = document.querySelectorAll(".toggleable")
        snakeGameUI.forEach((element)=>{
            element.style.display = "none"
        })
        const header = document.querySelectorAll("h1")[0];
        header.innerHTML = '<svg width="32px" height="16px" viewBox="-17 -8 32 16" style="transform: scale(1.6);"> <g fill="#ffa500" style="transform: scale(0.005)"><path d="M -455 1434 c -288 -43 -578 -197 -713 -379 c -82 -110 -132 -256 -132 -385 c 0 -68 27 -215 52 -285 c 47 -132 138 -293 213 -375 c 176 -194 295 -416 295 -552 c 0 -98 -46 -156 -149 -188 c -114 -36 -195 -22 -272 48 c -88 79 -162 268 -199 507 c -51 328 -104 436 -248 503 c -49 23 -70 27 -153 27 c -92 0 -98 -1 -181 -43 c -72 -35 -97 -55 -155 -119 c -180 -201 -259 -251 -463 -289 l -65 -12 l 120 -1 c 75 0 144 5 184 14 c 84 20 197 80 301 160 c 133 102 156 116 199 122 c 126 17 187 -160 214 -624 l 14 -223 l 36 -74 c 137 -277 554 -407 855 -266 c 47 22 87 52 146 113 c 228 229 254 517 79 847 c -56 104 -83 145 -188 280 c -127 163 -169 255 -168 366 c 1 149 119 267 320 318 c 197 51 343 17 469 -108 c 113 -114 161 -256 151 -450 c -8 -154 -39 -254 -147 -471 c -99 -201 -123 -266 -146 -404 c -22 -129 -15 -345 16 -451 c 44 -154 145 -315 249 -396 c 142 -110 342 -160 537 -134 c 348 46 567 262 647 640 c 15 72 20 133 20 250 c 0 178 -23 309 -75 438 c -38 94 -56 152 -69 217 c -70 348 32 609 221 566 c 105 -23 124 -64 119 -260 c -7 -359 10 -444 110 -534 c 105 -95 389 -177 612 -177 c 57 0 69 -4 113 -35 c 66 -47 145 -69 222 -62 c 74 7 162 37 225 76 c 25 15 66 30 90 33 c 25 3 63 14 84 24 c 47 22 125 97 125 119 c 0 21 180 21 240 0 c 58 -21 63 -12 6 10 c -25 10 -46 21 -46 26 c 0 4 16 13 35 19 c 19 6 37 15 40 20 c 3 5 -13 3 -36 -5 c -25 -9 -78 -15 -135 -15 l -93 0 l -16 30 c -23 44 -89 88 -169 112 c -39 11 -104 36 -143 54 c -97 45 -172 64 -259 64 c -85 0 -126 -12 -178 -53 c -47 -36 -88 -46 -189 -47 c -116 0 -165 28 -204 115 c -14 32 -18 75 -20 220 c -3 143 -7 195 -24 254 c -55 201 -190 358 -349 405 c -69 20 -204 21 -284 0 c -162 -41 -307 -144 -390 -277 c -98 -157 -131 -302 -123 -542 c 6 -184 30 -299 93 -437 c 51 -112 74 -205 81 -319 c 12 -206 -55 -364 -184 -429 c -95 -49 -288 -25 -372 46 c -126 106 -97 352 102 859 c 82 212 104 286 119 417 c 13 113 1 257 -32 383 c -24 89 -91 238 -141 312 c -128 189 -325 333 -524 383 c -77 19 -259 33 -320 24 z"/></g></svg> Snake Game'
        playground.style.transform = "translate(-120px , -81px)"

        const style = document.createElement('style');
        //so you can't change it there but still can see it
        style.textContent = `
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            display:none;
            margin: 0;
        }`;
        document.head.appendChild(style);
        inputX.readOnly = true;
        inputY.readOnly = true;

        document.querySelector("head title").innerHTML = "🐍 Snake Game";
        
        const popUp = document.getElementById("popUp");
        popUp.style.display = "flex";
        popUp.innerHTML = `<p>Snake Game starts in:</p><h1>3</h1>`

        const snakeGameBorder = document.getElementById("snakeGameBorder");
        snakeGameBorder.style.display = "block";
        
        const snakeGameGUI = document.querySelectorAll(".snakeGameGUI")
        snakeGameGUI.forEach((element)=>{
            element.style.display = "block"
        })

        setTimeout(() => {
            popUp.querySelector("h1").innerHTML = "2"
            setTimeout(() => {
                popUp.querySelector("h1").innerHTML = "1"
                setTimeout(() => {
                    popUp.querySelector("h1").innerHTML = "0"
                    setTimeout(() => {
                        popUp.style.display = "none"
                        startSnakeAutoMove();
                    }, 200);
                }, 1000);
            }, 1000);
        }, 1000);
    } else {
        stopSnakeAutoMove();
        commandQueue.length = 0;
    }
}
function initializeSnake() {
    alert("snake game");
    snakeGame = true;
    triggerSnakeGame()
}
function easterEgg(){
    alert("\nKonami Code\n↑ ↑ ↓ ↓ ← → ← → b a")
}

document.getElementById('uploadFile').addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (!file) return;

    const imgElement = document.getElementById('uploadBackground');
    
    if (imgElement.src.startsWith('blob:')) {
        URL.revokeObjectURL(imgElement.src);
    }

    imgElement.src = URL.createObjectURL(file);

    imgElement.style.width = axisX.value * 10 + "px";
    imgElement.style.height = axisY.value * 10 + "px";
});

document.getElementById("uploadBackgroudDelete").addEventListener("click", ()=>{
    const imgElement = document.getElementById('uploadBackground');
    imgElement.src = ("");
    imgElement.style.height = "0px"
    imgElement.style.width = "0px"
})

function reload(){
    snakeGame = false
    window.location.reload() 
}
function newSnakeGame(){
    triggerSnakeGame();
    justMoved = "ArrowRight";
    snakeDirection = "ArrowRight";
    commandQueue.length = 0;
}

function createKeyboardEvent(type, options) {
  const event = new KeyboardEvent(type, options);
  const modifierProps = ['key', 'code', 'keyCode', 'which'];
  modifierProps.forEach((prop) => {
    if (options[prop] !== undefined) {
      try {
        Object.defineProperty(event, prop, {
          get: () => options[prop]
        });
      } catch (e) {
        // ignore readonly property failures
      }
    }
  });
  return event;
}

function simulateKeyPress(keyName, codeName, keyCodeValue, targetSelector = null) {
  const target = targetSelector ? document.querySelector(targetSelector) : document.activeElement || document.body || window;
  if (!target) return;

  const eventConfig = {
    key: keyName,
    code: codeName,
    keyCode: keyCodeValue,
    which: keyCodeValue,
    bubbles: true,
    cancelable: true
  };

  const downEvent = createKeyboardEvent('keydown', eventConfig);
  target.dispatchEvent(downEvent);

  const upEvent = createKeyboardEvent('keyup', eventConfig);
  target.dispatchEvent(upEvent);
}

function pressSpace(targetSelector = null) {
  simulateKeyPress(' ', 'Space', 32, targetSelector);
}

function pressArrowUp(targetSelector = null) {
  simulateKeyPress('ArrowUp', 'ArrowUp', 38, targetSelector);
}

function pressArrowDown(targetSelector = null) {
  simulateKeyPress('ArrowDown', 'ArrowDown', 40, targetSelector);
}

function pressArrowLeft(targetSelector = null) {
  simulateKeyPress('ArrowLeft', 'ArrowLeft', 37, targetSelector);
}

function pressArrowRight(targetSelector = null) {
  simulateKeyPress('ArrowRight', 'ArrowRight', 39, targetSelector);
}
