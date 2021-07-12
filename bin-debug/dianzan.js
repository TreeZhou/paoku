var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *好友点赞页
 * @author
 *
 */
var dianzan = (function (_super) {
    __extends(dianzan, _super);
    function dianzan() {
        var _this = _super.call(this) || this;
        _this.skinName = "dianzanSkin";
        return _this;
    }
    dianzan.prototype.childrenCreated = function () {
        //  Effects.CenterSize(this);
        this.createGameScene();
    };
    dianzan.prototype.createGameScene = function () {
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtap, this);
    };
    dianzan.prototype.touchtap = function () {
        PopUpManager.getInstance().removePopUp(this, 1);
    };
    return dianzan;
}(CBaseClass));
__reflect(dianzan.prototype, "dianzan");
//# sourceMappingURL=dianzan.js.map