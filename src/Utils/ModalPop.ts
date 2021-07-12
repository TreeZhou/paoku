//模态弹窗
// 调用方式
// this.addChild(new ModalPop("提示","阿斯达所")); 此调用方法会自动消失
// this.addChild(new ModalPop("提示","阿斯达所",()=>{},false));
// this.addChild(new ModalPop("提示","阿斯达所",()=>{},true));
class ModalPop extends CBaseClass{
    /**
     *@param title 提示的标题
     *@param content 提示的内容
     *@param success 接口调用成功的回调函数 默认为null
     *@param showCancel 是否显示取消按钮，默认为 true
     *@param cancelText 取消按钮的文字，默认为"取消"
     *@param cancelColor 取消按钮的文字颜色，默认为"#000000"
     *@param confirmText 确定按钮的文字，默认为"确定"
     *@param confirmColor 确定按钮的文字颜色，默认为"#FFFFFF"
     */
	 public constructor(title:string,content:string,success:any=null,showCancel:boolean=false,cancelText:string="取消",cancelColor:number=0x000000,
     confirmText:string="确定",confirmColor:number=0xFFFFFF) {
        super();
        this.skinName = "ModalSkin";  
        this.title = title;
        this.content = content;
        this.success = success;
        this.showCancel = showCancel;
        this.cancelText = cancelText;
        this.cancelColor = cancelColor;
        this.confirmText = confirmText;
        this.confirmColor = confirmColor;
    }
    private title:string;
    private content:string;
    private success:any;
    private showCancel:boolean;
    private cancelText:string;
    private cancelColor:number;
    private confirmText:string;
    private confirmColor:number;

    public tipsText:eui.Label;
    public contentText:eui.Label;
    public no:eui.Button;
    public yes:eui.Button;
    public bigyes:eui.Button;
    public bg:eui.Rect;
    public bg2:eui.Rect;
    public childrenCreated(){
         this.createGameScene();
    }
    public createGameScene(){
        this.no.name = "cancel";
        this.yes.name = "confirm";
        this.bigyes.name = "confirm";
        if(this.success==null){
            this.no.visible = false;
            this.yes.visible = false;
            this.bigyes.visible = false;
            this.bg.visible = false;
            this.bg2.visible = true;
            var count = setTimeout(()=>{
                egret.Tween.get(this).to({alpha:0},100).call(()=>{
                    Tool.removeFromParent(this);
                    egret.Tween.removeTweens(this);
                    clearTimeout(count);
                },this);
            },2000,this);
        }
        if(this.showCancel){
            this.bigyes.visible = false;
        }
        this.tipsText.text = this.title;
        this.contentText.text = this.content;

        this.no['labelDisplay'].text = this.cancelText;
        this.no['labelDisplay']['textColor'] = this.cancelColor;

        this.yes['labelDisplay'].text = this.confirmText;
        this.yes['labelDisplay']['textColor'] = this.confirmColor;
        this.bigyes['labelDisplay'].text = this.confirmText;
        this.bigyes['labelDisplay']['textColor'] = this.confirmColor;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
            if(e.target.name=="cancel"||e.target.name=="confirm"){
                this.success.call(this.parent,e.target.name);
                egret.Tween.get(this).to({alpha:0},100).call(()=>{
                    Tool.removeFromParent(this);
                    egret.Tween.removeTweens(this);
                },this);
            }
        },this);
	}
}

