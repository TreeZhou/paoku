/**
 * 检测工具
 */
class DeviceUtils {
    /**
     * 构造函数
     */
    public constructor() {
    }

    /**
     * 当前是否Html5版本
     * @returns {boolean}
     * @constructor
     */
    public static IsHtml5():boolean {
        return egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
    }

    /**
     * 当前是否是Native版本
     * @returns {boolean}
     * @constructor
     */
    public static IsNative():boolean {
        return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
    }

    /**
     * 是否是在手机上
     * @returns {boolean}
     * @constructor
     */
    public static IsMobile():boolean {
        return egret.Capabilities.isMobile;
    }

    /**
     * 是否是在PC上
     * @returns {boolean}
     * @constructor
     */
    public static IsPC():boolean {
        return !egret.Capabilities.isMobile;
    }

    /**
     * 是否是QQ浏览器
     * @returns {boolean}
     * @constructor
     */
    public static IsQQBrowser():boolean {
        return DeviceUtils.IsHtml5 && navigator.userAgent.indexOf('MQQBrowser') != -1;
    }

    /**
     * 是否是IE浏览器
     * @returns {boolean}
     * @constructor
     */
    public static IsIEBrowser():boolean {
        return DeviceUtils.IsHtml5 && navigator.userAgent.indexOf("MSIE") != -1;
    }

    /**
     * 是否是Firefox浏览器
     * @returns {boolean}
     * @constructor
     */
    public static IsFirefoxBrowser():boolean {
        return DeviceUtils.IsHtml5 && navigator.userAgent.indexOf("Firefox") != -1;
    }

    /**
     * 是否是Chrome浏览器
     * @returns {boolean}
     * @constructor
     */
    public static IsChromeBrowser():boolean {
        return DeviceUtils.IsHtml5 && navigator.userAgent.indexOf("Chrome") != -1;
    }

    /**
     * 是否是Safari浏览器
     * @returns {boolean}
     * @constructor
     */
    public static IsSafariBrowser():boolean {
        return DeviceUtils.IsHtml5 && navigator.userAgent.indexOf("Safari") != -1;
    }

    /**
     * 是否是Opera浏览器
     * @returns {boolean}
     * @constructor
     */
    public static IsOperaBrowser():boolean {
        return DeviceUtils.IsHtml5 && navigator.userAgent.indexOf("Opera") != -1;
    }
     /**
     * 是否是微信
     * @returns {boolean}
     * @constructor
     */
    public static IsWeiXin():boolean{ 
    var ua:string = window.navigator.userAgent.toLowerCase(); 
        if(String(ua.match(/MicroMessenger/i)) == 'micromessenger'){ 
            return true; 
        }
        else{ 
            return false; 
        } 
    }
     /**
     * 是否是安卓
     * @returns {boolean}
     * @constructor
     */
    public static IsAndroid():boolean{ 
        return navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
    }
     /**
     * 是否是苹果
     * @returns {boolean}
     * @constructor
     */
    public static Isios():boolean{ 
        return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    }
}