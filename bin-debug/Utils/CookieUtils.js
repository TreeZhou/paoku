var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by JL on 2016/3/4.
 *
 * (单例对象)测试Cookie用法:
 * CookieSimple.instance.writeCookie("Te=st","3月19日$>=100活动",2);
 
 * var testtValue:string = CookieSimple.instance.readCookie("Testt");
 * var testValue:string = CookieSimple.instance.readCookie("Test");
 * var te_stValue:string = CookieSimple.instance.readCookie("Te=st");
 * console.log("testtValue:",testtValue,"|  testValue:",testValue,"|    Te=st:",te_stValue);
 
 */
var CookieUtils = (function () {
    function CookieUtils(s) {
    }
    Object.defineProperty(CookieUtils, "instance", {
        get: function () {
            if (!this._instance) {
                this._instance = new CookieUtils(new CookieSimpleSingleFlag());
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *  写Cookie
     * @param name 名称
     * @param value 值
     * @param expiredays 单位是天数，默认有效期30天
     */
    CookieUtils.prototype.writeCookie = function (name, value, expiredays) {
        if (expiredays === void 0) { expiredays = 30; }
        setCookie(name, value, expiredays);
    };
    /**
     * 读Cookie
     * @param name
     */
    CookieUtils.prototype.readCookie = function (name) {
        return getCookie(name);
    };
    /**
     * 删Cookie
     * @param name
     */
    CookieUtils.prototype.delCookie = function (name) {
        delCookie(name);
    };
    return CookieUtils;
}());
__reflect(CookieUtils.prototype, "CookieUtils");
var CookieSimpleSingleFlag = (function () {
    function CookieSimpleSingleFlag() {
    }
    return CookieSimpleSingleFlag;
}());
__reflect(CookieSimpleSingleFlag.prototype, "CookieSimpleSingleFlag");
//# sourceMappingURL=CookieUtils.js.map