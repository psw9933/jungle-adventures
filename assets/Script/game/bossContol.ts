import { gameProtocol } from "./gameProtocol"
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    /**角色运动类型 */
    @property
    _actionType = gameProtocol.bossControl.actionType.patrol;

    private spine: sp.Skeleton = null;
    /**人物朝向 true为右方false为左边 */
    public Orientation: boolean = true;

    //动画节点缩放 用来控制面向
    private playerScale: any = null;

    private patrolArea: number = 0

    onLoad() {
        this.playerScale = 0.6;
        this.patrolArea = gameProtocol.bossControl.patrolArea;
        this.initEvent()
        this.spine = this.node.getComponent(sp.Skeleton);
        this.node.scale = this.playerScale;

        //this.patrolStatus()

    }

    private initEvent() {
        //cc.systemEvent.on(gameProtocol.event.playerShooting, this.Shooting, this);
    }
    private clearEvent() {
        //cc.systemEvent.off(gameProtocol.event.playerShooting, this.Shooting, this);
    }

    // update (dt) {}

    private isPatrol: boolean = false
    patrolStatus() {
        if (this.isPatrol) return;
        this.isPatrol = true;

        this.spine.setAnimation(1, 'move', true)
        let _pos = this.node.getPosition();

        let left_pos = new cc.Vec2(_pos.x - this.patrolArea, _pos.y);
        let right_pos = new cc.Vec2(_pos.x + this.patrolArea, _pos.y);

        let action1 = cc.callFunc(() => {
            this.node.scaleX = this.playerScale
        })
        let action2 = cc.callFunc(() => {
            this.node.scaleX = -this.playerScale
        })
        this.node.runAction(cc.sequence(action1, cc.moveTo(2, left_pos), action2, cc.moveTo(2, right_pos)).repeatForever());
    }

    private isAttack: boolean = false
    attackStatus() {
        
    }

    update(dt) {
        switch (this._actionType) {
            case gameProtocol.bossControl.actionType.patrol:
                this.patrolStatus()
                break;
            case gameProtocol.bossControl.actionType.attack:
                this.attackStatus()
                break;
        }
    }
}
