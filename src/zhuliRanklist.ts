/**
 *
 * @author 
 *
 */
class zhuliRanklist extends eui.Component {
    private touxiangUrl: string;
    private nicenam: string;
    public constructor(touxiangUrl: string, nicenam: string) {
        super();
        this.touxiangUrl = touxiangUrl;
        this.nicenam = nicenam;
        this.skinName = "zhuliRanklistSkin";
    }
    public childrenCreated() {
        //  Effects.CenterSize(this);
        this.createGameScene();
    }
    public nicheng: eui.Label;
    public touxiang: eui.Image;

    public createGameScene() {
        this.nicheng.text = this.nicenam;
        RES.getResByUrl(this.touxiangUrl, function (texture: egret.Texture) {
            var photoBox1 = new egret.Bitmap();
            photoBox1.width = 98; photoBox1.height = 98;
            photoBox1.x = 23; photoBox1.y = 13;
            photoBox1.texture = texture;
            this.addChild(photoBox1);
            Tool.createCircleMask(photoBox1);
        }, this, RES.ResourceItem.TYPE_IMAGE);
    }
}



