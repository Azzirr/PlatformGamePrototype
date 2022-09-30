const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
 
canvas.width = 1024;
canvas.height = 576;
 
const gravity = 0.5;
// frames for sprite sheets
let frameX = 0;
let frameY = 0;
let frameX1 = 0;
let gameFrame = 0;
const staggerFrames = 5;

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
const fireball = new Fireball();

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