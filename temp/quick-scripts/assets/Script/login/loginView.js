(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/login/loginView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '853875cjQBCNoV9oA9tPj1m', 'loginView', __filename);
// Script/login/loginView.ts

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
var ManagerWindow_1 = require("../module/ManagerWindow");
var ManagerNotice_1 = require("../module/ManagerNotice");
var gameProtocol_1 = require("../game/gameProtocol");
var GameInfo_1 = require("../module/GameInfo");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var loginView = /** @class */ (function (_super) {
    __extends(loginView, _super);
    function loginView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.signInPanelPre = null;
        _this.rolePanelPre = null;
        // LIFE-CYCLE CALLBACKS:
        _this.rolePanelNode = null;
        return _this;
    }
    loginView.prototype.onLoad = function () {
        this.initEvent();
        cc.log(GameInfo_1.default.getInstance().returnjustLeftStatus());
        if (GameInfo_1.default.getInstance().returnjustLeftStatus()) {
            this.showRolePanelPre();
        }
        else {
            ManagerWindow_1.ManagerWindow.getInstance().show(this.signInPanelPre);
        }
    };
    loginView.prototype.onDestroy = function () {
        this.clearEvent();
    };
    loginView.prototype.initEvent = function () {
        cc.systemEvent.on(gameProtocol_1.gameProtocol.event.showRolePanel, this.showRolePanelPre, this);
        cc.systemEvent.on(gameProtocol_1.gameProtocol.event.showLeftMenu, this._onShowleftMenu, this);
        cc.systemEvent.on(gameProtocol_1.gameProtocol.event.playGame, this.onClickPlayBtn, this);
    };
    loginView.prototype.clearEvent = function () {
        cc.systemEvent.off(gameProtocol_1.gameProtocol.event.showRolePanel, this.showRolePanelPre, this);
        cc.systemEvent.off(gameProtocol_1.gameProtocol.event.showLeftMenu, this._onShowleftMenu, this);
        cc.systemEvent.off(gameProtocol_1.gameProtocol.event.playGame, this.onClickPlayBtn, this);
    };
    loginView.prototype.start = function () {
        ManagerWindow_1.ManagerWindow.getInstance();
        ManagerNotice_1.ManagerNotice.getInstance();
    };
    loginView.prototype.showRolePanelPre = function () {
        ManagerWindow_1.ManagerWindow.getInstance().removeAll();
        this.rolePanelNode = cc.instantiate(this.rolePanelPre);
        this.rolePanelNode.parent = this.node;
        //隐藏logo显示左侧菜单
        cc.find('bg/logo', this.node).active = false;
        this._onShowleftMenu();
    };
    loginView.prototype.onClickPlayBtn = function () {
        var _roleAniName = this.rolePanelNode.getComponent('rolePanel').roleAniName;
        var _roleWeaponName = this.rolePanelNode.getComponent('rolePanel').roleWeaponName;
        var _roleHealthValue = this.rolePanelNode.getComponent('rolePanel').roleHealthValue;
        GameInfo_1.default.getInstance().initRoleInfo(_roleAniName, _roleWeaponName, _roleHealthValue);
        cc.director.loadScene('battle');
    };
    // update (dt) {}
    loginView.prototype._onShowleftMenu = function () {
        this.moveLeftMenu('show');
    };
    loginView.prototype.moveLeftMenu = function (type) {
        var leftMenuNode = cc.find('leftMenu', this.node);
        var size = leftMenuNode.getContentSize();
        //从屏幕左侧缓慢进入
        var from_pos = cc.v2(-cc.winSize.width / 2 - size.width / 2, 0);
        var to_pos = cc.v2(from_pos.x + size.width, 0);
        var action = null;
        var callFun = null;
        if (type == 'show') {
            leftMenuNode.active = true;
            action = cc.moveTo(0.5, to_pos);
            callFun = cc.callFunc(function () {
            });
        }
        if (type == 'hide') {
            action = cc.moveTo(0.5, from_pos);
            callFun = cc.callFunc(function () {
                leftMenuNode.active = false;
            });
        }
        leftMenuNode.runAction(cc.sequence(action, callFun));
    };
    __decorate([
        property(cc.Prefab)
    ], loginView.prototype, "signInPanelPre", void 0);
    __decorate([
        property(cc.Prefab)
    ], loginView.prototype, "rolePanelPre", void 0);
    loginView = __decorate([
        ccclass
    ], loginView);
    return loginView;
}(cc.Component));
exports.default = loginView;

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
        //# sourceMappingURL=loginView.js.map
        