/**
 *
 * @author 
 *
 */
class zhiyin extends CBaseClass {
    public constructor() {
        super();
        this.skinName = "zhiyinSkin";
    }
    public childrenCreated() {
        //  Effects.CenterSize(this);
        this.createGameScene();
    }
    public zi: eui.Image;
    public group: eui.Group;
    public sz: eui.Image;


    public createGameScene() {
        this.dao();
    }
    public dao() {
        egret.Tween.get(this.sz).wait(500).to({ x: 43, y: 128 }, 800).call(() => {
            egret.Tween.get(this.group).wait(300).to({ x: 60 }, 1000).to({ x: 506 }, 1000).to({ x: 300 }, 500).call(() => {
                PopUpManager.getInstance().removePopUp(this, 0);
                PopUpManager.getInstance().addPopUp(new djs, false, 750, 1334, 0);
            })
        });
    }
}

