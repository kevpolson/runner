/// <reference path="../constants.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../objects/player.ts" />
/// <reference path="../objects/background.ts" />
/// <reference path="../objects/cloud.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/label.ts" />

module states {
    export function playButtonClicked(event: MouseEvent) {
        stage.removeChild(game);
        player.destroy();
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = constants.PLAY_STATE;
        changeState(currentState);
    }

    export function playerJump(event: MouseEvent) {
        player.jump();
    }

    export function menuState() {
        player.update();
    }

    export function menu() {
        var gameNameLabel: objects.Label;

        // Declare new Game Container
        game = new createjs.Container();

        // Instantiate Game Objects
        background = new objects.Background(stage, game);
        //ocean = new objects.Ocean(stage, game);
        player = new objects.Player(stage, game);
        game.addEventListener('click', playerJump);

        // Show Cursor
        stage.cursor = "default";

        // Display Game Over
        gameNameLabel = new objects.Label(stage.canvas.width * 0.5, 40, "Runner");
        game.addChild(gameNameLabel);

        // Display Play Again Button
        playButton = new objects.Button(stage.canvas.width * 0.5, 300, "playButton");
        game.addChild(playButton);
        playButton.addEventListener("click", playButtonClicked);

        stage.addChild(game);
    }
} 