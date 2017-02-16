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
        //borrowed from http://www.wp-handyhints.com/freebies/40-free-buy-now-and-online-shopping-cart-buttons-for-e-commerce-websites/
        game.load.image( 'button', 'assets/button.png' );
        game.load.image( 'background', 'assets/background.png' );
    }
    
    var button1;
    var button2;
    var button3;
    var button4;
    var button5;
    var background;
    var money;
    var accelerate;
    var end;
    var heartRate;
    var lungRate;
    var liverRate;
    var kidneyRate;
    var skinRate;
    var heartCounter;
    var lungCounter;
    var liverCounter;
    var kidneyCounter;
    var skinCounter;
    
    function create() {
       
       game.time.events.add(Phaser.Timer.SECOND * 30, endGame, this);
       end = false;
       money = 0;
       accelerate = 0;
       heartRate = 15;
       lungRate = 10;
       liverRate = 5;
       kidneyRate = 3;
       skinRate = 1;
       heartCounter = 0;
       lungCounter = 0;
       liverCounter = 0;
       kidneyCounter = 0;
       skinCounter = 0;

       background = game.add.tileSprite(0, 0, 800, 600, 'background');
       button1 = game.add.button(40, 100, 'button', heart, this, 2, 1, 0);
       button2 = game.add.button(40, 200, 'button', lungs, this, 2, 1, 0);
       button3 = game.add.button(40, 300, 'button', kidney, this, 2, 1, 0);
       button4 = game.add.button(40, 400, 'button', liver, this, 2, 1, 0);
       button5 = game.add.button(40, 500, 'button', skin, this, 2, 1, 0);
    }
    
    function update() {
      heartCounter +=1;
      lungCounter +=0.5;
      kidneyCounter +=1;
      liverCounter +=1;
      skinCounter +=0.25;
      
      if (skinCounter%5 < 3){
        button1.inputEnabled = true;
        button2.inputEnabled = true;
        button3.inputEnabled = true;
        button4.inputEnabled = true;
        button5.inputEnabled = true;
      }
      else{
        button1.inputEnabled = false;
        button2.inputEnabled = false;
        button3.inputEnabled = false;
        button4.inputEnabled = false;
        button5.inputEnabled = false;
      }
      
      if (!end){
        money += accelerate;
        if (heartCounter%5 === 0)
          heartRate = Math.floor(Math.abs(Math.sin(heartCounter))*5000);
        if (lungCounter%5 === 0)  
          lungRate = Math.floor(Math.abs(Math.sin(lungCounter))*1000);
        if (kidneyCounter%10 === 0)  
          kidneyRate = Math.floor(Math.abs(Math.sin(kidneyCounter))*500);
        if (liverCounter%12 === 0)  
          liverRate = Math.floor(Math.abs(Math.sin(liverCounter))*100);
        if (skinCounter%5 === 0)  
          skinRate = Math.floor(Math.abs(Math.sin(skinCounter))*10);
     }
      
      else{
        background.visible = false;
        var style = { font: "25px Verdana", fill: "#22aaff", align: "center" };
        var text = game.add.text( 200, 100, "Your total revenue was: "+money, style );
      }
    }
    
    function render(){
      game.debug.text("Revenue Increase: $" + heartRate, 40, 175);
      game.debug.text("Revenue Increase: $" + lungRate, 40, 275);
      game.debug.text("Revenue Increase: $" + kidneyRate, 40, 375);
      game.debug.text("Revenue Increase: $" + liverRate, 40, 475);
      game.debug.text("Revenue Increase: $" + skinRate, 40, 575);
      game.debug.text("Money: $" + Math.floor(money/100)*100, 400, 32);
      game.debug.text("Make as much money as possible! " + Math.floor(game.time.events.duration/1000), 32, 32);

    }

    function skin () {
         accelerate += skinRate;
    }
        
    function liver() {
         accelerate += liverRate;
    }
    
    function heart() {
         accelerate += heartRate;
    }
    
    function kidney() {
         accelerate += kidneyRate
    }
    
    function lungs() {
         accelerate += lungRate;
    }
    
    function endGame(){
         end = true;
    }
    
    
};
