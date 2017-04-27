window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
  var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render } );
    
    function preload() {
        game.load.image( 'button', 'assets/words.png' );
        game.load.image( 'd1', 'assets/danswer1.png' );
        game.load.image( 'd2', 'assets/danswer2.png' );
        game.load.image( 'd3', 'assets/danswer3.png' );
        game.load.image( 'd4', 'assets/danswer4.png' );
        game.load.image( 'd5', 'assets/danswer5.png' );
        game.load.image( 'd6', 'assets/danswer6.png' );
        game.load.image( 'd7', 'assets/danswer7.png' );
        game.load.image( 'd8', 'assets/danswer8.png' );
        game.load.image( 'd9', 'assets/danswer9.png' );
        game.load.image( 'd10', 'assets/danswer10.png' );
        game.load.image( 'p1', 'assets/p1.png' );
        game.load.image( 'p2', 'assets/p2.png' );
        game.load.image( 'p3', 'assets/p3.png' );
        game.load.image( 'p4', 'assets/p4.png' );
        game.load.image( 'p5', 'assets/p5.png' );
        game.load.image( 'p6', 'assets/p6.png' );
        game.load.image( 'p7', 'assets/p7.png' );
        game.load.image( 'p8', 'assets/p8.png' );
        game.load.image( 'p9', 'assets/p9.png' );
        game.load.image( 'p10', 'assets/p10.png' );
        game.load.image( 'm1', 'assets/m1.png' );
        game.load.image( 'm2', 'assets/m2.png' );
        game.load.image( 'm3', 'assets/m3.png' );
        game.load.image( 'm4', 'assets/m4.png' );
        game.load.image( 'm5', 'assets/m5.png' );
        game.load.image( 'm6', 'assets/m6.png' );
        game.load.image( 'm7', 'assets/m7.png' );
        game.load.image( 'm8', 'assets/m8.png' );
        game.load.image( 'm9', 'assets/m9.png' );
        game.load.image( 'm10', 'assets/m10.png' );
        game.load.image( 'background1', 'assets/background1.png' );
        game.load.image( 'background2', 'assets/background2.png' );
        game.load.image( 'background3', 'assets/background3.png' );
        game.load.image( 'background4', 'assets/background4.png' );
        game.load.image( 'background6', 'assets/background6.png' );
        game.load.image( 'win1', 'assets/ending11.png' );
        game.load.image( 'win2', 'assets/ending12.png' );
        game.load.image( 'win3', 'assets/ending13.png' );
        game.load.image( 'lose1', 'assets/ending21.png' );
        game.load.image( 'lose2', 'assets/ending22.png' );
        game.load.image( 'lose3', 'assets/ending23.png' );
    }
    
    var button1;
    var button2;
    var button3;
    var button4;
    var button5;
    var button6;
    var button7;
    var button8;
    var button9;
    var button0;
    var presponse;
    var dadresponse;
    var momresponse;
    var counter;
    var answering;
    var end;
    var answer1;
    var answer2;
    var answer3;
    var win;
    var q;
    var background;
    var end2;
    
    function create() {
      
      button0 = game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
      button1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
      button2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
      button3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
      button4 = game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
      button5 = game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
      button6 = game.input.keyboard.addKey(Phaser.Keyboard.SIX);
      button7 = game.input.keyboard.addKey(Phaser.Keyboard.SEVEN);
      button8 = game.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
      button9 = game.input.keyboard.addKey(Phaser.Keyboard.NINE);
      
      counter = 0;
      answering = false;
      end = false;
      end2 = false;
      q = 0;
      win = Math.floor((Math.random()*3)+1);
      background = game.add.tileSprite(0, 0, 800, 600, 'background1');

    }
    
    function update() {
      if (!end){
        if (answering)
          counter++;
        if(counter>300){
          q++;
          answering = false;
          counter = 0;
          answer1.destroy();
          answer2.destroy();
          answer3.destroy();
          if (q == 3){
            background = game.add.tileSprite(0, 0, 800, 600, 'background6');
            end = true;
          }            
        }
        
        if (button0.isDown){
          if (!answering){
            if (q == 0)
              background = game.add.tileSprite(0, 0, 800, 600, 'background2');
            else if (q == 1)
              background = game.add.tileSprite(0, 0, 800, 600, 'background3');
            else
              background = game.add.tileSprite(0, 0, 800, 600, 'background4');
            
            if (win ==1){
              answer1 = game.add.sprite(40, 35, 'p1');
              answer2 = game.add.sprite(280, 35, 'd1');
              answer3 = game.add.sprite(530, 35, 'm1');
            }
            else if (win == 2){
              answer1 = game.add.sprite(40, 35, 'd1');
              answer2 = game.add.sprite(280, 35, 'p1');
              answer3 = game.add.sprite(530, 35, 'm1');
            }
            else{
              answer1 = game.add.sprite(40, 35, 'd1');
              answer2 = game.add.sprite(280, 35, 'm1');
              answer3 = game.add.sprite(530, 35, 'p1');
            }
          }
          answering = true;
        }
        else if (button1.isDown){
          if (!answering){
            if (q == 0)
              background = game.add.tileSprite(0, 0, 800, 600, 'background2');
            else if (q == 1)
              background = game.add.tileSprite(0, 0, 800, 600, 'background3');
            else
              background = game.add.tileSprite(0, 0, 800, 600, 'background4');
            ;
            if (win ==1){
              answer1 = game.add.sprite(40, 35, 'p2');
              answer2 = game.add.sprite(280, 35, 'd2');
              answer3 = game.add.sprite(530, 35, 'm2');
            }
            else if (win == 2){
              answer1 = game.add.sprite(40, 35, 'd2');
              answer2 = game.add.sprite(280, 35, 'p2');
              answer3 = game.add.sprite(530, 35, 'm2');
            }
            else{
              answer1 = game.add.sprite(40, 35, 'd2');
              answer2 = game.add.sprite(280, 35, 'm2');
              answer3 = game.add.sprite(530, 35, 'p2');
            }
          }
          answering = true;
        }
        else if (button2.isDown){
          if (!answering){
            if (q == 0)
              background = game.add.tileSprite(0, 0, 800, 600, 'background2');
           else if (q == 1)
              background = game.add.tileSprite(0, 0, 800, 600, 'background3');
            else
              background = game.add.tileSprite(0, 0, 800, 600, 'background4');
            ;
            if (win ==1){
              answer1 = game.add.sprite(40, 35, 'p3');
              answer2 = game.add.sprite(280, 35, 'd3');
              answer3 = game.add.sprite(530, 35, 'm3');
            }
            else if (win == 2){
              answer1 = game.add.sprite(40, 35, 'd3');
              answer2 = game.add.sprite(280, 35, 'p3');
              answer3 = game.add.sprite(530, 35, 'm3');
            }
            else{
              answer1 = game.add.sprite(40, 35, 'd3');
              answer2 = game.add.sprite(280, 35, 'm3');
              answer3 = game.add.sprite(530, 35, 'p3');
            }
          }
          answering = true;
        }
        else if (button3.isDown){
          if (!answering){
            if (q == 0)
              background = game.add.tileSprite(0, 0, 800, 600, 'background2');
            else if (q == 1)
              background = game.add.tileSprite(0, 0, 800, 600, 'background3');
            else
              background = game.add.tileSprite(0, 0, 800, 600, 'background4');
            ;
            if (win ==1){
              answer1 = game.add.sprite(40, 35, 'p4');
              answer2 = game.add.sprite(280, 35, 'd4');
              answer3 = game.add.sprite(530, 35, 'm4');
            }
            else if (win == 2){
              answer1 = game.add.sprite(40, 35, 'd4');
              answer2 = game.add.sprite(280, 35, 'p4');
              answer3 = game.add.sprite(530, 35, 'm4');
            }
            else{
              answer1 = game.add.sprite(40, 35, 'd4');
              answer2 = game.add.sprite(280, 35, 'm4');
              answer3 = game.add.sprite(530, 35, 'p4');
            }
          }
          answering = true;
        }
        else if (button4.isDown){
          if (!answering){
            if (q == 0)
              background = game.add.tileSprite(0, 0, 800, 600, 'background2');
            else if (q == 1)
              background = game.add.tileSprite(0, 0, 800, 600, 'background3');
            else
              background = game.add.tileSprite(0, 0, 800, 600, 'background4');
            ;
            if (win ==1){
              answer1 = game.add.sprite(40, 35, 'p5');
              answer2 = game.add.sprite(280, 35, 'd5');
              answer3 = game.add.sprite(530, 35, 'm5');
            }
            else if (win == 2){
              answer1 = game.add.sprite(40, 35, 'd5');
              answer2 = game.add.sprite(280, 35, 'p5');
              answer3 = game.add.sprite(530, 35, 'm5');
            }
            else{
              answer1 = game.add.sprite(40, 35, 'd5');
              answer2 = game.add.sprite(280, 35, 'm5');
              answer3 = game.add.sprite(530, 35, 'p5');
            }
          }
          answering = true;
        }
        else if (button5.isDown){
          if (!answering){
            if (q == 0)
              background = game.add.tileSprite(0, 0, 800, 600, 'background2');
            else if (q == 1)
              background = game.add.tileSprite(0, 0, 800, 600, 'background3');
            else
              background = game.add.tileSprite(0, 0, 800, 600, 'background4');
            ;
            if (win ==1){
              answer1 = game.add.sprite(40, 35, 'p6');
              answer2 = game.add.sprite(280, 35, 'd6');
              answer3 = game.add.sprite(530, 35, 'm6');
            }
            else if (win == 2){
              answer1 = game.add.sprite(40, 35, 'd6');
              answer2 = game.add.sprite(280, 35, 'p6');
              answer3 = game.add.sprite(530, 35, 'm6');
            }
            else{
              answer1 = game.add.sprite(40, 35, 'd6');
              answer2 = game.add.sprite(280, 35, 'm6');
              answer3 = game.add.sprite(530, 35, 'p6');
            }
          }
          answering = true;
        }
        else if (button6.isDown){
          if (!answering){
            if (q == 0)
              background = game.add.tileSprite(0, 0, 800, 600, 'background2');
            else if (q == 1)
              background = game.add.tileSprite(0, 0, 800, 600, 'background3');
            else
              background = game.add.tileSprite(0, 0, 800, 600, 'background4');
            ;
            if (win ==1){
              answer1 = game.add.sprite(40, 35, 'p7');
              answer2 = game.add.sprite(280, 35, 'd7');
              answer3 = game.add.sprite(530, 35, 'm7');
            }
            else if (win == 2){
              answer1 = game.add.sprite(40, 35, 'd7');
              answer2 = game.add.sprite(280, 35, 'p7');
              answer3 = game.add.sprite(530, 35, 'm7');
            }
            else{
              answer1 = game.add.sprite(40, 35, 'd7');
              answer2 = game.add.sprite(280, 35, 'm7');
              answer3 = game.add.sprite(530, 35, 'p7');
            }
          }
          answering = true;
        }
        else if (button7.isDown){
          if (!answering){
            if (q == 0)
              background = game.add.tileSprite(0, 0, 800, 600, 'background2');
            else if (q == 1)
              background = game.add.tileSprite(0, 0, 800, 600, 'background3');
            else
              background = game.add.tileSprite(0, 0, 800, 600, 'background4');
            ;
            if (win ==1){
              answer1 = game.add.sprite(40, 35, 'p8');
              answer2 = game.add.sprite(280, 35, 'd8');
              answer3 = game.add.sprite(530, 35, 'm8');
            }
            else if (win == 2){
              answer1 = game.add.sprite(40, 35, 'd8');
              answer2 = game.add.sprite(280, 35, 'p8');
              answer3 = game.add.sprite(530, 35, 'm8');
            }
            else{
              answer1 = game.add.sprite(40, 35, 'd8');
              answer2 = game.add.sprite(280, 35, 'm8');
              answer3 = game.add.sprite(530, 35, 'p8');
            }
          }
          answering = true;
        }
        else if (button8.isDown){
          if (!answering){
            if (q == 0)
              background = game.add.tileSprite(0, 0, 800, 600, 'background2');
            else if (q == 1)
              background = game.add.tileSprite(0, 0, 800, 600, 'background3');
            else
              background = game.add.tileSprite(0, 0, 800, 600, 'background4');
            ;
            if (win ==1){
              answer1 = game.add.sprite(40, 35, 'p9');
              answer2 = game.add.sprite(280, 35, 'd9');
              answer3 = game.add.sprite(530, 35, 'm9');
            }
            else if (win == 2){
              answer1 = game.add.sprite(40, 35, 'd9');
              answer2 = game.add.sprite(280, 35, 'p9');
              answer3 = game.add.sprite(530, 35, 'm9');
            }
            else{
              answer1 = game.add.sprite(40, 35, 'd9');
              answer2 = game.add.sprite(280, 35, 'm9');
              answer3 = game.add.sprite(530, 35, 'p9');
            }
          }
          answering = true;
        }
        else if (button9.isDown){
          if (!answering){
            if (q == 0)
              background = game.add.tileSprite(0, 0, 800, 600, 'background2');
            else if (q == 1)
              background = game.add.tileSprite(0, 0, 800, 600, 'background3');
            else
              background = game.add.tileSprite(0, 0, 800, 600, 'background4');
            ;
            if (win ==1){
              answer1 = game.add.sprite(40, 35, 'p10');
              answer2 = game.add.sprite(280, 35, 'd10');
              answer3 = game.add.sprite(530, 35, 'm10');
            }
            else if (win == 2){
              answer1 = game.add.sprite(40, 35, 'd10');
              answer2 = game.add.sprite(280, 35, 'p10');
              answer3 = game.add.sprite(530, 35, 'm10');
            }
            else{
              answer1 = game.add.sprite(40, 35, 'd10');
              answer2 = game.add.sprite(280, 35, 'm10');
              answer3 = game.add.sprite(530, 35, 'p10');
            }
          }
          answering = true;
        }
      }
      else{
        if (!end2){
          if (button1.isDown){
            if (win == 1){
              background = game.add.tileSprite(0, 0, 800, 600, 'win1');
            }
            else if (win == 2){
              background = game.add.tileSprite(0, 0, 800, 600, 'lose2');
            }
            else
              background = game.add.tileSprite(0, 0, 800, 600, 'lose3');
            end2 = true;
          }
          else if (button2.isDown){
            if (win == 2){
              background = game.add.tileSprite(0, 0, 800, 600, 'win2');
            }
            else if (win == 1){
              background = game.add.tileSprite(0, 0, 800, 600, 'lose1');
            }
            else
              background = game.add.tileSprite(0, 0, 800, 600, 'lose3');
            end2 = true;
          }        
          else if (button3.isDown){
            if (win ==3){
              background = game.add.tileSprite(0, 0, 800, 600, 'win3');
            }
            else if (win == 1){
              background = game.add.tileSprite(0, 0, 800, 600, 'lose1');
            }
            else
              background = game.add.tileSprite(0, 0, 800, 600, 'lose2');
            end2 = true;
          }
        }
      }
    }
    
    function render(){

    }
   
};
