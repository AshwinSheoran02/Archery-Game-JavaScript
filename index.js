const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score')
const resDisplay = document.querySelector('#res')
const blockwidth = 130
const blockheight = 20
const boardWidth = 1200
const boardHeight = 600
const ballDiameter = 50
let timerid
var blockx = 0
var blocky  = 0
// let xDirection = 12
// let yDirection = 8
let xDirection = 0
let yDirection = 0
let score = 0
let time = 20
let arrstart  = 0
localStorage.setItem("scorer",  parseInt(localStorage.getItem("scorer")) +0 );
if (isNaN(parseInt(localStorage.getItem("scorer")))){
    localStorage.setItem("scorer", 0)
}
scoreDisplay.innerHTML = localStorage.getItem("scorer");

var rand = Math.floor(Math.random() * 4);

//const ctx = canvas.getContext('ball');

const userstart = [5 , 215];
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
const ballstart =[30 , 230]
//const ballstart =[currentpos(0)+20 , currentpos(1)+45]
let ballcurrentpos = ballstart


const Blocksarr = [ 
    [
    
        new Block(1300+blockx,210+blocky), // bullseye
    
        new Block(1300+blockx,290+blocky),
    
        new Block(1300+blockx,240+blocky),
    
        new Block(1300+blockx,50+blocky), 
    
    ] , 
    [
    
        new Block(1300+blockx,210+blocky), // bullseye
    
        new Block(1300+blockx,260+blocky),
    
        new Block(1300+blockx,130+blocky),
    
        new Block(1300+blockx,90+blocky), 
    
    ] , 
    [
    
        new Block(1300+blockx,150+blocky), // bullseye
    
        new Block(1300+blockx,240+blocky),
    
        new Block(1300+blockx,110+blocky),
    
        new Block(1300+blockx,60+blocky), 
    
    ] , 
    [
    
        new Block(1300+blockx,220+blocky), // bullseye
    
        new Block(1300+blockx,260+blocky),
    
        new Block(1300+blockx,70+blocky),
    
        new Block(1300+blockx,30+blocky), 
    
    ] , 




 ]

// const blocks = [
    
//     new Block(1300+blockx,210+blocky), // bullseye

//     new Block(1300+blockx,300+blocky),

//     new Block(1300+blockx,90+blocky),

//     new Block(1300+blockx,60+blocky), 

// ]
const blocks = Blocksarr[rand]



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
//blocky = blocky + ( getTime()/1000 % 10)
addBlocks()

function drawUser(){
    user.style.left = currentpos[0]+'px'
user.style.bottom = currentpos[1]+'px'
}

function drawball(){
    ball.style.left = ballcurrentpos[0]+'px'
ball.style.bottom = ballcurrentpos[1]+'px'
    if (arrstart>0){
        yDirection =2- 4*( (ballcurrentpos[0] -30) / 1460)
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
        
        case 'n': //space
            
                //ballstart =[30 , 250]
                //const ballstart =[currentpos(0)+20 , currentpos(1)+45]
                //ballcurrentpos = ballstart
                location.reload();

                
                // moveball()
                //timerid = setInterval(moveball , time)

            drawUser()
            break;

        case 'r': //space
            
                //ballstart =[30 , 250]
                //const ballstart =[currentpos(0)+20 , currentpos(1)+45]
                //ballcurrentpos = ballstart
                localStorage.clear();

                
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
            if (i==0){
                resDisplay.innerHTML = ' Hit! ' 
                score = score+5
                localStorage.setItem("scorer",  parseInt(localStorage.getItem("scorer")) +5 );
            }
            else{
            resDisplay.innerHTML = ' Hit! ' 
            score ++
            localStorage.setItem("scorer",   parseInt(localStorage.getItem("scorer")) +1 );
            }
            scoreDisplay.innerHTML = localStorage.getItem("scorer");
            //scoreDisplay.innerHTML = score
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