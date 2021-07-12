/**
 *倒计时
 * @author 
 *
 */
class djs extends CBaseClass {
    public constructor() {
        super();
        this.skinName = "djsSkin";
    }
    public childrenCreated() {
        //  Effects.CenterSize(this);
        this.createGameScene();
    }
    public quan: eui.Image;
    public san: eui.Image;
    public er: eui.Image;
    public yi: eui.Image;
    public sgo: eui.Image;
    public zi: eui.Image;
    public group: eui.Group;
    public sz: eui.Image;

    public createGameScene() {
        document.getElementById("djs")['play']();
        this.dao();
    }
    public dao() {
        this.san.alpha = 1;
        this.quan.alpha = 1;
        egret.Tween.get(this.san).to({ alpha: 0 }, 900).call(() => {
            this.er.alpha = 1;
            egret.Tween.get(this.er).to({ alpha: 0 }, 900).call(() => {
                this.yi.alpha = 1;
                egret.Tween.get(this.yi).to({ alpha: 0 }, 900).call(() => {
                    this.sgo.alpha = 1;
                    egret.Tween.get(this.sgo).to({ alpha: 0 }, 300).call(() => {
                        this.quan.alpha = 0;
                        PopUpManager.getInstance().removePopUp(this, 1);
                        // Main.eventManager.dispatchEventWith("kaishi");
                    });
                });
            });
        });
    }
}

