const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
 
canvas.width = 1024;
canvas.height = 576;
 
const gravity = 0.5;
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
        this.width = 50 //szerokość
        this.height = 100 // wysokość
        this.color = color
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 30
        }
        this.isAttacking;
        this.health = 100;
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
 
        // gravity
        if (this.position.y + this.height + this.velocity.y <= canvas.height){
            this.velocity.y = this.velocity.y + gravity
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
        this.width = 100;
        this.height = 100;
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
    // I probably don't need that
    draw(){
        c.fillStyle = 'red'
        //c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }
}
class Fireball extends Enemy{
    constructor(game){
        super(game);
        this.spriteWidth = 32;
        this.spriteHeight = 24;
        let frameX = 0;
        let frameY = 0;
        let gameFrame = 0;
        const staggerFrames = 5;
        this.width = 32;
        this.height = 24;
        this.position = {
            x: canvas.width,
            y: Math.random() * canvas.height,
        }
        this.image = document.querySelector('#fireball');
    }
    draw(){
        c.drawImage(this.image, this.position.x, this.position.y, this.width * (this.scale * 2), this.height * (this.scale * 2.5))
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
 
const player = new Player()
const platforms =
                [new Platform({x: 0, y: 532, width: 1000, height: 40}), // Platform 1 - ground
                 new Platform({x: 1050, y: 400, width: 250, height: 20}), // Platform 2 - jump
                 new Platform({x: 1290, y: 500, width: 250, height: 20}), // Platform 3 - jump
                 new Platform({x: 1580, y: 532, width: 600, height: 40}), // Platform 4 - ground
                ]
const testBox = new TestBox();
const game = new Game();
const enemy = new Enemy();
// Game platforms
 
let lastKey;
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    }
}
// animate and refresh frames
let lastTime = 1;

function animate(timeStamp){
    // frames update
    c.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
 //   console.log(deltaTime)
    window.requestAnimationFrame(animate);
    // drawing player
    player.update();
    // drawing platforms
    platforms.forEach(platform =>{
        platform.draw();
    })
    testBox.draw();
    game.update(deltaTime);
 
    // player movement
    player.velocity.x = 0;
    if(keys.d.pressed && player.position.x < 400){
        player.velocity.x = 5
    } else if (keys.a.pressed && player.position.x > 100){
        player.velocity.x = - 5
    } else{
        player.velocity.x = 0
    // background scroll
    if (keys.a.pressed){
            platforms.forEach(platform =>{
                platform.position.x += 5
        })
        }
        else if(keys.d.pressed){
            platforms.forEach(platform =>{
                platform.position.x -= 5
            })
        }
    }
    // jump
    if(keys.w.pressed){
        player.velocity.y = -8
    }
    // platforms collision detection !!! trzeba zrobić kolizję dolnej platformy
    platforms.forEach(platform =>{
        if(player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width && player.position.x <= platform.position.y + platform.height){
            player.velocity.y = 0
        } 
        platform.draw();
    });

 
    // attack conditions => replace textBox to enemyHitBox
    if(lastKey === 'd' && player.isAttacking && player.attackBox.position.x + player.attackBox.width >= testBox.position.x && player.attackBox.position.x < testBox.position.x + testBox.width && player.attackBox.position.y + player.attackBox.height >= testBox.position.x + testBox.width && player.attackBox.position.y <= testBox.position.y + testBox.height){
            player.isAttacking = false;
            console.log('Attacked from right!')
    } else if(lastKey === 'a' && player.isAttacking && player.attackBox.position.x + player.attackBox.width >= testBox.position.x && player.attackBox.position.y + player.attackBox.height >= testBox.position.y && player.attackBox.position.y + player.attackBox.height >= testBox.position.y && player.attackBox.position.y <= testBox.position.y + testBox.height){
            player.isAttacking = false;
            console.log('Attacked from left!')
    }
   
 
 
    // death conditions
    // condition 1 - death by fall down
    if(player.position.y > canvas.height){

        console.log('You lose!');
    }
 
 
   
    gameFrame++
}
 
 
 
animate();
 
// player movement
 
addEventListener("keydown", (event) => {
   
    switch (event.key){
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd'
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a'
            break;
        case 'w':
            keys.w.pressed = true;
            break;
        case ' ':
            player.attack();
            break;
       
    }
})
 
// player movement stop
 
addEventListener("keyup", (event) => {
   
    switch (event.key){
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;
    }
})
 
 
 

