var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 二维码类
 * @author cxw
 * 20161111版更新内容:
 * 1.相对之前版本对不同机型二维码定位位置更加准确了
 * 2.不用在main.html中加入style样式
 * 用法:Ewm.getInstance().init('./resource/assets/ewm.jpg','20','50','50');
 */
var Ewm = (function (_super) {
    __extends(Ewm, _super);
    function Ewm() {
        return _super.call(this) || this;
    }
    /**
     * @param  {string=""} url 图片地址
     * @param  {string='100'} width 宽度
     * @param  {string='50'} top 距离上方
     * @param  {string='50'} left 距离左边
     */
    Ewm.prototype.init = function (url, width, top, left) {
        if (url === void 0) { url = ""; }
        if (width === void 0) { width = '100'; }
        if (top === void 0) { top = '50'; }
        if (left === void 0) { left = '50'; }
        if (document.getElementById('ewm')) {
            console.warn('二维码类不能初始化两次!自动跳转到show方法');
            Ewm.getInstance().show();
            return;
        }
        var css = document.createElement('style');
        css.innerHTML = '@-webkit-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes fadeOut{0%{opacity:1}100%{opacity:0}}.Inewm{-webkit-animation-name:fadeIn;-webkit-animation-duration:2s;-webkit-animation-iteration-count:1;-webkit-animation-delay:0s}.Outewm{-webkit-animation-name:fadeOut;-webkit-animation-duration:1s;-webkit-animation-iteration-count:1;-webkit-animation-delay:0s}';
        document.getElementsByTagName('head')[0].appendChild(css);
        // var box = document.createElement('div');
        // box.id = 'box';
        // box.style.position = 'absolute';
        // box.style.zIndex = '999';
        // box.style.pointerEvents = 'none';
        // window.document.getElementsByTagName("body")[0].appendChild(box);
        // var tempbox = document.getElementById('box');
        // var tempcanvas = document.getElementsByTagName('canvas')[0];
        // tempbox.style.width = tempcanvas.style.width;
        // tempbox.style.height = tempcanvas.style.height;
        // tempbox.style.left = tempcanvas.style.left;
        // tempbox.style.top = tempcanvas.style.top;
        var el = document.createElement('img');
        el.id = "ewm";
        el.className = "Inewm";
        el.src = url;
        el.style.position = 'absolute';
        if (DeviceUtils.IsWeiXin()) {
            width = String(Number(width) - 2);
        }
        el.style.width = width + '%';
        el.style.top = top + '%';
        el.style.left = left + '%';
        el.style.marginLeft = -(Number(width) / 2) + '%';
        window.document.getElementsByTagName("body")[0].appendChild(el);
    };
    Ewm.prototype.show = function () {
        var ewm = window.document.getElementById('ewm');
        ewm.className = "Inewm";
        ewm.style.display = "block";
        ewm.addEventListener("webkitAnimationEnd", function () {
            ewm.style.display = "block";
        });
    };
    Ewm.prototype.hide = function () {
        var ewm = window.document.getElementById('ewm');
        ewm.className = "Outewm";
        ewm.addEventListener("webkitAnimationEnd", function () {
            ewm.style.display = "none";
        });
    };
    return Ewm;
}(SingleBaseClass));
__reflect(Ewm.prototype, "Ewm");
//# sourceMappingURL=Ewm.js.map