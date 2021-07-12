var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *信息填写页
 * @author
 *
 */
var Infos = (function (_super) {
    __extends(Infos, _super);
    function Infos() {
        var _this = _super.call(this) || this;
        _this.skinName = "InfosSkin";
        return _this;
    }
    Infos.prototype.childrenCreated = function () {
        //  Effects.CenterSize(this);
        this.createGameScene();
    };
    Infos.prototype.createGameScene = function () {
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
    };
    Infos.prototype.touchtap = function () {
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
            MessageTool.GET("http://game.flyh5.cn/game/wx75967690c8ef0c50/mar_lkm/api.php" + "?a=add_info", _data, function (e) {
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
    };
    Infos.prototype.encode = function (gameId) {
        return encodeURIComponent(gameId);
    };
    return Infos;
}(CBaseClass));
__reflect(Infos.prototype, "Infos");
//# sourceMappingURL=Infos.js.map