/// <reference path="../managers/asset.ts" />
var objects;
(function (objects) {
    // Plane Class
    var Player = (function () {
        function Player(stage, game) {
            this.jumping = false;
            this.stage = stage;
            this.game = game;
            this.image = new createjs.Sprite(managers.Assets.player, "idle");
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            this.image.regX = this.width / 2;
            this.image.regY = this.height / 2;

            this.dx = 5;

            this.image.x = 100;
            this.image.y = 423 - this.image.regY;

            game.addChild(this.image);
            //this.engineSound = createjs.Sound.play('engine', createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);
        }
        Player.prototype.jump = function () {
            if (!this.jumping) {
                this.prevAnimation = this.image.currentAnimation;
                this.image.gotoAndPlay("jumping");
                this.jumping = true;
                this.falling = false;
                this.jumpX = 0;
                this.prevJumpHeight = 0;
                this.jumpHieght = 0;
            }
        };

        Player.prototype.running = function () {
            this.image.gotoAndPlay("running");
        };

        Player.prototype.update = function () {
            if (this.jumping) {
                this.prevJumpHeight = this.jumpHieght;
                this.jumpX += 1;
                console.log(this.jumpX);
                this.jumpHieght = Math.sin(this.jumpX * 0.1) * 10 - this.prevJumpHeight;

                //this.prevJumpHeight =
                this.image.y -= this.jumpHieght;
                if (this.image.y >= 423 - this.image.regY) {
                    this.jumping = false;
                    this.image.y = 423 - this.image.regY;
                    this.image.gotoAndPlay(this.prevAnimation);
                } else if (!this.falling && this.jumpX >= 25) {
                    this.image.gotoAndPlay("falling");
                    this.falling = true;
                }
            }
        };

        Player.prototype.destroy = function () {
            //this.engineSound.stop();
            game.removeChild(this.image);
        };
        return Player;
    })();
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map
