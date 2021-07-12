/**
 *规则页
 * @author 
 *
 */
class zhuliRank extends CBaseClass {
    public constructor() {
        super();
        this.skinName = "zhuliRankSkin";
    }
    public childrenCreated() {
        //  Effects.CenterSize(this);
        this.createGameScene();
    }
    public close: eui.Image;
    public scroller: eui.Scroller;
    public group: eui.Group;
    public slider: eui.VSlider;

    public createGameScene() {
        var singlevalue: number = 120;//一个子元素预备的高度
        this.slider.addEventListener(eui.UIEvent.CHANGE, (evt: eui.UIEvent) => {
            this.group.scrollV = ((this.group.numChildren * singlevalue) - this.scroller.height) - (evt.target.value);
        }, this);

        this.scroller.addEventListener(eui.UIEvent.CHANGE, (evt: eui.UIEvent) => {
            this.slider.value = ((this.group.numChildren * singlevalue) - this.scroller.height) - this.group.scrollV;
        }, this);

        var _data = '&data=' + DecodeStr.setencode("", Mode.apikey);
        MessageTool.GET("http://game.flyh5.cn/game/wx75967690c8ef0c50/mar_lkm/api.php" + "?a=help_top", _data, (e: egret.Event) => {
            var obj = JSON.parse(e.target.response.trim());
            console.log(obj);
            if (obj['error'] != 100) {
                alert('拉取用户数据失败点击重新获取');
                return;
            }
            for (var i = 0; i < obj.data.length; i++) {
                var listss = new zhuliRanklist(obj.data[i].headimgurl, obj.data[i].nickname);
                listss.y = 120 * i;
                listss.height = 120;
                this.group.addChild(listss);
            }
            this.matchSlider();
        }, this, false);

        this.close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtap, this);
    }
    public touchtap() {
        PopUpManager.getInstance().removePopUp(this, 1);
        Main.eventManager.dispatchEventWith(EventManager.GOTO_RANK);

    }
    private matchSlider() {
        this.slider.minimum = 0;//定义最小值
        var singlevalue: number = 120;//一个子元素预备的高度
        this.slider.maximum = (this.group.numChildren * singlevalue) - this.scroller.height;//定义最大值
        this.slider.value = (this.group.numChildren * singlevalue) - this.scroller.height;//定义默认值

    }
}

