/**
 * socket链接类
 * @author 
 *
 */
class WebSocketTool {
    //链接
    // public static webSocket:egret.WebSocket;
    
    //链接成功方法
    public static onsocketoptenfuc:Function;
    
    //链接断开方法
    public static onsocketClosefuc:Function;
    
    //接收到数据方法
    public static onmsgfuc:Function;
    
    //目标类
    public static targetsp:egret.Sprite;
    
    public static e:egret.Event;
    
    
	public constructor() {
    	
	}
	
	public static init()
	{
        // WebSocketTool.webSocket = new egret.WebSocket();
        // WebSocketTool.webSocket.type = egret.WebSocket.TYPE_STRING;
        // WebSocketTool.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA,WebSocketTool.onReceiveMessage,this);
        // WebSocketTool.webSocket.addEventListener(egret.Event.CONNECT,WebSocketTool.onSocketOpen,this);
        // WebSocketTool.webSocket.addEventListener(egret.Event.CLOSE,WebSocketTool.onSocketClose,this);

        //测试环境
        //WebSocketTool.webSocket.connect("192.168.0.181:8080/yiqigame/gameservice/HIS5GC8F94XKD",null);
        //正式环境
        //WebSocketTool.webSocket.connect("192.168.0.181:8080/yiqigame/gameservice/HIS5GC8F94XKD",null);
	}
	
    private static onSocketOpen(e: egret.Event): void {
        WebSocketTool.e = e;
        WebSocketTool.onsocketoptenfuc.call(WebSocketTool.targetsp);
        
    }
    private static onSocketClose(e: egret.Event): void {
//        egret.log("连接关闭");
        WebSocketTool.e = e;
        WebSocketTool.onsocketClosefuc.call(WebSocketTool.targetsp);
    }
    private static onReceiveMessage(e: egret.Event): void {
//        egret.log("接受到数据");
        WebSocketTool.e = e;
        WebSocketTool.onmsgfuc.call(WebSocketTool.targetsp);
    }
    
}
