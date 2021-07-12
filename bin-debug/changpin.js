var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *产品页
 * @author
 *
 */
var changpin = (function (_super) {
    __extends(changpin, _super);
    function changpin() {
        var _this = _super.call(this) || this;
        _this.skinName = "changpinSkin";
        return _this;
    }
    changpin.prototype.childrenCreated = function () {
        //  Effects.CenterSize(this);
        this.createGameScene();
    };
    changpin.prototype.createGameScene = function () {
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
    };
    changpin.prototype.touchtap = function () {
        PopUpManager.getInstance().removePopUp(this, 1);
        PopUpManager.getInstance().addPopUp(new Gameover, true, 750, 1334, 1);
    };
    changpin.prototype.matchSlider = function () {
        var _this = this;
        this.slider.minimum = 0; //定义最小值
        var singlevalue = 95; //一个子元素预备的高度
        this.slider.maximum = this.img1.height - this.scroller.height; //定义最大值
        this.slider.value = this.img1.height - this.scroller.height; //定义默认值
        this.slider.addEventListener(eui.UIEvent.CHANGE, function (evt) {
            _this.group.scrollV = (_this.img1.height - _this.scroller.height) - (evt.target.value);
        }, this);
        this.scroller.addEventListener(eui.UIEvent.CHANGE, function (evt) {
            // console.log(this.group.scrollV);
            _this.slider.value = (_this.img1.height - _this.scroller.height) - _this.group.scrollV;
        }, this);
    };
    return changpin;
}(CBaseClass));
__reflect(changpin.prototype, "changpin");
//# sourceMappingURL=changpin.js.map