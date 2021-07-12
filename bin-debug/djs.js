var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *倒计时
 * @author
 *
 */
var djs = (function (_super) {
    __extends(djs, _super);
    function djs() {
        var _this = _super.call(this) || this;
        _this.skinName = "djsSkin";
        return _this;
    }
    djs.prototype.childrenCreated = function () {
        //  Effects.CenterSize(this);
        this.createGameScene();
    };
    djs.prototype.createGameScene = function () {
        document.getElementById("djs")['play']();
        this.dao();
    };
    djs.prototype.dao = function () {
        var _this = this;
        this.san.alpha = 1;
        this.quan.alpha = 1;
        egret.Tween.get(this.san).to({ alpha: 0 }, 900).call(function () {
            _this.er.alpha = 1;
            egret.Tween.get(_this.er).to({ alpha: 0 }, 900).call(function () {
                _this.yi.alpha = 1;
                egret.Tween.get(_this.yi).to({ alpha: 0 }, 900).call(function () {
                    _this.sgo.alpha = 1;
                    egret.Tween.get(_this.sgo).to({ alpha: 0 }, 300).call(function () {
                        _this.quan.alpha = 0;
                        PopUpManager.getInstance().removePopUp(_this, 1);
                        // Main.eventManager.dispatchEventWith("kaishi");
                    });
                });
            });
        });
    };
    return djs;
}(CBaseClass));
__reflect(djs.prototype, "djs");
//# sourceMappingURL=djs.js.map