/**
 *
 * @xyl
 * 
 * @摇一摇撒金币
 */
class Coin {
    public static parent: eui.Component;
    
    
    public static arrPoolCoin:Array<eui.Image> = [];
    
    public static settings:any;
    public static density:number;
    public static timeLag:number;
    public static coinWidth:number;
    public static coinHeight:number;
    public static wrapWidth:number;
    public static wrapHeight:number;
    
    private static arrImg:Array<eui.Image> = [];
    private static num:number = 0;
    
    /**
     * 初始化对象池
     * */
    public static initPool():void{
        for(var i = 0; i < 200; i++) {
            var img: eui.Image = new eui.Image();
            Coin.arrImg.push(img);
            img.name = "coin_png";
            img.source = RES.getRes("coin_png");
            this.arrPoolCoin.push(img);
        }
    }
    /**
     * 从对象池获取
     * */
    public static getPoolByCoinImg():eui.Image{
        var img: eui.Image;
        var len:number = this.arrPoolCoin.length;
        if(len){
            img = this.arrPoolCoin.shift();
            return img;
        }
        img = new eui.Image();
        Coin.arrImg.push(img);
        img.name = "coin_png";
        img.source = RES.getRes("coin_png");
        return img;
    }
    /**
     * 归还给对象池
     * */
    public static backPoolCoinImg(coinImg: eui.Image):void{
        coinImg.name = "coin_png";
        this.arrPoolCoin.push(coinImg);
    }
    
    /**
     * 从舞台中获取
     * */
    public static getStageByCoinImg(name: string): eui.Image {
        var img: eui.Image;
        var len: number = Coin.arrImg.length;
        for(var i = 0;i < len;i++) {
            if(Coin.arrImg[i].name == name) {
                img = Coin.arrImg[i];
                Coin.arrImg.splice(i,1);
                return img;
            }
        }
        img = this.getPoolByCoinImg();
        return img;
    }
    
	/**
		 * 动画初始化方法
		 * @method _init
		**/
    public static init(parent:eui.Component) {
        Coin.wrapWidth = Main.Stage.stageWidth;
        Coin.wrapHeight = Main.Stage.stageHeight;
        this.parent = parent;
        if(!this.arrPoolCoin.length){
            this.initPool();
        }
        
        this.dispose();
        //默认参数
        this.settings = {
            coinWidth: 154,           //金币宽度
            coinHeight: 155,          //金币高度
            density: 30
        };
        this.density = this.settings.density;                   //密度，即金币个数
        this.timeLag = 1000;                                    //金币散落的事件间隔，数字越大表示间隔越大
        this.coinWidth = this.settings.coinWidth * 0.3;               //金币宽度
        this.coinHeight = this.settings.coinHeight * 0.3;             //金币高度
        
        this._startCacheCanvasAnim();
    }
	
