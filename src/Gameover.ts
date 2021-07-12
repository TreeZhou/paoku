/**
 *成绩页
 * @author 
 *
 */
class Gameover extends CBaseClass {
    public constructor() {
        super();
        this.skinName = "GameoverSkin";
    }
    public childrenCreated() {
        //  Effects.CenterSize(this);
        this.createGameScene();
    }
    public rankb: eui.Image;
    public shareb: eui.Image;
    public btn1: eui.Image;
    public btn2: eui.Image;
    public btn3: eui.Image;
    public chengji: eui.Label;
    public beiguang: eui.Image;
    public shouzhi: eui.Image;
    public group: eui.Group;
    public dbtn: eui.Rect;
    public dbtn1: eui.Image;
    public createGameScene() {
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
    }
    public touchtap(e: egret.TouchEvent) {
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
    }
}

