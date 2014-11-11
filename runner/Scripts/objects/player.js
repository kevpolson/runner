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
            this.jumpNext = false;
            this.shootNext = false;
            this.GUNX = this.regX * 0.5;
            this.LASER_DURATION = 125;
            this.LASER_WIDTH = 3;
            this.gunFired = false;

            this.x = 100;
            this.y = constants.GROUND_HEIGHT - this.regY;

            this.prevAnimation = this.currentAnimation;
        }
        Player.prototype.shootPressed = function () {
            this.shootNext = true;
        };

        Player.prototype.shoot = function () {
            if (!this.gunFired) {
                createjs.Sound.play("laser");
                this.gunFired = true;
                this.fireTime = createjs.Ticker.getTime() + this.LASER_DURATION;

                this.enemyX = this.stage.mouseX;
                this.enemyY = this.stage.mouseY;

                this.createLaser("#DF0174");
            }
        };

        Player.prototype.jumpPressed = function () {
            this.jumpNext = true;
        };

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

        Player.prototype.update = function () {
            if (this.shootNext) {
                this.shoot();
                this.jumpNext = false;
                this.shootNext = false;
            } else if (this.jumpNext) {
                this.jump();
                this.jumpNext = false;
            }

            if (this.gunFired) {
                if (this.fireTime <= createjs.Ticker.getTime()) {
                    this.destroyLaser();
                }
            }

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
                if (this.gunFired) {
                    this.refreshLaser();
                }
            }
        };

        Player.prototype.running = function () {
            this.gotoAndPlay("running");
        };

        Player.prototype.idle = function () {
            this.gotoAndPlay("idle");
        };

        Player.prototype.refreshLaser = function () {
            this.game.removeChild(this.laser);
            this.createLaser("#DF0174");
        };

        Player.prototype.createLaser = function (newColor) {
            this.laser = new createjs.Shape();
            this.laser.graphics.beginFill(newColor);
            this.laser.graphics.moveTo(this.x + this.GUNX, this.y).lineTo(this.enemyX, this.enemyY).lineTo(this.enemyX, this.enemyY + this.LASER_WIDTH).lineTo(this.x + this.GUNX, this.y + this.LASER_WIDTH).lineTo(this.x + this.GUNX, this.y);
            game.addChild(this.laser);
        };

        Player.prototype.destroyLaser = function () {
            if (this.gunFired) {
                this.gunFired = false;
                this.enemyX = 0;
                this.enemyY = 0;
                game.removeChild(this.laser);
            }
        };
        return Player;
    })(objects.GameObject);
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map
