var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
    * 抛物线计算公式 用法
    ParabolaUtil.getInstance().init(new egret.Point(0,500),new egret.Point(100,500));
        var ball:egret.Sprite = Tool.createSprite(50,50,0xffffff);
        ball.y = 500;
        this.addChild(ball);
        egret.Tween.get(ball,{onChange:()=>{
            ball.y = ParabolaUtil.getInstance().getY(ball.x);
        },onChangeObj:this}).to({"x":100},1000,egret.Ease.circIn);
    */
var ParabolaUtil = (function () {
    function ParabolaUtil() {
        this.startPt = null;
        this.endPt = null;
        this.vertexPt = null;
        this.a = 0;
        this.b = 0;
        this.c = 0;
    }
    ParabolaUtil.getInstance = function () {
        if (ParabolaUtil._instance == null)
            ParabolaUtil._instance = new ParabolaUtil();
        return ParabolaUtil._instance;
    };
    /**
     * 给定两个点和定点高
     * @param start 开始点
     * @param end   结束点
     * @param waveHeight 定点高
     */
    ParabolaUtil.prototype.init = function (start, end, waveHeight) {
        if (waveHeight === void 0) { waveHeight = 240; }
        this.startPt = start;
        this.endPt = end;
        this.vertexPt = new egret.Point(this.startPt.x + (this.endPt.x - this.startPt.x) / 2, this.endPt.y - waveHeight);
        var x1 = this.startPt.x;
        var x2 = this.endPt.x;
        var x3 = this.vertexPt.x;
        var y1 = this.startPt.y;
        var y2 = this.endPt.y;
        var y3 = this.vertexPt.y;
        this.b = ((y1 - y3) * (x1 * x1 - x2 * x2) - (y1 - y2) * (x1 * x1 - x3 * x3)) / ((x1 - x3) * (x1 * x1 - x2 * x2) - (x1 - x2) * (x1 * x1 - x3 * x3));
        this.a = ((y1 - y2) - this.b * (x1 - x2)) / (x1 * x1 - x2 * x2);
        this.c = y1 - this.a * x1 * x1 - this.b * x1;
    };
    /**
     * 抛物线运动(必须要先初始化abc参数)
     * 给x轴值,得到Y轴值
     */
    ParabolaUtil.prototype.getY = function (posX) {
        return this.a * posX * posX + this.b * posX + this.c;
    };
    return ParabolaUtil;
}());
ParabolaUtil._instance = null;
__reflect(ParabolaUtil.prototype, "ParabolaUtil");
//# sourceMappingURL=ParabolaUtil.js.map