/// <reference path="../objects/missile.ts" />
/// <reference path="../objects/collectable.ts" />
/// <reference path="../objects/player.ts" />
/// <reference path="../objects/scoreboard.ts" />
var managers;
(function (managers) {
    // Collision Manager Class
    var Collision = (function () {
        function Collision(player, powertank, missiles, scoreboard) {
            this.missiles = [];
            this.player = player;
            this.energytank = powertank;
            this.missiles = missiles;
            this.scoreboard = scoreboard;
        }
        // Utility method - Distance calculation between two points
        Collision.prototype.distance = function (p1, p2) {
            var result = 0;
            var xPoints = 0;
            var yPoints = 0;

            xPoints = p2.x - p1.x;
            xPoints = xPoints * xPoints;

            yPoints = p2.y - p1.y;
            yPoints = yPoints * yPoints;

            result = Math.sqrt(xPoints + yPoints);

            return result;
        };

        // check collision between plane and any cloud object
        Collision.prototype.planeAndEnemy = function (enemy) {
            var p1 = new createjs.Point();
            var p2 = new createjs.Point();
            p1.x = this.player.x;
            p1.y = this.player.y;
            p2.x = enemy.x + enemy.offsetX;
            p2.y = enemy.y + enemy.offsetY;

            if (this.distance(p1, p2) < ((this.player.height / 2) + (enemy.height / 2))) {
                enemy.exploded = true;

                this.scoreboard.lives -= 1;
            }
        };

        // check collision between plane and island
        Collision.prototype.playerAndCollectable = function () {
            var p1 = new createjs.Point();
            var p2 = new createjs.Point();
            p1.x = this.player.x;
            p1.y = this.player.y;
            p2.x = this.energytank.x;
            p2.y = this.energytank.y;
            if (this.distance(p1, p2) < ((this.player.height / 2) + (this.energytank.height / 2))) {
                createjs.Sound.play("collect");
                this.scoreboard.energy += constants.PLAYER_LIVES;

                this.energytank.reset();
            }
        };

        // Utility Function to Check Collisions
        Collision.prototype.update = function () {
            for (var count = 0; count < constants.MISSILE_NUM; count++) {
                if (!this.missiles[count].exploded) {
                    this.planeAndEnemy(this.missiles[count]);
                }
            }
            this.playerAndCollectable();
        };
        return Collision;
    })();
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map
