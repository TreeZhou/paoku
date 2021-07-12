/**
 *fenxiang页
 * @author 
 *
 */
class share extends CBaseClass {
    public constructor() {
        super();
        this.skinName = "shareSkin";
    }
    public childrenCreated() {
        //  Effects.CenterSize(this);
        this.createGameScene();
    }

    public createGameScene() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtap, this);
    }
    public touchtap() {
        PopUpManager.getInstance().removePopUp(this, 1);
        PopUpManager.getInstance().addPopUp(new Gameover, true, 750, 1334, 1);
    }
}

