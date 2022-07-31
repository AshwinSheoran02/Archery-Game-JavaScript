const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score')
const resDisplay = document.querySelector('#res')
const blockwidth = 130
const blockheight = 20
const boardWidth = 1200
const boardHeight = 600
const ballDiameter = 50
let timerid
// let xDirection = 12
// let yDirection = 8
let xDirection = 0
let yDirection = 0
let score = 0
let time = 20
let arrstart  = 0
//const ctx = canvas.getContext('ball');

const userstart = [10 , 205];
let currentpos = userstart



// Enemy Block
class Block{
    constructor(xAxis , yAxis){
        this.bottomLeft = [xAxis , yAxis]
        this.bottomRight = [xAxis +blockwidth , yAxis]
        this.topLeft = [xAxis ,yAxis + blockheight]
        this.topRight = [xAxis+ blockwidth , yAxis+blockheight]
    }
}

class Block1{
    constructor(xAxis , yAxis){
        this.bottomLeft = [xAxis , yAxis]
        this.bottomRight = [xAxis +blockwidth , yAxis]
        this.topLeft = [xAxis ,yAxis + blockheight]
        this.topRight = [xAxis+ blockwidth , yAxis+blockheight]
    }
}

//const ballstart =[270 , 40]
const ballstart =[30 , 260]
//const ballstart =[currentpos(0)+20 , currentpos(1)+45]
let ballcurrentpos = ballstart

const blocks = [
    new Block(1200,210), // bullseye
    new Block(1200,180),
    new Block(1200,240),
    new Block(1200,150),
    new Block(1200,120),
    new Block(1200,270),
    new Block(1200,300),
    

]

function addBlocks(){
        const block1   = document.createElement('div');
        block1.classList.add('block1');
        block1.style.left = blocks[0].bottomLeft[0]+'px'
        block1.style.bottom = blocks[0].bottomLeft[1]+'px'
        grid.appendChild(block1);


    for (let i = 1 ; i < blocks.length ; i++){
        const block   = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0]+'px'
        block.style.bottom = blocks[i].bottomLeft[1]+'px'
        grid.appendChild(block);
    }
}
addBlocks()

function drawUser(){
    user.style.left = currentpos[0]+'px'
user.style.bottom = currentpos[1]+'px'
}

function drawball(){
    ball.style.left = ballcurrentpos[0]+'px'
ball.style.bottom = ballcurrentpos[1]+'px'
    if (arrstart>0){
        yDirection =2- 4*(ballcurrentpos[0] / 1460)
    }
}

const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Moving block
 function moveUser(e){
    switch(e.key){
        case 'ArrowDown':
            if (currentpos[1]> 0 ){
                currentpos[1] -= 20
                ballcurrentpos[1] -= 20
            //user.style.left  = currentpos[0]+'px'
            drawUser()
            }
            break;
    
        case 'ArrowUp':
            if (currentpos[1] < boardWidth - blockwidth ){
                currentpos[1] += 20
                ballcurrentpos[1] += 20
            //user.style.left  = currentpos[0]+'px'
            drawUser()
            }
            break;
        

        case 's':
            if (currentpos[1]> 0 ){
                currentpos[1] -= 20
                ballcurrentpos[1] -= 20
            //user.style.left  = currentpos[0]+'px'
            drawUser()
            }
            break;

        case 'w':
            if (currentpos[1] < boardWidth - blockwidth ){
                currentpos[1] += 20
                ballcurrentpos[1] += 20
            //user.style.left  = currentpos[0]+'px'
            drawUser()
            }
            break;

         case ' ': //space
            if (currentpos[0] < boardWidth - blockwidth ){
                 xDirection = 24
                 yDirection = 16
                 arrstart++;
                 
                //  ballstart =[30 , 250]
                //  ballcurrentpos = ballstart
                //scoreDisplay.innerHTML = ' OMG '


            //user.style.left  = currentpos[0]+'px'
            drawUser()
            }
            break;
        
        case 'r': //space
            
                //ballstart =[30 , 250]
                //const ballstart =[currentpos(0)+20 , currentpos(1)+45]
                //ballcurrentpos = ballstart
                location.reload();

                
                // moveball()
                //timerid = setInterval(moveball , time)

            drawUser()
            break;
    }
}



document.addEventListener('keydown' , moveUser)


const ball = document.createElement('div')
ball.classList.add('ball')
drawball()
grid.appendChild(ball)

function moveball(){
    // ballcurrentpos[0] += 2
    // ballcurrentpos[1] += 2
    ballcurrentpos[0] += xDirection
    ballcurrentpos[1] += yDirection
    drawball()
    collision()
}

timerid = setInterval(moveball , time)

// Collisions

function collision(){

    // if (
    //     ballcurrentpos[0] > blocks[0].bottomLeft[0] &&  ballcurrentpos[0] < blocks[0].bottomRight[0] &&
    //     (ballcurrentpos[1] +ballDiameter) > blocks[0].bottomLeft[1] && (ballcurrentpos[0] ) < blocks[i].topLeft [1]
    // ){
    //     scoreDisplay.innerHTML = ' Bulls Eye ! '
    //         clearInterval(timerid)
    // }

    for (let i = 0 ; i< blocks.length ; i++){   // ball hits blocks
        if (
            ballcurrentpos[0] > blocks[i].bottomLeft[0]  - 62 &&  ballcurrentpos[0] < blocks[i].bottomRight[0] &&
            (ballcurrentpos[1] +ballDiameter ) > blocks[i].bottomLeft[1] && (ballcurrentpos[1] ) < blocks[i].topLeft [1]
        ){
            // const allblocks = Array.from(document.querySelectorAll('.block'))
            // allblocks[i].classList.remove('block')
            // blocks.splice(i,1)
            
            
            // //time = time+2
            // //changeDirection()

            // if (blocks.length == 0 ){
            //     scoreDisplay.innerHTML = ' You Win ! '
            //     clearInterval(timerid)
            //     document.removeEventListener('keydown' , moveUser)
            // }
            if (i==2){
                resDisplay.innerHTML = ' Bullseye! '
                score = score+5
            }
            else{
            resDisplay.innerHTML = ' Hit! ' 
            score ++
            }
            scoreDisplay.innerHTML = score
            // yDirection=0
            // xDirection =0
            clearInterval(timerid)
        }
    }


    // if (ballcurrentpos[0]>=(boardWidth - ballDiameter) ||   //boundary
    //     ballcurrentpos[1]>= (boardHeight - ballDiameter )||
    //     ballcurrentpos[0]<=0
    //     ){
    //     changeDirection()
    // }

    // //User block collision
    // if ( ballcurrentpos[0] > currentpos[0] && ballcurrentpos[0] < currentpos[0]+ blockwidth &&
    //     ballcurrentpos[1] > currentpos[1] && ballcurrentpos[1] <currentpos[1]+ blockheight
    //     ){
    //         changeDirection()
    //     }



    if (ballcurrentpos[0] > 1500){ // game over
        clearInterval(timerid)
        resDisplay.innerHTML = ' Miss'
        //ballcurrentpos = ballstart

        //document.removeEventListener('keydown' , moveUser)
    }
}


// function changeDirection(){
//     if (xDirection===2 && yDirection===2){
//         yDirection = -2
//         return
//     }
//     else if (xDirection===2 && yDirection===-2){
//         xDirection = -2
//         return
//     }
//     else if (xDirection===-2 && yDirection===-2){
//         yDirection = 2
//         return
//     }
//     else if (xDirection===-2 && yDirection===2){
//         xDirection = 2
//         return
//     }
// }