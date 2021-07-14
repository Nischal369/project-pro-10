var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["f4ab51cb-d474-4b8b-8083-fe6c772b1330","35752887-db37-4bd0-a67b-6b0023208038","63cb4ec9-e7bc-4a49-ae71-3b34729dfa81"],"propsByKey":{"f4ab51cb-d474-4b8b-8083-fe6c772b1330":{"name":"retroaliens_25_1","sourceUrl":"assets/api/v1/animation-library/gamelab/gVjFhS3G.mFm4Jy8mgZBPmTQjCd36dHy/category_retro/retroaliens_25.png","frameSize":{"x":356,"y":356},"frameCount":1,"looping":true,"frameDelay":2,"version":"gVjFhS3G.mFm4Jy8mgZBPmTQjCd36dHy","categories":["retro"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":356,"y":356},"rootRelativePath":"assets/api/v1/animation-library/gamelab/gVjFhS3G.mFm4Jy8mgZBPmTQjCd36dHy/category_retro/retroaliens_25.png"},"35752887-db37-4bd0-a67b-6b0023208038":{"name":"retro_powerup_coin_1","sourceUrl":"assets/api/v1/animation-library/gamelab/NLtwV2Syoag9LPwdF8r91wCF6jRKYq07/category_retro/retro_powerup_coin.png","frameSize":{"x":352,"y":352},"frameCount":1,"looping":true,"frameDelay":2,"version":"NLtwV2Syoag9LPwdF8r91wCF6jRKYq07","categories":["retro"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":352,"y":352},"rootRelativePath":"assets/api/v1/animation-library/gamelab/NLtwV2Syoag9LPwdF8r91wCF6jRKYq07/category_retro/retro_powerup_coin.png"},"63cb4ec9-e7bc-4a49-ae71-3b34729dfa81":{"name":"retroaliens_21_1","sourceUrl":"assets/api/v1/animation-library/gamelab/K9EpOkpRKq.sejaHAWAeqjtwQI7sfWZl/category_retro/retroaliens_21.png","frameSize":{"x":356,"y":400},"frameCount":1,"looping":true,"frameDelay":2,"version":"K9EpOkpRKq.sejaHAWAeqjtwQI7sfWZl","categories":["retro"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":356,"y":400},"rootRelativePath":"assets/api/v1/animation-library/gamelab/K9EpOkpRKq.sejaHAWAeqjtwQI7sfWZl/category_retro/retroaliens_21.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var player_paddle = createSprite(200, 340, 60,60);
player_paddle.shapeColor = "blue";
player_paddle.setAnimation("retroaliens_25_1");
player_paddle.scale= 0.1;
var gameState = "serve";

var computer_paddle = createSprite(200, 60, 60,60);
computer_paddle.shapeColor = "red";
computer_paddle.setAnimation("retroaliens_21_1");
computer_paddle.scale= 0.1;

var goal1 = createSprite(200,   0, 150, 40);
goal1.shapeColor = "yellow";
var goal2 = createSprite(200, 400, 150, 40);
goal2.shapeColor = "yellow";

var striker = createSprite(200, 200, 10, 10);
striker.setAnimation("retro_powerup_coin_1");
striker.shapeColor = "yellow";
striker.scale= 0.1;

var compscore = 0;
var playerscore = 0;

createEdgeSprites();

function draw() {
  background("green");
  
  textSize(18);
  fill("orange");
  text("compscore"+compscore, 25, 225);
  text("playerscore"+playerscore, 25, 185);
  
  drawNet();
  
  striker.bounceOff(topEdge);
  striker.bounceOff(bottomEdge);
  striker.bounceOff(rightEdge);
  striker.bounceOff(leftEdge);
  striker.bounceOff(computer_paddle);
  striker.bounceOff(player_paddle);
  computer_paddle.bounceOff(rightEdge);
  computer_paddle.bounceOff(leftEdge);
  player_paddle.bounceOff(leftEdge);
  player_paddle.bounceOff(rightEdge);
  
 if (striker.isTouching(goal1) || striker.isTouching(goal2)) {
    if (striker.bounceOff(goal1)) {
      playerscore = playerscore + 1;
    
    }
    if (striker.bounceOff(goal2)) {
      compscore = compscore + 1;
    }
   }
  //serve state
  if (gameState == "serve") {
    textSize(17);
    fill("yellow");
    text("Press space to strike", 150, 180);
    playSpeech("Press Space To Strike", "male", "English");
    
    if (keyDown("space")) {
      
      striker.velocityY = 2;
      striker.velocityX = 4;
      gameState = "play";
      
    }
    
  }
  //play state
  if (gameState == "play") {
    if (keyDown("right")) {
        player_paddle.x += 10;
      }
  
      if (keyDown("left")) {
        player_paddle.x -= 10;
      }
  
      computer_paddle.x = striker.x;
      
      if (playerscore==5 || compscore==5) {
        gameState = "end";
      }
      
  }
  
  //end state
  
  if(gameState == "end"){
    
    striker.velocityX = 0;
    striker.velocityY = 0;
    
    computer_paddle.velocityX = 0;
    computer_paddle.x = 200;
    
    player_paddle.velocityX = 0;
    player_paddle.x = 200;
    
    striker.x = 200;
    striker.y = 240;
    striker.velocityX = 0;
    striker.velocityY = 0;
    fill("red");
    textSize(20);
    text("gameover!", 140,200);
  }
  
  drawSprites();
}

function drawNet() {
  
  for (var i = 0; i<=400; i=i+19) {
  line(i,200,i+10,200);
  }
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
