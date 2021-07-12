/**
 *背景音乐通用类
 * @author 
 *
 */
class Bgmusic extends egret.Sprite {
    private static instance: Bgmusic;
    public constructor() {
        super();
        this.createGameScene();
    }
    private musicS:egret.Bitmap;
    private musicP:egret.Bitmap;
    
    private positionX:number = egret.MainContext.instance.stage.stageWidth;
    private positionY:number = 0;
    private createGameScene(): void {
        this.musicS = this.createBitmapByName("musicStop_png");
        this.musicS.touchEnabled = true;
        this.musicS.anchorOffsetX = this.musicS.width/2;
        this.musicS.anchorOffsetY = this.musicS.height/2;
        this.musicS.x = this.positionX - this.musicS.width;
        this.musicS.y = this.positionY + this.musicS.height;
        this.musicS.visible = false;
        this.addChild(this.musicS);
        
        this.musicP = this.createBitmapByName("musicPlay_png");
        this.musicP.touchEnabled = true;
        this.musicP.anchorOffsetX = this.musicP.width/2;
        this.musicP.anchorOffsetY = this.musicS.height/2;
        this.musicP.x = this.positionX - this.musicP.width;
        this.musicP.y = this.positionY + this.musicP.height;
        this.musicP.visible = false;
        this.addChild(this.musicP);
        
        this.musicS.visible = true;
        this.manageState(window['audioStatus']);
        this.addEventListener(egret.Event.ENTER_FRAME,this.enter,this);
    }
    private enter(){
        if(window['audioStatus'] == "playing"){
            this.manageState(window['audioStatus']);
            this.removeEventListener(egret.Event.ENTER_FRAME,this.enter,this);
        }
//        else{
//            this.manageState(window['audioStatus']);
//            this.removeEventListener(egret.Event.ENTER_FRAME,this.enter,this);
//        }
    }
    private manageState(state:string){
        this.musicS.visible = false;
        if(state == "playing") {
            this.musicP.visible = true;
            this.musicP.rotation = 0;
            egret.Tween.get(this.musicP,{ loop: true }).to({ rotation: 360 },4000);
        } else {
            this.musicS.visible = true;
        }
        this.musicS.touchEnabled = true;
        this.musicP.touchEnabled = true;
        this.musicP.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickMusicBtn,this);
        this.musicS.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickMusicBtn,this);
    }
    private onClickMusicBtn(event: egret.TouchEvent): void {
            if(window['audioStatus'] == "playing") {
                window['audioStatus'] = "pause"
                var music = document.getElementById('bgmusic');
                music['pause']();
                this.musicS.visible = true;
                this.setChildIndex(this.musicS,999);
                this.musicP.visible = false;
                egret.Tween.removeTweens(this.musicP);
                this.musicP.rotation = 0;
                } 
            else{
                window['audioStatus'] = "playing";
                var music = document.getElementById('bgmusic');
                music['play']();
                this.musicS.visible = false;
                this.musicP.visible = true;
                this.setChildIndex(this.musicP,999);
                this.musicP.rotation = 0;
                egret.Tween.get(this.musicP,{ loop: true }).to({ rotation: 360 },4000);
            }
    }
    public static getInstance(): Bgmusic {
        if(!this.instance) {
            this.instance = new Bgmusic();
        }
        return this.instance;
    }
    public startPlay(){
        var music = document.getElementById('bgmusic');
        music['play']();
        this.musicS.visible = false;
        this.musicP.visible = true;
        this.setChildIndex(this.musicP,999);
        this.musicP.rotation = 0;
        egret.Tween.get(this.musicP,{ loop: true }).to({ rotation: 360 },4000);
    }

    public stopPlay(){
        var music = document.getElementById('bgmusic');
        music['pause']();
        this.musicS.visible = true;
        this.setChildIndex(this.musicS,999);
        this.musicP.visible = false;
        egret.Tween.removeTweens(this.musicP);
        this.musicP.rotation = 0;
    }
    public  createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}
