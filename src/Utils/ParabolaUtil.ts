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
class ParabolaUtil {
    private static _instance: ParabolaUtil = null;

    private startPt: egret.Point = null;
    private endPt: egret.Point = null;
    private vertexPt: egret.Point = null;
    private a: number = 0;
    private b: number = 0;
    private c: number = 0;
    public static getInstance() {
        if (ParabolaUtil._instance == null) ParabolaUtil._instance = new ParabolaUtil();
        return ParabolaUtil._instance;
    }

    /**
     * 给定两个点和定点高
     * @param start 开始点
     * @param end   结束点
     * @param waveHeight 定点高
     */
    public init(start: egret.Point, end: egret.Point, waveHeight: number = 240): void {
        this.startPt = start;
        this.endPt = end;
        this.vertexPt = new egret.Point(this.startPt.x + (this.endPt.x - this.startPt.x) / 2, this.endPt.y - waveHeight);

        var x1: number = this.startPt.x;
        var x2: number = this.endPt.x;
        var x3: number = this.vertexPt.x;

        var y1: number = this.startPt.y;
        var y2: number = this.endPt.y;
        var y3: number = this.vertexPt.y;

        this.b = ((y1 - y3) * (x1 * x1 - x2 * x2) - (y1 - y2) * (x1 * x1 - x3 * x3)) / ((x1 - x3) * (x1 * x1 - x2 * x2) - (x1 - x2) * (x1 * x1 - x3 * x3));
        this.a = ((y1 - y2) - this.b * (x1 - x2)) / (x1 * x1 - x2 * x2);
        this.c = y1 - this.a * x1 * x1 - this.b * x1;
    }
    /**
     * 抛物线运动(必须要先初始化abc参数)
     * 给x轴值,得到Y轴值
     */
    public getY(posX: number): number {
        return this.a * posX * posX + this.b * posX + this.c;
    }
}