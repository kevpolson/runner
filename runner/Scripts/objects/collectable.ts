/// <reference path="../managers/asset.ts" />
module objects {
    // Collectable Class
    export class Collectable extends GameObject {
        constructor(stage: createjs.Stage, game: createjs.Container) {
            super(stage, game, managers.Assets.energytank, "idle");

            this.reset();
        }

        update() {
            this.x -= this.speed;
            if (this.x + this.regX <= 0) { 
                this.reset();
            }
        }

        reset() {
            var minY = stage.canvas.height * 0.6;
            var maxY = constants.GROUND_HEIGHT - this.regY;

            this.x = this.stage.canvas.width; 
            this.y = minY;
            //this.y = Math.floor(Math.random() * (maxY - minY)) + minY;
        }
    }
}