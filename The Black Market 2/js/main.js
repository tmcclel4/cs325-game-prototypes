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
        //borrowed from harpandassociates.com
        game.load.image( 'sell', 'assets/sell_button.png' );
        game.load.image( 'background', 'assets/background.png' );
        game.load.image( 'background2', 'assets/endgame2.png' );
        //Music courtesy of William Crosswait and Nathan Ramey
        game.load.audio( 'music', 'assets/VGP 4.wav');
    }
    
    var button1;
    var button2;
    var button3;
    var button4;
    var button5;
    var sellButton1;
    var sellButton2;
    var sellButton3;
    var sellButton4;
    var sellButton5;
    var background;
    var money;
    var end;
    var end2;
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
    var hearts;
    var lungs;
    var kidneys;
    var livers;
    var skins;
    var music;
    
    function create() {
      
       music = game.add.audio('music');
       music.play();
       game.time.events.add(Phaser.Timer.SECOND * 30, endGame, this);
       end = false;
       end2 = false;
       money = 50000;
       hearts = 0;
       lungs = 0;
       kidneys = 0;
       livers = 0;
       skins = 0;
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
       button1 = game.add.button(20, 100, 'button', heart, this, 2, 1, 0);
       button2 = game.add.button(20, 200, 'button', lung, this, 2, 1, 0);
       button3 = game.add.button(20, 300, 'button', kidney, this, 2, 1, 0);
       button4 = game.add.button(20, 400, 'button', liver, this, 2, 1, 0);
       button5 = game.add.button(20, 500, 'button', skin, this, 2, 1, 0);
       sellButton1 = game.add.button(180, 100, 'sell', sellHeart, this, 2, 1, 0);
       sellButton2 = game.add.button(180, 200, 'sell', sellLungs, this, 2, 1, 0);
       sellButton3 = game.add.button(180, 300, 'sell', sellKidney, this, 2, 1, 0);
       sellButton4 = game.add.button(180, 400, 'sell', sellLiver, this, 2, 1, 0);
       sellButton5 = game.add.button(180, 500, 'sell', sellSkin, this, 2, 1, 0);
    }
    
    function update() {
      if (money < 0)
           endGame2();
      heartCounter +=1;
      lungCounter +=0.5;
      kidneyCounter +=1;
      liverCounter +=0.25;
      skinCounter +=0.75;
      
      if (!end){
        if (heartCounter%5 === 0)
          heartRate = Math.floor(Math.abs(Math.sin(heartCounter))*5000);
        if (lungCounter%5 === 0)  
          lungRate = Math.floor(Math.abs(Math.sin(lungCounter))*1000);
        if (kidneyCounter%12 === 0)  
          kidneyRate = Math.floor(Math.abs(Math.sin(kidneyCounter))*500);
        if (liverCounter%5 === 0)  
          liverRate = Math.floor(Math.abs(Math.sin(liverCounter))*100);
        if (skinCounter%10 === 0)  
          skinRate = Math.floor(Math.abs(Math.sin(skinCounter))*10);
     }
      
      else{
        if (!end2){
           music.destroy();
           background.visible = false;
           var style = { font: "25px Verdana", fill: "#22aaff", align: "center" };
           var text = game.add.text( 200, 50, "Your total revenue was: $"+money, style );
        }
      }
    }
    
    function render(){
      if (!end2){
      game.debug.text("Heart Value: $" + heartRate, 20, 175);
      game.debug.text("Lung Value: $" + lungRate, 20, 275);
      game.debug.text("Kidney Value: $" + kidneyRate, 20, 375);
      game.debug.text("Liver Value: $" + liverRate, 20, 475);
      game.debug.text("Skin Value: $" + skinRate, 20, 575);
      game.debug.text("Hearts: " + hearts, 200, 175);
      game.debug.text("Lungs: " + lungs, 200, 275);
      game.debug.text("Kidneys: " + kidneys, 200, 375);
      game.debug.text("Livers: " + livers, 200, 475);
      game.debug.text("Skins: " + skins, 200, 575);
      game.debug.text("Money: $" + money, 400, 32);
      game.debug.text("Make as much money as possible! " + Math.floor(game.time.events.duration/1000), 32, 32);
      }

    }

    function skin () {
         money -= skinRate;
         skins += 1;
    }
        
    function liver() {
         money -= liverRate;
         livers +=1;
    }
    
    function heart() {
         money -= heartRate;
         hearts += 1;
    }
    
    function kidney() {
         money -= kidneyRate;
         kidneys += 1;
    }
    
    function lung() {
         money -= lungRate;
         lungs += 1;
    }
    
    function sellSkin () {
      if (skins > 0){
         money += skinRate;
         skins -= 1;
      }
    }
        
    function sellLiver() {
      if (livers > 0){   
         money += liverRate;
         livers -= 1;
      }
    }
    
    function sellHeart() {
      if (hearts > 0){
         money += heartRate;
         hearts -= 1;
      }
    }
    
    function sellKidney() {
      if (kidneys > 0){
         money += kidneyRate;
         kidneys -= 1;
      }
    }
    
    function sellLungs() {
      if (lungs > 0){
         money += lungRate;
         lungs -= 1;
      }
    }
    
    function endGame(){
         end = true;
    }
    
    function endGame2(){
         background = game.add.tileSprite(0, 0, 800, 600, 'background2');
         music.destroy();
         end2 = true;
    }
    
    
};
