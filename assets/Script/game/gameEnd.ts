import { gameProtocol } from "./gameProtocol"
import { ManagerWindow } from "../module/ManagerWindow"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    tryAgain(){
        //ManagerWindow.getInstance().pop();
        cc.systemEvent.emit(gameProtocol.event.resurrection, this);
    }

    quit(){
        //ManagerWindow.getInstance().pop();
        cc.systemEvent.emit(gameProtocol.event.leaveGame, this);
    }
    // update (dt) {}
}
