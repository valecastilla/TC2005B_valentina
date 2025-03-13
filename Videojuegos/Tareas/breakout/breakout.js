/*
 * breakout game
 *
 * Valentina Castilla
 * 2025-02-19
 */

"use strict";

// Global variables
const canvasWidth = 800;
const canvasHeight = 600;

let oldTime = 0;
const paddleVelocity = 0.5;
// const speedIncrease = 1.1;
const initialSpeed = 0.4;

let score = 0;
let lives = 3;
let reset = false;
// Num de renglones y columnas
let row = 5;
let column = 9;
let blocks = [];

let totalBlocks = row * column;

// Game over
let gameOver = false;

// Context of the Canvas
let ctx;

// Classes for the pong game
// Ball hereda los atributos y metodos de GameObject
class Ball extends GameObject
{
    constructor(position, width, height, color, velocity)
    {
        super(position, width, height, color, "ball"); // Llama al constructor de la clase padre, es decir GameObject
        this.reset();
    }

    update(deltaTime)
    {
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }

    initVelocity(){
        this.inPlay = true;
        let angle = Math.random() * (Math.PI / 2) + (Math.PI / 4);
        this.velocity = new Vec(Math.cos(angle), Math.sin(angle)).times(initialSpeed);
        this.velocity.y *= (Math.random() < 0.5) ? 1 : -1;

    }

    reset() {
        this.inPlay = false;
        this.position = new Vec(canvasWidth / 2, (canvasHeight / 4)*3);
        this.velocity = new Vec(0,0);
    }
}

class Paddle extends GameObject
{
    constructor(position, width, height, color)
    {
        super(position, width, height, color, "paddle"); // Llama al constructor de la clase padre, es decir GameObject
        this.velocity = new Vec(0.0, 0.0);
    }

    update(deltaTime)
    {
        this.position = this.position.plus(this.velocity.times(deltaTime));

        if (this.position.x < 0){
            this.position.x = 0;
        } else if (this.position.x + this.width > canvasWidth){
            this.position.x = canvasWidth - this.width;
        }
    }

    reset() {
        this.inPlay = false;
        this.position = new Vec((canvasWidth / 2) - 50, (canvasHeight / 4)*3 + 10);
        this.velocity = new Vec(0,0);
    }
}

class Block extends GameObject
{
    constructor(position, width, height, color, visible, special)
    {
        super(position, width, height, color, "block"); // Llama al constructor de la clase padre, es decir GameObject
        this.visible = true;
        this.special = false;
        this.hits = 1;
    }

    deleteBlock()
    {
        this.visible = false;
        this.color = "black";
    }

}

// An object to represent the ball to be displayed
const box = new Ball(new Vec(canvasWidth / 2, (canvasHeight / 4)*3), 10, 10, "white");

const paddle = new Paddle(new Vec((canvasWidth / 2) - 50, (canvasHeight / 4)*3 + 10), 100, 20, "white");

const upperBorder = new GameObject(new Vec(0, 0), canvasWidth, 10, "white", "border");
const downBorder = new GameObject(new Vec(0, canvasHeight - 10), canvasWidth, 10, "white", "border");

const rightBorder = new GameObject(new Vec(0, 0), 10, canvasHeight, "white");
const leftBorder = new GameObject(new Vec(canvasWidth - 10, 0), 10, canvasHeight, "white");

const labelBlocks = new TextLabel(25, 50, "40px Ubuntu Mono", "white");
const labelLife = new TextLabel(canvasWidth - 175, 50, "40px Ubuntu Mono", "white");
const labelGameOver = new TextLabel(canvasWidth / 8, canvasHeight / 2 + 100, "50px Ubuntu Mono", "rgb(255, 184, 224)");

function createBlocks()
{
    // Crear los bloques con loops y guardarlos en un arreglo 
    //Donde se coloca el primer bloque
    let x = 20;
    let y = 75;
    for (let i = 0; i < row; i++)
    {
        for (let j = 0; j < column; j++)
        {
            // Hace que el tamaño sea equivalente a la cantidad de columnas, dejando un borde con las paredes de 20 y entre bloques de 10
            let blockWidth =  (canvasWidth - 40 - 10 * (column-1)) / column;
            //Crea el objeto
            let block = new Block(new Vec(x, y), blockWidth, 20, "white"); 
            // Lo mete en el arreglo
            blocks.push(block);
            x += blockWidth + 10; // Todos lo bloques tienen espaciado de 10
        }
        x = 20; // Cuando se crea un renglon completo, x vuelve a la pos inicial
        y += 30; // Se cambia la pos en y para que el espaciado sea de 10
    }
    createSpecial();

}

