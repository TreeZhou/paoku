/**
 *规则页
 * @author 
 *
 */
class Rule extends CBaseClass {
    public constructor() {
        super();
        this.skinName = "RuleSkin";
    }
    public childrenCreated() {
        //  Effects.CenterSize(this);
        this.createGameScene();
    }
    public scroller: eui.Scroller;
    public group: eui.Group;
    public sofa: eui.Image;
    public slider: eui.VSlider;
    public close: eui.Image;

    public createGameScene() {
        this.matchSlider();
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtap, this);
    }
    public touchtap() {
        PopUpManager.getInstance().removePopUp(this, 1);
        if (Mode.diyici == 1) {
            Main.eventManager.dispatchEventWith(EventManager.GOTO_GAME);
        }
    }
    private matchSlider() {
        this.slider.minimum = 0;//定义最小值
        var singlevalue: number = 95;//一个子元素预备的高度
        this.slider.maximum = this.sofa.height - this.scroller.height;//定义最大值
        this.slider.value = this.sofa.height - this.scroller.height;//定义默认值
        this.slider.addEventListener(eui.UIEvent.CHANGE, (evt: eui.UIEvent) => {
            this.group.scrollV = (this.sofa.height - this.scroller.height) - (evt.target.value);
        }, this);

        this.scroller.addEventListener(eui.UIEvent.CHANGE, (evt: eui.UIEvent) => {
            this.slider.value = (this.sofa.height - this.scroller.height) - this.group.scrollV;
        }, this);
    }
}

