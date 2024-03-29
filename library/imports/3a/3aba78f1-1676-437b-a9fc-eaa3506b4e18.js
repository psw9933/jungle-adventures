"use strict";
cc._RF.push(module, '3aba7jxFnZDe6n86qNQa04Y', 'gameBullet');
// Script/game/gameBullet.ts

"use strict";
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
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
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var gameBullet = /** @class */ (function (_super) {
    __extends(gameBullet, _super);
    function gameBullet() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playerBulletSPF = null;
        _this.bossBulletSPF = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    gameBullet.prototype.start = function () {
    };
    gameBullet.prototype.init = function (_object) {
        if (_object == 'player') {
            this.node.getComponent(cc.Sprite).spriteFrame = this.playerBulletSPF;
        }
        if (_object == 'boss') {
            this.node.getComponent(cc.Sprite).spriteFrame = this.bossBulletSPF;
        }
    };
    __decorate([
        property(cc.SpriteFrame)
    ], gameBullet.prototype, "playerBulletSPF", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], gameBullet.prototype, "bossBulletSPF", void 0);
    gameBullet = __decorate([
        ccclass
    ], gameBullet);
    return gameBullet;
}(cc.Component));
exports.default = gameBullet;

cc._RF.pop();