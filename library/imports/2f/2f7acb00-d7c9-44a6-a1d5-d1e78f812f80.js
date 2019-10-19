"use strict";
cc._RF.push(module, '2f7acsA18lEpqHV0eePgS+A', 'gameProtocol');
// Script/game/gameProtocol.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gameProtocol = {
    /**
     * 客户端之间的通信协议
     */
    event: {
        /**
         * 英雄选择面板
         */
        showRolePanel: "英雄选择面板",
        /**
         * player射击
         */
        playerShooting: "player射击",
        /**
         * boss射击
         */
        bossShooting: "boss射击",
        /**
         * 开始游戏
         */
        playGame: "开始游戏",
        /**
         * 显示左侧菜单
         */
        showLeftMenu: "显示左侧菜单",
    },
    /**
     * 虚拟摇杆
     */
    joystick: {
        /**
         * 摇杆类型
         */
        JoystickType: cc.Enum({
            FIXED: 0,
            FOLLOW: 1,
        }),
        /**
         * 操作类型
         */
        DirectionType: cc.Enum({
            FOUR: 4,
            EIGHT: 8,
            ALL: 0,
        }),
        /**
         * 速度类型
         */
        SpeedType: cc.Enum({
            STOP: 0,
            NORMAL: 1,
            FAST: 2
        }),
    },
    /**
     * player控制
     */
    playerControl: {
        /**
         * 移动类型
         */
        motionType: cc.Enum({
            LEFT: 0,
            RIGHT: 1,
            STOP: 2,
            JUMP: 3,
            SHOOT: 4
        }),
        /**
         * 位置类型
         */
        actionType: cc.Enum({
            onLand: 0,
            inTheAir: 1,
            jumpUp: 2,
        }),
        speedType: cc.Enum({
            STOP: 0,
            NORMAL: 1,
            FAST: 2
        }),
    },
    /**
     * boss控制
     */
    bossControl: {
        /**
         * 移动类型
         */
        actionType: cc.Enum({
            patrol: 0,
            attack: 1,
            beAttacked: 2
        }),
        /**
         * 巡逻范围
         */
        patrolArea: 100
    }
};
exports.gameProtocol = gameProtocol;

cc._RF.pop();