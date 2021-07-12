var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *  外部调用方法 TouchStyleEffects.touchStyleEffects(event.stageX,event.stageY);
 */
var TouchStyleEffects = (function (_super) {
    __extends(TouchStyleEffects, _super);
    function TouchStyleEffects() {
        return _super.call(this) || this;
    }
    TouchStyleEffects.touchStyleEffects = function (e, color) {
        if (color === void 0) { color = 0xeeeeee; }
        this._starColor = color;
        for (var i = 0; i < this._num; i++) {
            var angle = 2 * Math.PI * Math.random();
            var disx = Math.sin(angle) * this._starDis;
            var disy = Math.cos(angle) * this._starDis;
            var startX = e.stageX + disx;
            var startY = e.stageY + disy;
            var endX = e.stageX + 4 * disx;
            var endY = e.stageY + 4 * disy;
            var r = this._size + this._size * Math.random();
            var R = 2 * r;
            var m = new egret.Shape();
            var radius = 5;
            var color = 0xFFFFFF;
            m.graphics.lineStyle(2, Number(TouchStyleEffects.getRandomColor()));
            m.graphics.moveTo(radius, 0);
            m.graphics.beginFill(color);
            m.x = startX;
            m.y = startY;
            for (var k = 1; k < 11; k++) {
                var radius2 = radius;
                if (k % 2 > 0) {
                    radius2 = radius / 2;
                }
                var angle = Math.PI * 2 / 10 * k;
                m.graphics.lineTo(Math.cos(angle) * radius2, Math.sin(angle) * radius2);
            }
            egret.MainContext.instance.stage.addChild(m);
            egret.Tween.get(m).to({ alpha: 0, x: endX, y: endY, scaleX: 0.1, scaleY: 0.1 }, 500).call(this.removeStar, this, [m]);
        }
    };
    TouchStyleEffects.removeStar = function (star) {
        egret.MainContext.instance.stage.removeChild(star);
    };
    TouchStyleEffects.getRandomColor = function () {
        return '0x' + Math.floor(Math.random() * 16777215).toString(16);
    };
    return TouchStyleEffects;
}(egret.Sprite));
TouchStyleEffects._size = 2; //星星大小
TouchStyleEffects._num = 10; //单次出现的个数
TouchStyleEffects._starDis = 10; //扩散距离
__reflect(TouchStyleEffects.prototype, "TouchStyleEffects");
//# sourceMappingURL=TouchStyleEffects.js.map