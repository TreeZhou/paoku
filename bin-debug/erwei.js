var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *二维码入口页
 * @author
 *
 */
var erwei = (function (_super) {
    __extends(erwei, _super);
    function erwei() {
        var _this = _super.call(this) || this;
        _this.skinName = "erweiSkin";
        return _this;
    }
    erwei.prototype.childrenCreated = function () {
        //  Effects.CenterSize(this);
        this.createGameScene();
    };
    erwei.prototype.createGameScene = function () {
        document.getElementById("ewm").style.display = "block";
        Tool.displayLikeObject(document.getElementById("ewm"), this.ewms);
        document.getElementById("ewm").style.top = "46%";
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtap, this);
    };
    erwei.prototype.touchtap = function () {
        document.getElementById("ewm").style.display = "none";
        PopUpManager.getInstance().removePopUp(this, 1);
    };
    return erwei;
}(CBaseClass));
__reflect(erwei.prototype, "erwei");
//# sourceMappingURL=erwei.js.map