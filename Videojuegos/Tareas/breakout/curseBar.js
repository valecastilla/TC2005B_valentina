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

// Context of the Canvas
let ctx;

// Classes for the pong game
let barwidth = 100;
let cursewidth = barwidth;

class Bar extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "bar"); // Llama al constructor de la clase padre, es decir GameObject
    }

    update() {
        if (this.width > 0) {
            this.width -= 0.1;
        }
        else {
            this.width = 0;
        }
    }
}

const bar = new Bar (new Vec(canvasWidth / 2, canvasHeight / 2), barwidth, 20, "white");
let curse = new Bar (new Vec(canvasWidth / 2, canvasHeight / 2), cursewidth, 20, "red");

function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById("canvas");
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext("2d");

    drawScene(0);

}

function drawScene(newTime) {
    if (oldTime == undefined) {
        oldTime = newTime;
    }
    let deltaTime = newTime - oldTime;


    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    bar.draw(ctx);
    curse.draw(ctx);

    //curse -= deltaTime;
    //curse.update(deltaTime);
    curse.update();
    
    if (curse.width > barwidth / 4 * 3 && curse.width < barwidth) {
        curse.color = "rgb(89, 214, 89)";
    }
    else if (curse.width > barwidth / 2 && curse.width < barwidth / 4 * 3) {
        curse.color = "rgb(238, 195, 1)";
    }
    else if (curse.width > barwidth / 4 && curse.width < barwidth / 2) {
        curse.color = "rgb(222, 152, 23)";
    }
    else if (curse.width > 0 && curse.width < barwidth / 4) {
        curse.color = "rgb(175, 17, 17)";
    }

    oldTime = newTime;

    requestAnimationFrame(drawScene);
}
