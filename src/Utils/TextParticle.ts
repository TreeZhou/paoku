
/**
 * 文本粒子效果类
   bitmap这样用
   var pa:TextParticle = new TextParticle(Tool.createBitmapByName("1_png"),1,1,0,0xffffff);
   pa.x = 100;pa.y = 100;
   eui.image这样用
   var pa:TextParticle = new TextParticle(this['textbit'],1,1,0,0xffffff);
 */
class TextParticle extends egret.DisplayObjectContainer {
    private textBit: any;
    private dots = [];
    private delay: number;
    private fontColor: number;
    private scan:number;
    private crude:number;
    /**scan扫描范围(建议1-3)crude粒子大小（建议1-2）delay延迟fontColor粒子颜色 */
    constructor(bit: any, scan:number = 3,crude:number = 2,delay: number = 0, fontColor: number = 0xffffff) {
        super();
        this.delay = delay;
        this.fontColor = fontColor;
        this.scan = scan;
        this.crude = crude;
        if (egret.getQualifiedClassName(bit) == "eui.Image") {
            this.x = bit.x;
            this.y = bit.y;
            this.textBit = Tool.createBitmapByName(bit.source);
            // Tool.removeFromParent(bit);
            bit.alpha = 0;
        } else {
            this.textBit = bit;
        }
        this.width = this.textBit.width;
        this.height = this.textBit.height;
        this.create();
    }
    private create() {
        this.getImgDate();
        this.dots.forEach((dot) => {
            dot.x = Math.random() * this.textBit.width;
            dot.y = Math.random() * this.textBit.height;
            dot.scaleX = dot.scaleY = Math.random() * 3;
            this.addChild(dot);
        }, this);
        this.animate();
    }
    public animate() {
        var isOver: boolean = true;
        this.dots.forEach((dot) => {
            egret.Tween.get(dot).wait(this.delay).to({ x: dot.tempx, y: dot.tempy, scaleX: 1, scaleY: 1 }, 1000, egret.Ease.quartInOut).call((dot) => {
                egret.Tween.get(dot).to({ alpha: 0 }, 300).call(() => {
                    Tool.removeFromParent(dot);
                    egret.Tween.removeTweens(dot);
                });
                if (isOver == true) {
                    isOver = false;
                    this.textBit.alpha = 0;
                    this.addChild(this.textBit);
                    egret.Tween.get(this.textBit).to({ alpha: 1 }, 300).call(() => {
                        egret.Tween.removeTweens(this.textBit);
                    }, this);
                }
            }, this, [dot]);
        }, this);
    }
    public getImgDate() {
        var imgData = (this.textBit.texture.getPixels(0, 0, this.textBit.width, this.textBit.height));
        for (var x = 0; x < this.textBit.width; x += this.scan) {
            for (var y = 0; y < this.textBit.height; y += this.scan) {
                var i = (y * this.textBit.width + x) * 4;
                if (imgData[i + 3] >= 128) {
                    var dot = new Dot(x - 3, y - 3, 0, 3, this.textBit.width, this.textBit.height, this.fontColor,this.crude);
                    this.dots.push(dot);
                }
            }
        }
        return this.dots;
    }
}
class Dot extends egret.Shape {
    public tempx;
    public tempy;
    public tempwidth;
    public tempheight;
    public fontcolor;
    public crude;
    constructor(centerX, centerY, centerZ, radius, tempwidth, tempheight, fontcolor,crude) {
        super();
        this.tempx = centerX + 3;
        this.tempy = centerY + 3;
        this.tempwidth = tempwidth;
        this.tempheight = tempheight;
        this.fontcolor = fontcolor;
        this.crude = crude;
        this.create();
    }
    private create() {
        this.graphics.beginFill(this.fontcolor, 1);
        this.graphics.drawCircle(0, 0, this.crude);
        this.graphics.endFill();
    }
}