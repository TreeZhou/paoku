/**
 *游戏页
 * @author 
 *
 */
class Game extends CBaseClass {
    public constructor() {
        super();
        this.skinName = "GameSkin";
    }
    public childrenCreated() {
        //  Effects.CenterSize(this);
        this.createGameScene();
    }
    public quan: eui.Image;
    public san: eui.Image;
    public er: eui.Image;
    public yi: eui.Image;
    public sgo: eui.Image;
    public cj: eui.Label;
    public stime: eui.Label;
    private mc: egret.MovieClip;
    private mc1: egret.MovieClip;
    private mc2: egret.MovieClip;
    private bigbox: egret.Sprite;
    private pengbox: egret.Sprite;
    private wudi: egret.Bitmap;
    public createGameScene() {
        Mode.isgame = false;
        this.mc = Tool.createMovieClip("lu", "lu");
        this.mc.x = 0; this.mc.y = 0;
        this.mc.frameRate = 4;
        this.addChild(this.mc);

        this.bigbox = Tool.createSprite(147, 489);
        this.bigbox.x = 300; this.bigbox.y = 730;
        this.bigbox.touchEnabled = true;
        this.bigbox.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
        this.bigbox.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
        this.addChild(this.bigbox);

        this.pengbox = Tool.createSprite(100, 40);
        this.pengbox.x = 10; this.pengbox.y = 320;
        this.pengbox.touchEnabled = true;
        this.bigbox.addChild(this.pengbox);

        this.wudi = Tool.createBitmapByName("g2_wudibuff_png");
        this.wudi.x = -48; this.wudi.y = -5;
        this.wudi.visible = false;
        this.bigbox.addChild(this.wudi);

        this.mc1 = Tool.createMovieClip("ren", "ren");
        this.mc1.x = 10; this.mc1.y = 30;
        this.mc1.scaleX = this.mc1.scaleY = 0.8;
        this.mc1.frameRate = 6;
        this.bigbox.addChild(this.mc1);
        this.mc1.visible = false;

        this.mc2 = Tool.createMovieClip("ren1", "ren1");
        this.mc2.x = 10; this.mc2.y = 30;
        this.mc2.scaleX = this.mc2.scaleY = 0.8;
        this.mc2.frameRate = 6;
        this.mc2.alpha = 0;
        this.bigbox.addChild(this.mc2);

        if (Mode.diyici == 1) {
            PopUpManager.getInstance().addPopUp(new zhiyin, false, 750, 1334, 0);
            egret.setTimeout(() => {
                this.mc1.visible = true;
            }, this, 4200);
            egret.setTimeout(() => {
                this.func();
            }, this, 7200);
        }
        else {
            PopUpManager.getInstance().addPopUp(new djs, false, 750, 1334, 0);
            this.mc1.visible = true;
            egret.setTimeout(() => {
                this.func();
            }, this, 3000);
        }

    }
    private _touchStatus: boolean = false;
    private _distance: egret.Point = new egret.Point();
    private mouseDown(evt: egret.TouchEvent) {
        this._touchStatus = true;
        this._distance.x = evt.stageX - this.bigbox.x;
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }
    private mouseMove(evt: egret.TouchEvent) {
        if (this._touchStatus) {
            this.bigbox.x = evt.stageX - this._distance.x;
        }
        if (this.bigbox.x >= 520) {
            this.bigbox.x = 520;
        }
        if (this.bigbox.x < 80) {
            this.bigbox.x = 80;
        }
    }
    private mouseUp(evt: egret.TouchEvent) {
        this._touchStatus = false;
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
    }

