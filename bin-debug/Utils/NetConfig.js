var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 */
var NetConfig = (function () {
    function NetConfig() {
    }
    return NetConfig;
}());
NetConfig.Url = window['Url'] + "/api.php";
NetConfig.token = "游戏开始";
__reflect(NetConfig.prototype, "NetConfig");
//# sourceMappingURL=NetConfig.js.map