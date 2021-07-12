var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *面板进入方式及本身效果类
 * @author
 *
 */
var Effects = (function (_super) {
    __extends(Effects, _super);
    function Effects() {
        return _super.call(this) || this;
    }
    /**
     * 中心放大效果
     */
    Effects.CenterSize = function (self) {
        var _this = this;
        var obj = self;
        Tool.center(obj);
        obj.alpha = 0;
        egret.Tween.get(obj).to({ scaleX: 0.95, scaleY: 0.95, alpha: 0.5 }, 200).call(function () {
            egret.Tween.get(obj).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200).call(function () {
            }, _this);
        }, this);
    };
    /**
     * 从左侧进入
     */
    Effects.Left = function (self) {
        var obj = self;
        obj.x = -obj.width;
        egret.Tween.get(obj).to({ x: 0 }, 400, egret.Ease.quadInOut);
    };
    /**
     * 从右侧进入
     */
    Effects.Right = function (self) {
        var obj = self;
        obj.x = obj.width;
        egret.Tween.get(obj).to({ x: 0 }, 400, egret.Ease.quadInOut);
    };
    /**
    * 从下方进入
    */
    Effects.Bottom = function (self) {
        var obj = self;
        obj.y = obj.height;
        egret.Tween.get(obj).to({ y: 0 }, 400, egret.Ease.quadInOut);
    };
    /**
     * 从上方进入
     */
    Effects.Top = function (self) {
        var obj = self;
        obj.y = -obj.height;
        egret.Tween.get(obj).to({ y: 0 }, 400, egret.Ease.quadInOut);
    };
    /////////////////////////////////////////分界线
    /**
     * 类似mac上图标上下抖动的效果
     * @param obj 要抖动的对象，使用
     * @param initY 要抖动的对象的初始Y值，原始位置
     * @example eval(macIconShake("this.btnIcon", 100));
     * @returns {string} 返回的是一个要执行代码的字符串，通过eval执行
     */
    Effects.macIconShake = function (obj, initY) {
        //抖动频率[时间，移动距离]，可修改
        var arr = [
            [20, 300],
            [15, 300],
            [10, 300],
            [5, 300]
        ];
        var str = "egret.Tween.get(" + obj + ")";
        for (var i = 0, len = arr.length; i < len; i++) {
            str += ".to({'y':" + initY + "-" + arr[i][0] + "}, " + arr[i][1] + ")";
            str += ".to({'y':" + initY + "}, " + arr[i][1] + ")";
        }
        str += ";";
        return str;
    };
    /**
     * 开始闪烁
     * @param obj
     */
    Effects.startFlicker = function (obj, alphaTime) {
        obj.alpha = 1;
        egret.Tween.get(obj, { loop: true }).to({ "alpha": 0 }, alphaTime).to({ "alpha": 1 }, alphaTime);
    };
    /**
     * 停止闪烁
     * @param obj
     */
    Effects.stopFlicker = function (obj) {
        obj.alpha = 1;
        egret.Tween.removeTweens(obj);
    };
    /**
     * 简单震屏
     */
    Effects.shock = function (obj) {
        var tempX = obj.x;
        var tempY = obj.y;
        var tw = egret.Tween.get(obj);
        if (!Mode.isD) {
            Mode.isD = true;
            tw.to({ x: obj.x + 20, y: obj.y + 20 }, 100, egret.Ease.bounceOut).to({ x: obj.x - 20, y: obj.y - 20 }, 100, egret.Ease.bounceIn).to({ x: obj.x + 20, y: obj.y + 20 }, 100, egret.Ease.bounceOut).to({ x: obj.x - 20, y: obj.y - 20 }, 100, egret.Ease.bounceIn).to({ x: obj.x + 20, y: obj.y + 20 }, 100, egret.Ease.bounceOut).to({ x: obj.x - 20, y: obj.y - 20 }, 100, egret.Ease.bounceIn).call(function () { obj.x = tempX; obj.y = tempY; Mode.isD = false; });
        }
    };
    /**
     * 轻微抖动
     */
    Effects.shock2 = function (obj) {
        var shakeNum = 80;
        var oldX = obj.x;
        egret.Tween.get(obj).to({ x: obj.x - 10 }, shakeNum);
        egret.setTimeout(function () {
            egret.Tween.get(obj).to({ x: obj.x + 20 }, shakeNum);
        }, this, shakeNum * 2);
        egret.setTimeout(function () {
            egret.Tween.get(obj).to({ x: obj.x - 20 }, shakeNum);
        }, this, shakeNum * 3);
        egret.setTimeout(function () {
            egret.Tween.get(obj).to({ x: obj.x + 20 }, shakeNum);
        }, this, shakeNum * 4);
        egret.setTimeout(function () {
            egret.Tween.get(obj).to({ x: oldX }, shakeNum);
        }, this, shakeNum * 5);
    };
    /** 弹出动画 需要对象是基于左上点居中显示的 **/
    Effects.poompop = function (sp) {
        Tool.center(sp);
        sp.scaleX = sp.scaleY = 0.5;
        var tw = egret.Tween.get(sp);
        tw.to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.bounceIn).call(function () { egret.Tween.removeTweens(sp); });
    };
    /** 缩小进入 **/
    Effects.narrowpop = function (sp) {
        Tool.center(sp);
        sp.scaleX = sp.scaleY = 2;
        var tw = egret.Tween.get(sp);
        tw.to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.bounceIn).call(function () { egret.Tween.removeTweens(sp); });
    };
    return Effects;
}(egret.DisplayObjectContainer));
__reflect(Effects.prototype, "Effects");
//# sourceMappingURL=Effects.js.map