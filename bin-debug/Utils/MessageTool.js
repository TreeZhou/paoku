var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *请求工具
 * @author
 *
 */
var MessageTool = (function (_super) {
    __extends(MessageTool, _super);
    function MessageTool() {
        return _super.call(this) || this;
    }
    /**
     * display:控制tips显示
     */
    MessageTool.POST = function (_url, _params, _callback, _that, display) {
        if (display === void 0) { display = true; }
        if (display) {
            var Tipsbg = Tool.createSprite(Main.Stage.stageWidth, Main.Stage.stageHeight, 0xffffff);
            Tipsbg.alpha = 0;
            Tipsbg.name = "Tipsbg";
            Tipsbg.touchEnabled = true;
            _that.addChild(Tipsbg);
            var requesttips = new requestTips();
            requesttips.name = "requesttips";
            requesttips.x = Main.Stage.stageWidth / 2 - requesttips.width / 2;
            requesttips.y = Main.Stage.stageHeight / 2 - requesttips.height / 2;
            _that.addChild(requesttips);
        }
        var params = _params;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        // request.withCredentials = true;
        //将参数拼接到url
        request.open(_url, egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // request.setRequestHeader("SECRET-CONNECTION","ZGRsc2thamtsZHNh");
        request.send(params);
        request.addEventListener(egret.Event.COMPLETE, function (e) {
            if (display) {
                Tool.removeFromParent(_that.getChildByName("Tipsbg"));
                Tool.removeFromParent(_that.getChildByName("requesttips"));
            }
            _callback.call(_that, e);
        }, _that);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, MessageTool.onGetIOError, _that);
    };
    /**
     * display:控制tips显示
     */
    MessageTool.GET = function (_url, _params, _callback, _that, display) {
        if (display === void 0) { display = true; }
        if (display) {
            var Tipsbg = Tool.createSprite(Main.Stage.stageWidth, Main.Stage.stageHeight, 0xffffff);
            Tipsbg.alpha = 0;
            Tipsbg.name = "Tipsbg";
            Tipsbg.touchEnabled = true;
            _that.addChild(Tipsbg);
            var requesttips = new requestTips();
            requesttips.name = "requesttips";
            requesttips.x = Main.Stage.stageWidth / 2 - requesttips.width / 2;
            requesttips.y = Main.Stage.stageHeight / 2 - requesttips.height / 2;
            _that.addChild(requesttips);
        }
        var params = _params;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        // request.withCredentials = true;
        //将参数拼接到url
        request.open(_url + params, egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE, function (e) {
            if (display) {
                Tool.removeFromParent(_that.getChildByName("Tipsbg"));
                Tool.removeFromParent(_that.getChildByName("requesttips"));
            }
            _callback.call(_that, e);
        }, _that);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, MessageTool.onGetIOError, _that);
    };
    MessageTool.onGetIOError = function (event) {
        console.log("get error : " + event);
    };
    return MessageTool;
}(egret.DisplayObjectContainer));
__reflect(MessageTool.prototype, "MessageTool");
//# sourceMappingURL=MessageTool.js.map