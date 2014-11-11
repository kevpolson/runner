/// <reference path="../objects/button.ts" />
/// <reference path="../objects/missile.ts" />
/// <reference path="../objects/collectable.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/background.ts" />
/// <reference path="../objects/player.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../managers/collision.ts" />
module states {
    export function playState() {
        //update all elements of the play state
        background.update();
        energytank.update();
        player.update();

        for (var count = 0; count < constants.MISSILE_NUM; count++) {
            missiles[count].update();
        }

        collision.update();
        scoreboard.update();

        //switch to gameover state
        if (scoreboard.lives <= 0) {
            createjs.Sound.play("death");
            stage.removeChild(game);
            player.destroy();
            player.destroyLaser();
            game.removeAllChildren();
            game.removeAllEventListeners();
            currentState = constants.GAME_OVER_STATE;
            changeState(currentState);
        }
    }

    // play state Function
    export function play(): void {
        // Declare new Game Container
        game = new createjs.Container();
        game.addEventListener('click', playerJump);

        // Instantiate Game Objects
        background = new objects.Background(stage, game);
        energytank = new objects.Collectable(stage, game);
        player = new objects.Player(stage, game);
        player.running();
        
        // Create multiple clouds
        for (var count = 0; count < constants.MISSILE_NUM; count++) {
            missiles[count] = new objects.Missile(stage, game);
            missiles[count].on('pressup', playerShoot);
        }
        
        // Display Scoreboard
        scoreboard = new objects.Scoreboard(stage, game);

        // Instantiate Collision Manager
        collision = new managers.Collision(player, energytank, missiles, scoreboard);

        stage.addChild(game);
    }
}