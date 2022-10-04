function animate(timeStamp){
    // frames update
    c.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
 //   console.log(deltaTime)
    gameFrame++; //counting frames for animating objects
    window.requestAnimationFrame(animate);
    // drawing player
    genericObjects.forEach(genericObject =>{
        genericObject.draw();
    })
    // drawing platforms
    platforms.forEach(platform =>{
        platform.draw();
    })
    // drawing NPCs
    npcs.forEach(npc => {
        npc.update();
    })
    testBox.draw();
    game.update(deltaTime);
    fireball.draw();
    player.update();

    
 
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
        cloneGenericObjects.forEach(genericObject =>{
              genericObject.position.x +=3
        })
        npcs.forEach(npc => {
            npc.position.x +=5
        })

    } else if(keys.d.pressed){
        platforms.forEach(platform =>{
            platform.position.x -= 5
        })
        cloneGenericObjects.forEach(genericObject =>{
            genericObject.position.x -=3
        })
        npcs.forEach(npc => {
            npc.position.x -=5
        })
    }
    }

    // Player move sprite switcher

        if(keys.d.pressed){
            player.frameY = 1;
            player.offset.x = 60;
        } else if(keys.a.pressed){
            player.frameY = 11;
            player.offset.x = 30;
        } else if(lastKey == 'a'){
            player.frameY = 10;
        }
        else{
            player.frameY = 0;
            player.frameZ = 4;
        }


    // platforms collision detection !!! trzeba zrobić kolizję dolnej platformy
    platforms.forEach(platform =>{
        if(player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width && player.position.x <= platform.position.y + platform.height){
            player.velocity.y = 0
        }

        platform.draw();
    });

    // need fireball collision
 
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
}
