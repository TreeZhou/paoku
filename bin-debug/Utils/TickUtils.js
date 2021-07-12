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
var TickUtils = (function () {
    /**
     * @param  {any} allTime 总倒计时 秒
     * @param  {any} time 倒计时间间隔 秒
     * @param  {egret.TextField} tf 倒计时显示文本框
     * @param  {Function} per 每次执行的方法
     * @param  {Function} end 倒计时结束方法
     * @param  {any} self
     */
    function TickUtils(allTime, time, tf, per, end, self) {
        this.tempTime = 0;
        this._time = time;
        this._allTime = allTime;
        this._countTf = tf;
        this._per = per;
        this._end = end;
        this._self = self;
    }
    /**开启倒计时*/
    TickUtils.prototype.start = function () {
        egret.startTick(this.count, this);
    };
    TickUtils.prototype.count = function (timeStamp) {
        this.tempCount = (this._allTime).toFixed(0);
        var now = timeStamp;
        var time = this.tempTime;
        var pass = now - time;
        if (pass < 1000) {
            var temp = ((this._allTime - pass / 1000));
            this._countTf.text = temp.toFixed(0);
            this._allTime = temp;
            if (Number(this._countTf.text) <= 0) {
                egret.stopTick(this.count, this);
                this.end();
                return false;
            }
            if (this._countTf.text != this.tempCount) {
                this.per();
            }
            this.tempCount = this._countTf.text;
        }
        this.tempTime = now;
        return false;
    };
    /**停止倒计时 */
    TickUtils.prototype.stop = function () {
        egret.stopTick(this.count, this);
        this.end();
    };
    /**每秒执行方法 */
    TickUtils.prototype.per = function () {
        this._per.call(this._self);
    };
    /**结束倒计时方法 */
    TickUtils.prototype.end = function () {
        this._countTf.text = "0";
        this._end.call(this._self);
    };
    return TickUtils;
}());
__reflect(TickUtils.prototype, "TickUtils");
//# sourceMappingURL=TickUtils.js.map