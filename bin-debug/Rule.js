var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *规则页
 * @author
 *
 */
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        var _this = _super.call(this) || this;
        _this.skinName = "RuleSkin";
        return _this;
    }
    Rule.prototype.childrenCreated = function () {
        //  Effects.CenterSize(this);
        this.createGameScene();
    };
    Rule.prototype.createGameScene = function () {
        this.matchSlider();
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtap, this);
    };
    Rule.prototype.touchtap = function () {
        PopUpManager.getInstance().removePopUp(this, 1);
        if (Mode.diyici == 1) {
            Main.eventManager.dispatchEventWith(EventManager.GOTO_GAME);
        }
    };
    Rule.prototype.matchSlider = function () {
        var _this = this;
        this.slider.minimum = 0; //定义最小值
        var singlevalue = 95; //一个子元素预备的高度
        this.slider.maximum = this.sofa.height - this.scroller.height; //定义最大值
        this.slider.value = this.sofa.height - this.scroller.height; //定义默认值
        this.slider.addEventListener(eui.UIEvent.CHANGE, function (evt) {
            _this.group.scrollV = (_this.sofa.height - _this.scroller.height) - (evt.target.value);
        }, this);
        this.scroller.addEventListener(eui.UIEvent.CHANGE, function (evt) {
            _this.slider.value = (_this.sofa.height - _this.scroller.height) - _this.group.scrollV;
        }, this);
    };
    return Rule;
}(CBaseClass));
__reflect(Rule.prototype, "Rule");
//# sourceMappingURL=Rule.js.map