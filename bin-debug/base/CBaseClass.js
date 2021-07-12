var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CBaseClass = (function (_super) {
    __extends(CBaseClass, _super);
    function CBaseClass() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.percentWidth = 640;
        _this.percentHeight = 1036;
        return _this;
    }
    CBaseClass.prototype.childrenCreated = function () {
    };
    return CBaseClass;
}(eui.Component));
__reflect(CBaseClass.prototype, "CBaseClass");
//# sourceMappingURL=CBaseClass.js.map