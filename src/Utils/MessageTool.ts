/**
 *请求工具
 * @author 
 *
 */
class MessageTool extends egret.DisplayObjectContainer {
    public constructor() {
        super();
    }
    /**
     * display:控制tips显示
     */
    public static POST(_url: string,_params: string,_callback:Function,_that: any,display:boolean=true){
        if(display){
            var Tipsbg:egret.Sprite = Tool.createSprite(Main.Stage.stageWidth,Main.Stage.stageHeight,0xffffff);
            Tipsbg.alpha = 0;Tipsbg.name = "Tipsbg";Tipsbg.touchEnabled = true;
            _that.addChild(Tipsbg);
            var requesttips:requestTips = new requestTips();
            requesttips.name="requesttips";
            requesttips.x = Main.Stage.stageWidth/2 - requesttips.width/2;requesttips.y = Main.Stage.stageHeight/2 - requesttips.height/2;
            _that.addChild(requesttips);
        }

        var params = _params;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        // request.withCredentials = true;
        //将参数拼接到url
        request.open(_url,egret.HttpMethod.POST);
         request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // request.setRequestHeader("SECRET-CONNECTION","ZGRsc2thamtsZHNh");
        request.send(params);
        request.addEventListener(egret.Event.COMPLETE,(e)=>{
            if(display){
            Tool.removeFromParent(_that.getChildByName("Tipsbg"));
            Tool.removeFromParent(_that.getChildByName("requesttips"));
            }
            _callback.call(_that,e);
        },_that);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,MessageTool.onGetIOError,_that);
    }
    /**
     * display:控制tips显示
     */
    public static GET(_url: string,_params: string,_callback:Function,_that: any,display:boolean=true){
        if(display){
            var Tipsbg:egret.Sprite = Tool.createSprite(Main.Stage.stageWidth,Main.Stage.stageHeight,0xffffff);
            Tipsbg.alpha = 0;Tipsbg.name = "Tipsbg";Tipsbg.touchEnabled = true;
            _that.addChild(Tipsbg);
            var requesttips:requestTips = new requestTips();
            requesttips.name="requesttips";
            requesttips.x = Main.Stage.stageWidth/2 - requesttips.width/2;requesttips.y = Main.Stage.stageHeight/2 - requesttips.height/2;
            _that.addChild(requesttips);
        }

        var params = _params;
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        // request.withCredentials = true;
        //将参数拼接到url
        request.open(_url + params,egret.HttpMethod.GET);
        request.send();
        request.addEventListener(egret.Event.COMPLETE,(e)=>{
            if(display){
            Tool.removeFromParent(_that.getChildByName("Tipsbg"));
            Tool.removeFromParent(_that.getChildByName("requesttips"));
            }
            _callback.call(_that,e);
        },_that);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,MessageTool.onGetIOError,_that);
    }
    private static onGetIOError(event:egret.IOErrorEvent):void {
        console.log("get error : " + event);
    }
}