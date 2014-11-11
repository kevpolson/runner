/// <reference path="../managers/asset.ts" />
/// <reference path="gameobject.ts" />
module objects {
    // Player Class
    export class Player extends GameObject {
        prevAnimation: string;
        prevJumpHeight: number;
        jumpHieght: number;
        jumping: boolean = false;
        jumpX: number;
        falling: boolean;
        jumpNext: boolean = false;

        shootNext: boolean = false;
        laser: createjs.Shape;
        GUNX: number = this.regX * 0.5;
        LASER_DURATION: number = 125;
        LASER_WIDTH: number = 3;
        gunFired: boolean = false;
        fireTime: number;
        constructor(stage: createjs.Stage, game: createjs.Container) {
            super(stage, game, managers.Assets.player, "idle");

            this.x = 100;
            this.y = constants.GROUND_HEIGHT - this.regY;

            this.prevAnimation = this.currentAnimation;
        }

        shootPressed() {
            this.shootNext = true;
        }

        enemyX: number;
        enemyY: number;
        shoot() {
            if (!this.gunFired) {
                createjs.Sound.play("laser");
                this.gunFired = true;
                this.fireTime = createjs.Ticker.getTime() + this.LASER_DURATION;

                this.enemyX = this.stage.mouseX;
                this.enemyY = this.stage.mouseY;

                this.createLaser("#DF0174");
            }
        }
        
        jumpPressed() {
            this.jumpNext = true;
        }

        jump() {
            if (!this.jumping) {
                this.prevAnimation = this.currentAnimation;
                this.gotoAndPlay("jumping");
                this.jumping = true;
                this.falling = false;
                this.jumpX = 0;
                this.prevJumpHeight = 0;
                this.jumpHieght = 0;
            }
        }

        update() {
            if (this.shootNext) {
                this.shoot();
                this.jumpNext = false;
                this.shootNext = false;
            } else if (this.jumpNext) {
                this.jump();
                this.jumpNext = false;
            }


            if (this.gunFired) {
                if(this.fireTime <= createjs.Ticker.getTime()) {
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
                }
                else if (!this.falling && this.jumpX >= 25) {
                    this.gotoAndPlay("falling");
                    this.falling = true;
                }
                if (this.gunFired) {
                    this.refreshLaser();
                }
            }
        }

        running() {
            this.gotoAndPlay("running");
        }

        idle() {
            this.gotoAndPlay("idle");
        }

        refreshLaser() {
            this.game.removeChild(this.laser);
            this.createLaser("#DF0174");
        }

        createLaser(newColor: string) {
            this.laser = new createjs.Shape();
            this.laser.graphics.beginFill(newColor);
            this.laser.graphics.moveTo(this.x + this.GUNX, this.y)
                .lineTo(this.enemyX, this.enemyY)
                .lineTo(this.enemyX, this.enemyY + this.LASER_WIDTH)
                .lineTo(this.x + this.GUNX, this.y + this.LASER_WIDTH)
                .lineTo(this.x + this.GUNX, this.y);
            game.addChild(this.laser);
        }

        destroyLaser() {
            if (this.gunFired) {
                this.gunFired = false;
                this.enemyX = 0;
                this.enemyY = 0;
                game.removeChild(this.laser);
            }
        }

    }
} 