/// <reference path="../managers/asset.ts" />
/// <reference path="gameobject.ts" />
module objects {
    // Missile class
    export class Missile extends GameObject {
        explosionTime: number;
        exploded: boolean = false;
        constructor(stage: createjs.Stage, game: createjs.Container) {
            super(stage, game, managers.Assets.missile, "idle");
            //this.explosionTime = constants.EXPLOSION_TIME;
            this.reset();
        }

        update() {
            if (!this.exploded) {
                this.y += 0.1;
                this.x -= this.speed * 1.5;
                if (this.x + this.width <= 0) {
                    this.reset();
                }
            } else {
                this.x -= this.speed;

                if (this.currentAnimation != "expolsion") {
                    createjs.Sound.play("explosion");
                    this.gotoAndPlay("expolsion");
                    this.explosionTime = createjs.Ticker.getTime() + constants.EXPLOSION_TIME;
                } else if (this.explosionTime <= createjs.Ticker.getTime()) {
                    this.gotoAndPlay("idle");
                    this.reset();
                }

            }
        }

        reset() {
            var minY = stage.canvas.height * 0.5;
            var maxY = constants.GROUND_HEIGHT - this.regY;

            this.x = Math.floor(Math.random() * this.stage.canvas.width) + this.stage.canvas.width;
            this.y = Math.floor(Math.random() * (maxY - minY)) + minY;

            this.exploded = false;
        }
    }

}