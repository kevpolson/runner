﻿/// <reference path="../objects/cloud.ts" />
/// <reference path="../objects/powertank.ts" />
/// <reference path="../objects/player.ts" />
/// <reference path="../objects/scoreboard.ts" />

module managers {
    // Collision Manager Class
    export class Collision {
        // class variables
        private player: objects.Player;
        private powertank: objects.PowerTank;
        private clouds = [];
        private scoreboard: objects.Scoreboard;

        constructor(player: objects.Player, powertank: objects.PowerTank, clouds, scoreboard: objects.Scoreboard) {
            this.player = player;
            this.powertank = powertank;
            this.clouds = clouds;
            this.scoreboard = scoreboard;
        }

        // Utility method - Distance calculation between two points
        private distance(p1: createjs.Point, p2: createjs.Point): number {
            var result: number = 0;
            var xPoints: number = 0;
            var yPoints: number = 0;

            xPoints = p2.x - p1.x;
            xPoints = xPoints * xPoints;

            yPoints = p2.y - p1.y;
            yPoints = yPoints * yPoints;

            result = Math.sqrt(xPoints + yPoints);

            return result;
        }

        // check collision between plane and any cloud object
        private planeAndCloud(cloud: objects.Cloud) {
            var p1: createjs.Point = new createjs.Point();
            var p2: createjs.Point = new createjs.Point();
            p1.x = this.player.x;
            p1.y = this.player.y;
            p2.x = cloud.image.x;
            p2.y = cloud.image.y;
            if (this.distance(p1, p2) < ((this.player.height / 2) + (cloud.height / 2))) {
                createjs.Sound.play("thunder");
                this.scoreboard.lives -= 1;
                cloud.reset();
            }
        }

        // check collision between plane and island
        private playerAndPowerTank() {
            var p1: createjs.Point = new createjs.Point();
            var p2: createjs.Point = new createjs.Point();
            p1.x = this.player.x;
            p1.y = this.player.y;
            p2.x = this.powertank.x;
            p2.y = this.powertank.y;
            if (this.distance(p1, p2) < ((this.player.height / 2) + (this.powertank.height / 2))) {
                createjs.Sound.play("yay");
                this.scoreboard.score += 100;
                this.powertank.reset();
            }
        }

        // Utility Function to Check Collisions
        update() {
            for (var count = 0; count < constants.CLOUD_NUM; count++) {
                this.planeAndCloud(this.clouds[count]);
            }
            this.playerAndPowerTank();
        }
    }
} 