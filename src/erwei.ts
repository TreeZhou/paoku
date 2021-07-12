/**
 *二维码入口页
 * @author 
 *
 */
class erwei extends CBaseClass {
    public constructor() {
        super();
        this.skinName = "erweiSkin";
    }
    public childrenCreated() {
        //  Effects.CenterSize(this);
        this.createGameScene();
    }
    public ewmk: eui.Image;
    public close: eui.Image;
    public ewms: eui.Image;
    public createGameScene() {
        document.getElementById("ewm").style.display = "block";
        Tool.displayLikeObject(document.getElementById("ewm"), this.ewms);
        document.getElementById("ewm").style.top = "46%";
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtap, this);
    }
    public touchtap() {
        document.getElementById("ewm").style.display = "none";
        PopUpManager.getInstance().removePopUp(this, 1);
    }
}

