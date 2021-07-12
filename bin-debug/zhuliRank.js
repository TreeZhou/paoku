var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *规则页
 * @author
 *
 */
var zhuliRank = (function (_super) {
    __extends(zhuliRank, _super);
    function zhuliRank() {
        var _this = _super.call(this) || this;
        _this.skinName = "zhuliRankSkin";
        return _this;
    }
    zhuliRank.prototype.childrenCreated = function () {
        //  Effects.CenterSize(this);
        this.createGameScene();
    };
    zhuliRank.prototype.createGameScene = function () {
        var _this = this;
        var singlevalue = 120; //一个子元素预备的高度
        this.slider.addEventListener(eui.UIEvent.CHANGE, function (evt) {
            _this.group.scrollV = ((_this.group.numChildren * singlevalue) - _this.scroller.height) - (evt.target.value);
        }, this);
        this.scroller.addEventListener(eui.UIEvent.CHANGE, function (evt) {
            _this.slider.value = ((_this.group.numChildren * singlevalue) - _this.scroller.height) - _this.group.scrollV;
        }, this);
        var _data = '&data=' + DecodeStr.setencode("", Mode.apikey);
        MessageTool.GET("http://game.flyh5.cn/game/wx75967690c8ef0c50/mar_lkm/api.php" + "?a=help_top", _data, function (e) {
            var obj = JSON.parse(e.target.response.trim());
            console.log(obj);
            if (obj['error'] != 100) {
                alert('拉取用户数据失败点击重新获取');
                return;
            }
            for (var i = 0; i < obj.data.length; i++) {
                var listss = new zhuliRanklist(obj.data[i].headimgurl, obj.data[i].nickname);
                listss.y = 120 * i;
                listss.height = 120;
                _this.group.addChild(listss);
            }
            _this.matchSlider();
        }, this, false);
        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtap, this);
    };
    zhuliRank.prototype.touchtap = function () {
        PopUpManager.getInstance().removePopUp(this, 1);
        Main.eventManager.dispatchEventWith(EventManager.GOTO_RANK);
    };
    zhuliRank.prototype.matchSlider = function () {
        this.slider.minimum = 0; //定义最小值
        var singlevalue = 120; //一个子元素预备的高度
        this.slider.maximum = (this.group.numChildren * singlevalue) - this.scroller.height; //定义最大值
        this.slider.value = (this.group.numChildren * singlevalue) - this.scroller.height; //定义默认值
    };
    return zhuliRank;
}(CBaseClass));
__reflect(zhuliRank.prototype, "zhuliRank");
//# sourceMappingURL=zhuliRank.js.map