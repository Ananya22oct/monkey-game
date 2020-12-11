
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstaclesImage
var foodGroup, obstaclesGroup
var score=0;
var ground;
var survivalTime=0;
var foodGroup;
var gameState="PLAY";


function preload(){
  //loading images
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaclesImage = loadImage("obstacle.png");
  
  gameOverImage=loadImage("gameOver.png");
 
}



function setup() {
  //creating monkey and ground sprite;
  monkey=createSprite(80,315,20,20);
 monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
 
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-10;
  ground.x=ground.x/2;
  console.log(ground.x);
  
  //making new groups
  foodGroup=new Group();
  obstaclesGroup=new Group();
  
}
        

function draw() {
  //assign background
  background("pink");
  
  if(gameState==="PLAY"){ 
  //destroy foodGroup if it touches monkey
  if(foodGroup.isTouching(monkey))
    {
      foodGroup.destroyEach();
      score=score+2;
      survivalTime=survivalTime+5;
    }
  //making monkey collide with ground
   monkey.collide(ground);
    
   if(ground.x<0){
    //To give infinite scrolling effect to ground
    ground.x=ground.width/2;
  }
  //making the monkey jump
  if(keyDown("space") && monkey.y >= 150) {
      monkey.velocityY = -17;
    }
  //assign gravity
  monkey.velocityY=monkey.velocityY+1;
    
     food();
  obstacles();
    //texting score
     stroke("white");
  textSize(20);
  fill("white");
  text("score:" +score,30,45);
  //texting survival time
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.round(frameCount/60);
  text("survivalTime: "+survivalTime,200,45);

  //change the gamestate 
  if(obstaclesGroup.isTouching(monkey)){
    gameState="END"
  }
}
  if(gameState==="END"){
    //assign velocity
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    //destroying the sprites
    foodGroup.destroyEach();
    obstaclesGroup.destroyEach();
    monkey.destroy();
    ground.destroy();
    
    //texting gameover
    stroke("black");
    fill("black");
     textSize(50);
    text("GAME OVER",50,200);
   
  }
  //drawing the sprites
 drawSprites();
}
function food(){
  if(frameCount % 150===0){
    //creating banana sprite
    banana=createSprite(600,Math.round(120,200),10,10);
    //adding image
    banana.addImage(bananaImage);
    //reducing the size
    banana.scale=0.1 ;
     //assign velocity
    banana.velocityX=-(5+score/10);
    //assign lifetime
    banana.lifetime=300;
    //adding obstacles to obstaclesGroup
    foodGroup.add(banana);
  }
}

function obstacles(){
   if(frameCount % 150===0){
     //creating obstacles sprites
    obstacle=createSprite(600,330,10,10);
     //adding image
    obstacle.addImage(obstaclesImage);
     //reducing the size
     obstacle.scale=0.1;
     //assign velocity
    obstacle.velocityX=-(5+score/10);
      //assign lifetime
    obstacle.lifetime=300;
     //adding obstacles to obstaclesGroup
     obstaclesGroup.add(obstacle);
     
}
}





