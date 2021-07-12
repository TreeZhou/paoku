/**
 * 自定义位图影片剪辑
 * var mc:BitmapMovie = new BitmapMovie();
 *  mc.initByTile("dragon", "jpg",18);
 *  this.addChild(mc);
 *  mc.play();
 */
class BitmapMovie extends eui.Image{
        /**纹理列表 */
        private textureList:Array<egret.Texture> = [];
        /**总帧数 */
        public totalFrame:number;
        /**当前播放帧数 第一帧从1开始 */
        public curFrame:number = 0;
        /**计时器 */
        private timer:egret.Timer;
        /**播放延迟 */
        private _delay:number = 100;
        /**循环次数 */
        private loop:number = 0;
 
        public constructor() {
                super();
        }
        /**
         * 使用零散的序列图初始化
         * @imgName 图片名称  命名格式: "boom0_png","boom1_png",...
         * @imgType 图片后缀 "png"或者"jpg"
         * @pieceNum 有多少张
         */
        public initByTile(imgName:string, imgType:string, pieceNum:number){
                this.textureList.length = 0;
                for(var i=0;i<pieceNum;i++){
                        this.textureList.push(RES.getRes(imgName + i + "_" + imgType));
                }
                
                if(this.textureList.length > 0){
                        this.texture = this.textureList[0];
                        this.curFrame = 0;
                        this.totalFrame = this.textureList.length;
                }
        }
 
        /**
         * 播放
         * @loop 循环次数
         */
        public play(loop:number = -1){
                this.loop = loop;
                this.startTimer();
        }
 
        /**
         * 停止播放
         */
        public stop(){
                this.stopTimer();
        }
 
        /**
         * 跳转播放
         * @frame 播放的起始帧
         * @loop 循环次数
         */
        public gotoAndPlay(frame:number, loop:number = 0){
                if(frame <= this.totalFrame){
                        this.loop = loop;
                        this.curFrame = frame;
                        this.texture = this.textureList[frame-1];
                        this.startTimer();
                }else{
                        console.error("BitmapMovie >> frame超出范围");
                }
        }
         
        /**
         * 跳转停止
         * @frame 停止的帧
         */
        public gotoAndStop(frame:number){
                if(frame <= this.totalFrame){
                        this.stopTimer();
                        this.curFrame = frame;
                        this.texture = this.textureList[frame-1];
                }else{
                        console.error("BitmapMovie >> frame超出范围");
                }
        }
 
        //启动计时器
        private startTimer(){
                this.timer || (this.timer = new egret.Timer(this.delay));
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
                this.timer.reset();
                this.timer.start();
        }
 
        //计时处理
        private onTimerHandler(){
                this.curFrame ++;
                if(this.loop==-1){
                         if(this.curFrame <= this.totalFrame){
                                this.texture = this.textureList[this.curFrame-1];
                         }
                         else{
                        this.dispatchEvent(new egret.Event(egret.Event.LOOP_COMPLETE));
                                  this.curFrame = 1;
                                  this.texture = this.textureList[this.curFrame-1];
                                }
                        return;
                }
                if(this.curFrame <= this.totalFrame){
                        this.texture = this.textureList[this.curFrame-1];
                }else{
                        this.loop --;
                        this.dispatchEvent(new egret.Event(egret.Event.LOOP_COMPLETE));
                        if(this.loop > 0){
                                this.curFrame = 1;
                                this.texture = this.textureList[this.curFrame-1];
                        }else{
                                this.stopTimer();
                                this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
                        }
                }
        }
 
        //停止计时
        private stopTimer(){
                if(this.timer){
                        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
                        this.timer.stop();
                }
        }
 
        //延迟
        public set delay(value:number){
                this._delay = value;
                if(this.timer){
                        this.timer.delay = value;
                }
        }
 
        //延迟
        public get delay(){
                return this._delay;
        }
}