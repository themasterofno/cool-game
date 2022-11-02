var PLAY = 1;
var END = 0;
var gameState = PLAY;


var dog, dogImg
var path, pathImg
var bone, boneImg
var log, logImg
var ground, invisGround
var gameOver, gameOverImg;


var logGroup
var boneGroup
var score=0




function preload(){
    dogImg=loadImage("dog1.png")
    pathImg=loadImage("path.jpeg")
    boneImg=loadImage("bone.png")
    logImg=loadImage("log.png")
    gameOverImg=loadImage("GameOver.png")



}

function setup() {
    createCanvas(windowWidth,windowHeight);

    ground=createSprite(width/2,height-90,width,10)
    ground.velocityX=-3

    path=createSprite(width/2,height/2,width,height)
    path.addImage(pathImg)
    path.scale=5
    path.velocityX=-3

    dog=createSprite(150,height-175,60,50)
    dog.addImage(dogImg)
    dog.scale=0.7

    boneGroup=new Group()
    logGroup= new Group()

    gameOver = createSprite(width/2,height/2- 50);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.5;  
    gameOver.visible = false;

}


function draw() {

 console.log(score)

    
    if (gameState===PLAY){

        if (ground.x<width/2-25){
            ground.x=width/2
        }
    
        if(path.x<width/2-255){
            path.x=width/2
        }
    
        if(keyDown("space")&& dog.y>=height-300){
            dog.velocityY=-13
    
        }
        dog.velocityY=dog.velocityY+0.8
        dog.collide(ground)
        
        score = score + Math.round(getFrameRate()/60);
        ground.velocityX = -(6 + 3*score/100);

    bones()
    logs()

    if(boneGroup.isTouching(dog)){
        score = score + 100;
        logGroup.destroyEach()

    }

    if(logGroup.isTouching(dog)){
        gameState = END;
    }
}

else if (gameState === END) {
    gameOver.visible = true;
    
    ground.velocityX = 0;
    dog.velocityY = 0;

    path.velocityX = 0;
    ground.velocityX = 0;

    logGroup.setVelocityXEach(0);
    boneGroup.setVelocityXEach(0);
    
    
    logGroup.setLifetimeEach(-1);
    boneGroup.setLifetimeEach(-1);
}   
drawSprites()
textSize(20);
fill("black")
text("Score: "+ score,30,50);
  }

 
function bones(){
    if(frameCount%240===0){
        bone=createSprite(width,height-175)
        bone.addImage(boneImg)
        bone.scale=0.2
        bone.velocityX=-12
        bone.lifetime=300

        boneGroup.add(bone)
    }


}

function logs(){
    if(frameCount%200===0){
        log=createSprite(width,height-165)
        log.addImage(logImg)
        log.scale=0.4
        log.velocityX=-12
        log.lifetime=300

        logGroup.add(log)


    }
}

