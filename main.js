let bgImg;
let player;
let laser1;
let laser2;
let diamond;
let door;
let lasersGroup;
let playerFrontImg;
let playerBackImg;
let playerLeftImg;
let playerRightImg;
let playerWalkFrontAnim;
let playerWalkBackAnim;
let playerWalkLeftAnim;
let playerWalkRightAnim;
let doorImg;
let doorOpenAnim;

function preload(){
    bgImgLoadImage("wip.png");
    playerFrontImg = loadImage("");
    playerBackImg = loadImage("");
    playerLeftImg = loadImage("");
    playerRightImg = loadImage("");
    doorImg = loadImage("");
    doorOpenAnim = loadImage("");
    laserImg = loadImage("");
    diamondImg = loadImage("");

}

function setup(){
    createCanvas(400, 400);

    bg = createSprite(200,200,400.400);
    bg.addImage("Fundo", bgImg);

}

function draw(){
    background(0);
    imageMode(CENTER);
    image(bgImg, width/2, height/2, bgImg.width*12,bgImg.height*12)
}