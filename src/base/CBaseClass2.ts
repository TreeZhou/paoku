class CBaseClass2 extends egret.DisplayObjectContainer{
    public constructor() {
        super();
        this.touchEnabled = true;
        this.width = 640; this.height = 1036;
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.childrenCreated,this);
    }
    public childrenCreated(){
        this.createGameScene();
    }
    public createGameScene(){
    }
}