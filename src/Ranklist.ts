/**
 *
 * @author 
 *
 */
class Ranklist extends eui.Component {
    private touxiangUrl: string;
    private nicenam: string;
    private cheng: string;
    private paiming: number;
    public constructor(touxiangUrl: string, nicenam: string, cheng: string, paiming: number) {
        super();
        this.touxiangUrl = touxiangUrl;
        this.nicenam = nicenam;
        this.cheng = cheng;
        this.paiming = paiming;
        this.skinName = "RanklistSkin";
    }
    public childrenCreated() {
        //  Effects.CenterSize(this);
        this.createGameScene();
    }
    public nicheng: eui.Label;
    public paim: eui.Label;
    public touxiang: eui.Image;
    public chengji: eui.Label;
    public createGameScene() {
        this.nicheng.text = this.nicenam;
        this.paim.text = this.paiming + "";
        this.chengji.text = this.cheng;
        RES.getResByUrl(this.touxiangUrl, function (texture: egret.Texture) {
            var photoBox1 = new egret.Bitmap();
            photoBox1.width = 98; photoBox1.height = 98;
            photoBox1.x = 63; photoBox1.y = 11;
            photoBox1.texture = texture;
            this.addChild(photoBox1);
            Tool.createCircleMask(photoBox1);
        }, this, RES.ResourceItem.TYPE_IMAGE);
    }
}



