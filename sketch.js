var PLAY = 1;
var END = 0;
var gameState = PLAY;


var monkey, monkey_running, monkeycollide;
var ground, invisibleGround, groundImage;

var bananasGroup, bananaimg;
var obstaclesGroup, obstacleimg;
var bg, bgimg;

var score = 0;

var gameover, gameimg;
var restart, restartimg;


function preload(){
  bgimg = loadImage("jungle.jpg");
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

  monkey_collided = loadImage("Monkey_collided.png");
  
  obstacleimg = loadImage("stone.png");
  bananaimg = loadImage("banana.png");
  
  gameimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 300);
  
  bg = createSprite(300, 50);
  bg.addImage("bg" , bgimg);
  bg.scale = 0.8;
  
  monkey = createSprite(70,265,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  monkey.addAnimation("collided", monkey_collided);
  
  invisibleGround = createSprite(200,265,400,10);
  invisibleGround.visible = false;
  
  gameover = createSprite(300, 100);
  gameover.addImage(gameimg);
  gameover.scale = 0.5;
  gameover.visible = false;
  
  restart = createSprite(300, 140);
  restart.addImage(restartimg);
  restart.scale = 0.5;
  restart.visible = false;
  
  obstaclesGroup = new Group();
  bananasGroup = new Group();
  score = 0;
  
  
}

function draw() {
  background(180);
    
  if (gameState === PLAY) {
      if(keyDown("space")) {
         monkey.velocityY = -10;
      }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    if (bananasGroup.isTouching(monkey)) {
       score = score + 2; 
        bananasGroup.destroyEach();
      }
    
    switch (score) {
          case 10: monkey.scale = 0.12;
                  break;
          case 20: monkey.scale = 0.14;
                  break;
          case 30: monkey.scale = 0.16
                  break;
          case 40: monkey.scale = 0.18;
                  break;
                  default: break;
      }
  
      monkey.collide(invisibleGround);
      spawnObstacles();
      spawnbananas();
    
    if (obstaclesGroup.isTouching(monkey)) {
        gameState  = END;
      }
  }
  else if (gameState === END) {
    gameover.visible = true;
    restart.visible = true;
    monkey.velocityY = 0;
    
    obstaclesGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);
    
    monkey.changeAnimation("collide", monkey_collided);
    
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
  }
  if(mousePressedOver(restart)) {
    reset();
  }
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function reset(){
  gameState = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  bananasGroup.destroyEach();
  
  monkey.changeAnimation("running", monkey_running);
  
  score = 0;
  
}
  
function spawnbananas() {
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(100,160));
    banana.addImage(bananaimg);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //add each cloud to the group
    bananasGroup.add(banana);
  }
  
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(600,250,10,40);
    obstacle.addImage("stone", obstacleimg);
    obstacle.velocityX = -4;
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}