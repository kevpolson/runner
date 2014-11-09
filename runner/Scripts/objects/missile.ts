/// <reference path="../managers/asset.ts" />
/// <reference path="gameobject.ts" />
module objects {
    // Missile class
    export class Missile extends GameObject {
        dy: number;
        dx: number;
        constructor(stage: createjs.Stage, game: createjs.Container) {
            super(stage, game, managers.Assets.missile, "idle");

            this.reset();
        }

        update() {
            this.y += this.dy;
            this.x += this.dx;
            if (this.x + this.width <= 0) {
                this.reset();
            }
        }

        reset() {
            var minY = stage.canvas.height * 0.6;
            var maxY = constants.GROUND_HEIGHT - this.regY;

            this.x = Math.floor(Math.random() * this.stage.canvas.width) + this.stage.canvas.width;
            this.y = Math.floor(Math.random() * (maxY - minY)) + minY;
            this.dx = -(constants.GAME_SPEED * 1.5 + constants.GAME_SPEED);//-(Math.floor(Math.random() * constants.GAME_SPEED * 1.5) + constants.GAME_SPEED + 1);
            this.dy = 0;//Math.floor(Math.random() * 5 + 5);
        }
    }

}