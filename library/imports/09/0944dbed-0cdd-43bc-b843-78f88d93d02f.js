"use strict";
cc._RF.push(module, '0944dvtDN1DvLhDePiNk9Av', 'collisionDetection');
// Script/game/collisionDetection.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var gameProtocol_1 = require("./gameProtocol");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var collisionDetection = /** @class */ (function (_super) {
    __extends(collisionDetection, _super);
    function collisionDetection() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player = null;
        _this.boss = null;
        _this.patrolArea = 0;
        _this.isEnter = false;
        return _this;
    }
    collisionDetection.prototype.onLoad = function () {
        this.patrolArea = gameProtocol_1.gameProtocol.bossControl.patrolArea;
    };
    collisionDetection.prototype.start = function () {
    };
    collisionDetection.prototype.initPlayer = function () {
        this.player = cc.find('Player', this.node);
    };
    collisionDetection.prototype.initBoss = function () {
        this.boss = cc.find('boss', this.node);
    };
    collisionDetection.prototype.enterPatrolArea = function () {
        if (this.isEnter)
            return;
        var distance = this.player.getPosition().sub(this.boss.getPosition()).mag();
        if (distance <= this.patrolArea * 2) {
            this.boss.getComponent('bossContol')._actionType = gameProtocol_1.gameProtocol.bossControl.actionType.attack;
            this.isEnter = true;
        }
    };
    collisionDetection.prototype.update = function () {
        this.enterPatrolArea();
    };
    collisionDetection = __decorate([
        ccclass
    ], collisionDetection);
    return collisionDetection;
}(cc.Component));
exports.default = collisionDetection;

cc._RF.pop();