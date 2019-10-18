import {gameProtocol} from "../game/gameProtocol"
import { playerRes } from "../game/gameRes"
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
        this.initCollisionArea();
        
        this.initBulletPool()
    }
    private initEvent() {
        cc.systemEvent.on(gameProtocol.event.playerShooting, this.shoot, this);
    }
    private clearEvent() {
        cc.systemEvent.off(gameProtocol.event.playerShooting, this.shoot, this);
    }
    initBtnControl(){
        cc.find('operationMenu',this.node).getComponent('gameKeyControl').playerControl=this.playerNode.getComponent('playerControl');
    }
    initCollisionArea(){
        //this.landArea=cc.find('background/land',this.node).getComponent(cc.BoxCollider)
        //cc.log(this.landArea)
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
        let self = this;
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
        let _iconItem=cc.find('lifeIcon',healthNode);

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
            let bullet = cc.instantiate(this.bulletPre); // 创建节点
            this.bulletPool.put(bullet); // 通过 put 接口放入对象池
        }
    }

    shoot(){
        let bullet=this.createBulletNode();
        let pos=this.LaunchPosition();
        this.playBulletAni(bullet,pos)
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
}
