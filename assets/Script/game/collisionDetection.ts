import { gameProtocol } from "./gameProtocol"
const { ccclass, property } = cc._decorator;

@ccclass
export default class collisionDetection extends cc.Component {



    private player: cc.Node = null;
    private boss: cc.Node = null;

    private patrolArea: number = 0
    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        //碰撞组件边线可见
        //cc.director.getCollisionManager().enabledDebugDraw = true;
        this.patrolArea = gameProtocol.bossControl.patrolArea;
    }
    start() {

    }

    initPlayer() {
        this.player = cc.find('Player', this.node)
    }

    initBoss() {
        this.boss = cc.find('boss', this.node)
    }

    test(){
        cc.log(cc.director.getCollisionManager().enabled)
    }
    isEnter: boolean = false
    enterPatrolArea() {
        if (this.isEnter) return;
        if (this.player.getPosition().sub(this.boss.getPosition()).mag() >= this.patrolArea * 3) {
            return
        }
        else {
            this.boss.getComponent('bossContol')._actionType = gameProtocol.bossControl.actionType.attack;
            this.isEnter = true
        }
    }

    

    update() {
        //cc.log(this.node.children)
        this.enterPatrolArea()
    }
}
