var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *成绩页
 * @author
 *
 */
var Gameover = (function (_super) {
    __extends(Gameover, _super);
    function Gameover() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameoverSkin";
        return _this;
    }
    Gameover.prototype.childrenCreated = function () {
        //  Effects.CenterSize(this);
        this.createGameScene();
    };
    Gameover.prototype.createGameScene = function () {
        if (Mode.isgame == false) {
            Tool.share("快来！帮我助跑！防晒礼品免费领，超值惊喜送闺蜜！！", "超燃耶！土豪送礼+防护喷雾免费领！", "http://game.flyh5.cn/resources/game/zzy_game/180301_LKM_run/main.html?shareid=" + sessionStorage['openid'], "http://game.flyh5.cn/resources/game/zzy_game/180301_LKM_run/icon.jpg");
            document.getElementById("end1")['play']();
        }
        Mode.isindex = false;
        this.chengji.text = Mode.score + "";
        // Tool.center(this.beiguang);
        this.shouzhi.touchEnabled = false;
        egret.Tween.get(this.beiguang, { loop: true }).to({ rotation: 360 }, 2000);
        egret.Tween.get(this.shouzhi, { loop: true }).to({ y: this.shouzhi.y - 15 }, 600).to({ y: this.shouzhi.y }, 600);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtap, this);
    };
    Gameover.prototype.touchtap = function (e) {
        switch (e.target) {
            case this.btn1:
                Mode.cpnum = 1;
                PopUpManager.getInstance().removePopUp(this, 0);
                PopUpManager.getInstance().addPopUp(new changpin, false, 750, 1334, 0);
                break;
            case this.btn2:
                Mode.cpnum = 2;
                PopUpManager.getInstance().removePopUp(this, 0);
                PopUpManager.getInstance().addPopUp(new changpin, false, 750, 1334, 0);
                break;
            case this.btn3:
                Mode.cpnum = 3;
                PopUpManager.getInstance().removePopUp(this, 0);
                PopUpManager.getInstance().addPopUp(new changpin, false, 750, 1334, 0);
                break;
            case this.rankb:
                PopUpManager.getInstance().removePopUp(this, 1);
                Main.eventManager.dispatchEventWith(EventManager.GOTO_RANK);
                break;
            case this.shareb:
                // PopUpManager.getInstance().removePopUp(this, 1);
                // PopUpManager.getInstance().addPopUp(new share, false, 750, 1334, 1);
                this.group.visible = true;
                this.group.touchEnabled = true;
                break;
            case this.dbtn:
                this.group.visible = false;
                break;
            case this.dbtn1:
                this.group.visible = false;
                break;
            default:
                break;
        }
    };
    return Gameover;
}(CBaseClass));
__reflect(Gameover.prototype, "Gameover");
//# sourceMappingURL=Gameover.js.map