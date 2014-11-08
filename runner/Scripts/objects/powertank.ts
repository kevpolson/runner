/// <reference path="../managers/asset.ts" />
module objects {
    // PowerTank Class
    export class PowerTank extends GameObject {
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
            this.x = this.stage.canvas.width; 
            this.y = constants.GROUND_HEIGHT - this.regY;//Math.floor(Math.random() * (constants.GROUND_HEIGHT - this.height));
        }
    }
}