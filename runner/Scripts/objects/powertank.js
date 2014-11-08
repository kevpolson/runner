var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../managers/asset.ts" />
var objects;
(function (objects) {
    // PowerTank Class
    var PowerTank = (function (_super) {
        __extends(PowerTank, _super);
        function PowerTank(stage, game) {
            _super.call(this, stage, game, managers.Assets.energytank, "idle");

            this.reset();
        }
        PowerTank.prototype.update = function () {
            this.x -= this.speed;
            if (this.x + this.regX <= 0) {
                this.reset();
            }
        };

        PowerTank.prototype.reset = function () {
            this.x = this.stage.canvas.width;
            this.y = constants.GROUND_HEIGHT - this.regY; //Math.floor(Math.random() * (constants.GROUND_HEIGHT - this.height));
        };
        return PowerTank;
    })(objects.GameObject);
    objects.PowerTank = PowerTank;
})(objects || (objects = {}));
//# sourceMappingURL=powertank.js.map
