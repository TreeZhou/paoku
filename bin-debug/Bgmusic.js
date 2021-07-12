var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *背景音乐通用类
 * @author
 *
 */
var Bgmusic = (function (_super) {
    __extends(Bgmusic, _super);
    function Bgmusic() {
        var _this = _super.call(this) || this;
        _this.positionX = egret.MainContext.instance.stage.stageWidth;
        _this.positionY = 0;
        _this.createGameScene();
        return _this;
    }
    Bgmusic.prototype.createGameScene = function () {
        this.musicS = this.createBitmapByName("musicStop_png");
        this.musicS.touchEnabled = true;
        this.musicS.anchorOffsetX = this.musicS.width / 2;
        this.musicS.anchorOffsetY = this.musicS.height / 2;
        this.musicS.x = this.positionX - this.musicS.width;
        this.musicS.y = this.positionY + this.musicS.height;
        this.musicS.visible = false;
        this.addChild(this.musicS);
        this.musicP = this.createBitmapByName("musicPlay_png");
        this.musicP.touchEnabled = true;
        this.musicP.anchorOffsetX = this.musicP.width / 2;
        this.musicP.anchorOffsetY = this.musicS.height / 2;
        this.musicP.x = this.positionX - this.musicP.width;
        this.musicP.y = this.positionY + this.musicP.height;
        this.musicP.visible = false;
        this.addChild(this.musicP);
        this.musicS.visible = true;
        this.manageState(window['audioStatus']);
        this.addEventListener(egret.Event.ENTER_FRAME, this.enter, this);
    };
    Bgmusic.prototype.enter = function () {
        if (window['audioStatus'] == "playing") {
            this.manageState(window['audioStatus']);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.enter, this);
        }
        //        else{
        //            this.manageState(window['audioStatus']);
        //            this.removeEventListener(egret.Event.ENTER_FRAME,this.enter,this);
        //        }
    };
    Bgmusic.prototype.manageState = function (state) {
        this.musicS.visible = false;
        if (state == "playing") {
            this.musicP.visible = true;
            this.musicP.rotation = 0;
            egret.Tween.get(this.musicP, { loop: true }).to({ rotation: 360 }, 4000);
        }
        else {
            this.musicS.visible = true;
        }
        this.musicS.touchEnabled = true;
        this.musicP.touchEnabled = true;
        this.musicP.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickMusicBtn, this);
        this.musicS.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickMusicBtn, this);
    };
    Bgmusic.prototype.onClickMusicBtn = function (event) {
        if (window['audioStatus'] == "playing") {
            window['audioStatus'] = "pause";
            var music = document.getElementById('bgmusic');
            music['pause']();
            this.musicS.visible = true;
            this.setChildIndex(this.musicS, 999);
            this.musicP.visible = false;
            egret.Tween.removeTweens(this.musicP);
            this.musicP.rotation = 0;
        }
        else {
            window['audioStatus'] = "playing";
            var music = document.getElementById('bgmusic');
            music['play']();
            this.musicS.visible = false;
            this.musicP.visible = true;
            this.setChildIndex(this.musicP, 999);
            this.musicP.rotation = 0;
            egret.Tween.get(this.musicP, { loop: true }).to({ rotation: 360 }, 4000);
        }
    };
    Bgmusic.getInstance = function () {
        if (!this.instance) {
            this.instance = new Bgmusic();
        }
        return this.instance;
    };
    Bgmusic.prototype.startPlay = function () {
        var music = document.getElementById('bgmusic');
        music['play']();
        this.musicS.visible = false;
        this.musicP.visible = true;
        this.setChildIndex(this.musicP, 999);
        this.musicP.rotation = 0;
        egret.Tween.get(this.musicP, { loop: true }).to({ rotation: 360 }, 4000);
    };
    Bgmusic.prototype.stopPlay = function () {
        var music = document.getElementById('bgmusic');
        music['pause']();
        this.musicS.visible = true;
        this.setChildIndex(this.musicS, 999);
        this.musicP.visible = false;
        egret.Tween.removeTweens(this.musicP);
        this.musicP.rotation = 0;
    };
    Bgmusic.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return Bgmusic;
}(egret.Sprite));
__reflect(Bgmusic.prototype, "Bgmusic");
//# sourceMappingURL=Bgmusic.js.map