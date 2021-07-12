var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Drag = (function (_super) {
    __extends(Drag, _super);
    function Drag() {
        var _this = _super.call(this) || this;
        _this.offsetX = 0;
        _this.offsetY = 0;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        return _this;
    }
    Drag.prototype.onAddToStage = function (event) {
    };
    /*
     * 开始拖拽
     * @param _dragObject 拖拽对象
     * @param offsetX     X轴偏移
     * @param offsetY     Y轴偏移
     * */
    Drag.prototype.start = function (_dragObject) {
        this.dragObject = _dragObject;
        this.dragObject.touchEnabled = true;
        this.dragObject.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.dragObject.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEend, this);
    };
    Drag.prototype.onTouchEend = function (e) {
        this.dragObject.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    };
    Drag.prototype.onTouchBegin = function (e) {
        this.offsetX = e.localX;
        this.offsetY = e.localY;
        this.dragObject.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    };
    Drag.prototype.onTouchMove = function (e) {
        if (this.dragObject) {
            this.dragObject.x = e.stageX - this.offsetX;
            this.dragObject.y = e.stageY - this.offsetY;
        }
        else {
            this.stop();
        }
    };
    Drag.prototype.stop = function () {
        this.dragObject.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.dragObject.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEend, this);
        this.dragObject.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    };
    return Drag;
}(egret.Sprite));
__reflect(Drag.prototype, "Drag");
//# sourceMappingURL=Drag.js.map