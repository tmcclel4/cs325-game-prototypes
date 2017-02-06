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
    
  var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render:render } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/astroid.png' );
        game.load.image('Background', 'assets/Background.png');
        game.load.image('Ending', 'assets/done.png');
        game.load.image('missile', 'assets/Missile3.png');
        game.load.image('gameover', 'assets/gameover.png');
    }
    
    var timer1;
    var count;
    var astroid;
    var background;
    var m1;
    var m2;
    var m3;
    var m4;
    var m5;
    var earth
    var blowup
    
    function create() {
        game.load.spritesheet('destroy', 'assets/destroy.png', 370, 350, 4);
        earth = game.add.sprite(400, 300, 'destroy');
        blowup = earth.animations.add('blowup');
        //set backround
        background = game.add.tileSprite(0, 0, 800, 600, 'Background'); 
        //add missiles to dodge
        m1 = game.add.sprite(100, game.world.randomY, 'missile');        
        m2 = game.add.sprite(200, game.world.randomY, 'missile');       
        m3 = game.add.sprite(600, game.world.randomY, 'missile');        
        m4 = game.add.sprite(700, game.world.randomY, 'missile');        
        m5 = game.add.sprite(800, game.world.randomY, 'missile');        
        game.physics.enable( m1, Phaser.Physics.ARCADE );
        game.physics.enable( m2, Phaser.Physics.ARCADE );
        game.physics.enable( m3, Phaser.Physics.ARCADE );
        game.physics.enable( m4, Phaser.Physics.ARCADE );
        game.physics.enable( m5, Phaser.Physics.ARCADE );
        //Make missiles fall
        m1.body.gravity.y = 10;
        m2.body.gravity.y = 10;
        m3.body.gravity.y = 10;
        m4.body.gravity.y = 10;
        m5.body.gravity.y = 10;
        
        game.time.events.add(Phaser.Timer.SECOND * 15, endGame, this);
        //timer1 = new Timer(this);
        timer1 = false;
        
        // Create a sprite at the center of the screen using the 'logo' image.
        astroid = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        astroid.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( astroid, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        astroid.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#22aaff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Avoid the missiles!", style );
        text.anchor.setTo( 0.5, 0.0 );
        
    }
    
    function update() { 
        if (m1.position.y > game.world.height)
        {
          m1.position.y = 0;
          m1.position.x = game.world.randomX;
        }
        if (m2.position.y > game.world.height)
        {
          m2.position.y = 0;
          m2.position.x = game.world.randomX;
        }
        if (m3.position.y > game.world.height)
        {
          m3.position.y = 0;
          m3.position.x = game.world.randomX;
        }
        if (m4.position.y > game.world.height)
        {
          m4.position.y = 0;
          m4.position.x = game.world.randomX;
        }
        if (m5.position.y > game.world.height)
        {
          m5.position.y = 0;
          m5.position.x = game.world.randomX;
        }
        game.physics.arcade.collide(astroid, m1, collisionHandler, null, this);  
        game.physics.arcade.collide(astroid, m2, collisionHandler, null, this); 
        game.physics.arcade.collide(astroid, m3, collisionHandler, null, this); 
        game.physics.arcade.collide(astroid, m4, collisionHandler, null, this); 
        game.physics.arcade.collide(astroid, m5, collisionHandler, null, this); 
        //  Scroll the background
        if (!timer1)
           background.tilePosition.y += 2; //adapted from defender example
        else{
           while (background.tilePosition.y != game.world.height)
               background.tilePosition.y += 2;
        }
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        astroid.rotation = game.physics.arcade.accelerateToPointer( astroid, this.game.input.activePointer, 1000, 2000, 500 );
        
    }
    
    function collisionHandler(obj1, obj2){
      background = game.add.tileSprite(0, 0, 800, 600, 'gameover');
    }
    
    function endGame(){
       timer1 = true;
       m1.destroy();
       m2.destroy();
       m3.destroy();
       m4.destroy();
       m5.destroy();
       background = game.add.tileSprite(0, 0, 800, 600, 'Ending');
       earth.animations.play('blowup', 30, true);
    }
    
    function render(){
      //game.debug.text("Background height " + background.tilePosition.y, 32, 52);
      game.debug.text("Time until event: " + Math.floor(game.time.events.duration/1000), 32, 32);
    }
  
};
