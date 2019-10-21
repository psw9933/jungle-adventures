import { gameProtocol } from "../game/gameProtocol"
const {ccclass, property} = cc._decorator;

@ccclass
export default class GameInfo {

    roleAniName:any=null;
    roleWeaponName:any=null;
    roleMaxHealth:any=null;
    currentHealth:any=null;
    private justLeft: boolean = false;
    private static m_GameInfo: GameInfo = null;
    

    static getInstance(): GameInfo {
        if (!GameInfo.m_GameInfo)
        GameInfo.m_GameInfo = new GameInfo()
        return GameInfo.m_GameInfo;
        
    }
    constructor() {
        this.initEvent()
    }
    // update (dt) {}
    private initEvent() {
        //cc.systemEvent.on(gameProtocol.event.reduceHealth, this.reduceHealth, this);
    }

    private clearEvent() {
        //cc.systemEvent.off(gameProtocol.event.reduceHealth, this.reduceHealth, this);
    }

    initRoleInfo(_roleAniName,_roleWeaponName,_roleMaxHealth){
        this.roleAniName=_roleAniName;
        this.roleWeaponName=_roleWeaponName;
        this.roleMaxHealth=_roleMaxHealth;
        this.currentHealth=_roleMaxHealth;
    }

    returnRoleInfo(){
        let roleInfo={
            roleAniName:this.roleAniName,
            roleWeaponName:this.roleWeaponName,
            roleMaxHealth:this.roleMaxHealth
        }
        return roleInfo
    }
    returnjustLeftStatus(){
        return this.justLeft
    }

    justLeftGame(){
        this.justLeft=true
    }

    closeGame(){
        GameInfo.m_GameInfo=null;
    }

    reduceHealth(){
        this.currentHealth=this.currentHealth-1;
        return this.currentHealth
    }
    returnCurrentHealth(){
        return this.currentHealth
    }
    Resurrection(){
        this.currentHealth=this.roleMaxHealth
    }
}
