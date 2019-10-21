import {gameProtocol} from "../game/gameProtocol"
import { playerRes } from "../game/gameRes"
import { ManagerWindow } from "../module/ManagerWindow"
const {ccclass, property} = cc._decorator;
import GameInfo from "../module/GameInfo"

@ccclass
export default class battleView extends cc.Component {


    @property(cc.Prefab)
    PlayerPre:cc.Prefab=null;

    @property(cc.Prefab)
    bossPre:cc.Prefab=null;

    @property(cc.Prefab)
    bulletPre:cc.Prefab=null;

    @property(cc.Node)
    collisionLayer:cc.Node=null;

    @property(cc.Prefab)
    gameEndPre:cc.Prefab=null;

    /**角色运动类型 */
    @property
    actionType = gameProtocol.playerControl.actionType.inTheAir;

    // @property(cc.Prefab)
    // JoystickPre:cc.Prefab=null;

     btnControlNode=null
     playerNode:any=null;
     bossNode:any=null
     roleAniName:any=null;
     roleHealthValue:any=null;
     roleWeaponName:any=null;

     landArea:any=null;
     _actionType:any=null;

     bulletPool:any=null;
    onLoad () {
        this.initEvent()
        this.initRoleInfo();

        this.initPlayer();

        this.initBoss();

        this.initBtnControl();
        
        this.initBulletPool();
    }

    onDestroy(){
        this.clearEvent()
    }
    private initEvent() {
        cc.systemEvent.on(gameProtocol.event.playerShooting, this.playerShoot, this);
        cc.systemEvent.on(gameProtocol.event.bossShooting, this.bossShoot, this);
        cc.systemEvent.on(gameProtocol.event.reduceHealth, this.onReduceHealth, this);
        cc.systemEvent.on(gameProtocol.event.leaveGame, this.closeGame, this);
        cc.systemEvent.on(gameProtocol.event.resurrection, this.onResurrection, this);
    }

    private clearEvent() {
        cc.systemEvent.off(gameProtocol.event.playerShooting, this.playerShoot, this);
        cc.systemEvent.off(gameProtocol.event.bossShooting, this.bossShoot, this);
        cc.systemEvent.off(gameProtocol.event.reduceHealth, this.onReduceHealth, this);
        cc.systemEvent.off(gameProtocol.event.leaveGame, this.closeGame, this);
        cc.systemEvent.off(gameProtocol.event.resurrection, this.onResurrection, this);
    }

    initBtnControl(){
        cc.find('operationMenu',this.node).getComponent('gameKeyControl').playerControl=this.playerNode.getComponent('playerControl');
    }

    initPlayer(){
        this.playerNode=cc.instantiate(this.PlayerPre);
        //this.playerNode.getComponent(sp.SkeletonData);
        this.playerNode.parent=this.collisionLayer;
        let c_pos=cc.find('background/circle',this.node).getPosition();
        this.playerNode.setPosition(c_pos.x,c_pos.y);
        this.collisionLayer.getComponent('collisionDetection').initPlayer();

        cc.log(this.playerNode.getPosition())

        let path = playerRes[this.roleAniName].aniPath;
        cc.loader.loadRes(path, sp.SkeletonData,  (err, _SkeletonData)=> {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            else {
                
                this.playerNode.getComponent(sp.Skeleton).skeletonData = _SkeletonData;
                this.playerNode.getComponent(sp.Skeleton).setSkin(this.roleWeaponName);
                this.playerNode.getComponent(sp.Skeleton).setAnimation(0, 'idle', true);

                this.followPlayerNode()
            }
        });
    }

    //屏幕追踪player
    followPlayerNode(){
        // let follow = cc.follow(this.playerNode, cc.rect(0,0, 2000,2000));
        // this.node.runAction(follow);
    }
    initBoss(){
        this.bossNode=cc.instantiate(this.bossPre);
        this.bossNode.parent=this.collisionLayer
        let c_pos=cc.find('background/circle',this.node).getPosition();
        this.bossNode.setPosition(-c_pos.x,c_pos.y);
        this.collisionLayer.getComponent('collisionDetection').initBoss();
        cc.log(this.bossNode.getPosition())


        let path = playerRes['boss'].aniPath;
        let self = this;
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
    }

    showHealthValue(){
        let healthNode=cc.find('background/health',this.node);
        let _iconItem=cc.find('background/lifeIcon',this.node);

        healthNode.removeAllChildren();
        for(let i=0;i<this.roleHealthValue;i++){
            let iconItem=cc.instantiate(_iconItem);
            iconItem.parent=healthNode;
            iconItem.active=true
        }
    }

