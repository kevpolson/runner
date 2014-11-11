﻿/// <reference path="../constants.ts" />
/// <reference path="../managers/asset.ts" />
/// <reference path="../objects/scoreboard.ts" />
/// <reference path="../objects/player.ts" />
/// <reference path="../objects/background.ts" />
/// <reference path="../objects/missile.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/label.ts" />

module states {
    var progress: objects.Label;
    export function loadingUnload() {
        console.log("unload loading");
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = constants.MENU_STATE;
        changeState(currentState);
    }

    export function loadingState(event) {
        progress.text = (event.progress * 100).toString() + "%";

        stage.update();
    }

    export function loading() {
        // Declare new Game Container
        game = new createjs.Container();

        // Instantiate Game Objects
        progress = new objects.Label(stage.canvas.width * 0.5, stage.canvas.height * 0.5, "0%");
        game.addChild(progress);

        stage.addChild(game);
    }
} 