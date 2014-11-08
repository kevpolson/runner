/// <reference path="../objects/button.ts" />
/// <reference path="../objects/cloud.ts" />
/// <reference path="../objects/collectable.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/background.ts" />
/// <reference path="../objects/player.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../managers/collision.ts" />
var states;
(function (states) {
    function playState() {
        background.update();
        energytank.update();
        player.update();

        /*
        for (var count = 0; count < constants.CLOUD_NUM; count++) {
        clouds[count].update();
        }
        */
        collision.update();
        scoreboard.update();

        if (scoreboard.lives <= 0) {
            stage.removeChild(game);
            player.destroy();
            game.removeAllChildren();
            game.removeAllEventListeners();
            currentState = constants.GAME_OVER_STATE;
            changeState(currentState);
        }
    }
    states.playState = playState;

    // play state Function
    function play() {
        // Declare new Game Container
        game = new createjs.Container();

        // Instantiate Game Objects
        background = new objects.Background(stage, game);
        energytank = new objects.Collectable(stage, game);
        player = new objects.Player(stage, game);
        player.running();

        // Show Cursor
        stage.cursor = "none";

        for (var count = 0; count < constants.CLOUD_NUM; count++) {
            clouds[count] = new objects.Cloud(stage, game);
        }

        // Display Scoreboard
        scoreboard = new objects.Scoreboard(stage, game);

        // Instantiate Collision Manager
        collision = new managers.Collision(player, energytank, clouds, scoreboard);

        stage.addChild(game);
    }
    states.play = play;
})(states || (states = {}));
//# sourceMappingURL=play.js.map
