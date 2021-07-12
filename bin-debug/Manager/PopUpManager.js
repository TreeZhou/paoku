var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PopUpManager = (function (_super) {
    __extends(PopUpManager, _super);
    function PopUpManager() {
        return _super.call(this) || this;
    }
    // 调用参考  
    // PopUpManager.getInstance().addPopUp(sp,true,128,64,2,true);
    // PopUpManager.getInstance().removePopUp(sp,1);
    /**
    * 添加面板方法
    * panel       面板
    * dark         背景是否变黑
    * popUpWidth       指定弹窗宽度，定位使用
    * popUpHeight       指定弹窗高度，定位使用
    * effectType        0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
    */
    PopUpManager.prototype.addPopUp = function (panel, dark, popUpWidth, popUpHeight, effectType, isAlert) {
        if (dark === void 0) { dark = false; }
        if (popUpWidth === void 0) { popUpWidth = 0; }
        if (popUpHeight === void 0) { popUpHeight = 0; }
        if (effectType === void 0) { effectType = 0; }
        if (isAlert === void 0) { isAlert = false; }
        if (this.nowPop) {
            PopUpManager.getInstance().removePopUp(PopUpManager.getInstance().nowPop, 0);
        }
        if (dark) {
            this.darkSprite = new egret.Sprite();
            this.darkSprite.name = "darkSprite";
            this.darkSprite.graphics.clear();
            this.darkSprite.graphics.beginFill(0x000000, 0.7);
            this.darkSprite.graphics.drawRect(0, 0, egret.MainContext.instance.stage.stageWidth, egret.MainContext.instance.stage.stageHeight);
            this.darkSprite.graphics.endFill();
            this.darkSprite.width = egret.MainContext.instance.stage.stageWidth;
            this.darkSprite.height = egret.MainContext.instance.stage.stageHeight;
            this.darkSprite.touchEnabled = true;
            this.darkSprite.alpha = 0;
            egret.Tween.get(this.darkSprite).to({ alpha: 1 }, 150);
            this.darkSprite.visible = true;
            this.addChild(this.darkSprite);
        }
        panel.width = popUpWidth;
        panel.height = popUpHeight;
        this.addChild(panel);
        if (popUpWidth != 0) {
            panel.x = egret.MainContext.instance.stage.stageWidth / 2 - popUpWidth / 2;
            panel.y = egret.MainContext.instance.stage.stageHeight / 2 - popUpHeight / 2;
        }
        else {
            popUpWidth = panel.width;
            popUpHeight = panel.height;
        }
        //以下是弹窗动画
        var leftX = egret.MainContext.instance.stage.stageWidth / 2 - popUpWidth / 2;
        var upY = egret.MainContext.instance.stage.stageHeight / 2 - popUpHeight / 2;
        switch (effectType) {
            case 0:
                break;
            case 1:
                panel.alpha = 0;
                panel.scaleX = 0.5;
                panel.scaleY = 0.5;
                panel.x = panel.x + popUpWidth / 4;
                panel.y = panel.y + popUpHeight / 4;
                egret.Tween.get(panel).to({ alpha: 1, scaleX: 1, scaleY: 1, x: panel.x - popUpWidth / 4, y: panel.y - popUpHeight / 4 }, 300, egret.Ease.backOut);
                break;
            case 2:
                panel.alpha = 0;
                panel.scaleX = 0.5;
                panel.scaleY = 0.5;
                panel.x = panel.x + popUpWidth / 4;
                panel.y = panel.y + popUpHeight / 4;
                egret.Tween.get(panel).to({ alpha: 1, scaleX: 1, scaleY: 1, x: panel.x - popUpWidth / 4, y: panel.y - popUpHeight / 4 }, 600, egret.Ease.elasticOut);
                break;
            case 3:
                if (isAlert) {
                    panel.x = -popUpWidth;
                    egret.Tween.get(panel).to({ x: leftX }, 500, egret.Ease.cubicOut);
                }
                else {
                    panel.x = -popUpWidth;
                    egret.Tween.get(panel).to({ x: 0 }, 500, egret.Ease.cubicOut);
                }
                break;
            case 4:
                if (isAlert) {
                    panel.x = popUpWidth;
                    egret.Tween.get(panel).to({ x: leftX }, 500, egret.Ease.cubicOut);
                }
                else {
                    panel.x = popUpWidth;
                    egret.Tween.get(panel).to({ x: 0 }, 500, egret.Ease.cubicOut);
                }
                break;
            case 5:
                if (isAlert) {
                    panel.y = -popUpHeight;
                    egret.Tween.get(panel).to({ y: upY }, 500, egret.Ease.cubicOut);
                }
                else {
                    panel.y = -popUpHeight;
                    egret.Tween.get(panel).to({ y: 0 }, 500, egret.Ease.cubicOut);
                }
                break;
            case 6:
                if (isAlert) {
                    panel.y = egret.MainContext.instance.stage.stageHeight;
                    egret.Tween.get(panel).to({ y: upY }, 500, egret.Ease.cubicOut);
                }
                else {
                    panel.y = popUpHeight;
                    egret.Tween.get(panel).to({ y: 0 }, 500, egret.Ease.cubicOut);
                }
                break;
            default:
                break;
        }
        this.nowPop = panel;
    };
    /**
    * 移除面板方法
    * panel       面板
    * effectType        0：没有动画 1:从中间缩小消失 2：  3：从左向右 4：从右向左 5、从上到下 6、从下到上
    */
    PopUpManager.prototype.removePopUp = function (panel, effectType) {
        if (effectType === void 0) { effectType = 0; }
        // var onComplete: Function = function () {
        if (this.darkSprite) {
            Tool.removeFromParent(this.darkSprite);
        }
        // };
        // if (this.darkSprite) {
        //     egret.Tween.get(this.darkSprite).to({ alpha: 0 }, 100).call(onComplete, this);
        // }
        //以下是弹窗动画
        switch (effectType) {
            case 0:
                break;
            case 1:
                egret.Tween.get(panel).to({ alpha: 0, scaleX: 0, scaleY: 0, x: panel.x + panel.width / 2, y: panel.y + panel.height / 2 }, 300);
                break;
            case 2:
                break;
            case 3:
                egret.Tween.get(panel).to({ x: panel.width }, 500, egret.Ease.cubicOut);
                break;
            case 4:
                egret.Tween.get(panel).to({ x: -panel.width }, 500, egret.Ease.cubicOut);
                break;
            case 5:
                egret.Tween.get(panel).to({ y: panel.height }, 500, egret.Ease.cubicOut);
                break;
            case 6:
                egret.Tween.get(panel).to({ y: -panel.height }, 500, egret.Ease.cubicOut);
                break;
            default:
                break;
        }
        egret.setTimeout(function () {
            if (panel.parent && panel) {
                Tool.removeFromParent(panel);
                this.nowPop = null;
            }
        }, this, 500);
    };
    return PopUpManager;
}(SingleBaseClass));
__reflect(PopUpManager.prototype, "PopUpManager");
//# sourceMappingURL=PopUpManager.js.map