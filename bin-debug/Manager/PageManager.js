var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *主页面管理器
 * @author
 *
 */
var PageManager = (function (_super) {
    __extends(PageManager, _super);
    function PageManager() {
        var _this = _super.call(this) || this;
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.createGameScene, _this);
        return _this;
    }
    PageManager.getInstance = function () {
        if (!PageManager._instance) {
            PageManager._instance = new PageManager();
        }
        return PageManager._instance;
    };
    PageManager.prototype.createGameScene = function () {
        Main.eventManager.addEventListener(EventManager.GOTO_INDEX, this.swichPage, this);
        Main.eventManager.addEventListener(EventManager.GOTO_GAME, this.swichPage, this);
        Main.eventManager.addEventListener(EventManager.GOTO_CHANGPIN, this.swichPage, this);
        Main.eventManager.addEventListener(EventManager.GOTO_RANK, this.swichPage, this);
        Main.eventManager.addEventListener(EventManager.GOTO_ZHULIRANK, this.swichPage, this);
        Main.eventManager.addEventListener(EventManager.GOTO_INFOS, this.swichPage, this);
        Main.eventManager.addEventListener(EventManager.GOTO_OJOIN, this.swichPage, this);
    };
    PageManager.prototype.swichPage = function (event) {
        if (this.nowView) {
            this.removeChild(this.nowView);
        }
        switch (event.type) {
            case EventManager.GOTO_INDEX:
                this.index = new Index();
                this.addChild(this.index);
                this.nowView = this.index;
                break;
            case EventManager.GOTO_GAME:
                this.game = new Game();
                this.addChild(this.game);
                this.nowView = this.game;
                break;
            case EventManager.GOTO_CHANGPIN:
                this.changpin = new changpin();
                this.addChild(this.changpin);
                this.nowView = this.changpin;
                break;
            case EventManager.GOTO_RANK:
                this.Rank = new Rank();
                this.addChild(this.Rank);
                this.nowView = this.Rank;
                break;
            case EventManager.GOTO_ZHULIRANK:
                this.zhuliRank = new zhuliRank();
                this.addChild(this.zhuliRank);
                this.nowView = this.zhuliRank;
                break;
            case EventManager.GOTO_INFOS:
                this.Infos = new Infos();
                this.addChild(this.Infos);
                this.nowView = this.Infos;
                break;
            case EventManager.GOTO_OJOIN:
                this.Ojoin = new Ojoin();
                this.addChild(this.Ojoin);
                this.nowView = this.Ojoin;
                break;
            default:
                break;
        }
    };
    return PageManager;
}(SingleBaseClass));
__reflect(PageManager.prototype, "PageManager");
//# sourceMappingURL=PageManager.js.map