(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/module/GameInfo.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5dc2b6i7oJBEJEdOjSYSZer', 'GameInfo', __filename);
// Script/module/GameInfo.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameInfo = /** @class */ (function () {
    function GameInfo() {
        this.roleAniName = null;
        this.roleWeaponName = null;
        this.roleMaxHealth = null;
        this.currentHealth = null;
        this.justLeft = false;
        this.initEvent();
    }
    GameInfo_1 = GameInfo;
    GameInfo.getInstance = function () {
        if (!GameInfo_1.m_GameInfo)
            GameInfo_1.m_GameInfo = new GameInfo_1();
        return GameInfo_1.m_GameInfo;
    };
    // update (dt) {}
    GameInfo.prototype.initEvent = function () {
        //cc.systemEvent.on(gameProtocol.event.reduceHealth, this.reduceHealth, this);
    };
    GameInfo.prototype.clearEvent = function () {
        //cc.systemEvent.off(gameProtocol.event.reduceHealth, this.reduceHealth, this);
    };
    GameInfo.prototype.initRoleInfo = function (_roleAniName, _roleWeaponName, _roleMaxHealth) {
        this.roleAniName = _roleAniName;
        this.roleWeaponName = _roleWeaponName;
        this.roleMaxHealth = _roleMaxHealth;
        this.currentHealth = _roleMaxHealth;
    };
    GameInfo.prototype.returnRoleInfo = function () {
        var roleInfo = {
            roleAniName: this.roleAniName,
            roleWeaponName: this.roleWeaponName,
            roleMaxHealth: this.roleMaxHealth
        };
        return roleInfo;
    };
    GameInfo.prototype.returnjustLeftStatus = function () {
        return this.justLeft;
    };
    GameInfo.prototype.justLeftGame = function () {
        this.justLeft = true;
    };
    GameInfo.prototype.closeGame = function () {
        GameInfo_1.m_GameInfo = null;
    };
    GameInfo.prototype.reduceHealth = function () {
        this.currentHealth = this.currentHealth - 1;
        return this.currentHealth;
    };
    GameInfo.prototype.returnCurrentHealth = function () {
        return this.currentHealth;
    };
    GameInfo.prototype.Resurrection = function () {
        this.currentHealth = this.roleMaxHealth;
    };
    var GameInfo_1;
    GameInfo.m_GameInfo = null;
    GameInfo = GameInfo_1 = __decorate([
        ccclass
    ], GameInfo);
    return GameInfo;
}());
exports.default = GameInfo;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=GameInfo.js.map
        