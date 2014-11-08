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
    // Player Class
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(stage, game) {
            _super.call(this, stage, game, managers.Assets.player, "idle");
            this.jumping = false;

            this.x = 100;
            this.y = constants.GROUND_HEIGHT - this.regY;

            this.prevAnimation = this.currentAnimation;
        }
        Player.prototype.jump = function () {
            if (!this.jumping) {
                this.prevAnimation = this.currentAnimation;
                this.gotoAndPlay("jumping");
                this.jumping = true;
                this.falling = false;
                this.jumpX = 0;
                this.prevJumpHeight = 0;
                this.jumpHieght = 0;
            }
        };

        Player.prototype.running = function () {
            this.gotoAndPlay("running");
        };

        Player.prototype.idle = function () {
            this.gotoAndPlay("idle");
        };

        Player.prototype.update = function () {
            if (this.jumping) {
                this.prevJumpHeight = this.jumpHieght;
                this.jumpX += 1;

                this.jumpHieght = Math.sin(this.jumpX * 0.1) * 10 - this.prevJumpHeight;

                this.y -= this.jumpHieght;
                if (this.y >= constants.GROUND_HEIGHT - this.regY) {
                    this.jumping = false;
                    this.y = constants.GROUND_HEIGHT - this.regY;
                    this.gotoAndPlay(this.prevAnimation);
                } else if (!this.falling && this.jumpX >= 25) {
                    this.gotoAndPlay("falling");
                    this.falling = true;
                }
            }
        };
        return Player;
    })(objects.GameObject);
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map