function createSpecial() 
{
    // Hacer 25% de los bloques especiales
    for (let i = 0; i < Math.floor(totalBlocks * 0.25); i++)
    {
        let pos = Math.floor(Math.random() * ((totalBlocks-1) - 0)) + 0; // https://coreui.io/blog/how-to-generate-a-random-number-in-javascript/#:~:text=How%20can%20I%20generate%20a,adjust%20the%20formula%20to%3A%20Math.
        blocks[pos].special = true;
        blocks[pos].color = "#EC7FA9";
        blocks[pos].hits = 2;
    }
}

function resetGame(fullReset = false)
{
    blocks = []; 
    createBlocks();
    box.reset();
    paddle.reset();   
    if (fullReset) {
        gameOver = false;
        score = 0;
        lives = 3;
    }
}

function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    // Crear los bloques
    createBlocks();
    
    drawScene(0);
    
    createEventListeners();
}


function createEventListeners() 
{
    window.addEventListener('keydown', (event) => {
        if (event.key == 'a' || event.code == 'ArrowLeft'){
            paddle.velocity = new Vec(-paddleVelocity, 0);
        } else if (event.key == 's' || event.code == 'ArrowRight'){
            paddle.velocity = new Vec(paddleVelocity, 0);
        } else if (event.code == 'Tab'){
            resetGame(true);
        }
    });

    window.addEventListener('keyup', (event) => {
        if (event.key == 'a' || event.code == 'ArrowLeft'){
            paddle.velocity = new Vec(0, 0);
        } else if (event.key == 's' || event.code == 'ArrowRight'){
            paddle.velocity = new Vec(0, 0);
        }

        if(event.code == 'Space' && !box.inPlay) {
            if (!gameOver)
            {
                box.initVelocity();
            }
        }
    });
}



function drawScene(newTime) 

{        
    if (oldTime == undefined)
        {
            oldTime = newTime
        }
        let deltaTime = newTime - oldTime;
    
        // Clean the canvas so we can draw everything again
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        labelBlocks.draw(ctx, `${score}`);
        labelLife.draw(ctx, `Lives: ${lives}`);
        paddle.draw(ctx);
        upperBorder.draw(ctx);
        downBorder.draw(ctx);
        rightBorder.draw(ctx);
        leftBorder.draw(ctx);
         // Dibujar los bloques
        for (let i=0; i < blocks.length; i++)
        {
            blocks[i].draw(ctx);
        }
        box.draw(ctx);
    
        // Update the properties of the object
        box.update(deltaTime);
        paddle.update(deltaTime);
    
        if (boxOverlap(box, paddle)){
            const hitPosition = (box.position.x + box.width/2 - paddle.position.x) / paddle.width;
        
            const bounceAngle = (hitPosition * 120 - 60) * (Math.PI / 180); 
        
            const speed = box.velocity.magnitude();
            box.velocity.x = Math.sin(bounceAngle) * speed;
            box.velocity.y = -Math.abs(Math.cos(bounceAngle) * speed);
        } 
    
        if (boxOverlap(box, upperBorder)){
            box.velocity.y *= -1; 
        } else if (boxOverlap(box, leftBorder) || boxOverlap(box, rightBorder)) {
            box.velocity.x *= -1;
        }
    
        if (boxOverlap(box, downBorder)){
            box.reset();
            paddle.reset();
            lives--;
        } 
    
        for (let i=0; i< blocks.length; i++)
        {
            if (boxOverlap(box, blocks[i]) && blocks[i].visible == true){
                blocks[i].hits--;
                box.velocity.y *= -1;
                blocks[i].color ="rgb(255, 184, 224)";
                if (blocks[i].hits <= 0)
                {
                    blocks[i].deleteBlock();
                    score++;
                    break;
                }
                break;
            }
            
        }
    
        if (lives == 0) 
        {
            gameOver = true;
        }
        
        // Handle game over state
        if (gameOver) 
        {
            labelGameOver.draw(ctx, `Game over press Tab to restart`);
        
            oldTime = newTime;
            requestAnimationFrame(drawScene);
            return;
        }
    
        let allBlocksDestroyed = true;
        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i].visible) {
                allBlocksDestroyed = false;
                break;
            }
        }
        
        if (allBlocksDestroyed) {
            resetGame();
        }
    
        oldTime = newTime;
    
        requestAnimationFrame(drawScene);
    
}


