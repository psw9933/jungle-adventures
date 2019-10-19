import { gameProtocol } from "./gameProtocol"
const {ccclass, property} = cc._decorator;

@ccclass
export default class collisionDetection extends cc.Component {


    
    private player:cc.Node=null;
    private boss:cc.Node=null;

    private patrolArea: number = 0
    onLoad () {
        this.patrolArea = gameProtocol.bossControl.patrolArea;
    }
    start () {

    }

    initPlayer(){
        this.player=cc.find('Player',this.node)
    }

    initBoss(){
        this.boss=cc.find('boss',this.node)
    }
    
    isEnter:boolean=false
    enterPatrolArea(){
        if(this.isEnter) return;
        let distance=this.player.getPosition().sub(this.boss.getPosition()).mag();
        if(distance<=this.patrolArea*2){
            this.boss.getComponent('bossContol')._actionType=gameProtocol.bossControl.actionType.attack;
            this.isEnter=true
        }
    }
    update(){
        this.enterPatrolArea()
    }
}
