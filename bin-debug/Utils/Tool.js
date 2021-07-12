var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author  cxw
 *
 */
var Tool = (function () {
    function Tool() {
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Tool.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    Tool.createBitmapBySheet = function (ruleImgs, name) {
        var result = new egret.Bitmap();
        var texture = ruleImgs.getTexture(name);
        result.texture = texture;
        return result;
    };
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
    Tool.createButton = function (self, name, x, y, width, height, clickFunc, anchorX, anchorY) {
        if (anchorX === void 0) { anchorX = 0; }
        if (anchorY === void 0) { anchorY = 0; }
        var result = new egret.Sprite();
        var clickF = function () {
            result.removeEventListener(egret.TouchEvent.TOUCH_TAP, clickF, self);
            egret.Tween.get(result).to({ scaleX: 1.1, scaleY: 1.1 }, 400, egret.Ease.backOut).to({ scaleX: 1, scaleY: 1 }, 400, egret.Ease.backOut).call(function () {
                result.addEventListener(egret.TouchEvent.TOUCH_TAP, clickF, self);
            }, self);
            clickFunc(self);
        };
        result.addChild(Tool.createBitmapByName(name));
        result.x = x;
        result.y = y;
        result.width = width;
        result.height = height;
        result.touchEnabled = true;
        result.anchorOffsetX = anchorX;
        result.anchorOffsetY = anchorY;
        result.addEventListener(egret.TouchEvent.TOUCH_TAP, clickF, self);
        return result;
    };
    //原生图片显示于白鹭对象。(含二维码)
    Tool.displayLikeObject = function (cloneObj, cloneWho, src) {
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
        }
        else {
            style.width = height * scaleHeight + "px";
            style.height = width * scaleWidth + "px";
            style.left = y * scaleHeight + "px";
            style.top = (stage.stageWidth - x - width) * scaleWidth + "px";
        }
    };
    /**
      * 创建纯Sprite
      */
    Tool.createSprite = function (_width, _height, color) {
        if (color === void 0) { color = null; }
        var result = new egret.Sprite();
        if (color == null) {
            result.graphics.beginFill(0x000000, 0);
        }
        else {
            result.graphics.beginFill(color, 1);
        }
        result.graphics.drawRect(0, 0, _width, _height);
        result.graphics.endFill();
        return result;
    };
    Tool.createTextFiled = function (x, y, width, height, str, size, color, bold) {
        if (str === void 0) { str = ""; }
        if (size === void 0) { size = 35; }
        if (color === void 0) { color = 0x000000; }
        if (bold === void 0) { bold = false; }
        var result = new egret.TextField();
        result.fontFamily = "Microsoft YaHei, Helvetica, sans-serif";
        result.x = x;
        result.y = y;
        result.width = width;
        result.height = height;
        result.text = str;
        result.size = size;
        result.textColor = color;
        result.bold = bold;
        return result;
    };
    Tool.setInputTextFiled = function (obj, defaultStr) {
        obj.type = "input";
        obj.addEventListener(egret.FocusEvent.FOCUS_IN, function () {
            obj.text = "";
            obj.textColor = 0x000000;
        }, this);
        obj.addEventListener(egret.FocusEvent.FOCUS_OUT, function () {
            if (obj.text == "") {
                obj.text = defaultStr;
                obj.textColor = 0xaaaaaa;
            }
        }, this);
    };
    /**
     * 清除容器中所有东西
     * @param sp
     */
    Tool.removeALL = function (sp) {
        while (sp.numChildren > 0) {
            sp.removeChildAt(0);
        }
    };
    Tool.center = function (obj, is) {
        if (is === void 0) { is = false; }
        if (obj.anchorOffsetX != obj.width >> 1) {
            obj.anchorOffsetX = obj.width >> 1;
            obj.anchorOffsetY = obj.height >> 1;
            if (is) {
                return;
            }
            obj.x += obj.anchorOffsetX;
            obj.y += obj.anchorOffsetY;
        }
    };
    //缓动
    Tool.setPointDown = function (obj, move, wait, movetime, self, callback) {
        if (callback === void 0) { callback = null; }
        obj.alpha = 0;
        var temp = obj.y;
        obj.y = obj.y - move;
        egret.Tween.get(obj).wait(wait).to({ y: temp, alpha: 1 }, movetime, egret.Ease.quadInOut).call(function () {
            if (callback == null) {
                return;
            }
            callback.call(self);
        }, this);
    };
    Tool.setPointLeft = function (obj, move, wait, movetime, self, callback) {
        if (callback === void 0) { callback = null; }
        obj.alpha = 0;
        var temp = obj.x;
        obj.x = obj.x - move;
        egret.Tween.get(obj).wait(wait).to({ x: temp, alpha: 1 }, movetime, egret.Ease.quadInOut).call(function () {
            if (callback == null) {
                return;
            }
            callback.call(self);
        }, this);
    };
    Tool.setScale = function (obj, rotation, wait, movetime, self, callback) {
        if (callback === void 0) { callback = null; }
        obj.alpha = 0;
        obj.scaleX = obj.scaleY = 2;
        obj.rotation = rotation;
        egret.Tween.get(obj).wait(wait).to({ scaleX: 1, scaleY: 1, rotation: 0, alpha: 1 }, 500, egret.Ease.circOut).call(function () {
            if (callback == null) {
                return;
            }
            callback.call(self);
        }, this);
    };
    Tool.removeObj = function (obj) {
        if (!obj) {
            return;
        }
        obj.alpha = 0;
        obj.scaleX = obj.scaleY = 1;
        egret.Tween.removeTweens(obj);
    };
    /**
    * 获取对应的bitmaptext
    */
    Tool.getBitmapText = function (bfont) {
        var font = RES.getRes(bfont);
        var btxt = new egret.BitmapText;
        btxt.font = font;
        return btxt;
    };
    Tool.createMovieClip = function (mcName, Name) {
        if (Name === void 0) { Name = ""; }
        var resJs = RES.getRes(mcName + "_json");
        var resPng = RES.getRes(mcName + "_png");
        var mcFactory = new egret.MovieClipDataFactory(resJs, resPng);
        if (Name) {
            var movieclipData = mcFactory.generateMovieClipData(Name);
        }
        else {
            var movieclipData = mcFactory.generateMovieClipData(mcName);
        }
        var mc = new egret.MovieClip(movieclipData);
        return mc;
    };
    /**
    * 给字体添加描边
    * @param lable      文字
    * @param color      表示文本的描边颜色
    * @param width      描边宽度。
    */
    Tool.addLableStrokeColor = function (lable, color, width) {
        lable.strokeColor = color;
        lable.stroke = width;
    };
    /**
     * 从父级移除child
     * @param child
     */
    Tool.removeFromParent = function (child) {
        if (child.parent == null)
            return;
        child.parent.removeChild(child);
    };
    /**
     * 锁屏
     */
    Tool.lock = function () {
        egret.MainContext.instance.stage.touchEnabled = egret.MainContext.instance.stage.touchChildren = false;
    };
    /**
     * 解屏
     */
    Tool.unlock = function () {
        egret.MainContext.instance.stage.touchEnabled = egret.MainContext.instance.stage.touchChildren = true;
    };
    /**
    * 文字打字机效果
    * obj           文本对象
    * content       文字
    * interval      打字间隔 毫秒
    */
    Tool.typerEffect = function (obj, content, interval) {
        if (content === void 0) { content = ""; }
        if (interval === void 0) { interval = 200; }
        var strArr = content.split("");
        var len = strArr.length;
        for (var i = 0; i < len; i++) {
            egret.setTimeout(function () {
                obj.appendText(strArr[Number(this)]);
            }, i, interval * i);
        }
    };
    Tool.share = function (_title, _conent, _url, _img) {
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
    };
    //可以改变ios微信端title
    Tool.setTitle = function (t) {
        document.title = t;
        var i = document.createElement('iframe');
        i.src = '//m.baidu.com/favicon.ico';
        i.style.display = 'none';
        i.onload = function () {
            setTimeout(function () {
                i.remove();
            }, 9);
        };
        document.body.appendChild(i);
    };
    //阻止容器出界 
    Tool.checkImage = function (obj) {
        if (obj.x < egret.MainContext.instance.stage.stageWidth - obj.width) {
            obj.x = egret.MainContext.instance.stage.stageWidth - obj.width;
        }
        else if (obj.x > 0) {
            obj.x = 0;
        }
        if (obj.y < egret.MainContext.instance.stage.stageHeight - obj.height) {
            obj.y = egret.MainContext.instance.stage.stageHeight - obj.height;
        }
        else if (obj.y > 0) {
            obj.y = 0;
        }
    };
    /**按钮点击弹一下再执行代码
     *使用方法:Tool.ButtonBound(e.target,function(){console.log("执行");},this);
    */
    Tool.ButtonBound = function (btn, callback, self) {
        btn.touchEnabled = false;
        Tool.center(btn);
        egret.Tween.get(btn).to({ "scaleX": 1.1, "scaleY": 1.1 }, 100)
            .to({ "scaleX": 1, "scaleY": 1 }, 200, egret.Ease.bounceOut).call(function () {
            btn.touchEnabled = true;
            callback.call(self, [btn]);
        }, self);
    };
    /*根据容器等比缩放 */
    Tool.scale = function (parent, child) {
        var bi = child.texture.textureWidth / child.texture.textureHeight;
        if (child.texture.textureWidth > child.texture.textureHeight) {
            if (child.texture.textureWidth > parent.width) {
                child.width = parent.width;
                child.height = parent.width / bi;
            }
            else {
                child.width = child.texture.textureWidth;
                child.height = child.texture.textureHeight;
            }
            if (child.height > parent.height) {
                child.height = parent.height;
                child.width = bi * child.height;
            }
        }
        else {
            if (child.texture.textureHeight > parent.height) {
                child.height = parent.height;
                child.width = bi * child.height;
            }
            else {
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
    };
    /*只管填充满容器*/
    Tool.scale2 = function (parent, child) {
        var bi = child.texture.textureWidth / child.texture.textureHeight;
        if (child.texture.textureWidth > child.texture.textureHeight) {
            child.height = parent.height;
            child.width = bi * child.height;
        }
        else {
            child.width = parent.width;
            child.height = child.width / bi;
        }
        Tool.center(child);
        child.x = parent.width / 2;
        child.y = parent.height / 2;
    };
    /**
     * @param base64 字符串
     */
    Tool.getTexture = function (base64, callback, that) {
        var img = document.createElement("img");
        var texture = new egret.Texture();
        img.src = base64;
        img.onload = function () {
            var bitmapdata = new egret.BitmapData(img);
            texture.bitmapData = bitmapdata;
            callback.call(that, texture);
        };
    };
    /**
     * @param frame 根据帧频返回偏移量
     */
    Tool.frameRate = function (frame) {
        return (frame / egret.MainContext.instance.stage.frameRate);
    };
    /**
     * 文本数字逐渐到设置的值
     * text:文本框 start:开始值 end:结束值 time:持续时间
     */
    Tool.easeTextField = function (text, start, end, time) {
        var obj = { value: start };
        egret.Tween.get(obj, {
            loop: false, onChange: function () {
                text.text = String(Math.floor(obj.value));
            }, onChangeObj: this
        }).to({ value: end }, time, egret.Ease.quadInOut).call(function () {
            egret.Tween.removeTweens(text);
        }, this);
    };
    //发光滤镜
    Tool.setFilter = function (img) {
        //颜色矩阵数组增加亮度
        var colorMatrix = [
            1, 0, 0, 0, 100,
            0, 1, 0, 0, 100,
            0, 0, 1, 0, 100,
            0, 0, 0, 1, 0
        ];
        var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
        img.filters = [colorFlilter];
    };
    Tool.playAnimation = function (target, isLoop) {
        if (isLoop) {
            for (var key in target.items) {
                target.items[key].props = { loop: true };
            }
        }
        target.play();
    };
    //获得对象长度
    Tool.getPropertyCount = function (o) {
        var n, count = 0;
        for (n in o) {
            if (o.hasOwnProperty(n)) {
                count++;
            }
        }
        return count;
    };
    //一口气创建圆形遮罩
    Tool.createCircleMask = function (sp) {
        var p = new egret.Sprite;
        var w = sp.width >> 1;
        p.graphics.beginFill(0x000000, 1);
        p.graphics.drawCircle(w, w, w);
        p.graphics.endFill();
        sp.parent.addChild(p);
        p.x = sp.x;
        p.y = sp.y;
        sp.mask = p;
    };
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
    Tool.pickPhoto = function (maxWidth, callBack, self) {
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
                var img = document.createElement("img");
                img.src = rst.base64;
                img.onload = function () {
                    callBack.call(self, img);
                };
            });
        }, false);
        fileInput.click();
    };
    /**
     * 复制到系统剪切板方法 兼容性有待考究
     */
    Tool.copy = function (message) {
        var input = document.createElement("input");
        input.value = message;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, input.value.length),
            document.execCommand('Copy');
        document.body.removeChild(input);
        egret.log("复制成功");
    };
    return Tool;
}());
__reflect(Tool.prototype, "Tool");
//# sourceMappingURL=Tool.js.map