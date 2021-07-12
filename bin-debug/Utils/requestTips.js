var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//请求提示
var requestTips = (function (_super) {
    __extends(requestTips, _super);
    function requestTips() {
        var _this = _super.call(this) || this;
        _this.create();
        return _this;
    }
    requestTips.prototype.create = function () {
        var sp = new egret.Sprite;
        sp.graphics.beginFill(0x000000);
        sp.graphics.drawRoundRect(0, 0, 150, 150, 50, 50);
        sp.graphics.endFill();
        sp.alpha = 0.7;
        this.addChild(sp);
        this.mc = Tool.createMovieClip('quan');
        Tool.center(this.mc);
        this.mc.x = 75;
        this.mc.y = 50;
        this.mc.play(-1);
        this.addChild(this.mc);
        this.tf = Tool.createTextFiled(0, 90, 150, 25, "通信中...", 20, 0xffffff);
        this.tf.textAlign = 'center';
        this.addChild(this.tf);
    };
    return requestTips;
}(egret.DisplayObjectContainer));
__reflect(requestTips.prototype, "requestTips");
//# sourceMappingURL=requestTips.js.map