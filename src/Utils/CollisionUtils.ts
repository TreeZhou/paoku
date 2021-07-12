/**
 * 碰撞工具类
 */
class CollisionUtils {
    public constructor() {
    }
    //两物品重叠的碰撞判断方式
    public static hitTest(obj1: egret.DisplayObject, obj2: egret.DisplayObject): boolean {
        var rect1: egret.Rectangle = obj1.getBounds();
        var rect2: egret.Rectangle = obj2.getBounds();
        rect1.x = obj1.parent.localToGlobal(obj1.x, obj1.y).x;
        rect1.y = obj1.parent.localToGlobal(obj1.x, obj1.y).y;
        rect2.x = obj2.parent.localToGlobal(obj2.x, obj2.y).x;
        rect2.y = obj2.parent.localToGlobal(obj2.x, obj2.y).y;
        return rect1.intersects(rect2);
    }
    //点和物品的碰撞判断方式，较为精确及可控
    public static hitTestP(obj1: egret.DisplayObject, obj2: egret.DisplayObject): boolean {
        var rect2x: number;
        var rect2y: number;
        rect2x = obj2.x + obj2.width / 2;
        rect2y = obj2.y + obj2.height - obj2.width / 2;
        if (obj1.hitTestPoint(rect2x, rect2y)) {
            return true;
        }
        else
            return false;

    }
    //算出碰撞点
    public static sreatPoints(obj: egret.Sprite) {
        var pointS: egret.Point[] = [];
        var shuSpace: number = 5;  //栅格高大小
        var henSpace: number = 5;  //栅格宽大小
        var shuCount: number = obj.height / shuSpace;
        var henCount: number = obj.width / henSpace;
        for (var shu: number = 0; shu <= shuCount; shu++) {
            for (var hen: number = 0; hen <= henCount; hen++) {
                var _point: egret.Point = new egret.Point(obj.x + hen * henSpace, obj.y + shu * shuSpace);
                pointS.push(_point);
            }
        }
        return pointS;
    }

    public static testHit(obj1: egret.DisplayObject, obj2: egret.DisplayObject): boolean {
        //console.log("p1=" + obj1.parent + ", p2=" + obj2.parent)
        if (!obj1.parent || !obj2.parent) {
            return false;
        }
        var x: number = obj1.x;
        var y: number = obj1.y;
        var b1Rect: egret.Rectangle = obj1.getBounds();
        //对象1的数据准备
        var tempPoint: egret.Point = new egret.Point();
        obj1.parent.localToGlobal(x, y, tempPoint);
        b1Rect.x = tempPoint.x;
        b1Rect.y = tempPoint.y;
        //console.log("x1=" + x + ", x2=" + tempPoint.x + ", y1=" + y + ", y2=" + tempPoint.y + ", w="+ b1Rect.width + ", h=" + b1Rect.height);
        //对象2的数据准备
        x = obj2.x;
        y = obj2.y;
        //对象1的数据准备
        var b2Rect: egret.Rectangle = obj2.getBounds();
        obj2.parent.localToGlobal(x, y, tempPoint);
        b2Rect.x = tempPoint.x;
        b2Rect.y = tempPoint.y;
        return b1Rect.intersects(b2Rect);
    }
}
