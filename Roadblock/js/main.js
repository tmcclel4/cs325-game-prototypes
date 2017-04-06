window.onload = function() {
    

    "use strict";

    

  var game = new Phaser.Game( 1000, 750, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render:render } );

    

    function preload() {
        
        game.load.image( 'logo', 'assets/astroid.png' );
        game.load.image('Background', 'assets/road.png');
        game.load.image('Ending', 'assets/done.png');
        game.load.image('chevy', 'assets/chevy.png');
        game.load.image('chevy2', 'assets/suburban.png');
        game.load.image('ferrari', 'assets/ferrari.png');
        game.load.image('cadillac', 'assets/cadillac.png');
        game.load.image('gameover', 'assets/gameover.png');
        game.load.spritesheet('explosions', 'assets/explosion.png', 64, 64, 24);

    }
    

    var timer1;
    var count;
    var astroid;
    var background;
    var car1;
    var car2;
    var car3;
    var car4;
    var car1Throttle;
    var car2Throttle;
    var car3Throttle;
    var car4Throttle;
    var state;
    var style;
    var text;
    var counter;
    var end;
    var explosion;
    var anim;

    function create() {

        state = 1;
        car1Throttle = game.input.keyboard.addKey(Phaser.Keyboard.N);
        car2Throttle = game.input.keyboard.addKey(Phaser.Keyboard.C);
        car3Throttle = game.input.keyboard.addKey(Phaser.Keyboard.A);
        car4Throttle = game.input.keyboard.addKey(Phaser.Keyboard.L);
        game.input.keyboard.addKeyCapture([ Phaser.Keyboard.A, Phaser.Keyboard.C, Phaser.Keyboard.L, Phaser.Keyboard.N ]);
        count = 0;
        counter = 0;

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
        game.time.events.add(Phaser.Timer.SECOND * 30, endGame, this);

        style = { font: "25px Verdana", fill: "#000000", align: "right" };
        end = false;
       

    }

    

    function update() { 
      
      count++;
      if (count === 50)
        state++;
      if (!end){
        switch(state){
      
          case 1:
            text = game.add.text( 15, 400, "P3 Throttle: A", style );
            text = game.add.text( 525, 700, "P2 Throttle: C", style );
            text = game.add.text( 525, 20, "P1 Throttle: N", style );
            text = game.add.text( 900, 400, "P4 Throttle: L", style );
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
            }
        }
      }

        
      if (car1 != null){  
        if (car1.position.y > game.world.height)
        {
          car1.position.y = 0;
        }
      }
      
      if (car2 != null){
        if (car2.position.y < -10)
        {
          car2.position.y = 750;
        }
      }
      
      if (car3 != null){
        if (car3.position.x > game.world.width)          
        {          
          car3.position.x = 0;          
        }
      }
      
      if (car4 != null){
        if (car4.position.x < 0)
        {  
          car4.position.x = game.world.width;
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
      explosion = game.add.sprite(400, 300, 'explosions', 1);
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
      explosion = game.add.sprite(440, 300, 'explosions', 1);
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
      explosion = game.add.sprite(450, 335, 'explosions', 1);
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
      explosion = game.add.sprite(410, 300, 'explosions', 1);
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
      explosion = game.add.sprite(430, 330, 'explosions', 1);
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
      explosion = game.add.sprite(430, 330, 'explosions', 1);
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
       if (!end)
            switch(counter){
               case 0:
                  text = game.add.text( 15, 50, "You all win!", style );
                  break;
               case 1:
                  text = game.add.text( 15, 50, "Players 3 and 4 win!", style );
                  break;
               case 2:
                  text = game.add.text( 15, 50, "Players 2 and 4 win!", style );
                  break;
               case 3:  
                  text = game.add.text( 15, 50, "Players 2 and 3 win!", style );
                  break;
               case 4:
                  text = game.add.text( 15, 50, "Players 1 and 4 win!", style );
                  break;
               case 5:
                  text = game.add.text( 15, 50, "Players 1 and 3 win!", style );
                  break;
               case 6:
                  text = game.add.text( 15, 50, "Players 1 and 2 win!", style );
                  break;
               default:
                  text = game.add.text( 15, 50, "You all lose!", style );
           }
        }
        end = true;

    }

    

    function render(){

      game.debug.text("Survive! - " + Math.floor(game.time.events.duration/1000), 32, 32);

    }

  

};
