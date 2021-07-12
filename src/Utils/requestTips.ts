//请求提示
class requestTips extends egret.DisplayObjectContainer{
    constructor(){
        super();
        this.create();
    }
    private mc: egret.MovieClip;
    private tf: egret.TextField;
    private progressTf: egret.TextField;
    private create(){
        var sp: egret.Sprite = new egret.Sprite;
        sp.graphics.beginFill(0x000000);
        sp.graphics.drawRoundRect(0, 0, 150, 150, 50, 50);
        sp.graphics.endFill();
        sp.alpha = 0.7;
        this.addChild(sp);

        this.mc = Tool.createMovieClip('quan');
        Tool.center(this.mc);
        this.mc.x = 75;
        this.mc.y = 50;
        this.mc.play(-1);
        this.addChild(this.mc);

        this.tf = Tool.createTextFiled(0, 90, 150, 25,"通信中...", 20, 0xffffff);
        this.tf.textAlign = 'center';
        this.addChild(this.tf);
    }
}