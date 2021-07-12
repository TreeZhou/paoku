var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *排行榜
 * @author
 *
 */
var Rank = (function (_super) {
    __extends(Rank, _super);
    function Rank() {
        var _this = _super.call(this) || this;
        _this.skinName = "RankSkin";
        return _this;
    }
    Rank.prototype.childrenCreated = function () {
        //  Effects.CenterSize(this);
        this.createGameScene();
    };
    Rank.prototype.createGameScene = function () {
        var _this = this;
        egret.Tween.get(this.shouzhi, { loop: true }).to({ y: this.shouzhi.y - 10 }, 800).to({ y: this.shouzhi.y }, 800);
        var singlevalue = 120; //一个子元素预备的高度
        this.slider.addEventListener(eui.UIEvent.CHANGE, function (evt) {
            _this.group.scrollV = ((_this.group.numChildren * singlevalue) - _this.scroller.height) - (evt.target.value);
        }, this);
        this.scroller.addEventListener(eui.UIEvent.CHANGE, function (evt) {
            _this.slider.value = ((_this.group.numChildren * singlevalue) - _this.scroller.height) - _this.group.scrollV;
        }, this);
        // this.scroller.addEventListener(eui.UIEvent.CHANGE, this.change1, this);
        // this.slider.addEventListener(eui.UIEvent.CHANGE, this.change2, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtap, this);
        if (Mode.isindex) {
            this.angin.source = "g6_btn4_png";
        }
        else {
            this.angin.source = "g6_btn1_png";
        }
        // game_nums  headimgurl  nickname Mode.apikey
        var _data = '&data=' + DecodeStr.setencode("", Mode.apikey);
        MessageTool.GET("http://game.flyh5.cn/game/wx75967690c8ef0c50/mar_lkm/api.php" + "?a=top", _data, function (e) {
            var obj = JSON.parse(e.target.response.trim());
            console.log(obj);
            if (obj['error'] != 100) {
                alert('拉取用户数据失败点击重新获取');
                return;
            }
            if (obj.data.length >= 1) {
                _this.yiname.text = obj.data[0].nickname;
                _this.yifen.text = obj.data[0].game_nums;
                RES.getResByUrl(obj.data[0].headimgurl, function (texture) {
                    var photoBox = new egret.Bitmap();
                    photoBox.width = 98;
                    photoBox.height = 98;
                    photoBox.x = 325;
                    photoBox.y = 265;
                    photoBox.texture = texture;
                    this.addChildAt(photoBox, 7);
                    Tool.createCircleMask(photoBox);
                }, _this, RES.ResourceItem.TYPE_IMAGE);
            }
            if (obj.data.length >= 2) {
                _this.ername.text = obj.data[1].nickname;
                _this.erfen.text = obj.data[1].game_nums;
                RES.getResByUrl(obj.data[1].headimgurl, function (texture) {
                    var photoBox1 = new egret.Bitmap();
                    photoBox1.width = 98;
                    photoBox1.height = 98;
                    photoBox1.x = 163;
                    photoBox1.y = 273;
                    photoBox1.texture = texture;
                    this.addChildAt(photoBox1, 7);
                    Tool.createCircleMask(photoBox1);
                }, _this, RES.ResourceItem.TYPE_IMAGE);
            }
            if (obj.data.length >= 3) {
                _this.sanname.text = obj.data[2].nickname;
                _this.sanfen.text = obj.data[2].game_nums;
                RES.getResByUrl(obj.data[2].headimgurl, function (texture) {
                    var photoBox1 = new egret.Bitmap();
                    photoBox1.width = 98;
                    photoBox1.height = 98;
                    photoBox1.x = 482;
                    photoBox1.y = 272;
                    photoBox1.texture = texture;
                    this.addChildAt(photoBox1, 7);
                    Tool.createCircleMask(photoBox1);
                }, _this, RES.ResourceItem.TYPE_IMAGE);
            }
            // var photoBox = Tool.createBitmapByName("g6_text2_png");
            // photoBox.width = 397; photoBox.height = 35;
            // photoBox.x = 172; photoBox.y = 351;
            // this.addChildAt(photoBox,9999);
            for (var i = 3; i < obj.data.length; i++) {
                var listss = new Ranklist(obj.data[i].headimgurl, obj.data[i].nickname, obj.data[i].game_nums, i + 1);
                listss.y = 120 * (i - 3);
                listss.height = 120;
                _this.group.addChild(listss);
            }
            console.log("结束");
            _this.matchSlider();
        }, this, false);
    };
    Rank.prototype.change1 = function (e) {
        this.slider.value = this.group.scrollV;
    };
    Rank.prototype.change2 = function (e) {
        switch (e.type) {
            case eui.UIEvent.CHANGE:
                this.group.scrollV = this.slider.value;
                break;
            case eui.UIEvent.CHANGE_END:
                // this.group.validateNow();
                break;
        }
    };
    Rank.prototype.touchtap = function (e) {
        switch (e.target) {
            case this.angin:
                Mode.diyici += 1;
                if (Mode.diyici == 1) {
                    PopUpManager.getInstance().addPopUp(new Rule, false, 750, 1334, 1);
                }
                else {
                    Main.eventManager.dispatchEventWith(EventManager.GOTO_GAME);
                }
                break;
            case this.zhuli:
                Main.eventManager.dispatchEventWith(EventManager.GOTO_ZHULIRANK);
                break;
            case this.duihuan:
                Main.eventManager.dispatchEventWith(EventManager.GOTO_INFOS);
                break;
            case this.ewmbtn:
                PopUpManager.getInstance().addPopUp(new erwei, false, 750, 1334, 1);
                break;
            default:
                break;
        }
    };
    Rank.prototype.matchSlider = function () {
        this.slider.minimum = 0; //定义最小值
        var singlevalue = 120; //一个子元素预备的高度
        console.log(this.group.numChildren);
        this.slider.maximum = (this.group.numChildren * singlevalue) - this.scroller.height; //定义最大值
        this.slider.value = (this.group.numChildren * singlevalue) - this.scroller.height; //定义默认值
    };
    return Rank;
}(CBaseClass));
__reflect(Rank.prototype, "Rank");
//# sourceMappingURL=Rank.js.map