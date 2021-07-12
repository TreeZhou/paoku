class Drag extends egret.Sprite {
    private dragObject:egret.DisplayObject;
    private offsetX:number = 0;
    private offsetY:number = 0;
 
    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
 
    private onAddToStage(event:egret.Event) {
 
    }
 
    /*
     * 开始拖拽
     * @param _dragObject 拖拽对象
     * @param offsetX     X轴偏移
     * @param offsetY     Y轴偏移
     * */
    public start(_dragObject:egret.DisplayObject) {
        this.dragObject = _dragObject;
        this.dragObject.touchEnabled = true;
        this.dragObject.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.dragObject.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEend, this);
    }
 
    private onTouchEend(e:egret.TouchEvent) {
        this.dragObject.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    }
 
    private onTouchBegin(e:egret.TouchEvent) {
       this.offsetX = e.localX;
       this.offsetY = e.localY;
        this.dragObject.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    }
 
      private onTouchMove(e:egret.TouchEvent) {
        if (this.dragObject) {
            this.dragObject.x = e.stageX - this.offsetX;
            this.dragObject.y = e.stageY  - this.offsetY;
        }
        else {
            this.stop();
        }
    }
 
    public stop() {
        this.dragObject.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.dragObject.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEend, this);
        this.dragObject.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
    }
}