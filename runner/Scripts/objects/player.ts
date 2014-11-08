/// <reference path="../managers/asset.ts" />
/// <reference path="gameobject.ts" />
module objects {
    // Player Class
    export class Player extends GameObject {
        engineSound: createjs.SoundInstance;

        prevAnimation: string;
        prevJumpHeight: number;
        jumpHieght: number;
        jumping: boolean = false;
        jumpX: number;
        falling: boolean;
        constructor(stage: createjs.Stage, game: createjs.Container) {
            super(stage, game, managers.Assets.player, "idle");

            this.x = 100;
            this.y = constants.GROUND_HEIGHT - this.regY;

            this.prevAnimation = this.currentAnimation;
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

        running() {
            this.gotoAndPlay("running");
        }

        idle() {
            this.gotoAndPlay("idle");
        }

        update() {
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
            }
        }
    }
} 