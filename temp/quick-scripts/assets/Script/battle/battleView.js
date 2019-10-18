(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/battle/battleView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9e63d6AFe9A6pSY0+9KWE4l', 'battleView', __filename);
// Script/battle/battleView.ts

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
var gameProtocol_1 = require("../game/gameProtocol");
var gameRes_1 = require("../game/gameRes");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GameInfo_1 = require("../module/GameInfo");
var battleView = /** @class */ (function (_super) {
    __extends(battleView, _super);
    function battleView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.PlayerPre = null;
        _this.bossPre = null;
        _this.bulletPre = null;
        _this.collisionLayer = null;
        /**角色运动类型 */
        _this.actionType = gameProtocol_1.gameProtocol.playerControl.actionType.inTheAir;
        // @property(cc.Prefab)
        // JoystickPre:cc.Prefab=null;
        _this.btnControlNode = null;
        _this.playerNode = null;
        _this.bossNode = null;
        _this.roleAniName = null;
        _this.roleHealthValue = null;
        _this.roleWeaponName = null;
        _this.landArea = null;
        _this._actionType = null;
        _this.bulletPool = null;
        _this.maxBulletCount = 3;
        return _this;
    }
    battleView.prototype.onLoad = function () {
        this.initEvent();
        this.initRoleInfo();
        this.initPlayer();
        this.initBoss();
        this.initBtnControl();
        this.initCollisionArea();
        this.initBulletPool();
    };
    battleView.prototype.initEvent = function () {
        cc.systemEvent.on(gameProtocol_1.gameProtocol.event.playerShooting, this.shoot, this);
    };
    battleView.prototype.clearEvent = function () {
        cc.systemEvent.off(gameProtocol_1.gameProtocol.event.playerShooting, this.shoot, this);
    };
    battleView.prototype.initBtnControl = function () {
        cc.find('operationMenu', this.node).getComponent('gameKeyControl').playerControl = this.playerNode.getComponent('playerControl');
    };
    battleView.prototype.initCollisionArea = function () {
        //this.landArea=cc.find('background/land',this.node).getComponent(cc.BoxCollider)
        //cc.log(this.landArea)
    };
    battleView.prototype.initPlayer = function () {
        this.playerNode = cc.instantiate(this.PlayerPre);
        //this.playerNode.getComponent(sp.SkeletonData);
        this.playerNode.parent = this.collisionLayer;
        var c_pos = cc.find('background/circle', this.node).getPosition();
        this.playerNode.setPosition(c_pos.x, c_pos.y);
        this.collisionLayer.getComponent('collisionDetection').initPlayer();
        cc.log(this.playerNode.getPosition());
        var path = gameRes_1.playerRes[this.roleAniName].aniPath;
        var self = this;
        cc.loader.loadRes(path, sp.SkeletonData, function (err, _SkeletonData) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            else {
                self.playerNode.getComponent(sp.Skeleton).skeletonData = _SkeletonData;
                self.playerNode.getComponent(sp.Skeleton).setSkin(self.roleWeaponName);
                self.playerNode.getComponent(sp.Skeleton).setAnimation(0, 'idle', true);
            }
        });
    };
    battleView.prototype.initBoss = function () {
        this.bossNode = cc.instantiate(this.bossPre);
        this.bossNode.parent = this.collisionLayer;
        var c_pos = cc.find('background/circle', this.node).getPosition();
        this.bossNode.setPosition(-c_pos.x, c_pos.y);
        this.collisionLayer.getComponent('collisionDetection').initBoss();
        cc.log(this.bossNode.getPosition());
        var path = gameRes_1.playerRes['boss'].aniPath;
        var self = this;
        cc.loader.loadRes(path, sp.SkeletonData, function (err, _SkeletonData) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            else {
                self.bossNode.getComponent(sp.Skeleton).skeletonData = _SkeletonData;
                self.bossNode.getComponent(sp.Skeleton).setAnimation(0, 'idle', true);
                //self.bossNode.getComponent(sp.Skeleton).setSkin(self.roleWeaponName)
            }
        });
    };
    battleView.prototype.showHealthValue = function () {
        var healthNode = cc.find('background/health', this.node);
        var _iconItem = cc.find('lifeIcon', healthNode);
        for (var i = 0; i < this.roleHealthValue; i++) {
            var iconItem = cc.instantiate(_iconItem);
            iconItem.parent = healthNode;
            iconItem.active = true;
        }
    };
    battleView.prototype.initRoleInfo = function () {
        var roleInfo = GameInfo_1.default.getInstance().returnRoleInfo();
        this.roleAniName = roleInfo.roleAniName;
        this.roleWeaponName = roleInfo.roleWeaponName;
        //this._roleHealth.init(GameInfo.getInstance().returnRoleInfo().roleMaxHealth)
        this.roleHealthValue = GameInfo_1.default.getInstance().returnRoleInfo().roleMaxHealth;
        this.showHealthValue();
        console.log(roleInfo);
    };
    battleView.prototype.update = function (dt) {
    };
    battleView.prototype.test = function () {
        var ts = this.collisionLayer.getComponent('collisionDetection');
        cc.log(ts.boss);
        cc.log(ts.player);
    };
    battleView.prototype.initBulletPool = function () {
        this.bulletPool = new cc.NodePool();
        for (var i = 0; i < this.maxBulletCount; ++i) {
            var bullet = cc.instantiate(this.bulletPre); // 创建节点
            this.bulletPool.put(bullet); // 通过 put 接口放入对象池
        }
    };
    battleView.prototype.shoot = function () {
        var bullet = this.createBulletNode();
        var pos = this.LaunchPosition();
        this.playBulletAni(bullet, pos);
    };
    battleView.prototype.createBulletNode = function () {
        var bullet = null;
        if (this.bulletPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            bullet = this.bulletPool.get();
        }
        else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            cc.log('子弹数不够');
            //或者可以改变最大子弹数
            // bullet = cc.instantiate(this.bulletPre);
            // this.maxBulletCount++
            //this.bulletPool.put(bullet);
        }
        return bullet;
    };
    battleView.prototype.LaunchPosition = function () {
        var _pos = this.playerNode.getComponent('playerControl').onMuzzlePos();
        var playerPos = this.playerNode.getPosition();
        var _x = playerPos.x + _pos.x;
        var _y = playerPos.y + _pos.y;
        if (!this.playerNode.getComponent('playerControl').Orientation) {
            _x = playerPos.x - _pos.x;
        }
        return new cc.Vec2(_x, _y);
    };
    battleView.prototype.playBulletAni = function (bullet, pos) {
        var _this = this;
        bullet.parent = this.collisionLayer;
        bullet.setPosition(pos);
        var to_pos = new cc.Vec2(pos.x + 200, pos.y);
        if (!this.playerNode.getComponent('playerControl').Orientation) {
            to_pos = new cc.Vec2(pos.x - 200, pos.y);
            bullet.scaleX = -1;
        }
        //到达最大射程后回收进pool
        bullet.runAction(cc.sequence(cc.moveTo(1, to_pos).easing(cc.easeIn(1.0)), cc.callFunc(function () {
            _this.bulletPool.put(bullet);
        })));
    };
    __decorate([
        property(cc.Prefab)
    ], battleView.prototype, "PlayerPre", void 0);
    __decorate([
        property(cc.Prefab)
    ], battleView.prototype, "bossPre", void 0);
    __decorate([
        property(cc.Prefab)
    ], battleView.prototype, "bulletPre", void 0);
    __decorate([
        property(cc.Node)
    ], battleView.prototype, "collisionLayer", void 0);
    __decorate([
        property
    ], battleView.prototype, "actionType", void 0);
    battleView = __decorate([
        ccclass
    ], battleView);
    return battleView;
}(cc.Component));
exports.default = battleView;

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
        //# sourceMappingURL=battleView.js.map
        