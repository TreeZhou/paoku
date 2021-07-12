var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 检测工具
 */
var DeviceUtils = (function () {
    /**
     * 构造函数
     */
    function DeviceUtils() {
    }
    /**
     * 当前是否Html5版本
     * @returns {boolean}
     * @constructor
     */
    DeviceUtils.IsHtml5 = function () {
        return egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
    };
    /**
     * 当前是否是Native版本
     * @returns {boolean}
     * @constructor
     */
    DeviceUtils.IsNative = function () {
        return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
    };
    /**
     * 是否是在手机上
     * @returns {boolean}
     * @constructor
     */
    DeviceUtils.IsMobile = function () {
        return egret.Capabilities.isMobile;
    };
    /**
     * 是否是在PC上
     * @returns {boolean}
     * @constructor
     */
    DeviceUtils.IsPC = function () {
        return !egret.Capabilities.isMobile;
    };
    /**
     * 是否是QQ浏览器
     * @returns {boolean}
     * @constructor
     */
    DeviceUtils.IsQQBrowser = function () {
        return DeviceUtils.IsHtml5 && navigator.userAgent.indexOf('MQQBrowser') != -1;
    };
    /**
     * 是否是IE浏览器
     * @returns {boolean}
     * @constructor
     */
    DeviceUtils.IsIEBrowser = function () {
        return DeviceUtils.IsHtml5 && navigator.userAgent.indexOf("MSIE") != -1;
    };
    /**
     * 是否是Firefox浏览器
     * @returns {boolean}
     * @constructor
     */
    DeviceUtils.IsFirefoxBrowser = function () {
        return DeviceUtils.IsHtml5 && navigator.userAgent.indexOf("Firefox") != -1;
    };
    /**
     * 是否是Chrome浏览器
     * @returns {boolean}
     * @constructor
     */
    DeviceUtils.IsChromeBrowser = function () {
        return DeviceUtils.IsHtml5 && navigator.userAgent.indexOf("Chrome") != -1;
    };
    /**
     * 是否是Safari浏览器
     * @returns {boolean}
     * @constructor
     */
    DeviceUtils.IsSafariBrowser = function () {
        return DeviceUtils.IsHtml5 && navigator.userAgent.indexOf("Safari") != -1;
    };
    /**
     * 是否是Opera浏览器
     * @returns {boolean}
     * @constructor
     */
    DeviceUtils.IsOperaBrowser = function () {
        return DeviceUtils.IsHtml5 && navigator.userAgent.indexOf("Opera") != -1;
    };
    /**
    * 是否是微信
    * @returns {boolean}
    * @constructor
    */
    DeviceUtils.IsWeiXin = function () {
        var ua = window.navigator.userAgent.toLowerCase();
        if (String(ua.match(/MicroMessenger/i)) == 'micromessenger') {
            return true;
        }
        else {
            return false;
        }
    };
    /**
    * 是否是安卓
    * @returns {boolean}
    * @constructor
    */
    DeviceUtils.IsAndroid = function () {
        return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
    };
    /**
    * 是否是苹果
    * @returns {boolean}
    * @constructor
    */
    DeviceUtils.Isios = function () {
        return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    };
    return DeviceUtils;
}());
__reflect(DeviceUtils.prototype, "DeviceUtils");
//# sourceMappingURL=DeviceUtils.js.map