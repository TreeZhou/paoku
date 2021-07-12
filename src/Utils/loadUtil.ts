class loadUtil extends egret.DisplayObjectContainer {
    private _content: string;
    private _isDisplay: boolean;
    private _callback: Function;
    private _self: any;
    private _group: string;
    /**
     * @param  {string} content 显示内容
     * @param  {string} group   加载组名
     * @param  {Function} callback 回调方法
     * @param  {any} self 引用
     * @param  {boolean=false} isdisplay 是否显示加载进度
     */
    constructor(content: string, group: string, callback: Function, self: any, isdisplay: boolean = false) {
        super();
        this._content = content;
        this._isDisplay = isdisplay;
        this._callback = callback;
        this._self = self;
        this._group = group;
        this.width = 150; this.height = 150;
        Tool.center(this);
        this.x = egret.MainContext.instance.stage.stageWidth / 2;
        this.y = egret.MainContext.instance.stage.stageHeight / 2;
        this.CreateView();

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.complete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, (event: RES.ResourceEvent) => {
            this.setProgress(event.itemsLoaded, event.itemsTotal);
        }, this);
        RES.loadGroup(this._group);
    }
    private mc: egret.MovieClip;
    private tf: egret.TextField;
    private progressTf: egret.TextField;
    private complete() {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.complete, this);
        Tool.removeFromParent(this);
        this._callback.call(this._self);
    }
    public setProgress(current, total): void {
        if (!this.progressTf) {
            return;
        }
        this.progressTf.text = Math.floor(current / total * 100) + '%';
    }
    private CreateView() {
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

        this.tf = Tool.createTextFiled(0, 90, 150, 25, this._content, 20, 0xffffff);
        this.tf.textAlign = 'center';
        this.addChild(this.tf);

        if (this._isDisplay) {
            this.progressTf = Tool.createTextFiled(0, 120, 150, 25, '0%', 20, 0xffffff);
            this.progressTf.textAlign = 'center';
            this.addChild(this.progressTf);
        }
    }
}