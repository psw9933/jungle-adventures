import {ManagerWindow} from "../module/ManagerWindow"
import { gameProtocol } from "../game/gameProtocol"
import GameInfo from "../module/GameInfo"
const {ccclass, property} = cc._decorator;

@ccclass
export default class loginView extends cc.Component {

    @property(cc.Prefab)
    signInPanelPre: cc.Prefab = null;

    @property(cc.Prefab)
    rolePanelPre: cc.Prefab = null;


    // LIFE-CYCLE CALLBACKS:
    private rolePanelNode:any=null;
    onLoad () {
        this.initEvent()
         ManagerWindow.getInstance().show(this.signInPanelPre)
    }

    onDestroy(){
        this.clearEvent()
    }

    private initEvent() {
        cc.systemEvent.on(gameProtocol.event.showRolePanel, this.showRolePanelPre, this);
        cc.systemEvent.on(gameProtocol.event.showLeftMenu, this._onShowleftMenu, this);
        cc.systemEvent.on(gameProtocol.event.playGame, this.onClickPlayBtn, this);
    }

    private clearEvent() {
        cc.systemEvent.off(gameProtocol.event.showRolePanel, this.showRolePanelPre, this);
        cc.systemEvent.off(gameProtocol.event.showLeftMenu, this._onShowleftMenu, this);
        cc.systemEvent.off(gameProtocol.event.playGame, this.onClickPlayBtn, this);
    }
    
    start () {
        ManagerWindow.getInstance();
        //ManagerWindow.getInstance().init(this.windowManagerNode)
    }

    showRolePanelPre(){
        ManagerWindow.getInstance().removeAll();
        this.rolePanelNode=cc.instantiate(this.rolePanelPre)
        this.rolePanelNode.parent=this.node;

        //隐藏logo显示左侧菜单
        cc.find('bg/logo',this.node).active=false
        this._onShowleftMenu()
    }

    onClickPlayBtn(){
        let _roleAniName=this.rolePanelNode.getComponent('rolePanel').roleAniName
        let _roleWeaponName=this.rolePanelNode.getComponent('rolePanel').roleWeaponName
        let _roleHealthValue=this.rolePanelNode.getComponent('rolePanel').roleHealthValue
        GameInfo.getInstance().initRoleInfo(_roleAniName,_roleWeaponName,_roleHealthValue)
        
        cc.director.loadScene('battle')
    }
    // update (dt) {}
    _onShowleftMenu(){
        this.moveLeftMenu('show')
    }

    moveLeftMenu(type){
        let leftMenuNode=cc.find('leftMenu',this.node);

        let size=leftMenuNode.getContentSize();
        //从屏幕左侧缓慢进入
        let from_pos = cc.v2(-cc.winSize.width / 2-size.width/2, 0);
        let to_pos = cc.v2(from_pos.x + size.width, 0);

        let action=null;
        let callFun=null;

        if(type=='show'){
            leftMenuNode.active=true;
            action=cc.moveTo(0.5, to_pos);
            callFun=cc.callFunc(() => {
                
            })
        }
        if(type=='hide'){
            action=cc.moveTo(0.5, from_pos)
            callFun=cc.callFunc(() => {
                leftMenuNode.active=false;
            })
        }
        
        leftMenuNode.runAction(cc.sequence(action,callFun))
    }

    
}
