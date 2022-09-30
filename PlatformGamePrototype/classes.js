// Player and AttackBox class
class Player{
    constructor(color){
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
    }
    // player draw
    draw(){
        // player
        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        

        // attack box
        if(this.isAttacking && lastKey === 'd'){
            c.fillStyle = 'pink'
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }else if(this.isAttacking && lastKey ==='a'){
            c.fillStyle = 'pink'
            c.fillRect(this.attackBox.position.x - 50, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
 
    }
 
    update(){
        this.draw();
        this.position.x = this.position.x + this.velocity.x
        this.position.y = this.position.y + this.velocity.y
        c.drawImage(this.image, frameX1 * this.width, 0, this.width, this.height, this.position.x, this.position.y, this.width, this.height)

        // gravity
        if (this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y = this.velocity.y + gravity
        }

        if(gameFrame % staggerFrames == 0){
            if (frameX1 < 4){
                frameX1++
            }else{
                frameX1 = 0;
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
            console.log(this.enemies)

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
        console.log(this.game)
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
        this.position.x = this.position.x - 5;
        if (this.position.x < 0 - this.width){
            this.markedForDeletion = true;
        }
    };
}

class Fireball extends Enemy{
    constructor(game){
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
    }
    draw(){
        c.drawImage(this.image, frameX * this.width, 0, this.width, this.height, this.position.x, this.position.y, this.width * (this.scale * 2), this.height * (this.scale * 2.5))
        if(gameFrame % staggerFrames == 0){
            if (frameX < 6){
                frameX++
            }else{
                frameX = 0;
            }
        }
        // change values of height and attackbox.position.y!!!
        //c.fillRect(this.attackBox.position.x, this.attackBox.position.y + 30, this.attackBox.width, this.attackBox.height)
    }
}
 
class Platform{
    constructor({x, y, width, height}){
        this.position = {
            x, // x is calling x from object (constructor({x,y}))
            y
        },
        this.width = width; // szerokość
        this.height = height; // wysokość
    }
// drawing yellow platforms
        draw(){
            c.fillStyle = 'yellow'
            c.fillRect(this.position.x, this.position.y, this.width, this.height)
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