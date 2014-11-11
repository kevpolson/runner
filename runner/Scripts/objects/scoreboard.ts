module objects {
    // Scoreboard Class
    export class Scoreboard {
        stage: createjs.Stage;
        game: createjs.Container;
        gui: createjs.Container;
        livesImage: createjs.Sprite;
        energyImage: createjs.Sprite;
        lives: number;
        energy: number;
        score: number;
        livesLabel: createjs.Text;
        energyLabel: createjs.Text;
        scoreLabel: createjs.Text;
        totalScoreLabel: createjs.Text;
        constructor(stage: createjs.Stage, game: createjs.Container) {
            this.stage = stage;
            this.game = game;

            this.lives = constants.PLAYER_LIVES;
            this.livesImage = new createjs.Sprite(managers.Assets.player, "idle");
            this.livesImage.x = 50;
            this.livesImage.y = 10;

            this.livesLabel = new createjs.Text("", constants.LABEL_FONT, constants.LABEL_COLOUR);
            this.livesLabel.x = 100;
            this.livesLabel.y = 20;

            this.energy = constants.PLAYER_LIVES;
            this.energyImage = new createjs.Sprite(managers.Assets.energytank, "idle");
            this.energyImage.x = 165;
            this.energyImage.y = 30;

            this.energyLabel = new createjs.Text("", constants.LABEL_FONT, constants.LABEL_COLOUR);
            this.energyLabel.x = 215;
            this.energyLabel.y = 20;

            this.score = 0;
            this.scoreLabel = new createjs.Text("Score: ", constants.LABEL_FONT, constants.SCORE_COLOUR);
            this.scoreLabel.x = 300;
            this.scoreLabel.y = 20;

            this.totalScoreLabel = new createjs.Text("", constants.LABEL_FONT, constants.LABEL_COLOUR);
            this.totalScoreLabel.x = 435;
            this.totalScoreLabel.y = 20;


            this.update();
            this.gui = new createjs.Container();
            
            this.gui.addChild(this.livesImage);
            this.gui.addChild(this.energyImage);
            this.gui.addChild(this.livesLabel);
            this.gui.addChild(this.energyLabel);
            this.gui.addChild(this.scoreLabel);
            this.gui.addChild(this.totalScoreLabel);

            game.addChild(this.gui);
        }

        update() {
            this.livesLabel.text = "x" + this.lives.toString();
            this.energyLabel.text = "x" + this.energy.toString();
            this.totalScoreLabel.text = this.score.toString();
        }

        destroy() {
            game.removeChild(this.gui);
        }
    }
} 