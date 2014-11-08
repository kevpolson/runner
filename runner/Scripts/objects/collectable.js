var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../managers/asset.ts" />
var objects;
(function (objects) {
    // Collectable Class
    var Collectable = (function (_super) {
        __extends(Collectable, _super);
        function Collectable(stage, game) {
            _super.call(this, stage, game, managers.Assets.energytank, "idle");

            this.reset();
        }
        Collectable.prototype.update = function () {
            this.x -= this.speed;
            if (this.x + this.regX <= 0) {
                this.reset();
            }
        };

        Collectable.prototype.reset = function () {
            var minY = stage.canvas.height * 0.6;
            var maxY = constants.GROUND_HEIGHT - this.regY;

            this.x = this.stage.canvas.width;
            this.y = minY;
            //this.y = Math.floor(Math.random() * (maxY - minY)) + minY;
        };
        return Collectable;
    })(objects.GameObject);
    objects.Collectable = Collectable;
})(objects || (objects = {}));
//# sourceMappingURL=Collectable.js.map
