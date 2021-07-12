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
var Ranklist = (function (_super) {
    __extends(Ranklist, _super);
    function Ranklist(touxiangUrl, nicenam, cheng, paiming) {
        var _this = _super.call(this) || this;
        _this.touxiangUrl = touxiangUrl;
        _this.nicenam = nicenam;
        _this.cheng = cheng;
        _this.paiming = paiming;
        _this.skinName = "RanklistSkin";
        return _this;
    }
    Ranklist.prototype.childrenCreated = function () {
        //  Effects.CenterSize(this);
        this.createGameScene();
    };
    Ranklist.prototype.createGameScene = function () {
        this.nicheng.text = this.nicenam;
        this.paim.text = this.paiming + "";
        this.chengji.text = this.cheng;
        RES.getResByUrl(this.touxiangUrl, function (texture) {
            var photoBox1 = new egret.Bitmap();
            photoBox1.width = 98;
            photoBox1.height = 98;
            photoBox1.x = 63;
            photoBox1.y = 11;
            photoBox1.texture = texture;
            this.addChild(photoBox1);
            Tool.createCircleMask(photoBox1);
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    return Ranklist;
}(eui.Component));
__reflect(Ranklist.prototype, "Ranklist");
//# sourceMappingURL=Ranklist.js.map