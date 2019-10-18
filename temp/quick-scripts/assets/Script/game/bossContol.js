(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/game/bossContol.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7ee9fBj9etBb7eiMWP6pqLr', 'bossContol', __filename);
// Script/game/bossContol.ts

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
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**角色运动类型 */
        _this._actionType = gameProtocol_1.gameProtocol.bossControl.actionType.patrol;
        _this.spine = null;
        /**人物朝向 true为右方false为左边 */
        _this.Orientation = true;
        //动画节点缩放 用来控制面向
        _this.playerScale = null;
        _this.patrolArea = 0;
        // update (dt) {}
        _this.isPatrol = false;
        _this.isAttack = false;
        return _this;
    }
    NewClass.prototype.onLoad = function () {
        this.playerScale = 0.6;
        this.patrolArea = gameProtocol_1.gameProtocol.bossControl.patrolArea;
        this.initEvent();
        this.spine = this.node.getComponent(sp.Skeleton);
        this.node.scale = this.playerScale;
        //this.patrolStatus()
    };
    NewClass.prototype.initEvent = function () {
        //cc.systemEvent.on(gameProtocol.event.playerShooting, this.Shooting, this);
    };
    NewClass.prototype.clearEvent = function () {
        //cc.systemEvent.off(gameProtocol.event.playerShooting, this.Shooting, this);
    };
    NewClass.prototype.patrolStatus = function () {
        var _this = this;
        if (this.isPatrol)
            return;
        this.isPatrol = true;
        this.spine.setAnimation(1, 'move', true);
        var _pos = this.node.getPosition();
        var left_pos = new cc.Vec2(_pos.x - this.patrolArea, _pos.y);
        var right_pos = new cc.Vec2(_pos.x + this.patrolArea, _pos.y);
        var action1 = cc.callFunc(function () {
            _this.node.scaleX = _this.playerScale;
        });
        var action2 = cc.callFunc(function () {
            _this.node.scaleX = -_this.playerScale;
        });
        this.node.runAction(cc.sequence(action1, cc.moveTo(2, left_pos), action2, cc.moveTo(2, right_pos)).repeatForever());
    };
    NewClass.prototype.attackStatus = function () {
    };
    NewClass.prototype.update = function (dt) {
        switch (this._actionType) {
            case gameProtocol_1.gameProtocol.bossControl.actionType.patrol:
                this.patrolStatus();
                break;
            case gameProtocol_1.gameProtocol.bossControl.actionType.attack:
                this.attackStatus();
                break;
        }
    };
    __decorate([
        property
    ], NewClass.prototype, "_actionType", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

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
        //# sourceMappingURL=bossContol.js.map
        