    initRoleInfo(){
        let roleInfo=GameInfo.getInstance().returnRoleInfo()
        this.roleAniName=roleInfo.roleAniName;
        this.roleWeaponName=roleInfo.roleWeaponName;
        //this._roleHealth.init(GameInfo.getInstance().returnRoleInfo().roleMaxHealth)
        this.roleHealthValue=GameInfo.getInstance().returnRoleInfo().roleMaxHealth;
        this.showHealthValue()
        console.log(roleInfo)
    }

    update(dt) {
        
    }

    test(){
        let ts=this.collisionLayer.getComponent('collisionDetection')
        cc.log(ts.boss);
        cc.log(ts.player);
    }

    private maxBulletCount = 3;
    initBulletPool(){
        this.bulletPool = new cc.NodePool();
        for (let i = 0; i < this.maxBulletCount; ++i) {
            let bullet = cc.instantiate(this.bulletPre); // 创建节点；
            bullet.getComponent('gameBullet').init('player');
            this.bulletPool.put(bullet); // 通过 put 接口放入对象池
        }
    }

    playerShoot(){
        let bullet=this.createBulletNode();
        let pos=this.LaunchPosition();
        this.playBulletAni(bullet,pos)
    }

    bossShoot(){
        let bullet = cc.instantiate(this.bulletPre);
        bullet.getComponent('gameBullet').init('boss');
        bullet.parent=this.collisionLayer;

        let _pos=this.bossNode.getComponent('bossContol').onMuzzlePos()
        let playerPos=this.bossNode.getPosition();
        let _x=playerPos.x+_pos.x;
        let _y=playerPos.y+_pos.y;

        if(!this.bossNode.getComponent('bossContol').Orientation){
            _x=playerPos.x-_pos.x;
        }

        let pos=new cc.Vec2(_x,_y);
        bullet.setPosition(pos);
        let to_pos=new cc.Vec2(pos.x+200,pos.y)
        if(!this.bossNode.getComponent('bossContol').Orientation){
            to_pos=new cc.Vec2(pos.x-200,pos.y);
        }

        bullet.runAction(cc.sequence(cc.moveTo(0.5,to_pos).easing(cc.easeIn(0.5)),cc.callFunc(()=>{
            bullet.setPosition(pos);
        })).repeatForever())
    }
    createBulletNode(){
        let bullet = null;
        if (this.bulletPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            bullet = this.bulletPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            cc.log('子弹数不够')
            //或者可以改变最大子弹数
            // bullet = cc.instantiate(this.bulletPre);
            // this.maxBulletCount++
            //this.bulletPool.put(bullet);
        }
        return bullet
    }

    //player的枪口位置
    LaunchPosition(){
        let _pos=this.playerNode.getComponent('playerControl').onMuzzlePos()
        let playerPos=this.playerNode.getPosition();
        let _x=playerPos.x+_pos.x;
        let _y=playerPos.y+_pos.y;

        if(!this.playerNode.getComponent('playerControl').Orientation){
            _x=playerPos.x-_pos.x;
        }

        return new cc.Vec2(_x,_y)
    }

    playBulletAni(bullet,pos){
        bullet.parent=this.collisionLayer;
        bullet.setPosition(pos);
        
        let to_pos=new cc.Vec2(pos.x+200,pos.y)
        if(!this.playerNode.getComponent('playerControl').Orientation){
            to_pos=new cc.Vec2(pos.x-200,pos.y);
            bullet.scaleX=-1
        }

        //到达最大射程后回收进pool
        bullet.runAction(cc.sequence(cc.moveTo(1,to_pos).easing(cc.easeIn(1.0)),cc.callFunc(()=>{
            this.bulletPool.put(bullet);
        })))
    }

    closeTip:boolean=false;
    closeGame(){
        // if(!this.closeTip){
        //     ManagerNotice.getInstance().show("Click again to exit the game!");
        //     this.closeTip=true;
        //     this.schedule(()=>{
        //         this.closeTip=false;
        //     },3);
        //     return
        // }
        GameInfo.getInstance().closeGame();
        GameInfo.getInstance().justLeftGame();
        cc.director.loadScene('home')
    }

    onReduceHealth(){
        this.roleHealthValue=GameInfo.getInstance().reduceHealth();
        this.showHealthValue();
        if(this.roleHealthValue==0){
            //ManagerWindow.getInstance().show(this.gameEndPre);
            cc.find('mask',this.node).active=true;
            let gameEndPanel=cc.instantiate(this.gameEndPre);
            gameEndPanel.parent=cc.find('gameEnd',this.node);
        }
    }

    onResurrection(){
        cc.find('mask',this.node).active=false;
        cc.find('gameEnd',this.node).removeAllChildren();
        
        GameInfo.getInstance().Resurrection();
        this.roleHealthValue=GameInfo.getInstance().returnCurrentHealth();
        this.showHealthValue();
    }
}
