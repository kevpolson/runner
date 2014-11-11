/// <reference path="constants.ts" />
/// <reference path="managers/asset.ts" />
/// <reference path="objects/missile.ts" />
/// <reference path="objects/collectable.ts" />
/// <reference path="objects/background.ts" />
/// <reference path="objects/player.ts" />
/// <reference path="objects/scoreboard.ts" />
/// <reference path="objects/label.ts" />
/// <reference path="objects/button.ts" />
/// <reference path="managers/collision.ts" />
/// <reference path="states/loading.ts" />
/// <reference path="states/play.ts" />
/// <reference path="states/menu.ts" />
/// <reference path="states/gameover.ts" />

var stage: createjs.Stage;
var game: createjs.Container;

var background: objects.Background;
var player: objects.Player;
var energytank: objects.Collectable;
var bgMusic: createjs.SoundInstance;
var missiles = []; 
var scoreboard: objects.Scoreboard;

var collision: managers.Collision;

var tryAgain: objects.Button;
var playButton: objects.Button;

var currentState: number;
var currentStateFunction;

// Preload function - Loads Assets and initializes game;
function preload(): void {
    stage = new createjs.Stage(document.getElementById("canvas"));
    states.loading();
    managers.Assets.init();
    managers.Assets.loader.addEventListener("complete", init);
}

// init called after Assets have been loaded.
function init(): void {
    stage.enableMouseOver(30);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", gameLoop);

    optimizeForMobile();

    bgMusic = createjs.Sound.play("bgMusic", createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);
    currentState = constants.MENU_STATE;
    changeState(currentState);
}

// Add touch support for mobile devices
function optimizeForMobile() {
    if (createjs.Touch.isSupported()) {
        createjs.Touch.enable(stage);
    }
}

// Game Loop
function gameLoop(event): void {
    currentStateFunction();
    stage.update();

    //console.log("objects: " + game.children.length);
}

function changeState(state: number): void {
    // Launch Various "screens"
    switch (state) {
        case constants.MENU_STATE:
            // instantiate menu screen
            currentStateFunction = states.menuState;
            states.menu();
            break;

        case constants.PLAY_STATE:
            // instantiate play screen
            currentStateFunction = states.playState;
            states.play();
            break;

        case constants.GAME_OVER_STATE:
            // instantiate game over screen
            currentStateFunction = states.gameOverState;
            states.gameOver();
            break;
    }
}

//the player will jump when the screen is pressed
function playerJump(event: MouseEvent) {
    player.jumpPressed();
}

//the player will shoot when an enemy is pressed
function playerShoot(event) {
    if (scoreboard.energy > 0) {
        event.currentTarget.exploded = true;
        
        player.shootPressed();

        scoreboard.energy--;
        scoreboard.score += 100;
    } else {
        createjs.Sound.play("empty");
    }
}





