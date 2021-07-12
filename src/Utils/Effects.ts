/**
 *面板进入方式及本身效果类
 * @author 
 *
 */
class Effects extends egret.DisplayObjectContainer{
	public constructor() {
    	super();
	}
    /**
     * 中心放大效果
     */
    public static CenterSize(self:any){
         var obj:any = self;
         Tool.center(obj);
            obj.alpha = 0;
            egret.Tween.get(obj).to({ scaleX: 0.95,scaleY: 0.95,alpha: 0.5 },200).call(() => {
                egret.Tween.get(obj).to({ scaleX: 1,scaleY: 1,alpha: 1 },200).call(() => {
                },this);
            },this);
    }
    /**
     * 从左侧进入
     */
    public static Left(self:any){
         var obj:any = self;
         obj.x = -obj.width;
         egret.Tween.get(obj).to({x:0},400,egret.Ease.quadInOut);
    }
    /**
     * 从右侧进入
     */
    public static Right(self:any){
         var obj:any = self;
         obj.x = obj.width;
         egret.Tween.get(obj).to({x:0},400,egret.Ease.quadInOut);
    }
     /**
     * 从下方进入
     */
    public static Bottom(self:any){
         var obj:any = self;
         obj.y = obj.height;
         egret.Tween.get(obj).to({y:0},400,egret.Ease.quadInOut);
    }
    /**
     * 从上方进入
     */
    public static Top(self:any){
         var obj:any = self;
         obj.y = -obj.height;
         egret.Tween.get(obj).to({y:0},400,egret.Ease.quadInOut);
    }
    /////////////////////////////////////////分界线

    /**
     * 类似mac上图标上下抖动的效果
     * @param obj 要抖动的对象，使用
     * @param initY 要抖动的对象的初始Y值，原始位置
     * @example eval(macIconShake("this.btnIcon", 100));
     * @returns {string} 返回的是一个要执行代码的字符串，通过eval执行
     */
    public static macIconShake(obj:string, initY:number):string {
        //抖动频率[时间，移动距离]，可修改
        var arr:Array<any> = [
            [20, 300],
            [15, 300],
            [10, 300],
            [5, 300]
        ];
        var str:string = "egret.Tween.get(" + obj + ")";
        for (var i:number = 0, len:number = arr.length; i < len; i++) {
            str += ".to({'y':" + initY + "-" + arr[i][0] + "}, " + arr[i][1] + ")";
            str += ".to({'y':" + initY + "}, " + arr[i][1] + ")";
        }
        str += ";";
        return str;
    }
    /**
     * 开始闪烁
     * @param obj
     */
    public static startFlicker(obj:egret.DisplayObject, alphaTime:number):void {
        obj.alpha = 1;
        egret.Tween.get(obj,{loop:true}).to({"alpha": 0}, alphaTime).to({"alpha": 1}, alphaTime);
    }

    /**
     * 停止闪烁
     * @param obj
     */
    public static stopFlicker(obj:egret.DisplayObject):void {
        obj.alpha = 1;
        egret.Tween.removeTweens(obj);
    }
    /**
     * 简单震屏
     */
    public static shock(obj:egret.DisplayObjectContainer){
        var tempX:number = obj.x ; var tempY:number = obj.y;
        var tw = egret.Tween.get(obj);
        if(!Mode.isD){
            Mode.isD = true;
tw.to({ x: obj.x + 20,y: obj.y + 20 },100,egret.Ease.bounceOut).to({ x: obj.x - 20,y: obj.y - 20 },100,egret.Ease.bounceIn).to({ x: obj.x + 20,y: obj.y + 20 },100,egret.Ease.bounceOut).to({ x: obj.x - 20,y: obj.y - 20 },100,egret.Ease.bounceIn).to({ x: obj.x + 20,y: obj.y + 20 },100,egret.Ease.bounceOut).to({ x: obj.x - 20,y: obj.y - 20 },100,egret.Ease.bounceIn).call(function(){obj.x=tempX;obj.y=tempY;Mode.isD = false});
        }
    }
    /**
     * 轻微抖动
     */
    public static shock2(obj:egret.DisplayObjectContainer){
        var shakeNum = 80;
        var oldX:number = obj.x;
        egret.Tween.get(obj).to({x:obj.x - 10},shakeNum); 
        egret.setTimeout(function () {              
            egret.Tween.get(obj).to({x:obj.x + 20},shakeNum); 
        }, this, shakeNum*2); 
        egret.setTimeout(function () {              
            egret.Tween.get(obj).to({x:obj.x - 20},shakeNum); 
        }, this, shakeNum*3); 
        egret.setTimeout(function () {              
            egret.Tween.get(obj).to({x:obj.x + 20},shakeNum); 
        }, this, shakeNum*4); 
        egret.setTimeout(function () {              
            egret.Tween.get(obj).to({x:oldX},shakeNum); 
        }, this, shakeNum*5);       
    }
    /** 弹出动画 需要对象是基于左上点居中显示的 **/
    public static poompop(sp) {
        Tool.center(sp);
        sp.scaleX = sp.scaleY = 0.5;
        var tw = egret.Tween.get(sp);
        tw.to({ scaleX: 1,scaleY: 1 },500,egret.Ease.bounceIn).call(function() {egret.Tween.removeTweens(sp); });
    }
    
    /** 缩小进入 **/
    public static narrowpop(sp) {
        Tool.center(sp);
        sp.scaleX = sp.scaleY = 2;
        var tw = egret.Tween.get(sp);
        tw.to({ scaleX: 1,scaleY: 1 },500,egret.Ease.bounceIn).call(function() {egret.Tween.removeTweens(sp); });
    }
}
