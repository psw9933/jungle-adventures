// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class gameBullet extends cc.Component {

    @property(cc.SpriteFrame)
    playerBulletSPF: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    bossBulletSPF: cc.SpriteFrame = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    init(_object){
        if(_object=='player'){
            this.node.getComponent(cc.Sprite).spriteFrame=this.playerBulletSPF
        }

        if(_object=='boss'){
            this.node.getComponent(cc.Sprite).spriteFrame=this.bossBulletSPF
        }
    }
    // update (dt) {}
}
