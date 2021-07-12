/**
 *信息填写页
 * @author 
 *
 */
class Infos extends CBaseClass {
    public constructor() {
        super();
        this.skinName = "InfosSkin";
    }
    public childrenCreated() {
        //  Effects.CenterSize(this);
        this.createGameScene();
    }
    public close: eui.Image;
    public namelabel: eui.Label;
    public iphonelabel: eui.Label;
    public addlabel: eui.Label;
    public yixie: eui.EditableText;
    public erxie: eui.EditableText;
    public sanxie: eui.EditableText;
    public createGameScene() {
        if (Mode.is_info == 0) {
            this.close.source = "g8_btn1_png";
        }
        else {
            if (Mode.namss != "") {
                this.yixie.visible = false;
                this.erxie.visible = false;
                this.sanxie.visible = false;
                this.namelabel.text = Mode.namss;
                this.iphonelabel.text = Mode.iphss;
                this.addlabel.text = Mode.addzhi;
                this.close.source = "g8_btn2_png";
            }
            else {
                this.yixie.visible = false;
                this.erxie.visible = false;
                this.sanxie.visible = false;
                this.namelabel.text = sessionStorage['user_name'];
                this.iphonelabel.text = sessionStorage['user_phone'];
                this.addlabel.text = sessionStorage['user_address'];
                this.close.source = "g8_btn2_png";
            }
        }
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtap, this);
    }
    public touchtap() {
        if (Mode.is_info == 0) {
            if (this.yixie.text == "" || this.erxie.text == "" || this.sanxie.text == "") {
                alert("信息未填写完整");
                return;
            }
            if (!RegUtils.testCellPhone(this.erxie.text)) {
                alert("手机号输入错误");
                return;
            }
            Mode.namss = this.yixie.text;
            Mode.iphss = this.erxie.text;
            Mode.addzhi = this.sanxie.text;
            var _data = '&data=' + DecodeStr.setencode("user_name=" + this.encode(this.yixie.text) + "&user_phone=" + this.encode(this.erxie.text) + "&user_address=" + this.encode(this.sanxie.text), Mode.apikey);
            MessageTool.GET("http://game.flyh5.cn/game/wx75967690c8ef0c50/mar_lkm/api.php" + "?a=add_info", _data, (e: egret.Event) => {
                var obj = JSON.parse(e.target.response.trim());
                console.log(obj);
                if (obj['error'] != 100) {
                    alert('拉取用户数据失败点击重新获取');
                    return;
                }
                Mode.is_info = 1;
                Main.eventManager.dispatchEventWith(EventManager.GOTO_RANK);
            }, this, false);
        }
        else {
            Main.eventManager.dispatchEventWith(EventManager.GOTO_RANK);
        }
    }
    public encode(gameId) {
        return encodeURIComponent(gameId);
    }
}

