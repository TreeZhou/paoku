/**
 *排行榜
 * @author 
 *
 */
class Rank extends CBaseClass {
    public constructor() {
        super();
        this.skinName = "RankSkin";
    }
    public childrenCreated() {
        //  Effects.CenterSize(this);
        this.createGameScene();
    }
    public dier: eui.Image;
    public diyi: eui.Image;
    public disan: eui.Image;
    public angin: eui.Image;
    public duihuan: eui.Image;
    public zhuli: eui.Image;
    public scroller: eui.Scroller;
    public group: eui.Group;
    public slider: eui.VSlider;
    public ername: eui.Label;
    public yiname: eui.Label;
    public sanname: eui.Label;
    public erfen: eui.Label;
    public yifen: eui.Label;
    public sanfen: eui.Label;
    public ewmbtn: eui.Image;
    public shouzhi: eui.Image;

    public createGameScene() {
        egret.Tween.get(this.shouzhi, { loop: true }).to({ y: this.shouzhi.y - 10 }, 800).to({ y: this.shouzhi.y }, 800);
        var singlevalue: number = 120;//一个子元素预备的高度
        this.slider.addEventListener(eui.UIEvent.CHANGE, (evt: eui.UIEvent) => {
            this.group.scrollV = ((this.group.numChildren * singlevalue) - this.scroller.height) - (evt.target.value);
        }, this);

        this.scroller.addEventListener(eui.UIEvent.CHANGE, (evt: eui.UIEvent) => {
            this.slider.value = ((this.group.numChildren * singlevalue) - this.scroller.height) - this.group.scrollV;
        }, this);
        // this.scroller.addEventListener(eui.UIEvent.CHANGE, this.change1, this);
        // this.slider.addEventListener(eui.UIEvent.CHANGE, this.change2, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtap, this);
        if (Mode.isindex) {
            this.angin.source = "g6_btn4_png";
        }
        else {
            this.angin.source = "g6_btn1_png";
        }
        // game_nums  headimgurl  nickname Mode.apikey
        var _data = '&data=' + DecodeStr.setencode("", Mode.apikey);
        MessageTool.GET("http://game.flyh5.cn/game/wx75967690c8ef0c50/mar_lkm/api.php" + "?a=top", _data, (e: egret.Event) => {
            var obj = JSON.parse(e.target.response.trim());
            console.log(obj);
            if (obj['error'] != 100) {
                alert('拉取用户数据失败点击重新获取');
                return;
            }
            if (obj.data.length >= 1) {
                this.yiname.text = obj.data[0].nickname;
                this.yifen.text = obj.data[0].game_nums;
                RES.getResByUrl(obj.data[0].headimgurl, function (texture: egret.Texture) {
                    var photoBox = new egret.Bitmap();
                    photoBox.width = 98; photoBox.height = 98;
                    photoBox.x = 325; photoBox.y = 265;
                    photoBox.texture = texture;
                    this.addChildAt(photoBox, 7);
                    Tool.createCircleMask(photoBox);
                }, this, RES.ResourceItem.TYPE_IMAGE);
            }
            if (obj.data.length >= 2) {
                this.ername.text = obj.data[1].nickname;
                this.erfen.text = obj.data[1].game_nums;
                RES.getResByUrl(obj.data[1].headimgurl, function (texture: egret.Texture) {
                    var photoBox1 = new egret.Bitmap();
                    photoBox1.width = 98; photoBox1.height = 98;
                    photoBox1.x = 163; photoBox1.y = 273;
                    photoBox1.texture = texture;
                    this.addChildAt(photoBox1, 7);
                    Tool.createCircleMask(photoBox1);
                }, this, RES.ResourceItem.TYPE_IMAGE);
            }
            if (obj.data.length >= 3) {
                this.sanname.text = obj.data[2].nickname;
                this.sanfen.text = obj.data[2].game_nums;
                RES.getResByUrl(obj.data[2].headimgurl, function (texture: egret.Texture) {
                    var photoBox1 = new egret.Bitmap();
                    photoBox1.width = 98; photoBox1.height = 98;
                    photoBox1.x = 482; photoBox1.y = 272;
                    photoBox1.texture = texture;
                    this.addChildAt(photoBox1, 7);
                    Tool.createCircleMask(photoBox1);
                }, this, RES.ResourceItem.TYPE_IMAGE);
            }
            // var photoBox = Tool.createBitmapByName("g6_text2_png");
            // photoBox.width = 397; photoBox.height = 35;
            // photoBox.x = 172; photoBox.y = 351;
            // this.addChildAt(photoBox,9999);
            for (var i = 3; i < obj.data.length; i++) {
                var listss = new Ranklist(obj.data[i].headimgurl, obj.data[i].nickname, obj.data[i].game_nums, i + 1);
                listss.y = 120 * (i - 3);
                listss.height = 120;
                this.group.addChild(listss);
            }
            console.log("结束");
            this.matchSlider();
        }, this, false);
    }
    private change1(e: eui.UIEvent): void {
        this.slider.value = this.group.scrollV;
    }
    private change2(e: eui.UIEvent): void {
        switch (e.type) {
            case eui.UIEvent.CHANGE:
                this.group.scrollV = this.slider.value;
                break;
            case eui.UIEvent.CHANGE_END:
                // this.group.validateNow();
                break;
        }
    }
    public touchtap(e: egret.TouchEvent) {
        switch (e.target) {
            case this.angin:
                Mode.diyici += 1;
                if (Mode.diyici == 1) {
                    PopUpManager.getInstance().addPopUp(new Rule, false, 750, 1334, 1);
                }
                else {
                    Main.eventManager.dispatchEventWith(EventManager.GOTO_GAME);
                }
                break;
            case this.zhuli:
                Main.eventManager.dispatchEventWith(EventManager.GOTO_ZHULIRANK);
                break;
            case this.duihuan:
                Main.eventManager.dispatchEventWith(EventManager.GOTO_INFOS);
                break;
            case this.ewmbtn:
                PopUpManager.getInstance().addPopUp(new erwei, false, 750, 1334, 1);
                break;
            default:
                break;
        }
    }
    private matchSlider() {
        this.slider.minimum = 0;//定义最小值
        var singlevalue: number = 120;//一个子元素预备的高度
        console.log(this.group.numChildren);
        this.slider.maximum = (this.group.numChildren * singlevalue) - this.scroller.height;//定义最大值
        this.slider.value = (this.group.numChildren * singlevalue) - this.scroller.height;//定义默认值
    }
}