    public touchtap() {
    }
    public jishu: number = 0;
    // 冰淇淋   水晶   雪花
    public arrd = ["g2_item1_png", "g2_item2_png", "g2_item3_png", "g2_item2_png",];
    public arr = ["g2_rub1_png", "g2_rub2_png", "g2_rub3_png", "g2_rub4_png"];
    public arr1 = [[300, -250], [350, 330], [390, 780]];
    public sssj: number = 60;
    public djtime: any;
    public shengcheng: any;
    public lucheng: number = 0;
    public miaolu: number = 10;
    public alphass: number = 0.1;
    public danmu: eui.Image;
    public func() {
        egret.Tween.get(this.danmu, { loop: true }).wait(10000).call(() => {
            this.danmu.visible = true;
            this.danmu.alpha = 1;
            this.danmu.y = 238;
            if (this.danmu.source == "g2_text4_png") {
                this.danmu.source = "g2_text3_png";
            } else {
                this.danmu.source = "g2_text4_png";
            }
            egret.Tween.get(this.danmu).wait(2000).to({ y: this.danmu.y - 50, alpha: 0 }, 1500).call(() => {
                this.danmu.visible = false;
            }, this);
        }, this);
        //时间 60秒倒数
        this.djtime = egret.setInterval(() => {
            this.lucheng += this.miaolu;
            this.cj.text = this.lucheng + "";
            this.sssj -= 1;
            if (!(this.jishu % 3)) {
                this.mc2.alpha += this.alphass;
                if (this.mc2.alpha >= 1) {
                    this.mc2.alpha = 1;
                }
            }
            if (this.sssj <= 0 || this.mc2.alpha == 1) {
                Mode.score = this.lucheng;
                this.panduanwudi = true;
                egret.clearInterval(this.djtime);
                egret.clearInterval(this.shengcheng);
                this.mc.stop();
                this.mc1.stop();
                this.mc2.stop();

                if (this.sssj <= 0) {
                    var endwenai = Tool.createBitmapByName("g2_text1_png");
                }
                else {
                    var endwenai = Tool.createBitmapByName("g2_text2_png");
                }
                endwenai.x = 132; endwenai.y = 500;
                this.addChild(endwenai);

                var _data = '&data=' + DecodeStr.setencode("game_nums=" + Mode.score, Mode.apikey);
                MessageTool.GET("http://game.flyh5.cn/game/wx75967690c8ef0c50/mar_lkm/api.php" + "?a=game_over", _data, (e: egret.Event) => {
                    var obj = JSON.parse(e.target.response.trim());
                    console.log(obj);
                    if (obj['error'] != 100) {
                        alert('拉取用户数据失败点击重新获取');
                        return;
                    }
                    egret.setTimeout(() => {
                        PopUpManager.getInstance().addPopUp(new Gameover, true, 750, 1334, 1);
                    }, this, 1500);
                    console.log("结束");
                }, this, false);
            }
            this.stime.text = this.sssj + "";
        }, this, 1000);
        this.mc.play(-1);
        this.mc1.play(-1);
        this.mc2.play(-1);
        this.shengcheng = egret.setInterval(() => {
            this.jishu += 1;
            if (!(this.jishu % 6)) {
                var xuanze = RandomUtils.randomArray(this.arr1);
                this.sjza(RandomUtils.randomArray(this.arrd), xuanze[0], xuanze[1]);
            }
            else {
                var xuanze = RandomUtils.randomArray(this.arr1);
                this.sjza(RandomUtils.randomArray(this.arr), xuanze[0], xuanze[1]);
            }
        }, this, 400);
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtap, this);
    }
    public sjza(obj: string, objx: number, objxx: number) {
        var zhangai = Tool.createBitmapByName(obj);
        if (obj == "g2_item1_png") {
            // 冰淇淋 
            zhangai.name = "dj1";
        }
        if (obj == "g2_item2_png") {
            // 水晶 
            zhangai.name = "dj2";
        }
        if (obj == "g2_item3_png") {
            // 雪花 
            zhangai.name = "dj3";
        }
        if (this.arr.indexOf(obj) !== -1) {
            //障碍
            zhangai.name = "za";
        }
        zhangai.x = objx; zhangai.y = 370;
        zhangai.scaleX = zhangai.scaleY = 0.5;
        this.addChildAt(zhangai, 9);
        // if (this.wudi.visible == false) {
        zhangai.addEventListener(egret.Event.ENTER_FRAME, this.pengzhuang, this);
        // }
        // else {
        //     if (this.arrd.indexOf(obj) !== -1) {
        //         zhangai.addEventListener(egret.Event.ENTER_FRAME, this.pengzhuang, this);
        //     }
        // }
        egret.Tween.get(zhangai).to({ x: objxx, y: 1834, scaleX: 1.5, scaleY: 1.5 }, 2000).call(() => {
            zhangai.removeEventListener(egret.Event.ENTER_FRAME, this.pengzhuang, this);
            egret.Tween.removeTweens(zhangai);
            Tool.removeFromParent(zhangai);
        });
    }
    public panduanwudi: boolean = false;
    public pengzhuang(e: egret.Event) {
        var pengz2 = CollisionUtils.hitTest(e.target, this.pengbox);
        if (pengz2 == true && !this.panduanwudi) {
            var fenshu1 = Tool.createTextFiled(e.target.x + 50, e.target.y - 50, 280, 30, "", 30, 0xffffff, false);
            // fenshu1.y = e.target.y;
            // fenshu1.x = e.target.x;
            // fenshu1.width = 42;
            // fenshu1.height = 30;
            this.addChild(fenshu1);
            fenshu1.alpha = 0;
            egret.Tween.get(fenshu1).to({ alpha: 1, y: fenshu1.y - 10 }, 500, egret.Ease.quadInOut).to({ alpha: 0, y: fenshu1.y - 20 }, 500, egret.Ease.quadInOut).call(() => {
                egret.Tween.removeTweens(fenshu1);
                Tool.removeFromParent(fenshu1);
            }, this);
            if (e.target.name == "dj1") {
                document.getElementById("jia")['play']();
                console.log("美白");
                fenshu1.text = "提亮雪肤";
                this.mc2.alpha -= 0.1;
                if (this.mc2.alpha <= 0) {
                    this.mc2.alpha = 0;
                }
            }
            if (e.target.name == "dj3") {
                document.getElementById("jia")['play']();
                this.wudi.visible = true;
                this.panduanwudi = true;
                this.alphass = 0;
                egret.setTimeout(() => {
                    this.alphass = 0.1;
                    this.wudi.visible = false;
                    this.panduanwudi = false;
                }, this, 2000);
                fenshu1.text = "持久防护";
                console.log("2秒无敌");
            }
            if (e.target.name == "dj2") {
                document.getElementById("jia")['play']();
                fenshu1.text = " 冰爽遮阳";
                console.log("路程增加200m");
                this.lucheng += 200;
            }
            if (e.target.name == "za") {
                document.getElementById("jian")['play']();
                fenshu1.text = "减速";
                console.log("减速");
                this.mc.frameRate = 2;
                this.mc1.frameRate = 3;
                this.mc2.frameRate = 3;
                this.miaolu = 5;
                egret.setTimeout(() => {
                    this.mc.frameRate = 4;
                    this.mc1.frameRate = 6;
                    this.mc2.frameRate = 6;
                    this.miaolu = 10;
                }, this, 2000);
            }
            e.target.removeEventListener(egret.Event.ENTER_FRAME, this.pengzhuang, this);
            egret.Tween.removeTweens(e.target);
            Tool.removeFromParent(e.target);
        }
    }
}