    /**
		 * 执行金币绘制动画
		 * @method _startCanvasAnim
		**/
    private static _startCacheCanvasAnim() {
        var availWidth = this.wrapWidth - this.coinWidth;
        var availHeight = this.wrapHeight - this.coinHeight;
        //var disX=availWidth/this.density;  //每个硬币X轴的间距
        var coinRange = availWidth * this.density / (this.density + 15);
        var rangeStart = (availWidth - coinRange) / 2;
        var g = 9.8 * 280;   //重力加速度
        var bPlayAudio = false;
        var coinAttrArr = [];  //存储金币下落过程中的一些属性参数
        for(var i = 0;i < Coin.density;i++) {
            
            coinAttrArr[i] = {
                rndX: Math.random(),                                    //存储金币开始降落x轴随机值
                rndOrder: Math.round(Math.random() * Coin.timeLag / 17),   //存储金币撒落顺序的一个数组
                time: 0,									               //存储金币绘制的具体时间
                top: 0,                                                 //存储金币绘制距离顶部的距离
                left: 0,                                                //存储金币弹起后距离左边的距离
                endSpeed: 0,                                            //存储金币第一次接触地面的速度
                bEnd: false,								               //存储金币是否触碰到地面
                reDownSpeed: 0,                                         //存储金币弹起后重新降落的速度
                reDownHDelta: Math.random() * 100 + 250,                    //存储金币弹起的高度参数，随机值250~350之间
                rndOffsetX: Math.random() * 0.06 + 0.97                     //存储金币x轴的偏移量，随机值0.97~1.03之间
            }
        }
        var startTime = Date.now();  //开始绘制前的时间
        function draw() {
            var drawStart = Date.now();  //记录重绘的结束事件
            var diff = (drawStart - startTime) / 1000;  //计算每次重绘所需要的事件，单位为秒
            startTime = drawStart;   //结束事件传给开始事件
//            Coin.dispose();
            //根据金币个数循环绘制金币
            for(var i = 0;i < Coin.density;i++) {
                if((coinAttrArr[i].rndOrder == 0 && coinAttrArr[i].time == 0)) {   //如果顺序为0，表示开始下落，同时下落的初始时间为0时，赋值初始时间
                    coinAttrArr[i].time = diff;
                }
                if(coinAttrArr[i].time > 0) {     //如果初始事件大于0，表示已经在下落过程中,则每次的初始时间递增
                    coinAttrArr[i].time = coinAttrArr[i].time + diff;
                }
                if(coinAttrArr[i].rndOrder == 0) {  //如果顺序为0，开始下落，则开始绘制金币
                    if(!coinAttrArr[i].bEnd) {   //金币下落（过程一），自由落体运动
                        coinAttrArr[i].top = g * Math.pow(coinAttrArr[i].time,2) / 2 - Coin.coinHeight;   //自由落体加速度运动，求下落的高度
                        //coinAttrArr[i].left=disX*coinAttrArr[i].rndX+i*disX;
                        coinAttrArr[i].left = coinRange * coinAttrArr[i].rndX + rangeStart;
                    } else if(coinAttrArr[i].endSpeed == 0) {   //金币弹起后在空中重新下落（过程三）
                        coinAttrArr[i].reDownSpeed = coinAttrArr[i].reDownSpeed * 1.1;
                        coinAttrArr[i].top = coinAttrArr[i].top + coinAttrArr[i].reDownSpeed;
                        coinAttrArr[i].left = coinAttrArr[i].left * coinAttrArr[i].rndOffsetX;
                    } else {   //金币弹起（过程二）
                        coinAttrArr[i].endSpeed = -Math.abs(coinAttrArr[i].endSpeed * 0.96);
                        if(Math.abs(coinAttrArr[i].endSpeed) < 1) coinAttrArr[i].endSpeed = 0;
                        coinAttrArr[i].top = coinAttrArr[i].top + coinAttrArr[i].endSpeed;
                        coinAttrArr[i].left = coinAttrArr[i].left * coinAttrArr[i].rndOffsetX;
                    }
                    //金币第一次降落超过地面时，将其高度设置和地面齐平
                    if(coinAttrArr[i].top > Coin.wrapHeight - Coin.coinHeight && !coinAttrArr[i].bEnd) {
                        coinAttrArr[i].top = Coin.wrapHeight - Coin.coinHeight;
                    }
                    //金币落地时，计算落地的速度
                    if(coinAttrArr[i].top == Coin.wrapHeight - Coin.coinHeight) {
                        coinAttrArr[i].endSpeed = g * coinAttrArr[i].time / coinAttrArr[i].reDownHDelta;
                        coinAttrArr[i].reDownSpeed = coinAttrArr[i].endSpeed / 10;
                        coinAttrArr[i].bEnd = true;
                    }
                    //绘制金币
                    var name: string = "coin_png" + i;
                    var img: eui.Image = Coin.getStageByCoinImg(name);
                    img.name = name;
                    Coin.arrImg.push(img);
                    img.x = coinAttrArr[i].left;
                    img.y = coinAttrArr[i].top;
                    img.width = Coin.coinWidth;
                    img.height = Coin.coinHeight;
                    Coin.parent.addChild(img);
                }
                coinAttrArr[i].rndOrder = coinAttrArr[i].rndOrder == 0 ? 0 : coinAttrArr[i].rndOrder - 1;//顺序每一次重绘则递减一次，直到为0时，代表开始下落
            }
            var firstH = Coin._maxNum(coinAttrArr,"top");//求降落过程中高度最大的金币高度
            if(firstH >= Coin.wrapHeight - Coin.coinHeight && !bPlayAudio) {
                bPlayAudio = true;
            }
            var lastH = Coin._minNum(coinAttrArr,"top");//求降落过程中高度最小的金币高度
            if(lastH <= Coin.wrapHeight + Coin.coinHeight) { //最后一个金币高度超出canvas的高度停止重绘
                egret.setTimeout(()=>{
                    draw();
                    Coin.num++;
                },Coin,10);
            } else {
                // console.log("金币都撒完了 this.num：" + Coin.num);
                Coin.dispose();
            }
        }
        draw();
    }
    
    /**
		 * 求最小值
		 * @method _minNum
		 * @param   {arr}    arr  属性数组
					{string} attr 数组下的属性名称
		 * @return  {number}      返回数组下属性值最小的值
		**/
    private static _minNum(arr,attr) {
        var tempArr = [];
        for(var i = 0;i < arr.length;i++) {
            tempArr.push(arr[i][attr]);
        }
        return tempArr.sort(function(a,b) { return a - b })[0];
    }
    /**
     * 求最大值
     * @method _minNum
     * @param   {arr}    arr  属性数组
                {string} attr 数组下的属性名称
     * @return  {number}      返回数组下属性值最大的值
    **/
    private static _maxNum(arr,attr) {
        var tempArr = [];
        for(var i = 0;i < arr.length;i++) {
            tempArr.push(arr[i][attr]);
        }
        return tempArr.sort(function(a,b) { return b - a })[0];
    }
    
    public static dispose():void{
        while(this.arrImg.length){
            if(this.arrImg[0].parent){
                this.arrImg[0].parent.removeChild(this.arrImg[0]);
            }
            this.backPoolCoinImg(this.arrImg[0]);
            this.arrImg.splice(0,1);
        }
    }
}
