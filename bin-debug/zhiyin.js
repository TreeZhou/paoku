var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var zhiyin = (function (_super) {
    __extends(zhiyin, _super);
    function zhiyin() {
        var _this = _super.call(this) || this;
        _this.skinName = "zhiyinSkin";
        return _this;
    }
    zhiyin.prototype.childrenCreated = function () {
        //  Effects.CenterSize(this);
        this.createGameScene();
    };
    zhiyin.prototype.createGameScene = function () {
        this.dao();
    };
    zhiyin.prototype.dao = function () {
        var _this = this;
        egret.Tween.get(this.sz).wait(500).to({ x: 43, y: 128 }, 800).call(function () {
            egret.Tween.get(_this.group).wait(300).to({ x: 60 }, 1000).to({ x: 506 }, 1000).to({ x: 300 }, 500).call(function () {
                PopUpManager.getInstance().removePopUp(_this, 0);
                PopUpManager.getInstance().addPopUp(new djs, false, 750, 1334, 0);
            });
        });
    };
    return zhiyin;
}(CBaseClass));
__reflect(zhiyin.prototype, "zhiyin");
//# sourceMappingURL=zhiyin.js.map