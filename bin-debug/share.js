var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *fenxiang页
 * @author
 *
 */
var share = (function (_super) {
    __extends(share, _super);
    function share() {
        var _this = _super.call(this) || this;
        _this.skinName = "shareSkin";
        return _this;
    }
    share.prototype.childrenCreated = function () {
        //  Effects.CenterSize(this);
        this.createGameScene();
    };
    share.prototype.createGameScene = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtap, this);
    };
    share.prototype.touchtap = function () {
        PopUpManager.getInstance().removePopUp(this, 1);
        PopUpManager.getInstance().addPopUp(new Gameover, true, 750, 1334, 1);
    };
    return share;
}(CBaseClass));
__reflect(share.prototype, "share");
//# sourceMappingURL=share.js.map