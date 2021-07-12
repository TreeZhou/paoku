/**
 *
 * @author  cxw
 *
 */
class Tool {
    public constructor() {
    }
	/**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    public static createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    public static createBitmapBySheet(ruleImgs: egret.SpriteSheet, name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = ruleImgs.getTexture(name);
        result.texture = texture;
        return result;
    }

    /**
     * 创建按钮方法
     * @param name 资源文件名字 
     * @param x X位置
     * @param y Y位置
     * @param width 宽度
     * @param height 高度
     * @param clickFunc 传入方法
     * @param anchorX 中心点 默认为0
     * @param anchorY 中心点 默认为0
     */
    public static createButton(self: any, name: string, x: number, y: number, width: number, height: number, clickFunc: Function, anchorX: number = 0, anchorY: number = 0): egret.Sprite {
        var result: egret.Sprite = new egret.Sprite();
        var clickF = function () {
            result.removeEventListener(egret.TouchEvent.TOUCH_TAP, clickF, self);
            egret.Tween.get(result).to({ scaleX: 1.1, scaleY: 1.1 }, 400, egret.Ease.backOut).to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.backOut).call(function () {
                result.addEventListener(egret.TouchEvent.TOUCH_TAP, clickF, self);
            }, self);
            clickFunc(self);
        }
        result.addChild(Tool.createBitmapByName(name));
        result.x = x; result.y = y; result.width = width; result.height = height;
        result.touchEnabled = true; result.anchorOffsetX = anchorX; result.anchorOffsetY = anchorY;
        result.addEventListener(egret.TouchEvent.TOUCH_TAP, clickF, self);
        return result;
    }
    //原生图片显示于白鹭对象。(含二维码)
    public static displayLikeObject(cloneObj: any, cloneWho: egret.DisplayObject, src?: string): void {
        if (cloneWho.width == 0 || cloneWho.height == 0) {
            console.warn("The width or height of the cloneWho:(" + cloneWho.hashCode + ") can not be 0");
            return;
        }
        if (src) {
            cloneObj["src"] = src;
        }
        var body = document.body;
        var stage = egret.MainContext.instance.stage;
        var scaleWidth = body.clientWidth / stage.stageWidth;
        var scaleHeight = body.clientHeight / stage.stageHeight;
        var x = cloneWho.x;
        var y = cloneWho.y;
        var width = cloneWho.width;
        var height = cloneWho.height;
        var style = cloneObj.style;
        if (body.clientWidth < body.clientHeight) {
            style.width = width * scaleWidth + "px";
            style.height = height * scaleHeight + "px";
            style.left = x * scaleWidth + "px";
            style.top = y * scaleHeight + "px";
        } else {
            style.width = height * scaleHeight + "px";
            style.height = width * scaleWidth + "px";
            style.left = y * scaleHeight + "px";
            style.top = (stage.stageWidth - x - width) * scaleWidth + "px";
        }
    }
    /**
      * 创建纯Sprite
      */
    public static createSprite(_width: number, _height: number, color: number = null): egret.Sprite {
        var result: egret.Sprite = new egret.Sprite();
        if (color == null) {
            result.graphics.beginFill(0x000000, 0);
        }
        else {
            result.graphics.beginFill(color, 1);
        }
        result.graphics.drawRect(0, 0, _width, _height);
        result.graphics.endFill();
        return result;
    }

    public static createTextFiled(x: number, y: number, width: number, height: number, str: string = "", size: number = 35, color: number = 0x000000, bold: boolean = false): egret.TextField {
        var result: egret.TextField = new egret.TextField();
        result.fontFamily = "Microsoft YaHei, Helvetica, sans-serif";
        result.x = x; result.y = y; result.width = width; result.height = height;
        result.text = str; result.size = size; result.textColor = color; result.bold = bold;
        return result;
    }
    public static setInputTextFiled(obj: egret.TextField, defaultStr: string) {
        obj.type = "input";
        obj.addEventListener(egret.FocusEvent.FOCUS_IN, () => {
            obj.text = "";
            obj.textColor = 0x000000;
        }, this);
        obj.addEventListener(egret.FocusEvent.FOCUS_OUT, () => {
            if (obj.text == "") {
                obj.text = defaultStr;
                obj.textColor = 0xaaaaaa;
            }
        }, this);
    }
    /**
     * 清除容器中所有东西
     * @param sp
     */
    public static removeALL(sp: any): void {
        while (sp.numChildren > 0) {
            sp.removeChildAt(0);
        }
    }
    public static center(obj: egret.DisplayObject, is: Boolean = false): void {
        if (obj.anchorOffsetX != obj.width >> 1) {
            obj.anchorOffsetX = obj.width >> 1;
            obj.anchorOffsetY = obj.height >> 1;
            if (is) {
                return;
            }
            obj.x += obj.anchorOffsetX;
            obj.y += obj.anchorOffsetY;
        }
    }
    //缓动
    public static setPointDown(obj: any, move: number, wait: number, movetime: number, self: any, callback: any = null) {
        obj.alpha = 0;
        var temp = obj.y;
        obj.y = obj.y - move;
        egret.Tween.get(obj).wait(wait).to({ y: temp, alpha: 1 }, movetime, egret.Ease.quadInOut).call(() => {
            if (callback == null) {
                return;
            }
            callback.call(self);
        }, this);
    }
    public static setPointLeft(obj: any, move: number, wait: number, movetime: number, self: any, callback: any = null) {
        obj.alpha = 0;
        var temp = obj.x;
        obj.x = obj.x - move;
        egret.Tween.get(obj).wait(wait).to({ x: temp, alpha: 1 }, movetime, egret.Ease.quadInOut).call(() => {
            if (callback == null) {
                return;
            }
            callback.call(self);
        }, this);
    }
    public static setScale(obj: eui.Image, rotation: number, wait: number, movetime: number, self: any, callback: any = null) {
        obj.alpha = 0;
        obj.scaleX = obj.scaleY = 2;
        obj.rotation = rotation;
        egret.Tween.get(obj).wait(wait).to({ scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 }, 500, egret.Ease.circOut).call(() => {
            if (callback == null) {
                return;
            }
            callback.call(self);
        }, this);
    }
    public static removeObj(obj: any) {
        if (!obj) {
            return;
        }
        obj.alpha = 0;
        obj.scaleX = obj.scaleY = 1;
        egret.Tween.removeTweens(obj);
    }
    /**
    * 获取对应的bitmaptext
    */
    public static getBitmapText(bfont: string): egret.BitmapText {
        var font = RES.getRes(bfont);
        var btxt = new egret.BitmapText;
        btxt.font = font;
        return btxt;
    }
    public static createMovieClip(mcName: string, Name: string = ""): egret.MovieClip {
        var resJs = RES.getRes(mcName + "_json");
        var resPng = RES.getRes(mcName + "_png");
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(resJs, resPng);
        if (Name) {
            var movieclipData = mcFactory.generateMovieClipData(Name);
        } else {
            var movieclipData = mcFactory.generateMovieClipData(mcName);
        }

        var mc: egret.MovieClip = new egret.MovieClip(movieclipData);
        return mc;
    }
    /**
    * 给字体添加描边
    * @param lable      文字
    * @param color      表示文本的描边颜色
    * @param width      描边宽度。
    */
    public static addLableStrokeColor(lable: egret.TextField, color: any, width: any): void {
        lable.strokeColor = color;
        lable.stroke = width;
    }
    /**
     * 从父级移除child
     * @param child
     */
    public static removeFromParent(child: egret.DisplayObject) {
        if (child.parent == null)
            return;
        child.parent.removeChild(child);
    }
    /**
     * 锁屏
     */
    public static lock(): void {
        egret.MainContext.instance.stage.touchEnabled = egret.MainContext.instance.stage.touchChildren = false;
    }

    /**
     * 解屏
     */
    public static unlock(): void {
        egret.MainContext.instance.stage.touchEnabled = egret.MainContext.instance.stage.touchChildren = true;
    }
    /**
    * 文字打字机效果
    * obj           文本对象
    * content       文字
    * interval      打字间隔 毫秒
    */
    public static typerEffect(obj, content: string = "", interval: number = 200): void {
        var strArr: Array<any> = content.split("");
        var len: number = strArr.length;
        for (var i = 0; i < len; i++) {
            egret.setTimeout(function () {
                obj.appendText(strArr[Number(this)]);
            }, i, interval * i);
        }
    }
    public static share(_title: string, _conent: string, _url: string, _img: string) {
        var shareData = {
            title: _title,
            desc: _conent,
            link: _url,
            imgUrl: _img,
            success: function (res) {
                var context = egret.MainContext.instance;
                context.stage.dispatchEventWith("yifenxiang", false);
            }
        };
        var shareData2 = {
            title: _conent,
            desc: _conent,
            link: _url,
            imgUrl: _img,
            success: function (res) {
                var context = egret.MainContext.instance;
                context.stage.dispatchEventWith("yifenxiang", false);
            }
        };
        window['wx']['onMenuShareAppMessage'](shareData);
        window['wx']['onMenuShareTimeline'](shareData2);
    }
    //可以改变ios微信端title
    public static setTitle(t) {
        document.title = t;
        var i = document.createElement('iframe');
        i.src = '//m.baidu.com/favicon.ico';
        i.style.display = 'none';
        i.onload = function () {
            setTimeout(function () {
                i.remove();
            }, 9)
        }
        document.body.appendChild(i);
    }
    //阻止容器出界 
    public static checkImage(obj: egret.DisplayObjectContainer): void {
        if (obj.x < egret.MainContext.instance.stage.stageWidth - obj.width) {
            obj.x = egret.MainContext.instance.stage.stageWidth - obj.width;
        } else if (obj.x > 0) {
            obj.x = 0;
        }
        if (obj.y < egret.MainContext.instance.stage.stageHeight - obj.height) {
            obj.y = egret.MainContext.instance.stage.stageHeight - obj.height;
        } else if (obj.y > 0) {
            obj.y = 0;
        }
    }
    /**按钮点击弹一下再执行代码 
     *使用方法:Tool.ButtonBound(e.target,function(){console.log("执行");},this); 
    */
    public static ButtonBound(btn: egret.DisplayObjectContainer, callback: Function, self: any) {
        btn.touchEnabled = false;
        Tool.center(btn);
        egret.Tween.get(btn).to({ "scaleX": 1.1, "scaleY": 1.1 }, 100)
            .to({ "scaleX": 1, "scaleY": 1 }, 200, egret.Ease.bounceOut).call(() => {
                btn.touchEnabled = true;
                callback.call(self, [btn]);
            }, self);
    }
    /*根据容器等比缩放 */
    public static scale(parent: egret.DisplayObjectContainer, child: egret.Bitmap) {
        var bi = child.texture.textureWidth / child.texture.textureHeight;
        if (child.texture.textureWidth > child.texture.textureHeight) {
            if (child.texture.textureWidth > parent.width) {
                child.width = parent.width;
                child.height = parent.width / bi;
            } else {
                child.width = child.texture.textureWidth;
                child.height = child.texture.textureHeight;
            }
            if (child.height > parent.height) {
                child.height = parent.height;
                child.width = bi * child.height;
            }
        } else {
            if (child.texture.textureHeight > parent.height) {
                child.height = parent.height;
                child.width = bi * child.height;
            } else {
                child.width = child.texture.textureWidth;
                child.height = child.texture.textureHeight;
            }
            if (child.width > parent.width) {
                child.width = parent.width;
                child.height = child.width / bi;
            }
        }
        Tool.center(child);
        child.x = parent.width / 2;
        child.y = parent.height / 2;
    }
    /*只管填充满容器*/
    public static scale2(parent: egret.DisplayObjectContainer, child: egret.Bitmap) {
        var bi = child.texture.textureWidth / child.texture.textureHeight;
        if (child.texture.textureWidth > child.texture.textureHeight) {
            child.height = parent.height;
            child.width = bi * child.height;
        } else {
            child.width = parent.width;
            child.height = child.width / bi;
        }
        Tool.center(child);
        child.x = parent.width / 2;
        child.y = parent.height / 2;
    }
    /**
     * @param base64 字符串 
     */
    public static getTexture(base64: string, callback: any, that: any) {
        let img = document.createElement("img");
        var texture: egret.Texture = new egret.Texture();
        img.src = base64;
        img.onload = () => {
            let bitmapdata: egret.BitmapData = new egret.BitmapData(img);
            texture.bitmapData = bitmapdata;
            callback.call(that, texture);
        }
    }
    /**
     * @param frame 根据帧频返回偏移量
     */
    public static frameRate(frame: number): number {
        return (frame / egret.MainContext.instance.stage.frameRate);
    }
    /**
     * 文本数字逐渐到设置的值
     * text:文本框 start:开始值 end:结束值 time:持续时间
     */
    public static easeTextField(text: any, start: number, end: number, time: number) {
        var obj = { value: start };
        egret.Tween.get(obj, {
            loop: false, onChange: () => {
                text.text = String(Math.floor(obj.value));
            }, onChangeObj: this
        }).to({ value: end }, time, egret.Ease.quadInOut).call(() => {
            egret.Tween.removeTweens(text);
        }, this);
    }
    //发光滤镜
    public static setFilter(img: egret.Bitmap) {
        //颜色矩阵数组增加亮度
        var colorMatrix = [
            1, 0, 0, 0, 100,
            0, 1, 0, 0, 100,
            0, 0, 1, 0, 100,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        img.filters = [colorFlilter];
    }
    public static playAnimation(target: egret.tween.TweenGroup, isLoop: boolean): void {
        if (isLoop) {
            for (var key in target.items) {
                target.items[key].props = { loop: true };
            }
        }
        target.play();
    }
    //获得对象长度
    public static getPropertyCount(o) {
        var n, count = 0;
        for (n in o) {
            if (o.hasOwnProperty(n)) {
                count++;
            }
        }
        return count;
    }
    //一口气创建圆形遮罩
    public static createCircleMask(sp: egret.DisplayObject) {
        var p: egret.Sprite = new egret.Sprite;
        var w: number = sp.width >> 1;
        p.graphics.beginFill(0x000000, 1);
        p.graphics.drawCircle(w, w, w);
        p.graphics.endFill();
        sp.parent.addChild(p);
        p.x = sp.x; p.y = sp.y;
        sp.mask = p;
    }
    //选择图片插件 可压缩调节图片大小
    /**
     * Tool.pickPhoto(640, (img) => {
        var texture: egret.Texture = new egret.Texture();
        let bitmapdata: egret.BitmapData = new egret.BitmapData(img);
        texture.bitmapData = bitmapdata;
        let imgReview:egret.Bitmap = new egret.Bitmap;
        imgReview.texture = texture;
        this.addChild(imgReview);
        }, this);
     */
    public static pickPhoto(maxWidth: number, callBack: Function, self: any) {
        var fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.style.display = "none";
        document.body.insertBefore(fileInput, document.body.firstChild);
        fileInput.addEventListener("change", function (evt) {
            var mime = { "png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg", "bmp": "image/bmp" };
            var file = evt.target['files'][0];
            window['lrz'](file, {
                width: maxWidth
            })
                .then(function (rst) {
                    let img = document.createElement("img");
                    img.src = rst.base64;
                    img.onload = () => {
                        callBack.call(self, img);
                    }
                });
        }, false);
        fileInput.click();
    }
    /**
     * 复制到系统剪切板方法 兼容性有待考究
     */
    public static copy(message) {
        var input = document.createElement("input");
        input.value = message;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, input.value.length),
            document.execCommand('Copy');
        document.body.removeChild(input);
        egret.log("复制成功");
    }
}