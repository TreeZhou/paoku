/**
 *产品页
 * @author 
 *
 */
class changpin extends CBaseClass {
    public constructor() {
        super();
        this.skinName = "changpinSkin";
    }
    public childrenCreated() {
        //  Effects.CenterSize(this);
        this.createGameScene();
    }
    public scroller: eui.Scroller;
    public group: eui.Group;
    public img1: eui.Image;
    public slider: eui.VSlider;
    public btn: eui.Image;
    public createGameScene() {
        Mode.isgame = true;
        this.matchSlider();
        if (Mode.cpnum == 2) {
            this.group.scrollV = 623;
        }
        if (Mode.cpnum == 3) {
            this.group.scrollV = 1256;
        }
        this.slider.value = (this.img1.height - this.scroller.height) - this.group.scrollV;
        this.btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtap, this);
    }
    public touchtap() {
        PopUpManager.getInstance().removePopUp(this, 1);
        PopUpManager.getInstance().addPopUp(new Gameover, true, 750, 1334, 1);
    }
    private matchSlider() {
        this.slider.minimum = 0;//定义最小值
        var singlevalue: number = 95;//一个子元素预备的高度
        this.slider.maximum = this.img1.height - this.scroller.height;//定义最大值
        this.slider.value = this.img1.height - this.scroller.height;//定义默认值
        this.slider.addEventListener(eui.UIEvent.CHANGE, (evt: eui.UIEvent) => {
            this.group.scrollV = (this.img1.height - this.scroller.height) - (evt.target.value);
        }, this);
        this.scroller.addEventListener(eui.UIEvent.CHANGE, (evt: eui.UIEvent) => {
            // console.log(this.group.scrollV);
            this.slider.value = (this.img1.height - this.scroller.height) - this.group.scrollV;
        }, this);
    }
}

