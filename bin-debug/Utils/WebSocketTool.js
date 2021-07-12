var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * socket链接类
 * @author
 *
 */
var WebSocketTool = (function () {
    function WebSocketTool() {
    }
    WebSocketTool.init = function () {
        // WebSocketTool.webSocket = new egret.WebSocket();
        // WebSocketTool.webSocket.type = egret.WebSocket.TYPE_STRING;
        // WebSocketTool.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA,WebSocketTool.onReceiveMessage,this);
        // WebSocketTool.webSocket.addEventListener(egret.Event.CONNECT,WebSocketTool.onSocketOpen,this);
        // WebSocketTool.webSocket.addEventListener(egret.Event.CLOSE,WebSocketTool.onSocketClose,this);
        //测试环境
        //WebSocketTool.webSocket.connect("192.168.0.181:8080/yiqigame/gameservice/HIS5GC8F94XKD",null);
        //正式环境
        //WebSocketTool.webSocket.connect("192.168.0.181:8080/yiqigame/gameservice/HIS5GC8F94XKD",null);
    };
    WebSocketTool.onSocketOpen = function (e) {
        WebSocketTool.e = e;
        WebSocketTool.onsocketoptenfuc.call(WebSocketTool.targetsp);
    };
    WebSocketTool.onSocketClose = function (e) {
        //        egret.log("连接关闭");
        WebSocketTool.e = e;
        WebSocketTool.onsocketClosefuc.call(WebSocketTool.targetsp);
    };
    WebSocketTool.onReceiveMessage = function (e) {
        //        egret.log("接受到数据");
        WebSocketTool.e = e;
        WebSocketTool.onmsgfuc.call(WebSocketTool.targetsp);
    };
    return WebSocketTool;
}());
__reflect(WebSocketTool.prototype, "WebSocketTool");
//# sourceMappingURL=WebSocketTool.js.map