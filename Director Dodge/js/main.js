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
    
  var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update} );
    
    function preload() {
        game.load.image( 'bubble', 'assets/chat_bubble.png' );
        game.load.image( 'background', 'assets/Director Dodge.png' );
        game.load.image('Ending', 'assets/gameover.png');
        game.load.image('Ending2', 'assets/gameover2.png');
        game.load.image( 'bubble1', 'assets/chat_bubble1.png' );
        game.load.image( 'bubble2', 'assets/chat_bubble2.png' );
        game.load.image( 'bubble3', 'assets/chat_bubble3.png' );
        game.load.image( 'up', 'assets/up.png' );
        game.load.image( 'down', 'assets/down.png' );
        game.load.image( 'right', 'assets/right.png' );
        game.load.image( 'left', 'assets/left.png' );
        game.load.image( 'man1', 'assets/man21.png' );
        game.load.image( 'man2', 'assets/man22.png' );
        game.load.image( 'man3', 'assets/man23.png' );
        game.load.image( 'man4', 'assets/man24.png' );
        game.load.image( 'grey', 'assets/grey.png' );
    }
    
    var start;
    var end;
    var chat;  
    var background;
    var right;
    var left;
    var down;
    var up;
    var man;
    var rand1;
    var rand2;
    var rand3;
    var rand4;
    var rand5;
    var puzzle;
    var answers;
    var rightKey;
    var leftKey;
    var upKey;
    var downKey;
    var counter;
    var pass1;
    var pass2;
    var pass3;
    var block;

    
    function create() {
       

       game.time.events.add(Phaser.Timer.SECOND * 4, puzzle1, this);
       game.time.events.add(Phaser.Timer.SECOND * 6, puzzle1, this);
       game.time.events.add(Phaser.Timer.SECOND * 7, puzzle2, this);
       game.time.events.add(Phaser.Timer.SECOND * 8, puzzle3, this);
       game.time.events.add(Phaser.Timer.SECOND * 10, puzzle1, this);
       game.time.events.add(Phaser.Timer.SECOND * 11, puzzle2, this);
       game.time.events.add(Phaser.Timer.SECOND * 12, puzzle3, this);
       game.time.events.add(Phaser.Timer.SECOND * 13, puzzle4, this);
       game.time.events.add(Phaser.Timer.SECOND * 14, puzzle5, this);
       game.time.events.add(Phaser.Timer.SECOND * 4.5, blank, this);
       game.time.events.add(Phaser.Timer.SECOND * 6.5, blank, this);
       game.time.events.add(Phaser.Timer.SECOND * 7.5, blank, this);
       game.time.events.add(Phaser.Timer.SECOND * 8.5, blank, this);
       game.time.events.add(Phaser.Timer.SECOND * 10.5, blank, this);
       game.time.events.add(Phaser.Timer.SECOND * 11.5, blank, this);
       game.time.events.add(Phaser.Timer.SECOND * 12.5, blank, this);
       game.time.events.add(Phaser.Timer.SECOND * 13.5, blank, this);
       game.time.events.add(Phaser.Timer.SECOND * 14.5, blank, this);
       background = game.add.tileSprite(0, 0, 800, 600, 'background');
       chat = game.add.sprite(150, 350, 'bubble1');       
       up = game.add.sprite(430, 100, 'man1');
       left = game.add.sprite(430, 100, 'man2');
       right = game.add.sprite(430, 100, 'man4');
       down = game.add.sprite(430, 100, 'man3');
       man = down;
       rand1 = rand2 = rand3 = rand4 = rand5 = 0;
       puzzle = [];
       answers = [];
       start = end = false;
       pass1 = pass2 = pass3 = true;
       leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
       rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
       upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
       downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
       game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.DOWN, Phaser.Keyboard.UP ]);
       counter = 0;

    }
    
    function update() {
     counter++;
     if (counter === 75)
       chat = game.add.sprite(150, 350, 'bubble2');
     if (counter === 150)
       chat = game.add.sprite(150, 350, 'bubble3');
     if (counter === 325 || counter === 550 || counter === 1000){
           start = false;
           if (answers.length != puzzle.length)
             endGame();
           else{
             for (var i=0; i<answers.length; i++){
                 if (answers[i] != puzzle[i])
                   endGame();
             }
           }
     }
     if (counter === 1000 && end === false)
       endGame2()
     if(start){
        if (leftKey.isDown){
          man.destroy();
          left = game.add.sprite(430, 100, 'man2');
          man = left;
          if (leftKey.downDuration(1))
             answers.push("left");
        }
        else if (rightKey.isDown){
          man.destroy();
          right = game.add.sprite(430, 100, 'man4');
          man = right;
          if (rightKey.downDuration(1))
             answers.push("right");
        }
        else if (downKey.isDown){
          man.destroy();
          down = game.add.sprite(430, 100, 'man3');
          man = down;
          if (downKey.downDuration(1))
             answers.push("down");
        }
        else if (upKey.isDown){
          man.destroy();
          up = game.add.sprite(430, 100, 'man1');
          man = up;
          if (upKey.downDuration(1))
             answers.push("up");
        }
     }

    }
    

    function puzzle1() {
         start = true;
         rand1 = Math.floor((Math.random()*4)+1);
         if (rand1===1){
           puzzle.push("left");
           chat = game.add.sprite(150, 350, 'left');
         }
         else if (rand1===2){
           puzzle.push("right");
           chat = game.add.sprite(150, 350, 'right');
         }
         else if (rand1===3){
           puzzle.push("up");
           chat = game.add.sprite(150, 350, 'up');
         }
         else{
           puzzle.push("down");
           chat = game.add.sprite(150, 350, 'down');
         }
    }
    
    function puzzle2() {
         start = true;
         rand2 = Math.floor((Math.random()*4)+1);
         if (rand2===1){
           puzzle.push("left");
           chat = game.add.sprite(150, 350, 'left');
         }
         else if (rand2===2){
           puzzle.push("right");
           chat = game.add.sprite(150, 350, 'right');
         }
         else if (rand2===3){
           puzzle.push("up");
           chat = game.add.sprite(150, 350, 'up');
         }
         else{
           puzzle.push("down");
           chat = game.add.sprite(150, 350, 'down');
         }
    }
    function puzzle3() {
         start = true;
         rand3 = Math.floor((Math.random()*4)+1);
         if (rand3===1){
           puzzle.push("left");
           chat = game.add.sprite(150, 350, 'left');
         }
         else if (rand3===2){
           puzzle.push("right");
           chat = game.add.sprite(150, 350, 'right');
         }
         else if (rand3===3){
           puzzle.push("up");
           chat = game.add.sprite(150, 350, 'up');
         }
         else{
           puzzle.push("down");
           chat = game.add.sprite(150, 350, 'down');
         }
    }
    
    function puzzle4() {
         start = true;
         rand4 = Math.floor((Math.random()*4)+1);
         if (rand4===1){
           puzzle.push("left");
           chat = game.add.sprite(150, 350, 'left');
         }
         else if (rand4===2){
           puzzle.push("right");
           chat = game.add.sprite(150, 350, 'right');
         }
         else if (rand4===3){
           puzzle.push("up");
           chat = game.add.sprite(150, 350, 'up');
         }
         else{
           puzzle.push("down");
           chat = game.add.sprite(150, 350, 'down');
         }
    }
    
    function puzzle5() {
         start = true;
         rand5 = Math.floor((Math.random()*4)+1);
         if (rand5===1){
           puzzle.push("left");
           chat = game.add.sprite(150, 350, 'left');
         }
         else if (rand5===2){
           puzzle.push("right");
           chat = game.add.sprite(150, 350, 'right');
         }
         else if (rand5===3){
           puzzle.push("up");
           chat = game.add.sprite(150, 350, 'up');
         }
         else{
           puzzle.push("down");
           chat = game.add.sprite(150, 350, 'down');
         }
    }
        

    function endGame(){
         background = game.add.tileSprite(0, 0, 800, 600, 'Ending');
         down = game.add.sprite(430, 100, 'man3');
         end = true;
    }
    
    function endGame2(){
         background = game.add.tileSprite(0, 0, 800, 600, 'Ending2');
         up = game.add.sprite(430, 100, 'man1');
    }
    
    function blank(){
         block = game.add.sprite(150, 350, 'grey');
    }
    
    
};
