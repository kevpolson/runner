﻿/// <reference path="../states/loading.ts" />
module managers {
    // Image and Sound Manifest;
    var assetManifest = [
        { id: "loading", src: "assets/images/loading.jpg" },
        { id: "background", src: "assets/images/background.png" },
        { id: "explosion", src: "assets/sounds/boom.mp3" },
        { id: "death", src: "assets/sounds/death.mp3" },
        { id: "empty", src: "assets/sounds/empty.mp3" },
        { id: "laser", src: "assets/sounds/laser.mp3" },
        { id: "collect", src: "assets/sounds/bleep.mp3" },
        { id: "bgMusic", src: "assets/sounds/UnderTheClouds.mp3" }
    ];

    // SpriteSheet for Player Object
    var playerSheetData = {
        "images": ["assets/images/M484SpaceSoldier.png"],
        "frames": [
            [8, 11, 50, 50],    //idle   [0]
            [213, 12, 48, 48],  //jump   [1]
            [315, 12, 48, 48],  //fall   [2]
            [8, 67, 50, 50],    //run1   [3]
            [59, 67, 50, 50],   //run2   [4]
            [110, 67, 50, 50],  //run3   [5]
            [161, 67, 50, 50],  //run4   [6]
            [212, 67, 50, 50],  //run5   [7]
            [263, 67, 50, 50],  //run6   [8]
            [314, 67, 50, 50],  //run7   [9]
            [365, 67, 50, 50],  //run8  [10]
            [150, 270, 50, 50], //boom  [11]
            [417, 12, 48, 48]   //blank [12]
        ],
        "animations": {
            "idle": [0],
            "running": { frames: [3, 4, 5, 6, 7, 8, 9, 10],
                         speed: 0.25 },
            "jumping": [1],
            "falling": [2]
        }
    }

    // SpriteSheet for Collectable Object
    var energyTankSheetData = {
        "images": ["assets/images/energytank.png"],
        "frames": [
            [0, 0, 40, 20],   //orange       [0]
            [40, 0, 40, 20],  //yellow       [1]
            [80, 0, 40, 20],  //light yellow [2]
            [120, 0, 40, 20]  //yellow       [3]
        ],
        "animations": {
            "idle": { frames: [0, 1, 2, 3],
                      speed: 0.05 }
        }
    }

    // SpriteSheet for Missile Object
    var missileSheetData = {
        "images": ["assets/images/missile.png", "assets/images/M484SpaceSoldier.png"],
        "frames": [
            [0, 0, 100, 60, 0],  //missile [0]
            [150, 270, 50, 50, 1], //boom    [1]
            [417, 12, 48, 48, 1]   //blank [12]
        ],
        "animations": {
            "idle": [0],
            "expolsion": { frames: [1, 2],
                           speed: 0.25 }
        }
    }

    // SpriteSheet for Buttons
    var buttonData = {
        "images": ["assets/images/buttons.png"],
        "frames": [
            [0, 0, 190, 49],  //start      [0]
            [0, 50, 190, 49]  //play again [1]
        ],
        "animations": {
            "start": [0],
            "playagain": [1]
        }
    }

    /*
    // SpriteSheet for misc Objects
    var spriteSheetData = {
        "images": ["assets/images/atlas.png"],
        "frames": [
            [2, 2, 226, 178],
            [230, 2, 211, 69],
            [443, 69, 62, 63],
            [443, 2, 65, 65],
            [230, 73, 211, 69],
            [230, 144, 211, 69]
        ],
        "animations": {
            "cloud": [0],
            "instructionsButton": [1],
            "island": [2],
            "plane": [3],
            "playButton": [4],
            "tryAgainButton": [5]
        }
    }
    */

    // Asset Manager Class
    export class Assets {
        public static manifest;
        public static data;

        public static loader;
        public static buttons: createjs.SpriteSheet;
        public static player: createjs.SpriteSheet;
        public static energytank: createjs.SpriteSheet;
        public static missile: createjs.SpriteSheet;

        public static init() {
            createjs.Sound.initializeDefaultPlugins();

            this.loader = new createjs.LoadQueue();
            this.loader.on("progress", states.loadingState, this);
            this.loader.on("complete", states.loadingUnload, this);

            this.loader.installPlugin(createjs.Sound);
            this.loader.loadManifest(assetManifest);
            
            this.buttons = new createjs.SpriteSheet(buttonData);
            this.player = new createjs.SpriteSheet(playerSheetData);
            this.energytank = new createjs.SpriteSheet(energyTankSheetData);
            this.missile = new createjs.SpriteSheet(missileSheetData);
        }
    }
} 