/**
 *好友点赞页
 * @author 
 *
 */
class dianzan extends CBaseClass {
    public constructor() {
        super();
        this.skinName = "dianzanSkin";
    }
    public childrenCreated() {
        //  Effects.CenterSize(this);
        this.createGameScene();
    }
    public close: eui.Image;
    public createGameScene() {
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtap, this);
    }
    public touchtap() {
        PopUpManager.getInstance().removePopUp(this, 1);
    }

}

