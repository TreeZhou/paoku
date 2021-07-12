var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @xyl
 *
 * @摇一摇撒金币
 */
var Coin = (function () {
    function Coin() {
    }
    /**
     * 初始化对象池
     * */
    Coin.initPool = function () {
        for (var i = 0; i < 200; i++) {
            var img = new eui.Image();
            Coin.arrImg.push(img);
            img.name = "coin_png";
            img.source = RES.getRes("coin_png");
            this.arrPoolCoin.push(img);
        }
    };
    /**
     * 从对象池获取
     * */
    Coin.getPoolByCoinImg = function () {
        var img;
        var len = this.arrPoolCoin.length;
        if (len) {
            img = this.arrPoolCoin.shift();
            return img;
        }
        img = new eui.Image();
        Coin.arrImg.push(img);
        img.name = "coin_png";
        img.source = RES.getRes("coin_png");
        return img;
    };
    /**
     * 归还给对象池
     * */
    Coin.backPoolCoinImg = function (coinImg) {
        coinImg.name = "coin_png";
        this.arrPoolCoin.push(coinImg);
    };
    /**
     * 从舞台中获取
     * */
    Coin.getStageByCoinImg = function (name) {
        var img;
        var len = Coin.arrImg.length;
        for (var i = 0; i < len; i++) {
            if (Coin.arrImg[i].name == name) {
                img = Coin.arrImg[i];
                Coin.arrImg.splice(i, 1);
                return img;
            }
        }
        img = this.getPoolByCoinImg();
        return img;
    };
    /**
         * 动画初始化方法
         * @method _init
        **/
    Coin.init = function (parent) {
        Coin.wrapWidth = Main.Stage.stageWidth;
        Coin.wrapHeight = Main.Stage.stageHeight;
        this.parent = parent;
        if (!this.arrPoolCoin.length) {
            this.initPool();
        }
        this.dispose();
        //默认参数
        this.settings = {
            coinWidth: 154,
            coinHeight: 155,
            density: 30
        };
        this.density = this.settings.density; //密度，即金币个数
        this.timeLag = 1000; //金币散落的事件间隔，数字越大表示间隔越大
        this.coinWidth = this.settings.coinWidth * 0.3; //金币宽度
        this.coinHeight = this.settings.coinHeight * 0.3; //金币高度
        this._startCacheCanvasAnim();
    };
    /**
         * 执行金币绘制动画
         * @method _startCanvasAnim
        **/
    Coin._startCacheCanvasAnim = function () {
        var availWidth = this.wrapWidth - this.coinWidth;
        var availHeight = this.wrapHeight - this.coinHeight;
        //var disX=availWidth/this.density;  //每个硬币X轴的间距
        var coinRange = availWidth * this.density / (this.density + 15);
        var rangeStart = (availWidth - coinRange) / 2;
        var g = 9.8 * 280; //重力加速度
        var bPlayAudio = false;
        var coinAttrArr = []; //存储金币下落过程中的一些属性参数
        for (var i = 0; i < Coin.density; i++) {
            coinAttrArr[i] = {
                rndX: Math.random(),
                rndOrder: Math.round(Math.random() * Coin.timeLag / 17),
                time: 0,
                top: 0,
                left: 0,
                endSpeed: 0,
                bEnd: false,
                reDownSpeed: 0,
                reDownHDelta: Math.random() * 100 + 250,
                rndOffsetX: Math.random() * 0.06 + 0.97 //存储金币x轴的偏移量，随机值0.97~1.03之间
            };
        }
        var startTime = Date.now(); //开始绘制前的时间
        function draw() {
            var drawStart = Date.now(); //记录重绘的结束事件
            var diff = (drawStart - startTime) / 1000; //计算每次重绘所需要的事件，单位为秒
            startTime = drawStart; //结束事件传给开始事件
            //            Coin.dispose();
            //根据金币个数循环绘制金币
            for (var i = 0; i < Coin.density; i++) {
                if ((coinAttrArr[i].rndOrder == 0 && coinAttrArr[i].time == 0)) {
                    coinAttrArr[i].time = diff;
                }
                if (coinAttrArr[i].time > 0) {
                    coinAttrArr[i].time = coinAttrArr[i].time + diff;
                }
                if (coinAttrArr[i].rndOrder == 0) {
                    if (!coinAttrArr[i].bEnd) {
                        coinAttrArr[i].top = g * Math.pow(coinAttrArr[i].time, 2) / 2 - Coin.coinHeight; //自由落体加速度运动，求下落的高度
                        //coinAttrArr[i].left=disX*coinAttrArr[i].rndX+i*disX;
                        coinAttrArr[i].left = coinRange * coinAttrArr[i].rndX + rangeStart;
                    }
                    else if (coinAttrArr[i].endSpeed == 0) {
                        coinAttrArr[i].reDownSpeed = coinAttrArr[i].reDownSpeed * 1.1;
                        coinAttrArr[i].top = coinAttrArr[i].top + coinAttrArr[i].reDownSpeed;
                        coinAttrArr[i].left = coinAttrArr[i].left * coinAttrArr[i].rndOffsetX;
                    }
                    else {
                        coinAttrArr[i].endSpeed = -Math.abs(coinAttrArr[i].endSpeed * 0.96);
                        if (Math.abs(coinAttrArr[i].endSpeed) < 1)
                            coinAttrArr[i].endSpeed = 0;
                        coinAttrArr[i].top = coinAttrArr[i].top + coinAttrArr[i].endSpeed;
                        coinAttrArr[i].left = coinAttrArr[i].left * coinAttrArr[i].rndOffsetX;
                    }
                    //金币第一次降落超过地面时，将其高度设置和地面齐平
                    if (coinAttrArr[i].top > Coin.wrapHeight - Coin.coinHeight && !coinAttrArr[i].bEnd) {
                        coinAttrArr[i].top = Coin.wrapHeight - Coin.coinHeight;
                    }
                    //金币落地时，计算落地的速度
                    if (coinAttrArr[i].top == Coin.wrapHeight - Coin.coinHeight) {
                        coinAttrArr[i].endSpeed = g * coinAttrArr[i].time / coinAttrArr[i].reDownHDelta;
                        coinAttrArr[i].reDownSpeed = coinAttrArr[i].endSpeed / 10;
                        coinAttrArr[i].bEnd = true;
                    }
                    //绘制金币
                    var name = "coin_png" + i;
                    var img = Coin.getStageByCoinImg(name);
                    img.name = name;
                    Coin.arrImg.push(img);
                    img.x = coinAttrArr[i].left;
                    img.y = coinAttrArr[i].top;
                    img.width = Coin.coinWidth;
                    img.height = Coin.coinHeight;
                    Coin.parent.addChild(img);
                }
                coinAttrArr[i].rndOrder = coinAttrArr[i].rndOrder == 0 ? 0 : coinAttrArr[i].rndOrder - 1; //顺序每一次重绘则递减一次，直到为0时，代表开始下落
            }
            var firstH = Coin._maxNum(coinAttrArr, "top"); //求降落过程中高度最大的金币高度
            if (firstH >= Coin.wrapHeight - Coin.coinHeight && !bPlayAudio) {
                bPlayAudio = true;
            }
            var lastH = Coin._minNum(coinAttrArr, "top"); //求降落过程中高度最小的金币高度
            if (lastH <= Coin.wrapHeight + Coin.coinHeight) {
                egret.setTimeout(function () {
                    draw();
                    Coin.num++;
                }, Coin, 10);
            }
            else {
                // console.log("金币都撒完了 this.num：" + Coin.num);
                Coin.dispose();
            }
        }
        draw();
    };
    /**
         * 求最小值
         * @method _minNum
         * @param   {arr}    arr  属性数组
                    {string} attr 数组下的属性名称
         * @return  {number}      返回数组下属性值最小的值
        **/
    Coin._minNum = function (arr, attr) {
        var tempArr = [];
        for (var i = 0; i < arr.length; i++) {
            tempArr.push(arr[i][attr]);
        }
        return tempArr.sort(function (a, b) { return a - b; })[0];
    };
    /**
     * 求最大值
     * @method _minNum
     * @param   {arr}    arr  属性数组
                {string} attr 数组下的属性名称
     * @return  {number}      返回数组下属性值最大的值
    **/
    Coin._maxNum = function (arr, attr) {
        var tempArr = [];
        for (var i = 0; i < arr.length; i++) {
            tempArr.push(arr[i][attr]);
        }
        return tempArr.sort(function (a, b) { return b - a; })[0];
    };
    Coin.dispose = function () {
        while (this.arrImg.length) {
            if (this.arrImg[0].parent) {
                this.arrImg[0].parent.removeChild(this.arrImg[0]);
            }
            this.backPoolCoinImg(this.arrImg[0]);
            this.arrImg.splice(0, 1);
        }
    };
    return Coin;
}());
Coin.arrPoolCoin = [];
Coin.arrImg = [];
Coin.num = 0;
__reflect(Coin.prototype, "Coin");
//# sourceMappingURL=Coin.js.map