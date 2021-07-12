var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 碰撞工具类
 */
var CollisionUtils = (function () {
    function CollisionUtils() {
    }
    //两物品重叠的碰撞判断方式
    CollisionUtils.hitTest = function (obj1, obj2) {
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.parent.localToGlobal(obj1.x, obj1.y).x;
        rect1.y = obj1.parent.localToGlobal(obj1.x, obj1.y).y;
        rect2.x = obj2.parent.localToGlobal(obj2.x, obj2.y).x;
        rect2.y = obj2.parent.localToGlobal(obj2.x, obj2.y).y;
        return rect1.intersects(rect2);
    };
    //点和物品的碰撞判断方式，较为精确及可控
    CollisionUtils.hitTestP = function (obj1, obj2) {
        var rect2x;
        var rect2y;
        rect2x = obj2.x + obj2.width / 2;
        rect2y = obj2.y + obj2.height - obj2.width / 2;
        if (obj1.hitTestPoint(rect2x, rect2y)) {
            return true;
        }
        else
            return false;
    };
    //算出碰撞点
    CollisionUtils.sreatPoints = function (obj) {
        var pointS = [];
        var shuSpace = 5; //栅格高大小
        var henSpace = 5; //栅格宽大小
        var shuCount = obj.height / shuSpace;
        var henCount = obj.width / henSpace;
        for (var shu = 0; shu <= shuCount; shu++) {
            for (var hen = 0; hen <= henCount; hen++) {
                var _point = new egret.Point(obj.x + hen * henSpace, obj.y + shu * shuSpace);
                pointS.push(_point);
            }
        }
        return pointS;
    };
    CollisionUtils.testHit = function (obj1, obj2) {
        //console.log("p1=" + obj1.parent + ", p2=" + obj2.parent)
        if (!obj1.parent || !obj2.parent) {
            return false;
        }
        var x = obj1.x;
        var y = obj1.y;
        var b1Rect = obj1.getBounds();
        //对象1的数据准备
        var tempPoint = new egret.Point();
        obj1.parent.localToGlobal(x, y, tempPoint);
        b1Rect.x = tempPoint.x;
        b1Rect.y = tempPoint.y;
        //console.log("x1=" + x + ", x2=" + tempPoint.x + ", y1=" + y + ", y2=" + tempPoint.y + ", w="+ b1Rect.width + ", h=" + b1Rect.height);
        //对象2的数据准备
        x = obj2.x;
        y = obj2.y;
        //对象1的数据准备
        var b2Rect = obj2.getBounds();
        obj2.parent.localToGlobal(x, y, tempPoint);
        b2Rect.x = tempPoint.x;
        b2Rect.y = tempPoint.y;
        return b1Rect.intersects(b2Rect);
    };
    return CollisionUtils;
}());
__reflect(CollisionUtils.prototype, "CollisionUtils");
//# sourceMappingURL=CollisionUtils.js.map