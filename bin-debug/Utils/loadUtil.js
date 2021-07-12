var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var loadUtil = (function (_super) {
    __extends(loadUtil, _super);
    /**
     * @param  {string} content 显示内容
     * @param  {string} group   加载组名
     * @param  {Function} callback 回调方法
     * @param  {any} self 引用
     * @param  {boolean=false} isdisplay 是否显示加载进度
     */
    function loadUtil(content, group, callback, self, isdisplay) {
        if (isdisplay === void 0) { isdisplay = false; }
        var _this = _super.call(this) || this;
        _this._content = content;
        _this._isDisplay = isdisplay;
        _this._callback = callback;
        _this._self = self;
        _this._group = group;
        _this.width = 150;
        _this.height = 150;
        Tool.center(_this);
        _this.x = egret.MainContext.instance.stage.stageWidth / 2;
        _this.y = egret.MainContext.instance.stage.stageHeight / 2;
        _this.CreateView();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, _this.complete, _this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, function (event) {
            _this.setProgress(event.itemsLoaded, event.itemsTotal);
        }, _this);
        RES.loadGroup(_this._group);
        return _this;
    }
    loadUtil.prototype.complete = function () {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.complete, this);
        Tool.removeFromParent(this);
        this._callback.call(this._self);
    };
    loadUtil.prototype.setProgress = function (current, total) {
        if (!this.progressTf) {
            return;
        }
        this.progressTf.text = Math.floor(current / total * 100) + '%';
    };
    loadUtil.prototype.CreateView = function () {
        var sp = new egret.Sprite;
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
    };
    return loadUtil;
}(egret.DisplayObjectContainer));
__reflect(loadUtil.prototype, "loadUtil");
//# sourceMappingURL=loadUtil.js.map