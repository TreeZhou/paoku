/**
 *首页
 * @author 
 *
 */
class Index extends CBaseClass {
    public constructor() {
        super();
        this.skinName = "IndexSkin";
    }
    public childrenCreated() {
        //  Effects.CenterSize(this);
        this.createGameScene();
    }
    public rule: eui.Image;
    public dh: eui.Image;
    public btn1: eui.Image;
    public btn2: eui.Image;
    public createGameScene() {
        // Tool.setScale(this.dh, 60, 500, 1000, this);
        egret.Tween.get(this.dh, { loop: true }).to({ scaleX: 1, scaleY: 1 }, 500).to({ scaleX: 1.1, scaleY: 1.1 }, 500).to({ scaleX: 1, scaleY: 1 }, 500);
        Mode.isindex = true;
        // this.rule.scaleX = 0.8;
        // this.rule.scaleY = 0.8;
        // egret.Tween.get(this.rule, { loop: true }).to({ scaleX: 1, scaleY: 1, }, 1000, egret.Ease.elasticOut).wait(1000);
        Tool.setPointLeft(this.btn1, 200, 400, 800, this);
        Tool.setPointLeft(this.btn2, -200, 400, 800, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtap, this);
    }
    public touchtap(e: egret.TouchEvent) {
        switch (e.target) {
            case this.btn1:
                Mode.diyici += 1;
                if (Mode.diyici == 1) {
                    PopUpManager.getInstance().addPopUp(new Rule, false, 750, 1334, 1);
                }
                else {
                    Main.eventManager.dispatchEventWith(EventManager.GOTO_GAME);
                }
                break;
            case this.btn2:
                Main.eventManager.dispatchEventWith(EventManager.GOTO_RANK);
                break;
            case this.rule:
                PopUpManager.getInstance().addPopUp(new Rule, false, 750, 1334, 1);
                break;
            default:
                break;
        }
    }
}

