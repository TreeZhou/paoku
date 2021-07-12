var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 文本粒子效果类
   bitmap这样用
   var pa:TextParticle = new TextParticle(Tool.createBitmapByName("1_png"),1,1,0,0xffffff);
   pa.x = 100;pa.y = 100;
   eui.image这样用
   var pa:TextParticle = new TextParticle(this['textbit'],1,1,0,0xffffff);
 */
var TextParticle = (function (_super) {
    __extends(TextParticle, _super);
    /**scan扫描范围(建议1-3)crude粒子大小（建议1-2）delay延迟fontColor粒子颜色 */
    function TextParticle(bit, scan, crude, delay, fontColor) {
        if (scan === void 0) { scan = 3; }
        if (crude === void 0) { crude = 2; }
        if (delay === void 0) { delay = 0; }
        if (fontColor === void 0) { fontColor = 0xffffff; }
        var _this = _super.call(this) || this;
        _this.dots = [];
        _this.delay = delay;
        _this.fontColor = fontColor;
        _this.scan = scan;
        _this.crude = crude;
        if (egret.getQualifiedClassName(bit) == "eui.Image") {
            _this.x = bit.x;
            _this.y = bit.y;
            _this.textBit = Tool.createBitmapByName(bit.source);
            // Tool.removeFromParent(bit);
            bit.alpha = 0;
        }
        else {
            _this.textBit = bit;
        }
        _this.width = _this.textBit.width;
        _this.height = _this.textBit.height;
        _this.create();
        return _this;
    }
    TextParticle.prototype.create = function () {
        var _this = this;
        this.getImgDate();
        this.dots.forEach(function (dot) {
            dot.x = Math.random() * _this.textBit.width;
            dot.y = Math.random() * _this.textBit.height;
            dot.scaleX = dot.scaleY = Math.random() * 3;
            _this.addChild(dot);
        }, this);
        this.animate();
    };
    TextParticle.prototype.animate = function () {
        var _this = this;
        var isOver = true;
        this.dots.forEach(function (dot) {
            egret.Tween.get(dot).wait(_this.delay).to({ x: dot.tempx, y: dot.tempy, scaleX: 1, scaleY: 1 }, 1000, egret.Ease.quartInOut).call(function (dot) {
                egret.Tween.get(dot).to({ alpha: 0 }, 300).call(function () {
                    Tool.removeFromParent(dot);
                    egret.Tween.removeTweens(dot);
                });
                if (isOver == true) {
                    isOver = false;
                    _this.textBit.alpha = 0;
                    _this.addChild(_this.textBit);
                    egret.Tween.get(_this.textBit).to({ alpha: 1 }, 300).call(function () {
                        egret.Tween.removeTweens(_this.textBit);
                    }, _this);
                }
            }, _this, [dot]);
        }, this);
    };
    TextParticle.prototype.getImgDate = function () {
        var imgData = (this.textBit.texture.getPixels(0, 0, this.textBit.width, this.textBit.height));
        for (var x = 0; x < this.textBit.width; x += this.scan) {
            for (var y = 0; y < this.textBit.height; y += this.scan) {
                var i = (y * this.textBit.width + x) * 4;
                if (imgData[i + 3] >= 128) {
                    var dot = new Dot(x - 3, y - 3, 0, 3, this.textBit.width, this.textBit.height, this.fontColor, this.crude);
                    this.dots.push(dot);
                }
            }
        }
        return this.dots;
    };
    return TextParticle;
}(egret.DisplayObjectContainer));
__reflect(TextParticle.prototype, "TextParticle");
var Dot = (function (_super) {
    __extends(Dot, _super);
    function Dot(centerX, centerY, centerZ, radius, tempwidth, tempheight, fontcolor, crude) {
        var _this = _super.call(this) || this;
        _this.tempx = centerX + 3;
        _this.tempy = centerY + 3;
        _this.tempwidth = tempwidth;
        _this.tempheight = tempheight;
        _this.fontcolor = fontcolor;
        _this.crude = crude;
        _this.create();
        return _this;
    }
    Dot.prototype.create = function () {
        this.graphics.beginFill(this.fontcolor, 1);
        this.graphics.drawCircle(0, 0, this.crude);
        this.graphics.endFill();
    };
    return Dot;
}(egret.Shape));
__reflect(Dot.prototype, "Dot");
//# sourceMappingURL=TextParticle.js.map