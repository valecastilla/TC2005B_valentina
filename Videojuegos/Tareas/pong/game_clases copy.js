/* 

Collection of clases that will be used in games

Valentina Castilla
25/02/2025

*/

// Clase vector
class Vec
{
    // Constructor vector
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    // Metodos de la clase vector
    // Suma de vectores
    plus(other)
    {
        return new Vec(this.x + other.x, this.y + other.y);
    }

    // Resta de vectores
    minus(other)
    {
        return new Vec(this.x - other.x, this.y - other.y);
    }

    // Multiplicacion de un vector por un escalar
    times(scalar)
    {
        return new Vec(this.x * scalar, this.y * scalar);
    }

    // Magnitud de un vector
    magnitude()
    {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}

class Rect {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

class GameObject
{
    // Constructor GameObject
    constructor(position, width, height, color, type)
    {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;
    }

    // Metodos de la clase GameObject
    // Dibujar el objeto
    draw(cxt)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

function boxOverlap(obj1, obj2){
    return obj1.position.x + obj1.width > obj2.position.x && 
    obj1.position.x < obj2.position.x + obj2.width &&
    obj1.position.y + obj1.height > obj2.position.y &&
    obj1.position.y < obj2.position.y + obj2.height; 
}

class TextLabel {
    constructor(x, y, font, color) {
        this.x = x;
        this.y = y;
        this.font = font;
        this.color = color;
    }

    draw(ctx, text) {
        ctx.fillStyle = this.color;
        ctx.font = this.font;
        ctx.fillText(text, this.x, this.y);
    }
}
