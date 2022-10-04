// Player and AttackBox class
class Player{
    constructor(color, offset = {x: 0, y: 0}, frameX = 0, frameY = 0, frameZ = 4){
        this.position = {
            x: 100,
            y: 100,
        },
        this.velocity = {
            x: 0,
            y: 0
        },
        this.width = 96 //szerokość
        this.height = 96 // wysokość
        this.color = color
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 30
        }
        this.isAttacking;
        this.health = 100;
        this.image = document.querySelector('#player');
        this.scale = 2;
        this.offset = {
            x: 60,
            y: 33
        }
        this.frameX = frameX;
        this.frameY = frameY;
        this.frameZ = frameZ;
        
    }
    // player draw
    draw(){
        // player
        c.fillStyle  = `rgb(0, 128, 0, 0.4)`
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        // attack box => bug with attack from right
        if(this.isAttacking && lastKey === 'd'){
            c.fillStyle = 'pink'
            c.fillRect(this.attackBox.position.x + 50, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }else if(this.isAttacking && lastKey ==='a'){
            c.fillStyle = 'pink'
            c.fillRect(this.attackBox.position.x - 50, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
 
    }
 
    update(){
        this.draw();
        this.position.x = this.position.x + this.velocity.x
        this.position.y = this.position.y + this.velocity.y
        c.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.position.x - this.offset.x, this.position.y - this.offset.y, this.width * this.scale, this.height * this.scale)

        // gravity
        if (this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y = this.velocity.y + gravity
        }
        if(gameFrame % staggerFrames == 0){
            if (this.frameX < this.frameZ){
                this.frameX++
            }else{
                this.frameX = 0;
            }
        }
    }
    // player attacks an enemy
    attack(){
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100)
    }
};

class NPC{
    constructor({x, y, width, height, image, frameX = 0, frameY = 0, frameZ = 9}){
        this.position = {
            x,
            y
        },
        this.width = 162 //szerokość
        this.height = 162 // wysokość
        this.image = image;
        this.scale = 2.5;
        this.frameX = frameX;
        this.frameY = frameY;
        this.frameZ = frameZ;
        this.offset = {x: -25, y: -50}
    }
    
    // draw(){
    //     c.fillStyle  = 'white'
    //     c.fillRect(this.position.x, this.position.y, this.width, this.height)
    // }
 
    update(){
   //     this.draw();
        c.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.position.x - this.offset.x, this.position.y - this.offset.y, this.width * this.scale, this.height * this.scale)
        c.font = '14px sans-serif'
        c.fillText('Janusz von Bimbersztajn', this.position.x + 5, this.position.y + 35)

        if(gameFrame % staggerFrames == 0){
            if (this.frameX < this.frameZ){
                this.frameX++
            }else{
                this.frameX = 0;
            }
        }
    }
}

// class for enemy properties
class Game{
    constructor(){
        this.enemies = [];
        this.enemyInterval = 400 // time that declares how much time program need to push new enemy
        this.enemyTimer = 0; // counts the time for enemyInterval
        this.#addNewEnemy();
    }
    draw(){
        this.enemies.forEach(object => object.draw())
    }
    update(){
        if (this.enemyTimer > this.enemyInterval){
            this.#addNewEnemy();
            this.enemyTimer = 0;
        } else {
            this.enemyTimer++;
        }
        this.draw();
        this.enemies.forEach(object => object.update())
        this.enemies = this.enemies.filter(object => !object.markedForDeletion)
    }
    
    #addNewEnemy(){
        this.enemies.push(new Fireball(this));
    }
}
// class with Enemies
class Enemy {
    constructor(game, scale = 2){
        this.game = game;
        this.position = {
            x: canvas.width,
            y: Math.random() * canvas.height,
        }
        this.markedForDeletion = false; // if this is true an object get to fuck out
        this.scale = scale

    } 
    update(){
        if (keys.a.pressed && player.position.x === 100){
                this.position.x += 5
        } else if(keys.d.pressed && player.position.x === 400){
                this.position.x -= 5
        }
        this.position.x = this.position.x - 6.5;
        if (this.position.x < 0 - this.width){
            this.markedForDeletion = true;
        }
    };
}

class Fireball extends Enemy{
    constructor(game, frameX = 0){
        super(game);
        this.width = 31;
        this.height = 24;
        this.position = {
            x: canvas.width,
            y: Math.random() * canvas.height,
        }
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 60
        }
        this.image = document.querySelector('#fireball');
        this.frameX = frameX;
    }
    draw(){
        c.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.position.x, this.position.y, this.width * (this.scale * 2), this.height * (this.scale * 2.5))
        if(gameFrame % staggerFrames == 0){
            if (this.frameX < 6){
                this.frameX++
            }else{
                this.frameX = 0;
            }
        }
        // change values of height and attackbox.position.y!!!
        //c.fillRect(this.attackBox.position.x, this.attackBox.position.y + 30, this.attackBox.width, this.attackBox.height)
    }
}
 
class Platform{
    constructor({x, y, width, height, image}){
        this.position = {
            x, // x is calling x from object (constructor({x,y}))
            y
        },
        this.image = image
        this.width = width; // szerokość
        this.height = height; // wysokość
    }
// drawing yellow platforms
        draw(){
            c.fillStyle = 'yellow'
            c.fillRect(this.position.x, this.position.y, this.width, this.height)
            c.drawImage(this.image, this.position.x, this.position.y)
        }
}

class GenericObject{
    constructor({x, y, width, height, image}){
        this.position = {
            x, // x is calling x from object (constructor({x,y}))
            y
        },
        this.image = image
        this.width = image.width; // szerokość
        this.height = image.height; // wysokość
    }
// drawing yellow platforms
        draw(){
            c.drawImage(this.image, this.position.x, this.position.y)
        }
}















// class for collision tests
class TestBox{
    constructor(color){
        this.position = {
            x: 250,
            y: 430,
 
        },
        this.width = 100 //szerokość
        this.height = 100 // wysokość
        this.color = color
    }
    draw(){
        // player
        c.fillStyle = 'purple'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.fillText('Test Box!', this.position.x + 30, this.position.y - 20, this.width)
 
    }
}
