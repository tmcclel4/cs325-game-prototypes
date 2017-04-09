window.onload = function() {
   
    "use strict";
   
 var game = new Phaser.Game( 1000, 750, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render:render } );
  
    function preload() {
       
        game.load.image('Background', 'assets/road.png');
        game.load.image('chevy', 'assets/chevy.png');
        game.load.image('chevy2', 'assets/suburban.png');
        game.load.image('ferrari', 'assets/ferrari.png');
        game.load.image('cadillac', 'assets/cadillac.png');
        game.load.spritesheet('explosions', 'assets/explosion.png', 64, 64, 24);

    }
    

    var count;
    var background;
    var car1;
    var car2;
    var car3;
    var car4;
    var car1Throttle;
    var car2Throttle;
    var car3Throttle;
    var car4Throttle;
    var car1cross;
    var car2cross;
    var car3cross;
    var car4cross;
    var car1score;
    var car2score;
    var car3score;
    var car4score;
    var car1left;
    var car1right;
    var car2left;
    var car2right;
    var car3left;
    var car3right;
    var car4left;
    var car4right;
    var state;
    var style;
    var text;
    var counter;
    var end;
    var explosion;
    var anim;
    var max;

    function create() {

        state = 1;
        car1Throttle = game.input.keyboard.addKey(Phaser.Keyboard.N);
        car1left = game.input.keyboard.addKey(Phaser.Keyboard.B);
        car1right = game.input.keyboard.addKey(Phaser.Keyboard.M);
        car2Throttle = game.input.keyboard.addKey(Phaser.Keyboard.C);
        car2left = game.input.keyboard.addKey(Phaser.Keyboard.X);
        car2right = game.input.keyboard.addKey(Phaser.Keyboard.V);
        car3Throttle = game.input.keyboard.addKey(Phaser.Keyboard.A);
        car3left = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        car3right = game.input.keyboard.addKey(Phaser.Keyboard.Z);
        car4Throttle = game.input.keyboard.addKey(Phaser.Keyboard.L);
        car4left = game.input.keyboard.addKey(Phaser.Keyboard.K);
        car4right = game.input.keyboard.addKey(Phaser.Keyboard.P);
        game.input.keyboard.addKeyCapture([ Phaser.Keyboard.A, Phaser.Keyboard.C, Phaser.Keyboard.L, Phaser.Keyboard.N, Phaser.Keyboard.X, Phaser.Keyboard.V, 
                                           Phaser.Keyboard.Q, Phaser.Keyboard.Z, Phaser.Keyboard.B, Phaser.Keyboard.M, Phaser.Keyboard.K, Phaser.Keyboard.P]);
        max = 0;
        count = 0;
        counter = 0;
        car1score = 0;
        car2score = 0;
        car3score = 0;
        car4score = 0;
        car1cross = false;
        car2cross = false;
        car3cross = false;
        car4cross = false;

        //set backround
        background = game.add.tileSprite(0, 0, 1000, 750, 'Background'); 

        car1 = game.add.sprite(475, 0, 'chevy');        
        car2 = game.add.sprite(445, 685, 'chevy2');       
        car3 = game.add.sprite(0, 335, 'cadillac');        
        car4 = game.add.sprite(950, 362, 'ferrari');        

        game.physics.enable( car1, Phaser.Physics.ARCADE );
        game.physics.enable( car2, Phaser.Physics.ARCADE );
        game.physics.enable( car3, Phaser.Physics.ARCADE );
        game.physics.enable( car4, Phaser.Physics.ARCADE );
        game.time.events.add(Phaser.Timer.SECOND * 15, endGame, this);

        style = { font: "16px Verdana", fill: "#000000", align: "right" };
        end = false;
       

    }

    

    function update() { 
      
      count++;
      if (count === 50)
        state++;
      if (!end){
        switch(state){
      
          case 1:
            text = game.add.text( 525, 20, "P1 Throttle: N", style );
            text = game.add.text( 525, 40, "P1 Left Lane Switch: B", style );
            text = game.add.text( 525, 60, "P1 Right Lane Switch: M", style );
            text = game.add.text( 525, 660, "P2 Throttle: C", style );
            text = game.add.text( 525, 680, "P2 Left Lane Switch: X", style );
            text = game.add.text( 525, 700, "P2 Right Lane Switch: V", style );
            text = game.add.text( 15, 400, "P3 Throttle: A", style );
            text = game.add.text( 15, 420, "P3 Left Lane Switch: Q", style );
            text = game.add.text( 15, 440, "P3 Right Lane Switch: Z", style );            
            text = game.add.text( 800, 400, "P4 Throttle: L", style );
            text = game.add.text( 800, 420, "P4 Left Lane Switch: K", style );
            text = game.add.text( 897, 440, "P4 Right Lane Switch: P", style );
            text.anchor.setTo( 0.5, 0.0 );
            break;
          case 2:
            //Top car throttle
            if (car1 != null){
              if (car1Throttle.isDown){
                if (car1.body.velocity.y < 300)
                  car1.body.acceleration.y += 5;
                else
                  car1.body.acceleration.y = 0;
              }
              else{
                if (car1.body.velocity.y > 100)
                  car1.body.acceleration.y -= 10;
                else{
                  car1.body.acceleration.y = 0;
                  car1.body.velocity.y = 100;
                }
              }
              if (car1left.isDown && car1.body.position.x > 445)
                car1.body.velocity.x = -60;
              else if (car1right.isDown && car1.body.position.x < 475)
                car1.body.velocity.x = 60;
              else
                car1.body.velocity.x = 0;
            }
            //Bottom car throttle
            if (car2 != null){
              if (car2Throttle.isDown){
                if (car2.body.velocity.y > -300)
                  car2.body.acceleration.y -= 5;
                else
                  car2.body.acceleration.y = 0;
              }
              else{
                if (car2.body.velocity.y < -100)
                  car2.body.acceleration.y += 10;
                else{
                  car2.body.acceleration.y = 0;
                  car2.body.velocity.y = -100;
                }
              }
              if (car2left.isDown && car2.body.position.x > 445)
                car2.body.velocity.x = -60;
              else if (car2right.isDown && car2.body.position.x < 472)
                car2.body.velocity.x = 60;
              else
                car2.body.velocity.x = 0;
            }
            //Left car throttle
            if (car3 != null){
              if (car3Throttle.isDown){
                if (car3.body.velocity.x < 300)
                  car3.body.acceleration.x += 5;
                else
                  car3.body.acceleration.x = 0;
              }
              else{
                if (car3.body.velocity.x > 100)
                  car3.body.acceleration.x -= 10;
                else{
                  car3.body.acceleration.x = 0;
                  car3.body.velocity.x = 100;
                }
              }
              if (car3left.isDown && car3.body.position.y > 335)
                car3.body.velocity.y = -60;
              else if (car3right.isDown && car3.body.position.y < 362)
                car3.body.velocity.y = 60;
              else
                car3.body.velocity.y = 0;
            }
            //Right car throttle
            if (car4 != null){
              if (car4Throttle.isDown){
                if (car4.body.velocity.x > -300)
                  car4.body.acceleration.x -= 5;
                else
                  car4.body.acceleration.x = 0;
              }
              else{
                if (car4.body.velocity.x < -100)
                  car4.body.acceleration.x += 10;
                else{
                  car4.body.acceleration.x = 0;
                  car4.body.velocity.x = -100;
                }
              }
              if (car4right.isDown && car4.body.position.y > 335)
                car4.body.velocity.y = -60;
              else if (car4left.isDown && car4.body.position.y < 362)
                car4.body.velocity.y = 60;
              else
                car4.body.velocity.y = 0;
            }
        }

        
        if (car1 != null){  
          if (car1.position.y < 400 && car1.position.y > 390)
            car1cross = true;
          if (car1.position.y < 410 && car1.position.y > 400 && car1cross === true){
            car1score++;
            car1cross = false;
          }
          if (car1.position.y > game.world.height)
          {
            car1.position.y = 0;
          }
        }
        
        if (car2 != null){ 
          if (car2.position.y < 290 && car2.position.y > 280)
            car2cross = true;
          if (car2.position.y < 280 && car2.position.y > 270 && car2cross === true){
            car2score++;
            car2cross = false;
          }
          if (car2.position.y < -10)
          {
            car2.position.y = 750;
          }
        }
        
        if (car3 != null){
          if (car3.position.x < 570 && car3.position.x > 560)
            car3cross = true;
          if (car3.position.x < 580 && car3.position.x > 570 && car3cross === true){
            car3score++;
            car3cross = false;
          }
          if (car3.position.x > game.world.width)          
          {          
            car3.position.x = 0;          
          }
        }
        
        if (car4 != null){
          if (car4.position.x < 400 && car4.position.x > 390)
            car4cross = true;
          if (car4.position.x < 390 && car4.position.x > 380 && car4cross === true){
            car4score++;
            car4cross = false;
          }
          if (car4.position.x < 0)
          {  
            car4.position.x = game.world.width;
          }
        }
      }
      game.physics.arcade.collide(car1, car2, collisionHandler1, null, this);  
      game.physics.arcade.collide(car1, car3, collisionHandler2, null, this); 
      game.physics.arcade.collide(car1, car4, collisionHandler3, null, this); 
      game.physics.arcade.collide(car2, car3, collisionHandler4, null, this);         
      game.physics.arcade.collide(car2, car4, collisionHandler5, null, this);         
      game.physics.arcade.collide(car3, car4, collisionHandler6, null, this);         

    }

    

    function collisionHandler1(obj1, obj2){
      explosion = game.add.sprite(car1.body.position.x-20, car1.body.position.y, 'explosions', 1);
      anim = explosion.animations.add('explode');
      anim.play(10, false);
      car1.destroy();
      car2.destroy();
      car1 = car2 = null;
      if (car3 == null && car4 == null)
        endGame();
      counter = 1;
    }
    
    function collisionHandler2(obj1, obj2){
      explosion = game.add.sprite(car1.body.position.x-20, car1.body.position.y+10, 'explosions', 1);
      anim = explosion.animations.add('explode');
      anim.play(10, false);
      car1.destroy();
      car3.destroy();
      car1 = car3 = null;
      if (car2 == null && car4 == null)
        endGame();
      counter = 2;
    }
    
    function collisionHandler3(obj1, obj2){
      explosion = game.add.sprite(car1.body.position.x-20, car1.body.position.y, 'explosions', 1);
      anim = explosion.animations.add('explode');
      anim.play(10, false);
      car1.destroy();
      car4.destroy();
      car1 = car4 = null;
      if (car2 == null && car3 == null)
        endGame();
      counter = 3;
    }
    
    function collisionHandler4(obj1, obj2){
      explosion = game.add.sprite(car2.body.position.x-20, car2.body.position.y, 'explosions', 1);
      anim = explosion.animations.add('explode');
      anim.play(10, false);
      car2.destroy();
      car3.destroy();
      car2 = car3 = null;
      if (car1 == null && car4 == null)
        endGame();
      counter = 4;
    }
    
    function collisionHandler5(obj1, obj2){
      explosion = game.add.sprite(car2.body.position.x, car2.body.position.y, 'explosions', 1);
      anim = explosion.animations.add('explode');
      anim.play(10, false);
      car2.destroy();
      car4.destroy();
      car2 = car4 = null;
      if (car1 == null && car3 == null)
        endGame();
      counter = 5;
    }
   
    function collisionHandler6(obj1, obj2){
      explosion = game.add.sprite(car3.body.position.x, car3.body.position.y-20, 'explosions', 1);
      anim = explosion.animations.add('explode');
      anim.play(10, false);
      car3.destroy();
      car4.destroy();
      car3 = car4 = null;
      counter = 5;
      if (car1 == null && car2 == null)
        endGame();
      counter = 6;
    }

    

    function endGame(){     
       if (car1 == null && car2 == null && car3 == null && car4 == null)
         counter = 7;
       max = Math.max(car1score, car2score, car3score, car4score);
       if (!end){  
            switch(counter){
               case 0:
                 if (car1score === max){
                   if (car2score === max){
                     if (car3score === max){
                        if (car4score === max)
                          text = game.add.text( 15, 50, "You all win!", style );
                        else
                          text = game.add.text( 15, 50, "Players 1, 2, and 3 win!", style );
                     }
                     else{ 
                       if (car4score === max)
                          text = game.add.text( 15, 50, "Players 1, 2 and 4 win!", style );
                       else
                          text = game.add.text( 15, 50, "Players 1 and 2 win!", style );
                     }
                   }
                   else{
                     if (car3score === max){
                        if (car4score === max)
                          text = game.add.text( 15, 50, "Players 1, 3, and 4 win!", style );
                        else
                          text = game.add.text( 15, 50, "Players 1 and 3 win!", style );
                     }
                     else{ 
                       if (car4score === max)
                          text = game.add.text( 15, 50, "Players 1 and 4 win!", style );
                       else
                          text = game.add.text( 15, 50, "Player 1 wins!", style );
                     }
                   }
                 }
                 else{
                   if (car2score === max){
                     if (car3score === max){
                       if (car4score === max)
                         text = game.add.text( 15, 50, "Players 2, 3, and 4 win!", style );
                       else
                         text = game.add.text( 15, 50, "Players 2 and 3 win!", style );
                     }
                     else{ 
                       if (car4score === max)
                         text = game.add.text( 15, 50, "Players 2 and 4 win!", style );
                       else
                         text = game.add.text( 15, 50, "Player 2 wins!", style );
                     }
                   }
                   else{
                     if (car3score === max){
                       if (car4score === max)
                         text = game.add.text( 15, 50, "Players 3 and 4 win!", style );
                       else
                         text = game.add.text( 15, 50, "Player 3 wins!", style );
                     }
                     else{ 
                       if (car4score === max)
                         text = game.add.text( 15, 50, "Player 4 wins!", style );
                       else
                         text = game.add.text( 15, 50, "Player 1 wins!", style );
                     }
                   }
                 }
                 break;
               case 1:
                  if (car3score > car4score)
                      text = game.add.text( 15, 50, "Player 3 wins!", style );
                  else if (car3score < car4score)
                      text = game.add.text( 15, 50, "Player 4 wins!", style )
                  else
                      text = game.add.text( 15, 50, "Players 3 and 4 win!", style );
                  break;
               case 2:
                  if (car2score > car4score)
                      text = game.add.text( 15, 50, "Player 2 wins!", style );
                  else if (car2score < car4score)
                      text = game.add.text( 15, 50, "Player 4 wins!", style )
                  else
                      text = game.add.text( 15, 50, "Players 2 and 4 win!", style );
                  break;
               case 3:  
                  if (car2score > car3score)
                      text = game.add.text( 15, 50, "Player 2 wins!", style );
                  else if (car2score < car3score)
                      text = game.add.text( 15, 50, "Player 3 wins!", style )
                  else
                      text = game.add.text( 15, 50, "Players 2 and 3 win!", style );
                  break;
               case 4:
                  if (car1score > car4score)
                      text = game.add.text( 15, 50, "Player 1 wins!", style );
                  else if (car1score < car4score)
                      text = game.add.text( 15, 50, "Player 4 wins!", style )
                  else
                      text = game.add.text( 15, 50, "Players 1 and 4 win!", style );
                  break;
               case 5:
                  if (car1score > car3score)
                      text = game.add.text( 15, 50, "Player 1 wins!", style );
                  else if (car1score < car3score)
                      text = game.add.text( 15, 50, "Player 3 wins!", style )
                  else
                      text = game.add.text( 15, 50, "Players 1 and 3 win!", style );
                  break;
               case 6:
                  if (car1score > car2score)
                      text = game.add.text( 15, 50, "Player 1 wins!", style );
                  else if (car1score < car2score)
                      text = game.add.text( 15, 50, "Player 2 wins!", style )
                  else
                      text = game.add.text( 15, 50, "You all win!", style );
                  break;
               default:
                  text = game.add.text( 15, 50, "You all lose!", style );
           }
        }
        end = true;

    }

    

    function render(){

      game.debug.text("P1 Score - " + car1score, 525, 95);
      game.debug.text("P2 Score - " + car2score, 525, 735);
      game.debug.text("P3 Score - " + car3score, 15, 475);
      game.debug.text("P4 Score - " + car4score, 800, 475);
      game.debug.text("Survive! - " + Math.floor(game.time.events.duration/1000), 32, 32);

    }

  

};