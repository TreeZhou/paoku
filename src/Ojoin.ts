/**
 *好友进入页
 * @author 
 *
 */
class Ojoin extends CBaseClass {
    public constructor() {
        super();
        this.skinName = "OjoinSkin";
    }
    public childrenCreated() {
        //  Effects.CenterSize(this);
        this.createGameScene();
    }
    public btn: eui.Image;
    public dianbtn: eui.Image;
    public rule: eui.Image;

    public createGameScene() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtap, this);
    }
    public touchtap(e: egret.TouchEvent) {
        switch (e.target) {
            case this.dianbtn:
                if (Mode.isdianzan == false) {
                    var _data = '&data=' + DecodeStr.setencode("shareid=" + Mode.shareid, Mode.apikey);
                    MessageTool.GET("http://game.flyh5.cn/game/wx75967690c8ef0c50/mar_lkm/api.php" + "?a=share", _data, (e: egret.Event) => {
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
    }
}

