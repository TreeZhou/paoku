var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *首页
 * @author
 *
 */
var Index = (function (_super) {
    __extends(Index, _super);
    function Index() {
        var _this = _super.call(this) || this;
        _this.skinName = "IndexSkin";
        return _this;
    }
    Index.prototype.childrenCreated = function () {
        //  Effects.CenterSize(this);
        this.createGameScene();
    };
    Index.prototype.createGameScene = function () {
        // Tool.setScale(this.dh, 60, 500, 1000, this);
        egret.Tween.get(this.dh, { loop: true }).to({ scaleX: 1, scaleY: 1 }, 500).to({ scaleX: 1.1, scaleY: 1.1 }, 500).to({ scaleX: 1, scaleY: 1 }, 500);
        Mode.isindex = true;
        // this.rule.scaleX = 0.8;
        // this.rule.scaleY = 0.8;
        // egret.Tween.get(this.rule, { loop: true }).to({ scaleX: 1, scaleY: 1, }, 1000, egret.Ease.elasticOut).wait(1000);
        Tool.setPointLeft(this.btn1, 200, 400, 800, this);
        Tool.setPointLeft(this.btn2, -200, 400, 800, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtap, this);
    };
    Index.prototype.touchtap = function (e) {
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
    };
    return Index;
}(CBaseClass));
__reflect(Index.prototype, "Index");
//# sourceMappingURL=Index.js.map