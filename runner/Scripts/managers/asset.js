var managers;
(function (managers) {
    // Image and Sound Manifest;
    var assetManifest = [
        { id: "loading", src: "assets/images/loading.jpg" },
        { id: "background", src: "assets/images/background.png" },
        { id: "engine", src: "assets/sounds/engine.ogg" },
        { id: "thunder", src: "assets/sounds/thunder.ogg" },
        { id: "yay", src: "assets/sounds/yay.ogg" }
    ];

    // SpriteSheet Data Object
    var playerSheetData = {
        "images": ["assets/images/M484SpaceSoldier.png"],
        "frames": [
            [8, 11, 50, 50],
            [213, 12, 48, 48],
            [315, 12, 48, 48],
            [8, 67, 50, 50],
            [59, 67, 50, 50],
            [110, 67, 50, 50],
            [161, 67, 50, 50],
            [212, 67, 50, 50],
            [263, 67, 50, 50],
            [314, 67, 50, 50],
            [365, 67, 50, 50]
        ],
        "animations": {
            "idle": [0],
            "running": {
                frames: [3, 4, 5, 6, 7, 8, 9, 10],
                speed: 0.25 },
            "jumping": [1],
            "falling": [2]
        }
    };

    // SpriteSheet Data Object
    var powerTankSheetData = {
        "images": ["assets/images/energytank.png"],
        "frames": [
            [0, 0, 40, 20],
            [40, 0, 40, 20],
            [80, 0, 40, 20],
            [120, 0, 40, 20]
        ],
        "animations": {
            "idle": {
                frames: [0, 1, 2, 3],
                speed: 0.05 }
        }
    };

    // SpriteSheet Data Object
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
    };

    // Asset Manager Class
    var Assets = (function () {
        function Assets() {
        }
        Assets.init = function () {
            createjs.Sound.initializeDefaultPlugins();
            this.loader = new createjs.LoadQueue();
            this.loader.installPlugin(createjs.Sound);
            this.loader.loadManifest(assetManifest);
            this.atlas = new createjs.SpriteSheet(spriteSheetData);
            this.player = new createjs.SpriteSheet(playerSheetData);
            this.energytank = new createjs.SpriteSheet(powerTankSheetData);
        };
        return Assets;
    })();
    managers.Assets = Assets;
})(managers || (managers = {}));
//# sourceMappingURL=asset.js.map
