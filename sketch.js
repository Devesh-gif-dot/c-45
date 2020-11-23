var PlayerState;
var player,rocks;
var rocksGroup;
var edges;
var bonus,bonusGroup;
var gameState = "play";
var restart;
var counter;
var score;

function setup() {
  createCanvas(800,400);
  player = createSprite(100,100,50,50);
  player.shapeColor = "white";
  
  counter = 500;
  PlayerState = "normal";
  edges = createEdgeSprites();

  rocksGroup = createGroup();
  bonusGroup = createGroup();

  restart = createButton("RESTART")
  restart.position(400,350);
  restart.mousePressed(()=>{
    gameState = "play"
  })
  score = 0;
}

function draw() {
  background("black");  

  player.bounceOff(edges);

  if(gameState === "play"){
      player.y = mouseY;
      restart.hide();
      createRocks();
      score = score + Math.round(getFrameRate()/60);
      text("score: "+ score,700,10);
      console.log(getFrameRate());
      if(PlayerState === "normal"){
        Bonus();
      }
      if(bonusGroup.collide(player)){
        PlayerState = "invincibility";
        console.log(counter);
      }
      if(PlayerState === "invincibility"){
        Invincibility();
        text("counter: "+counter,400,10);
        bonusGroup.setVelocityXEach(0);
        bonusGroup.setLifetimeEach(0);
        } 
      if(PlayerState === "normal"&&player.isTouching(rocksGroup)){
        gameState = "END";
      }

  }
  if(gameState === "END"){
        restart.show();
        rocksGroup.setVelocityXEach(0);
        rocksGroup.setLifetimeEach(-1);
        textSize(40); 
        text("Game Over",350,200);
        text("Score: "+ score,400,300);
        GameEnd();
      }

  drawSprites();

  //console.log(PlayerState);
  
}

function createRocks(){
  if(frameCount%120 === 0){
    rocks = createSprite(900,random(0,400),30,30);
    rocks.velocityX = -6;
    rocks.lifetime = 200;
    rocks.shapeColor = "red";
    rocksGroup.add(rocks);
  }
}

function Bonus(){
  if(frameCount%500 === 0){
    bonus = createSprite(900,random(0,400),30,30);
    bonus.velocityX = -9;
    bonus.lifetime = 150;
    bonus.shapeColor = rgb(212,175,55);
    bonusGroup.add(bonus);
  }
}

function GameEnd(){
  gameState === "End";

  bonusGroup.destroyEach();
  rocksGroup.destroyEach();
}
function Invincibility(){
   
  counter = counter - 1;
  if(counter === 0){
    PlayerState = "normal";
    bonusGroup.setVelocityXEach(-9);
    bonusGroup.setLifetimeEach(150);
  }
  console.log(counter);
}