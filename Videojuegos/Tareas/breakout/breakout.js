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
const speedIncrease = 1.1;
const initialSpeed = 0.2;

let score = 0;

// Context of the Canvas
let ctx;

// Classes for the pong game
// Ball hereda los atributos y metodos de GameObject
class Ball extends GameObject
{
    constructor(position, width, height, color, velocity)
    {
        super(position, width, height, color, "ball"); // Llama al constructor de la clase padre, es decir GameObject
        this.initVelocity();
    }

    update(deltaTime)
    {

        this.position = this.position.plus(this.velocity.times(deltaTime));
    }

    initVelocity(){
        this.position = new Vec(canvasWidth / 2, (canvasHeight / 4)*3);
        
        //let angle = Math.random() * (Math.PI / 2) - (Math.PI /4);
        //To go slow with angles
        this.velocity = new Vec(Math.cos(angle), Math.sin(angle)).times(this.initialSpeed);

    }
    /*
    reset() {
        this.inPlay = false;
        this.position = new Vec(canvasWidth / 2, canvasHeight / 2);
        this.velocity = new Vec(0,0);
    }
    */
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

        if (this.position.y < 0){
            this.position.y = 0;
        } else if (this.position.y + this.height > canvasHeight){
            this.position.y = canvasHeight - this.height;
        }
    }
}

// An object to represent the ball to be displayed
const box = new Ball(new Vec(canvasWidth / 2, canvasHeight / 2), 10, 10, "red");
const leftPaddle = new Paddle(new Vec(20, canvasHeight / 2), 20, 100, "blue");
const rightPaddle = new Paddle(new Vec(canvasWidth - 40, canvasHeight / 2), 20, 100, "blue");

const upperBorder = new Paddle(new Vec(0, 0), canvasWidth, 10, "white");
const downBorder = new Paddle(new Vec(0, canvasHeight - 10), canvasWidth, 10, "white");

const rightBorder = new Paddle(new Vec(0, 0), 10, canvasHeight, "white");
const leftBorder = new Paddle(new Vec(canvasWidth - 10, 0), 10, canvasHeight, "white");

const goal = new Paddle(new Vec(0, 0), canvasWidth, canvasHeight, "green");

function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    //canvas.style.backgroundColor = 'grey';
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    drawScene(0);
    createEventListeners();
}

function createEventListeners() 
{
    window.addEventListener('keydown', (event) => {
        if (event.key == 'q'){
            leftPaddle.velocity = new Vec(0, -paddleVelocity);
        } else if (event.key == 'a'){
            leftPaddle.velocity = new Vec(0, paddleVelocity);
        } else if (event.key == 'o' || event.code == 'ArrowUp'){
            rightPaddle.velocity = new Vec(0, -paddleVelocity);
        } else if (event.key == 'l' || event.code == 'ArrowDown'){
            rightPaddle.velocity = new Vec(0, paddleVelocity);
        }
    });

    window.addEventListener('keyup', (event) => {
        if (event.key == 'q') {
            leftPaddle.velocity = new Vec(0, 0);
        } else if (event.key == 'a'){
            leftPaddle.velocity = new Vec(0, 0);
        } else if (event.key == 'o' || event.code == 'ArrowUp'){
            rightPaddle.velocity = new Vec(0, 0);
        } else if (event.key == 'l' || event.code == 'ArrowDown'){
            rightPaddle.velocity = new Vec(0, 0);
        }

        if(event.key == 's' && !box.inPlay) {
            box.initVelocity();
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

    box.draw(ctx);
    leftPaddle.draw(ctx);
    rightPaddle.draw(ctx);
    upperBorder.draw(ctx);
    downBorder.draw(ctx);
    rightBorder.draw(ctx);
    leftBorder.draw(ctx);

    // Update the properties of the object
    box.update(deltaTime);
    leftPaddle.update(deltaTime);
    rightPaddle.update(deltaTime);

    if (boxOverlap(box, leftPaddle) || boxOverlap(box, rightPaddle)){
        box.velocity.x *= -1;
        box.velocity = box.velocity.times(speedIncrease);
    } 
    if (boxOverlap(box, upperBorder) || boxOverlap(box, downBorder)){
        box.velocity.y *= -1;
    } 

    if (boxOverlap(box, rightBorder) || boxOverlap(box, leftBorder)){
        goal.draw(ctx);
    } 

    if (boxOverlap(box, rightBorder)){
        goal.draw(ctx);
        score += 1;
        console.log('score: ', score);
        box.reset();
        box.velocity.x *= -1;
    } 
    if (boxOverlap(box, leftBorder)){
        goal.draw(ctx);
        rightScore += 1;
        console.log('rightScore: ', rightScore);
        box.reset();
    } 

    // if(box.x > canvasWidth - box.size)
    // {
    //     box.direction *= -1;
    //     //box.speed += 0.5;
    // }
    // else if(box.x < 0)
    // {
    //     box.direction = 1;
    //     //box.speed += 0.5;
    // }

    oldTime = newTime;

    requestAnimationFrame(drawScene);
}

function restart(){
    box.draw(ctx);
}