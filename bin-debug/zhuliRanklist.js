var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var zhuliRanklist = (function (_super) {
    __extends(zhuliRanklist, _super);
    function zhuliRanklist(touxiangUrl, nicenam) {
        var _this = _super.call(this) || this;
        _this.touxiangUrl = touxiangUrl;
        _this.nicenam = nicenam;
        _this.skinName = "zhuliRanklistSkin";
        return _this;
    }
    zhuliRanklist.prototype.childrenCreated = function () {
        //  Effects.CenterSize(this);
        this.createGameScene();
    };
    zhuliRanklist.prototype.createGameScene = function () {
        this.nicheng.text = this.nicenam;
        RES.getResByUrl(this.touxiangUrl, function (texture) {
            var photoBox1 = new egret.Bitmap();
            photoBox1.width = 98;
            photoBox1.height = 98;
            photoBox1.x = 23;
            photoBox1.y = 13;
            photoBox1.texture = texture;
            this.addChild(photoBox1);
            Tool.createCircleMask(photoBox1);
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    return zhuliRanklist;
}(eui.Component));
__reflect(zhuliRanklist.prototype, "zhuliRanklist");
//# sourceMappingURL=zhuliRanklist.js.map