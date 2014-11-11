var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../managers/asset.ts" />
/// <reference path="gameobject.ts" />
var objects;
(function (objects) {
    // Missile class
    var Missile = (function (_super) {
        __extends(Missile, _super);
        function Missile(stage, game) {
            _super.call(this, stage, game, managers.Assets.missile, "idle");
            this.exploded = false;

            //this.explosionTime = constants.EXPLOSION_TIME;
            this.reset();
        }
        //move missile forward and check to see if it has exploded
        Missile.prototype.update = function () {
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
        };

        //respawn missile off-screen at a random point
        Missile.prototype.reset = function () {
            var minY = stage.canvas.height * 0.5;
            var maxY = constants.GROUND_HEIGHT - this.regY;

            this.x = Math.floor(Math.random() * this.stage.canvas.width) + this.stage.canvas.width;
            this.y = Math.floor(Math.random() * (maxY - minY)) + minY;

            this.exploded = false;
        };
        return Missile;
    })(objects.GameObject);
    objects.Missile = Missile;
})(objects || (objects = {}));
//# sourceMappingURL=missile.js.map
