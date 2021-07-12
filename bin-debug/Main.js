var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isThemeLoadEnd = false;
        _this.isResourceLoadEnd = false;
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        window['device'] = this.device;
        window['isX'] = this.isX;
        if (window.orientation == 90 || window.orientation == -90) {
            this.device = true;
        }
        else {
            this.device = false;
        }
        window.addEventListener("orientationchange", function () {
            if (window['$'](".egret-player").attr("data-orientation") != "landscape")
                return;
            if (window.orientation == 90 || window.orientation == -90) {
                if (window['isX'] == true) {
                    egret.MainContext.instance.stage.setContentSize(1334, 550);
                }
                else {
                    egret.MainContext.instance.stage.setContentSize(1334, 650);
                }
                ;
            }
            else {
                if (window['isX'] == true) {
                    egret.MainContext.instance.stage.setContentSize(1334, 750);
                }
                else {
                    egret.MainContext.instance.stage.setContentSize(1334, 750);
                }
                ;
            }
        });
        //设置适配
        if (DeviceUtils.IsMobile()) {
            if (window['$'](".egret-player").attr("data-orientation") == "landscape") {
                //为横屏
                if (window['$'](window).height() >= 724 && this.device == false) {
                    egret.MainContext.instance.stage.setContentSize(1334, 750);
                    window['isX'] = true;
                }
                else if (window['$'](window).width() >= 812 && this.device == true) {
                    egret.MainContext.instance.stage.setContentSize(1334, 550);
                    window['isX'] = true;
                }
                else {
                    if (this.device) {
                        egret.MainContext.instance.stage.setContentSize(1334, 650);
                    }
                    else {
                        egret.MainContext.instance.stage.setContentSize(1334, 750);
                    }
                }
            }
            else {
                if (window['$'](window).height() >= 724) {
                }
                else {
                    egret.MainContext.instance.stage.setContentSize(750, 1234);
                }
            }
            egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.EXACT_FIT;
        }
        else {
            egret.MainContext.instance.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        }
        var vc = new RES.VersionController();
        vc.getVirtualUrl = function (url) {
            return url + '?v=' + window['sourceVer'];
        };
        RES.registerVersionController(vc);
        if (window['isAuth'] && window.document.location.host == "game.flyh5.cn") {
            //如果没有openid代表没有授权
            if (sessionStorage['openid'] == null || sessionStorage['openid'] == undefined || sessionStorage['openid'] == '') {
                if (LocationProperty.getPara("shareid") == null) {
                    document.location.href = window['ShareUrl'];
                }
                else {
                    document.location.href = window['ShareUrl'] + "&shareid=" + LocationProperty.getPara("shareid");
                }
                return;
            }
            else {
                Mode.openid = sessionStorage['openid'];
                Mode.imgUrl = sessionStorage["imgURL"];
                Mode.userName = decodeURIComponent(sessionStorage["name"]);
            }
        }
        else {
            Mode.openid = "obIBUwrgSWXrWWofPghkFyE0TQy8";
            Mode.imgUrl = "http://wx.qlogo.cn/mmopen/bUyKsr9Z71LlbFJtOmziaeCiajQeFmr8RhicUicibFD17lz1TUW5iahClT9yYjRIIZ3Jm94kfLB97RNcdfcUy84hTrB4Tnc60CHj8X/0#";
            Mode.userName = "cxw";
        }
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    };
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    };
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the
     */
    Main.prototype.onThemeLoadComplete = function () {
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
        //     TouchStyleEffects.touchStyleEffects(e);
        // }, this);
        RES.loadGroup("loading");
        this.isThemeLoadEnd = true;
        this.createScene();
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        var _this = this;
        if (event.groupName == "loading") {
            window.document.getElementById("load").style.display = "none";
            //设置加载进度界面
            //Config to load process interface
            //设置加载进度界面
            this.loadingView = new LoadingUI();
            this.stage.addChild(this.loadingView);
            RES.loadGroup("preload");
        }
        if (event.groupName == "preload") {
            egret.Tween.get(this.loadingView).to({ alpha: 0 }, 1000, egret.Ease.quadInOut).call(function () {
                _this.stage.removeChild(_this.loadingView);
            }, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    Main.prototype.createScene = function () {
        if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
            this.createGameScene();
        }
    };
    Main.prototype.createGameScene = function () {
        Main.Stage = egret.MainContext.instance.stage;
        //设置最多触摸个数
        Main.Stage.maxTouches = 1;
        Main.eventManager = new EventManager();
        // Ewm.getInstance().init('./resource/assets/ewm.jpg','20','30','70');
        this.addChild(PageManager.getInstance());
        this.addChild(PopUpManager.getInstance());
        this.addChild(Bgmusic.getInstance());
        // 
        Mode.apikey = sessionStorage['apikey'];
        Mode.is_info = sessionStorage['is_info'];
        Mode.shareid = sessionStorage['shareid'];
        Mode.imgUrl = sessionStorage['headimgurl'];
        if (new Date().getTime() < window['Timer']) {
            if (Mode.shareid == 0) {
                Main.eventManager.dispatchEventWith(EventManager.GOTO_INDEX);
            }
            else {
                Main.eventManager.dispatchEventWith(EventManager.GOTO_OJOIN);
            }
        }
        else {
            alert("已经下线啦!");
        }
        // new MessageTool.POST("http://game.flyh5.cn/game/xu_admin/nov_xunfei/apireceive.php","id=2",(e)=>{
        //     console.log(e);
        // },this);
        // window['$'].ajax({
        //     type: "POST",
        //     timeout: 10000, 
        //     headers: {
        //         "SECRET-CONNECTION":"ZGRsc2thamtsZHNh"
        //     },
        //     url: 'http://game.flyh5.cn/game/xu_admin/nov_xunfei/apireceive.php',
        //     data: "data=123",
        //     success: function(data) {
        //         console.log(data);
        //     }
        // });
    };
    return Main;
}(eui.UILayer));
/**
 * 创建游戏场景
 * Create a game scene
 */
Main.eventManager = new EventManager();
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map