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
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/Astroid.png' );
        game.load.image('Background', 'assets/Background.png');
        game.load.image('missile', 'assets/Missile3.png');
    }
    
    var time;
    //var timer
    //var event;
    var missiles;
    var astroid;
    var background;
    
    function create() {
      
        //time = new Time(game); //from phaser docs
       // timer = time.create;
       // event = new TimerEvent(timer, 3)
        //Adapted from defender example
        background = game.add.tileSprite(0, 0, 800, 600, 'Background'); 
      
        missiles = game.add.physicsGroup(Phaser.Physics.ARCADE);

        for (var i = 0; i < 5; i++)
        {
//            if (time%5 === 0)
                 var m = missiles.create(game.world.randomX, game.world.randomY, 'missile');
                 m.body.gravity.y = 10;
        }
        
        //game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1);
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
        var style = { font: "25px Verdana", fill: "#ff00ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Avoid the missles!", style );
        text.anchor.setTo( 0.5, 0.0 );
    }
    
    function update() { 
     // if ((Math.floor(game.time.time / 1000) % 60)%20 == 0)
       //     missile.create(game.world.randomX, game.world.randomY, 'missile');
      //  Scroll the background
//    if (!Phaser.Physics.ARCADE.collide('logo', 'missile'))
//    {
//        stateText.text=" GAME OVER \n Click to restart";
//        stateText.visible = true;
//        //the "click to restart" handler
//        game.input.onTap.addOnce(restart,this);
//    }
    background.tilePosition.y += 2; //adapted from defender example
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        astroid.rotation = game.physics.arcade.accelerateToPointer( astroid, this.game.input.activePointer, 1000, 2000, 500 );
    }
};
