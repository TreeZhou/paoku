var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * Created by d8q8 on 2014/12/10.
 * @module lcp
 * @class AlignUtil
 * @constructor
 * AlignUtil.alignBottom(sp,this.getBounds())
 **/
/**
 * 对齐工具类
 */
var AlignUtil = (function () {
    function AlignUtil() {
        this.CLASS_NAME = "AlignUtil";
    }
    /**
     * 返回x和y偏移到DisplayObject左上角。该偏移可以用来定位的DisplayObject的对齐点不在(0，0)和或者缩放。
     * @param displayObject
     * @returns {egret.Point}
     */
    AlignUtil.getOffsetPosition = function (displayObject) {
        var bounds = displayObject.getBounds();
        var offset = new egret.Point();
        offset.x = (displayObject.scaleX > 0) ? bounds.x * displayObject.scaleX * -1 : bounds.right * displayObject.scaleX * -1;
        offset.y = (displayObject.scaleY > 0) ? bounds.y * displayObject.scaleY * -1 : bounds.bottom * displayObject.scaleY * -1;
        return offset;
    };
    /**
     * 将一个DisplayObject根据定义的边界矩形排列。
     * @param alignment
     * @param displayObject
     * @param bounds
     * @param snapToPixel
     * @param outside
     * @param targetCoordinateSpace
     */
    AlignUtil.align = function (alignment, displayObject, bounds, snapToPixel, outside, targetCoordinateSpace) {
        if (snapToPixel === void 0) { snapToPixel = true; }
        if (outside === void 0) { outside = false; }
        if (targetCoordinateSpace === void 0) { targetCoordinateSpace = null; }
        var offsetPosition = AlignUtil.getOffsetPosition(displayObject);
        switch (alignment) {
            case AlignUtil.TOP:
            case AlignUtil.MIDDLE:
            case AlignUtil.BOTTOM:
                break;
            default:
                displayObject.x = offsetPosition.x;
        }
        switch (alignment) {
            case AlignUtil.LEFT:
            case AlignUtil.CENTER:
            case AlignUtil.RIGHT:
                break;
            default:
                displayObject.y = offsetPosition.y;
        }
        var alignPosition = AlignUtil._getPosition(alignment, displayObject.width, displayObject.height, bounds, outside);
        var relPosition = targetCoordinateSpace == null ? displayObject.getBounds() : targetCoordinateSpace.getBounds();
        switch (alignment) {
            case AlignUtil.TOP:
            case AlignUtil.MIDDLE:
            case AlignUtil.BOTTOM:
                break;
            default:
                displayObject.x += alignPosition.x - relPosition.x;
                if (snapToPixel)
                    displayObject.x = Math.round(displayObject.x);
        }
        switch (alignment) {
            case AlignUtil.LEFT:
            case AlignUtil.CENTER:
            case AlignUtil.RIGHT:
                break;
            default:
                displayObject.y += alignPosition.y - relPosition.y;
                if (snapToPixel)
                    displayObject.y = Math.round(displayObject.y);
        }
    };
    /**
     * 对齐DisplayObject最近的像素。
     * @param displayObject
     */
    AlignUtil.alignToPixel = function (displayObject) {
        displayObject.x = Math.round(displayObject.x);
        displayObject.y = Math.round(displayObject.y);
    };
    /**
     * 底部对齐
     * @param displayObject
     * @param bounds
     * @param snapToPixel
     * @param outside
     * @param targetCoordinateSpace
     */
    AlignUtil.alignBottom = function (displayObject, bounds, snapToPixel, outside, targetCoordinateSpace) {
        if (snapToPixel === void 0) { snapToPixel = true; }
        if (outside === void 0) { outside = false; }
        if (targetCoordinateSpace === void 0) { targetCoordinateSpace = null; }
        AlignUtil.align(AlignUtil.BOTTOM, displayObject, bounds, snapToPixel, outside, targetCoordinateSpace);
    };
    /**
     * 左下对齐
     * @param displayObject
     * @param bounds
     * @param snapToPixel
     * @param outside
     * @param targetCoordinateSpace
     */
    AlignUtil.alignBottomLeft = function (displayObject, bounds, snapToPixel, outside, targetCoordinateSpace) {
        if (snapToPixel === void 0) { snapToPixel = true; }
        if (outside === void 0) { outside = false; }
        if (targetCoordinateSpace === void 0) { targetCoordinateSpace = null; }
        AlignUtil.align(AlignUtil.BOTTOM_LEFT, displayObject, bounds, snapToPixel, outside, targetCoordinateSpace);
    };
    /**
     * 底部水平居中对齐
     * @param displayObject
     * @param bounds
     * @param snapToPixel
     * @param outside
     * @param targetCoordinateSpace
     */
    AlignUtil.alignBottomCenter = function (displayObject, bounds, snapToPixel, outside, targetCoordinateSpace) {
        if (snapToPixel === void 0) { snapToPixel = true; }
        if (outside === void 0) { outside = false; }
        if (targetCoordinateSpace === void 0) { targetCoordinateSpace = null; }
        AlignUtil.align(AlignUtil.BOTTOM_CENTER, displayObject, bounds, snapToPixel, outside, targetCoordinateSpace);
    };
    /**
     * 右下对齐
     * @param displayObject
     * @param bounds
     * @param snapToPixel
     * @param outside
     * @param targetCoordinateSpace
     */
    AlignUtil.alignBottomRight = function (displayObject, bounds, snapToPixel, outside, targetCoordinateSpace) {
        if (snapToPixel === void 0) { snapToPixel = true; }
        if (outside === void 0) { outside = false; }
        if (targetCoordinateSpace === void 0) { targetCoordinateSpace = null; }
        AlignUtil.align(AlignUtil.BOTTOM_RIGHT, displayObject, bounds, snapToPixel, outside, targetCoordinateSpace);
    };
    /**
     * 水平居中对齐
     * @param displayObject
     * @param bounds
     * @param snapToPixel
     * @param targetCoordinateSpace
     */
    AlignUtil.alignCenter = function (displayObject, bounds, snapToPixel, targetCoordinateSpace) {
        if (snapToPixel === void 0) { snapToPixel = true; }
        if (targetCoordinateSpace === void 0) { targetCoordinateSpace = null; }
        AlignUtil.align(AlignUtil.CENTER, displayObject, bounds, snapToPixel, false, targetCoordinateSpace);
    };
    /**
     * 左对齐
     * @param displayObject
     * @param bounds
     * @param snapToPixel
     * @param outside
     * @param targetCoordinateSpace
     */
    AlignUtil.alignLeft = function (displayObject, bounds, snapToPixel, outside, targetCoordinateSpace) {
        if (snapToPixel === void 0) { snapToPixel = true; }
        if (outside === void 0) { outside = false; }
        if (targetCoordinateSpace === void 0) { targetCoordinateSpace = null; }
        AlignUtil.align(AlignUtil.LEFT, displayObject, bounds, snapToPixel, outside, targetCoordinateSpace);
    };
    /**
     * 垂直居中对齐
     * @param displayObject
     * @param bounds
     * @param snapToPixel
     * @param targetCoordinateSpace
     */
    AlignUtil.alignMiddle = function (displayObject, bounds, snapToPixel, targetCoordinateSpace) {
        if (snapToPixel === void 0) { snapToPixel = true; }
        if (targetCoordinateSpace === void 0) { targetCoordinateSpace = null; }
        AlignUtil.align(AlignUtil.MIDDLE, displayObject, bounds, snapToPixel, false, targetCoordinateSpace);
    };
    /**
     * 左侧垂直居中对齐
     * @param displayObject
     * @param bounds
     * @param snapToPixel
     * @param outside
     * @param targetCoordinateSpace
     */
    AlignUtil.alignMiddleLeft = function (displayObject, bounds, snapToPixel, outside, targetCoordinateSpace) {
        if (snapToPixel === void 0) { snapToPixel = true; }
        if (outside === void 0) { outside = false; }
        if (targetCoordinateSpace === void 0) { targetCoordinateSpace = null; }
        AlignUtil.align(AlignUtil.MIDDLE_LEFT, displayObject, bounds, snapToPixel, outside, targetCoordinateSpace);
    };
    /**
     * 水平垂直居中对齐
     * @param displayObject
     * @param bounds
     * @param snapToPixel
     * @param targetCoordinateSpace
     */
    AlignUtil.alignMiddleCenter = function (displayObject, bounds, snapToPixel, targetCoordinateSpace) {
        if (snapToPixel === void 0) { snapToPixel = true; }
        if (targetCoordinateSpace === void 0) { targetCoordinateSpace = null; }
        AlignUtil.align(AlignUtil.MIDDLE_CENTER, displayObject, bounds, snapToPixel, false, targetCoordinateSpace);
    };
    /**
     * 右侧垂直居中对齐
     * @param displayObject
     * @param bounds
     * @param snapToPixel
     * @param outside
     * @param targetCoordinateSpace
     */
    AlignUtil.alignMiddleRight = function (displayObject, bounds, snapToPixel, outside, targetCoordinateSpace) {
        if (snapToPixel === void 0) { snapToPixel = true; }
        if (outside === void 0) { outside = false; }
        if (targetCoordinateSpace === void 0) { targetCoordinateSpace = null; }
        AlignUtil.align(AlignUtil.MIDDLE_RIGHT, displayObject, bounds, snapToPixel, outside, targetCoordinateSpace);
    };
    /**
     * 右对齐
     * @param displayObject
     * @param bounds
     * @param snapToPixel
     * @param outside
     * @param targetCoordinateSpace
     */
    AlignUtil.alignRight = function (displayObject, bounds, snapToPixel, outside, targetCoordinateSpace) {
        if (snapToPixel === void 0) { snapToPixel = true; }
        if (outside === void 0) { outside = false; }
        if (targetCoordinateSpace === void 0) { targetCoordinateSpace = null; }
        AlignUtil.align(AlignUtil.RIGHT, displayObject, bounds, snapToPixel, outside, targetCoordinateSpace);
    };
    /**
     * 顶部对齐
     * @param displayObject
     * @param bounds
     * @param snapToPixel
     * @param outside
     * @param targetCoordinateSpace
     */
    AlignUtil.alignTop = function (displayObject, bounds, snapToPixel, outside, targetCoordinateSpace) {
        if (snapToPixel === void 0) { snapToPixel = true; }
        if (outside === void 0) { outside = false; }
        if (targetCoordinateSpace === void 0) { targetCoordinateSpace = null; }
        AlignUtil.align(AlignUtil.TOP, displayObject, bounds, snapToPixel, outside, targetCoordinateSpace);
    };
    /**
     * 左上对齐
     * @param displayObject
     * @param bounds
     * @param snapToPixel
     * @param outside
     * @param targetCoordinateSpace
     */
    AlignUtil.alignTopLeft = function (displayObject, bounds, snapToPixel, outside, targetCoordinateSpace) {
        if (snapToPixel === void 0) { snapToPixel = true; }
        if (outside === void 0) { outside = false; }
        if (targetCoordinateSpace === void 0) { targetCoordinateSpace = null; }
        AlignUtil.align(AlignUtil.TOP_LEFT, displayObject, bounds, snapToPixel, outside, targetCoordinateSpace);
    };
    /**
     * 顶部水平居中对齐
     * @param displayObject
     * @param bounds
     * @param snapToPixel
     * @param outside
     * @param targetCoordinateSpace
     */
    AlignUtil.alignTopCenter = function (displayObject, bounds, snapToPixel, outside, targetCoordinateSpace) {
        if (snapToPixel === void 0) { snapToPixel = true; }
        if (outside === void 0) { outside = false; }
        if (targetCoordinateSpace === void 0) { targetCoordinateSpace = null; }
        AlignUtil.align(AlignUtil.TOP_CENTER, displayObject, bounds, snapToPixel, outside, targetCoordinateSpace);
    };
    /**
     * 右上对齐
     * @param displayObject
     * @param bounds
     * @param snapToPixel
     * @param outside
     * @param targetCoordinateSpace
     */
    AlignUtil.alignTopRight = function (displayObject, bounds, snapToPixel, outside, targetCoordinateSpace) {
        if (snapToPixel === void 0) { snapToPixel = true; }
        if (outside === void 0) { outside = false; }
        if (targetCoordinateSpace === void 0) { targetCoordinateSpace = null; }
        AlignUtil.align(AlignUtil.TOP_RIGHT, displayObject, bounds, snapToPixel, outside, targetCoordinateSpace);
    };
    AlignUtil._getPosition = function (alignment, targetWidth, targetHeight, bounds, outside) {
        var position = new egret.Point();
        switch (alignment) {
            case AlignUtil.BOTTOM_LEFT:
            case AlignUtil.LEFT:
            case AlignUtil.MIDDLE_LEFT:
            case AlignUtil.TOP_LEFT:
                position.x = outside ? bounds.x - targetWidth : bounds.x;
                break;
            case AlignUtil.BOTTOM_CENTER:
            case AlignUtil.CENTER:
            case AlignUtil.MIDDLE_CENTER:
            case AlignUtil.TOP_CENTER:
                position.x = (bounds.width - targetWidth) * 0.5 + bounds.x;
                break;
            case AlignUtil.BOTTOM_RIGHT:
            case AlignUtil.MIDDLE_RIGHT:
            case AlignUtil.RIGHT:
            case AlignUtil.TOP_RIGHT:
                position.x = outside ? bounds.right : bounds.right - targetWidth;
                break;
        }
        switch (alignment) {
            case AlignUtil.TOP:
            case AlignUtil.TOP_CENTER:
            case AlignUtil.TOP_LEFT:
            case AlignUtil.TOP_RIGHT:
                position.y = outside ? bounds.y - targetHeight : bounds.y;
                break;
            case AlignUtil.MIDDLE:
            case AlignUtil.MIDDLE_CENTER:
            case AlignUtil.MIDDLE_LEFT:
            case AlignUtil.MIDDLE_RIGHT:
                position.y = (bounds.height - targetHeight) * 0.5 + bounds.y;
                break;
            case AlignUtil.BOTTOM:
            case AlignUtil.BOTTOM_CENTER:
            case AlignUtil.BOTTOM_LEFT:
            case AlignUtil.BOTTOM_RIGHT:
                position.y = outside ? bounds.bottom : bounds.bottom - targetHeight;
                break;
        }
        return position;
    };
    /**
     * 类名
     * @returns {string}
     */
    AlignUtil.prototype.toString = function () {
        //console.log("ClassName",this.CLASS_NAME);
        return this.CLASS_NAME;
    };
    return AlignUtil;
}());
AlignUtil.BOTTOM = 'bottom';
AlignUtil.BOTTOM_CENTER = 'bottomCenter';
AlignUtil.BOTTOM_LEFT = 'bottomLeft';
AlignUtil.BOTTOM_RIGHT = 'bottomRight';
AlignUtil.CENTER = 'center';
AlignUtil.LEFT = 'left';
AlignUtil.MIDDLE = 'middle';
AlignUtil.MIDDLE_CENTER = 'middleCenter';
AlignUtil.MIDDLE_LEFT = 'middleLeft';
AlignUtil.MIDDLE_RIGHT = 'middleRight';
AlignUtil.RIGHT = 'right';
AlignUtil.TOP = 'top';
AlignUtil.TOP_CENTER = 'topCenter';
AlignUtil.TOP_LEFT = 'topLeft';
AlignUtil.TOP_RIGHT = 'topRight';
__reflect(AlignUtil.prototype, "AlignUtil");
//# sourceMappingURL=AlignUtil.js.map