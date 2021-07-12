class LoadingUI extends CBaseClass {
    public constructor() {
        super();
        this.skinName = "loadingSkin";
    }
    public loadz: eui.Image;
    public maskload: eui.Image;
    public tex: eui.Label;
    public childrenCreated() {
        //  Effects.CenterSize(this);
        this.createGameScene();
    }
    private createGameScene(): void {
        this.loadz.mask = this.maskload;

    }
    public a;
    public setProgress(current, total): void {
        if (this.maskload) {
            this.loadz.x = -411 + Math.floor((current / total) * this.loadz.width);
        }
        this.a = Math.floor((current / total) * 100);
        this.tex.text = this.a + '%';
        // if (this.load_icon) {
        //     this.load_icon.x = Math.floor((current / total) * 448) + 120;
        // }
    }
    // public setMask(_bar: egret.Bitmap, _barMask: egret.Bitmap, top: number) {
    //     _bar.x = egret.MainContext.instance.stage.stageWidth / 2 - _bar.width / 2;
    //     _bar.y = top;
    //     _barMask.x = _bar.x - _bar.width;
    //     _barMask.y = top;
    //     this.pyValue = _barMask.x;
    //     _bar.mask = _barMask;
    // }
}