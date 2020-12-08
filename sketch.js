//to create variable
var PLAY = 1;
var END = 0;
var gameState = 1;

var monkey,monkeyImage,monkeyCollided;
var obstacle,obstacleImage,obstacleGroup;
var banana,bananaImage,bananaGroup;
var ground;
var survivalTime=0;
var score = 0;

function preload(){
  
  //to load images
  monkeyImage = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkeyCollided = loadAnimation("sprite_0.png");
  
  obstacleImage = loadImage("obstacle.png");
  bananaImage = loadImage("banana.png");

 
}



function setup() {
  
  //to create canvas
  createCanvas(400,400);
  
  //to create monkey sprite
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("running",monkeyImage);
  monkey.addAnimation("monkey",monkeyCollided)
  monkey.scale = 0.1;
  
  
  //to create ground sprite
  ground = createSprite(400,350,1100,20);
  ground.velocityX = -(3+3*score/10);
  ground.x = ground.width/2;
  
  //to create group 
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  survivalTime = 0;
  score = 0;
  
}


function draw() {
  
  //to clear te background
  background("skyblue");
  
  textSize(20);
  fill("white")
  text("Score: "+ score,150,70);
  
  if (gameState === PLAY){
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
      score = score+2;
    }
    
    survivalTime=Math.ceil(frameCount/frameRate());
    
    bananas();
    obstacles();
    
    //jump the monkey when space is press
  if(keyDown("space")&& monkey.y >=100) {
      monkey.velocityY = -13
  }
    
  // to give gravity to the monkey
  monkey.velocityY = monkey.velocityY + 0.8;
    
    
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
    
  }
  if(gameState === END){
    ground.velocityX = 0;
    
    monkey.velocityY = 0;
    monkey.changeAnimation("monkey",monkeyCollided)
    
    obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
    
    bananaGroup.setLifetimeEach(-3)
    obstacleGroup.setLifetimeEach(-3);
    
  }
  
  
  
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Survival Time: "+ survivalTime,100,50);
  
  
  
  //to collide the monkey with the ground
  monkey.collide(ground);
  
  
  
  //to draw the sprites
  drawSprites();

  
}

function bananas(){
  if (frameCount % 80 === 0){
    banana = createSprite(400,150,20,20);
    banana.addImage("banana",bananaImage);
    banana.y = Math.round(random(120,200));
    banana.velocityX = -(3+3*score/50);
    banana.lifetime = 150;
    banana.scale = 0.1
    bananaGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(400,320,25,25);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.velocityX = -(3+3*score/50);
    obstacle.lifetime = 140;
    obstacleGroup.add(obstacle);
    obstacle.scale = 0.1;
  }
}