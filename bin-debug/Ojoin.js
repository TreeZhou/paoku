var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *好友进入页
 * @author
 *
 */
var Ojoin = (function (_super) {
    __extends(Ojoin, _super);
    function Ojoin() {
        var _this = _super.call(this) || this;
        _this.skinName = "OjoinSkin";
        return _this;
    }
    Ojoin.prototype.childrenCreated = function () {
        //  Effects.CenterSize(this);
        this.createGameScene();
    };
    Ojoin.prototype.createGameScene = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtap, this);
    };
    Ojoin.prototype.touchtap = function (e) {
        switch (e.target) {
            case this.dianbtn:
                if (Mode.isdianzan == false) {
                    var _data = '&data=' + DecodeStr.setencode("shareid=" + Mode.shareid, Mode.apikey);
                    MessageTool.GET("http://game.flyh5.cn/game/wx75967690c8ef0c50/mar_lkm/api.php" + "?a=share", _data, function (e) {
                        var obj = JSON.parse(e.target.response.trim());
                        console.log(obj);
                        if (obj['error'] != 100) {
                            alert('拉取用户数据失败点击重新获取');
                            return;
                        }
                        Mode.isdianzan = true;
                        PopUpManager.getInstance().addPopUp(new dianzan, false, 750, 1334, 1);
                    }, this, false);
                }
                else {
                    alert("本周已为好友助力");
                }
                break;
            case this.btn:
                Mode.diyici += 1;
                if (Mode.diyici == 1) {
                    PopUpManager.getInstance().addPopUp(new Rule, false, 750, 1334, 1);
                }
                else {
                    Main.eventManager.dispatchEventWith(EventManager.GOTO_GAME);
                }
                break;
            case this.rule:
                PopUpManager.getInstance().addPopUp(new Rule, false, 750, 1334, 1);
                break;
            default:
                break;
        }
    };
    return Ojoin;
}(CBaseClass));
__reflect(Ojoin.prototype, "Ojoin");
//# sourceMappingURL=Ojoin.js.map