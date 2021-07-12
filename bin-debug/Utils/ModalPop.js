var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//模态弹窗
// 调用方式
// this.addChild(new ModalPop("提示","阿斯达所")); 此调用方法会自动消失
// this.addChild(new ModalPop("提示","阿斯达所",()=>{},false));
// this.addChild(new ModalPop("提示","阿斯达所",()=>{},true));
var ModalPop = (function (_super) {
    __extends(ModalPop, _super);
    /**
     *@param title 提示的标题
     *@param content 提示的内容
     *@param success 接口调用成功的回调函数 默认为null
     *@param showCancel 是否显示取消按钮，默认为 true
     *@param cancelText 取消按钮的文字，默认为"取消"
     *@param cancelColor 取消按钮的文字颜色，默认为"#000000"
     *@param confirmText 确定按钮的文字，默认为"确定"
     *@param confirmColor 确定按钮的文字颜色，默认为"#FFFFFF"
     */
    function ModalPop(title, content, success, showCancel, cancelText, cancelColor, confirmText, confirmColor) {
        if (success === void 0) { success = null; }
        if (showCancel === void 0) { showCancel = false; }
        if (cancelText === void 0) { cancelText = "取消"; }
        if (cancelColor === void 0) { cancelColor = 0x000000; }
        if (confirmText === void 0) { confirmText = "确定"; }
        if (confirmColor === void 0) { confirmColor = 0xFFFFFF; }
        var _this = _super.call(this) || this;
        _this.skinName = "ModalSkin";
        _this.title = title;
        _this.content = content;
        _this.success = success;
        _this.showCancel = showCancel;
        _this.cancelText = cancelText;
        _this.cancelColor = cancelColor;
        _this.confirmText = confirmText;
        _this.confirmColor = confirmColor;
        return _this;
    }
    ModalPop.prototype.childrenCreated = function () {
        this.createGameScene();
    };
    ModalPop.prototype.createGameScene = function () {
        var _this = this;
        this.no.name = "cancel";
        this.yes.name = "confirm";
        this.bigyes.name = "confirm";
        if (this.success == null) {
            this.no.visible = false;
            this.yes.visible = false;
            this.bigyes.visible = false;
            this.bg.visible = false;
            this.bg2.visible = true;
            var count = setTimeout(function () {
                egret.Tween.get(_this).to({ alpha: 0 }, 100).call(function () {
                    Tool.removeFromParent(_this);
                    egret.Tween.removeTweens(_this);
                    clearTimeout(count);
                }, _this);
            }, 2000, this);
        }
        if (this.showCancel) {
            this.bigyes.visible = false;
        }
        this.tipsText.text = this.title;
        this.contentText.text = this.content;
        this.no['labelDisplay'].text = this.cancelText;
        this.no['labelDisplay']['textColor'] = this.cancelColor;
        this.yes['labelDisplay'].text = this.confirmText;
        this.yes['labelDisplay']['textColor'] = this.confirmColor;
        this.bigyes['labelDisplay'].text = this.confirmText;
        this.bigyes['labelDisplay']['textColor'] = this.confirmColor;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            if (e.target.name == "cancel" || e.target.name == "confirm") {
                _this.success.call(_this.parent, e.target.name);
                egret.Tween.get(_this).to({ alpha: 0 }, 100).call(function () {
                    Tool.removeFromParent(_this);
                    egret.Tween.removeTweens(_this);
                }, _this);
            }
        }, this);
    };
    return ModalPop;
}(CBaseClass));
__reflect(ModalPop.prototype, "ModalPop");
//# sourceMappingURL=ModalPop.js.map