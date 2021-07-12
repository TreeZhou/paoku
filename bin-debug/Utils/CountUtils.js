var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 专用倒计时工具
 * 用法:
 * private timeCount:egret.TextField;
 * private count:number = 60;
 * private countUtils:Time;
 * private createGameScene(){
 * this.timeCount = Tool.createTextFiled(0,0,100,50,String(this.count),25,0xeeeeee,true);
 * this.addChild(this.timeCount);
 * this.countUtils = new Time(this.count,1,this.timeCount,this.pre,this.end,this)
 * this.countUtils.start();
 * }
 * private pre(){}
 * private end(){}
 */
var CountUtils = (function () {
    /**
     * @param  {any} allTime 总倒计时 秒
     * @param  {any} time 倒计时间间隔 秒
     * @param  {egret.TextField} tf 倒计时显示文本框
     * @param  {Function} per 每次执行的方法
     * @param  {Function} end 倒计时结束方法
     * @param  {any} self
     */
    function CountUtils(allTime, time, tf, per, end, self) {
        this._time = time;
        this._allTime = allTime;
        this._countTf = tf;
        this._per = per;
        this._end = end;
        this._self = self;
    }
    /**开启倒计时*/
    CountUtils.prototype.start = function () {
        if (this.tx) {
            return;
        }
        this.tx = egret.setInterval(function () {
            this._allTime -= this._time;
            this.per();
            if (this._allTime <= 0) {
                egret.clearInterval(this.tx);
                this.end();
            }
        }, this, this._time * 1000);
    };
    /**停止倒计时 */
    CountUtils.prototype.stop = function () {
        egret.clearInterval(this.tx);
        this.tx = null;
    };
    /**每秒执行方法 */
    CountUtils.prototype.per = function () {
        this._countTf.text = String(this._allTime);
        this._per.call(this._self);
    };
    /**结束倒计时方法 */
    CountUtils.prototype.end = function () {
        this._countTf.text = "0";
        this._end.call(this._self);
    };
    return CountUtils;
}());
__reflect(CountUtils.prototype, "CountUtils");
//# sourceMappingURL=CountUtils.js.map