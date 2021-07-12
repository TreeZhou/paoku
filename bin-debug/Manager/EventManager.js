var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *事件类
 * @author
 *
 */
var EventManager = (function (_super) {
    __extends(EventManager, _super);
    function EventManager() {
        return _super.call(this) || this;
    }
    return EventManager;
}(egret.DisplayObjectContainer));
EventManager.GOTO_INDEX = "GOTO_INDEX";
EventManager.GOTO_RANK = "GOTO_RANK";
EventManager.GOTO_GAME = "GOTO_GAME";
EventManager.GOTO_AA = "GOTO_AA";
EventManager.GOTO_CHANGPIN = "GOTO_CHANGPIN";
EventManager.GOTO_ZHULIRANK = "GOTO_ZHULIRANK";
EventManager.GOTO_INFOS = "GOTO_INFOS";
EventManager.GOTO_OJOIN = "GOTO_OJOIN";
__reflect(EventManager.prototype, "EventManager");
//# sourceMappingURL=EventManager.js.map