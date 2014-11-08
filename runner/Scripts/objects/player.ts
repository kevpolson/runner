/// <reference path="../managers/asset.ts" />
/// <reference path="gameobject.ts" />
module objects {
    // Player Class
    export class Player extends GameObject {
        //image: createjs.Sprite;
        //stage: createjs.Stage;
        //game: createjs.Container;
        engineSound: createjs.SoundInstance;
        //width: number;
        //height: number;
        jumping: boolean = false;
        jumpX: number;
        dx: number;
        constructor(stage: createjs.Stage, game: createjs.Container) {
            super(stage, game, managers.Assets.player, "idle");
            //this.stage = stage;
            //this.game = game;
            //this.image = new createjs.Sprite(managers.Assets.player, "idle");
            //this.width = this.image.getBounds().width;
            //this.height = this.image.getBounds().height;
            //this.image.regX = this.width / 2;
            //this.image.regY = this.height / 2;

            this.dx = 5;

            this.x = 100;
            this.y = 423 - this.regY;

            //game.addChild(this.image);
            //this.engineSound = createjs.Sound.play('engine', createjs.Sound.INTERRUPT_NONE, 0, 0, -1, 1, 0);
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

        prevAnimation: string;
        prevJumpHeight: number;
        jumpHieght: number;
        falling: boolean;
        update() {
            if (this.jumping) {
                this.prevJumpHeight = this.jumpHieght;
                this.jumpX += 1; 
                console.log(this.jumpX);
                this.jumpHieght = Math.sin(this.jumpX * 0.1) * 10 - this.prevJumpHeight;
                //this.prevJumpHeight =

                this.y -= this.jumpHieght;
                if (this.y >= 423 - this.regY) {
                    this.jumping = false;
                    this.y = 423 - this.regY;
                    this.gotoAndPlay(this.prevAnimation);
                }
                else if (!this.falling && this.jumpX >= 25) {
                    this.gotoAndPlay("falling");
                    this.falling = true;
                } 
            }
        }

        /*
        destroy() {
            //this.engineSound.stop();
            game.removeChild(this.image);
        }
        */
    }
} 