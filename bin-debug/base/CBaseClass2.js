var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CBaseClass2 = (function (_super) {
    __extends(CBaseClass2, _super);
    function CBaseClass2() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.width = 640;
        _this.height = 1036;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.childrenCreated, _this);
        return _this;
    }
    CBaseClass2.prototype.childrenCreated = function () {
        this.createGameScene();
    };
    CBaseClass2.prototype.createGameScene = function () {
    };
    return CBaseClass2;
}(egret.DisplayObjectContainer));
__reflect(CBaseClass2.prototype, "CBaseClass2");
//# sourceMappingURL=CBaseClass2.js.map