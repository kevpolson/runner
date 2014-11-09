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

            this.reset();
        }
        Missile.prototype.update = function () {
            this.y += this.dy;
            this.x += this.dx;
            if (this.x + this.width <= 0) {
                this.reset();
            }
        };

        Missile.prototype.reset = function () {
            var minY = stage.canvas.height * 0.6;
            var maxY = constants.GROUND_HEIGHT - this.regY;

            this.x = Math.floor(Math.random() * this.stage.canvas.width) + this.stage.canvas.width;
            this.y = Math.floor(Math.random() * (maxY - minY)) + minY;
            this.dx = -(constants.GAME_SPEED * 1.5 + constants.GAME_SPEED); //-(Math.floor(Math.random() * constants.GAME_SPEED * 1.5) + constants.GAME_SPEED + 1);
            this.dy = 0; //Math.floor(Math.random() * 5 + 5);
        };
        return Missile;
    })(objects.GameObject);
    objects.Missile = Missile;
})(objects || (objects = {}));
//# sourceMappingURL=missile.js.map
