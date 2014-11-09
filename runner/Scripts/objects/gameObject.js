﻿var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../managers/asset.ts" />
var objects;
(function (objects) {
    var GameObject = (function (_super) {
        __extends(GameObject, _super);
        function GameObject(stage, game, spriteSheet, newAnimation) {
            this.stage = stage;
            this.game = game;

            _super.call(this, spriteSheet, newAnimation);
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;

            this.speed = constants.GAME_SPEED;

            game.addChild(this);
        }
        GameObject.prototype.update = function () {
        };

        GameObject.prototype.destroy = function () {
            game.removeChild(this);
        };
        return GameObject;
    })(createjs.Sprite);
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=gameobject.js.map
