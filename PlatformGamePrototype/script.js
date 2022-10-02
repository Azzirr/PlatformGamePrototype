const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
 
canvas.width = 1024;
canvas.height = 576;
 
const gravity = 0.5;
// frames for sprite sheets
// I should put local variables!
let frameZ = 4; //max frames in sprite sheet
let gameFrame = 0;
const staggerFrames = 5;

const player = new Player()
const platforms =
                [new Platform({x: 0, y: 532, width: 600, height: 40, image: document.querySelector('#platform1')}), // Platform 1 - ground
                 new Platform({x: 750, y: 400, width: 250, height: 30, image: document.querySelector('#platform2')}), // Platform 2 - jump
                 new Platform({x: 1200, y: 500, width: 250, height: 30, image: document.querySelector('#platform2')}), // Platform 3 - jump
                 new Platform({x: 1580, y: 532, width: 600, height: 40, image: document.querySelector('#platform1')}), // Platform 4 - ground
                ]
const testBox = new TestBox();
const game = new Game();
const enemy = new Enemy();
const fireball = new Fireball();
const genericObjects = [new GenericObject({x: 0, y: 0, image: document.querySelector('#background')}),
                        new GenericObject({x: 300, y: 200, image: document.querySelector('#genericObject1')})];
const cloneGenericObjects = genericObjects.slice();
cloneGenericObjects.splice(0, 1);
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
    },
    j: {
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
            lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a'
            break;
        case 'w':
            keys.w.pressed = true;
            break;
        case 'j':
            keys.j.pressed = true;
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
        case 'j':
            keys.j.pressed = false;
            break;
    }
})
