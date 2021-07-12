var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        var _this = _super.call(this) || this;
        _this.skinName = "loadingSkin";
        return _this;
    }
    LoadingUI.prototype.childrenCreated = function () {
        //  Effects.CenterSize(this);
        this.createGameScene();
    };
    LoadingUI.prototype.createGameScene = function () {
        this.loadz.mask = this.maskload;
    };
    LoadingUI.prototype.setProgress = function (current, total) {
        if (this.maskload) {
            this.loadz.x = -411 + Math.floor((current / total) * this.loadz.width);
        }
        this.a = Math.floor((current / total) * 100);
        this.tex.text = this.a + '%';
        // if (this.load_icon) {
        //     this.load_icon.x = Math.floor((current / total) * 448) + 120;
        // }
    };
    return LoadingUI;
}(CBaseClass));
__reflect(LoadingUI.prototype, "LoadingUI");
//# sourceMappingURL=LoadingUI.js.map