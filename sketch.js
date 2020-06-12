//Global Variables
var bananaImage, obstacleImage, backImage, score, player, banana, obstacle, playerAnimation, ground, jungle, timesTouched, timesReduced, gameState;

function preload(){
  backImage = loadImage("jungle.jpg");
  
  playerAnimation = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(600,300);
  
  
  
  gameState = "play";
  
  timesTouched = 0;
  
  timesReduced = 0;
  
  //creating groups for bananas and obstacles
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  jungle = createSprite(300,150,600,300);
  jungle.addImage(backImage);
  jungle.velocityX = -3;
  jungle.x = jungle.width/2;
  jungle.scale = 1.5;
  
  //creating sprites for monkey
  player = createSprite(100,240,20,50);
  player.addAnimation("player",playerAnimation);
  player.scale = 0.1;
  
  ground = createSprite(300,250,400,10);
  ground.visible = false;
}

function draw(){
  background(255); 
  
  player.depth = jungle.depth+1
  
  if(gameState === "play"){
    if(jungle.x < 0){
      jungle.x = jungle.width/2
    }

    if(frameCount % 80 === 0){
      food();
    }

    if(frameCount % 300 === 0){
      obstacles();
    }

    if(keyDown("space")){
      player.velocityY = -14 
    }
    
    switch(score){
      case 10: player.scale = 0.12;
        break;
      case 20: player.scale = 0.14;
        break;
      case 30: player.scale = 0.16;
        break;
      case 40: player.scale = 0.18;
        break;  
      default: break; 
    }

    if(obstacleGroup.isTouching(player)){
      player.scale = 0.1;
      player.collide(ground);
      timesReduced++;
      obstacleGroup.destroyEach();
    }
    
    if(timesReduced === 2){
      gameState = "end";
    }
    
    score = 0;
    
    score = timesTouched + (Math.round(frameCount/getFrameRate()));
  }
  
  if(gameState === "end"){
    jungle.velocityX = 0;
    score = 0;
    timesTouched = 0;
    timesReduced = 0;
  }  
  
  player.velocityY++;
  
  player.collide(ground);
  
  drawSprites(); 
  
  
  stroke("white");
  textSize(20);
  fill("white");
  
  text("score "+score,500,50);
  
  if(foodGroup.isTouching(player)){
    timesTouched = timesTouched+2;
    foodGroup.destroyEach();
  }
}

function food(){
  
  //creating the sprite for the bananas and loading their image
  var banana = createSprite(600,150,10,10);
  banana.addImage(bananaImage);
  
  //scaling them and giving them velocity
  banana.scale = 0.05;
  banana.velocityX = -12;
  
  //reassigning a random y position
  banana.y = random(100,150);
  
  //assigning lifetime and adding them to group
  banana.lifetime = 50;
  foodGroup.add(banana);
} 

function obstacles(){
  
  //creating sprites for obstacles and loading their image
  var obstacle = createSprite(600,240,10,10);
  obstacle.addImage(obstacleImage);
  
  //scaling them and giving them velocity
  obstacle.scale = 0.09;
  obstacle.velocityX = -12;
  
  //giving them lifetime and adding them to the group
  obstacle.lifetime = 50;
  obstacleGroup.add(obstacle);
} 