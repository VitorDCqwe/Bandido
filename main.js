let bgImg;
let player;
let playerFrontImg;
let playerBackImg;
let playerLeftImg;
let playerRightImg;
let playerWalkFrontAnim;
let playerWalkBackAnim;
let playerWalkLeftAnim;
let playerWalkRightAnim;
let laser1;
let laser2;
let laserImg;
let lasersGroup;
let diamond;
let diamondImg;
let door;
let doorImg;
let doorOpenAnim;
let diamondCollected = false
let venceu = false;
let botaoReiniciar;
let gameOver = false;

function preload(){
    bgImg = loadImage("wip.png");
    playerFrontImg = loadImage("thiefFron.png");
    playerBackImg = loadImage("thiefBack.png");
    playerLeftImg = loadImage("thiefLeft.png");
    playerRightImg = loadImage("thiefRight.png");
    doorImg = loadImage("porta0.png");
    doorOpenAnim = loadAnimation("porta0.png","porta1.png","porta2.png","porta3.png","porta4.png","porta5.png");
    laserImg = loadImage("laser.png");
    diamondImg = loadImage("diamond.png");
    
}

function setup(){
    createCanvas(400, 400);

    player = createSprite(50,350,20,40);
    player.addImage("front", playerFrontImg);
    player.addImage("back", playerBackImg);
    player.addImage("left", playerLeftImg);
    player.addImage("right", playerRightImg);
    player.changeImage("right");
    player.scale = 1.5;

    diamond = createSprite(375,25,25,25);
    diamond.addImage("diamond", diamondImg);
    diamond.scale = 1.3;

    laser1 = createSprite(25,305,30,10);
    laser1.addImage("laser", laserImg);
    laser1.scale = 0.5;

    laser2 = createSprite(370,86,30,10);
    laser2.addImage("laser", laserImg);
    laser2.scale = 0.5;

    door = createSprite(383, 384, 20, 20) ;
    door.addImage("door", doorImg);
    door.addAnimation("doorOpen", doorOpenAnim);
    door.changeImage("door");
    door.scale = 6;

    botaoReiniciar = createButton("Jogar Novamente");
    botaoReiniciar.position(125, 420);
    botaoReiniciar.mousePressed(reiniciarJogo);
    botaoReiniciar.hide();

}

function draw(){
    
    background(0);
    imageMode(CENTER);
    image(bgImg, width/2, height/2, bgImg.width ,bgImg.height);

    if (!gameOver && !venceu) {
        if(keyDown("w") || keyDown("UP_ARROW")) {
            player.y -= 2.5;
            player.changeImage("back");
        }
            if(keyDown("s") || keyDown("DOWN_ARROW")){
            player.y += 2.5;
            player.changeImage("front");
        }
            if(keyDown("d") || keyDown("RIGHT_ARROW")){
            player.x += 2.5;
            player.changeImage("right");
        }
            if(keyDown("a") || keyDown("LEFT_ARROW")) {
            player.x -= 2.5;
            player.changeImage("left");
        }

        player.x = constrain(player.x, 0, width);
        player.y = constrain(player.y, 0, height);

        laser1.velocity.x = 8;
        if(laser1.x > width + 10){
            laser1.x = 50;
        }
        laser2.velocity.x = -9
        if(laser2.x < -10){
            laser2.x = 350;
        }

        if(laser1.overlap(player) || laser2.overlap(player)){
            laser1.velocity.x = 0;
            laser2.velocity.x = 0;
            player.velocity.x = 0;
            player.velocity.y = 0;
            gameOver = true;
            botaoReiniciar.show();
        }

        if(!diamondCollected && player.overlap(diamond)){
            diamondCollected = true;
            diamond.visible = false;
            door.changeAnimation("doorOpen");
            door.animation.looping = false;
        }

        if(diamondCollected && player.overlap(door)){
            venceu = true;
            laser1.velocity.x = 0;
            laser2.velocity.x = 0;
            botaoReiniciar.show();
        }

    }

    drawSprites();

    if(venceu){
        background(0);

        fill("green");
        textSize(24);
        textAlign(CENTER, CENTER);
        text("MISSÃO CUMPRIDA!", width/ 2, height/2);

        textSize(16);
        text("Você se tornou o Mestre do Roubo! 💎", width/2, height/2 + 40);
        textSize(14);
        text("Pressione R ou clique no botão para tentar novamente", width/2, height/2 + 80)
    }

    if(gameOver) {
        background("black");
        textSize(20);
        fill("red");
        textAlign(CENTER, CENTER);
        text("Você foi capturado pela polícia. 👮", width/2, height/2);
    }
    if((gameOver || venceu) && keyWentDown("r")) {
        reiniciarJogo();
    }
}

function reiniciarJogo() {
    gameOver = false;
    venceu = false;
    diamondCollected = false;

    player.x = 50;
    player.y = 350;
    player.changeImage("right");

    laser1.x = 25;
    laser1.y = 305;

    laser2.x = 370;
    laser2.y = 86;

    laser1.velocity.x = 8;
    laser2.velocity.x = -9;

    diamond.visible = true;
    diamond.x = 375;
    diamond.y = 25;

    door.changeImage("door")

    botaoReiniciar.hide()

}