/**
 * 数学计算工具类
 */
class MathUtils {
    /**
     * 弧度制转换为角度值
     * @param radian 弧度制
     * @returns {number}
     */
    public getAngle(radian: number): number {
        var temp: number = 180 * radian / Math.PI;
        return temp;
    }

    /**
     * 角度值转换为弧度制
     * @param angle
     */
    public getRadian(angle: number): number {
        var temp: number = angle / 180 * Math.PI;
        return temp;
    }

    /**
     * 获取两点间弧度
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    public getRadian2(p1X: number, p1Y: number, p2X: number, p2Y: number): number {
        var xdis: number = p2X - p1X;
        var ydis: number = p2Y - p1Y;
        return Math.atan2(ydis, xdis);
    }

    /**
     * 获取两点间距离
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    public getDistance(p1X: number, p1Y: number, p2X: number, p2Y: number): number {
        var disX: number = p2X - p1X;
        var disY: number = p2Y - p1Y;
        var disQ: number = disX * disX + disY * disY;
        return Math.sqrt(disQ);
    }
    /**
         * 取连直线的相交点
         * @param targetPoint0
         * @param angle0
         * @param targetPoint1
         * @param angle1
         * @returns {*}
         */
    public static getCrossPoint(targetPoint0: egret.Point, angle0: number, targetPoint1: egret.Point, angle1: number): egret.Point {
        var k0: number = 0;
        var k1: number = 0;
        var xValue: number = 0;
        var yValue: number = 0;

        var isExtra0: number = angle0 % 180 == 0 ? 1 : angle0 % 90 == 0 ? -1 : 0;
        var isExtra1: number = angle1 % 180 == 0 ? 1 : angle1 % 90 == 0 ? -1 : 0;

        (isExtra0 == 0) && (k0 = Math.tan(angle0 * Math.PI / 180));
        (isExtra1 == 0) && (k1 = Math.tan(angle1 * Math.PI / 180));

        var tmp_add: number = Math.abs(angle0) + Math.abs(angle1);
        if ((tmp_add == 180 && angle0 * angle1 < 0) || Math.floor(angle0) == Math.floor(angle1)) {
            return null;
        }
        if ((isExtra0 == 0) && (isExtra1 == 0)) {
            xValue = ((k0 * targetPoint0.x - targetPoint0.y) - (k1 * targetPoint1.x - targetPoint1.y)) / (k0 - k1);
            yValue = ((k0 * targetPoint1.y - targetPoint1.x * k0 * k1) - (k1 * targetPoint0.y - targetPoint0.x * k0 * k1)) / (k0 - k1);
        } else if ((isExtra0 == 0) && (isExtra1 == 1)) {
            yValue = targetPoint1.y;
            xValue = (yValue - targetPoint0.y) / k0 + targetPoint0.x;
        } else if ((isExtra0 == 0) && (isExtra1 == -1)) {
            xValue = targetPoint1.x;
            yValue = (xValue - targetPoint0.x) * k0 + targetPoint0.y;
        } else if ((isExtra0 == 1) && (isExtra1 == 0)) {
            yValue = targetPoint0.y;
            xValue = (yValue - targetPoint1.y) / k1 + targetPoint1.x;
        } else if ((isExtra0 == 1) && (isExtra1 == -1)) {
            yValue = targetPoint0.y;
            xValue = targetPoint1.x;
        } else if ((isExtra0 == -1) && (isExtra1 == 0)) {
            xValue = targetPoint0.x;
            yValue = (xValue - targetPoint1.x) * k1 + targetPoint1.y;
        } else if ((isExtra0 == -1) && (isExtra1 == 1)) {
            xValue = targetPoint0.x;
            yValue = targetPoint1.y;
        } else {
            return null;
            //trace($_x, $_y);
        }
        //trace($angle0, $angle1);
        return new egret.Point((xValue * 100) / 1000, (yValue * 1000) / 1000);
    }

    /**
     * 直线的角度
     * @param point0
     * @param point1
     * @returns {number}
     */
    public static getLineAngle(point0: egret.Point, point1: egret.Point): number {
        var tmp_x: number = point1.x - point0.x;
        var tmp_y: number = point1.y - point0.y;
        var tmp_angle: number = Math.atan2(tmp_y, tmp_x) * 180 / Math.PI;
        return tmp_angle;
    }

    public static getLinePos(point0: egret.Point, point1: egret.Point): number {
        var tmp_x: number = point0.x - point1.x;
        var tmp_y: number = point0.y - point1.y;
        var tmp_s: number = Math.sqrt(tmp_x * tmp_x + tmp_y * tmp_y);
        return tmp_s;
    }

    /**
     * 直线公式，已知指定的两个点，确定一条直线
     * y = k * x + b，此函数即返回k = point.x和b = point.y
     * @param p1 一个点对象
     * @param p2 另外一个点对象
     * @return (Point) 返回直线公式的两个参数，组合成一个Point对象存储
     * */
    public static lineFunc(p1: egret.Point, p2: egret.Point): egret.Point {
        if (p1.x != p2.x) {
            var k: number = (p1.y - p2.y) / (p1.x - p2.x);
            var b: number = p1.y - (p1.y - p2.y) / (p1.x - p2.x) * p1.x;
            return new egret.Point(k, b);
        } else {
            return null;
        }
    }

    /**
     * 产生一个 a 到 b 之间的随机数（默认是 a 不包括 b的整数）：
     * @param a
     * @param b
     * @param isInt 是否是整数
     */
    public static random(a: number, b: number, isInt: boolean = true): number {
        if (isInt) {
            return Math.floor(a + (b - a) * Math.random());
        } else {
            return a + (b - a) * Math.random();
        }
    }
    //     AS3波形运动:
    // public function onEnterFrame1(event:Event):void {
    // ball.y=centerScale+Math.sin(angle)*range;
    // angle+=speed;
    // }

    // 心跳:
    // public function onEnterFrame1(event:Event):void {
    // ball.scaleX=centerScale+Math.sin(angle)*range;
    // ball.scaleY=centerScale+Math.sin(angle)*range;
    // angle+=speed;
    // }

    // AS3圆心旋转:
    // public function onEnterFrame(event:Event):void {
    // ball.x=centerX+Math.cos(angle)*radius;
    // ball.y=centerY+Math.sin(angle)*radius;
    // angle+=speed;
    // }

    // 椭圆旋转:
    // public function onEnterFrame(event:Event):void {
    // ball.x=centerX+Math.cos(angle)*radiusX;
    // ball.y=centerY+Math.sin(angle)*radiusY;
    // angle+=speed;
    // }
    // 处理出界对象：
    // if ( sprite.x - sprite.width / 2 > right ||
    // sprite.x +sprite.width / 2 < left ||
    // sprite.y - sprite.height / 2 > bottom ||
    // sprite.y + sprite.height / 2 < top )
    // {
    // // 移除对象代码（或 重置对象代码）
    // }

    // 屏幕环绕出界对象：
    // if ( sprite.x - sprite.width / 2 > right ) {
    // sprite.x = left – sprite.width / 2;
    // } else if ( sprite.x + sprite.width / 2 < left ) {
    // sprite.x = right + sprite.width / 2;
    // }
    // if ( sprite.y - sprite.height / 2 > bottom ) {
    // sprite.y = top – sprite.height / 2;
    // }else if ( sprite.y + sprite.height / 2 < top ) {
    // sprite.y = sprite.y + sprite.height / 2;
    // }
    // 向鼠标旋转(或向某点旋转)
    // dx = mouseX – sprite.x; dy = mouseY – sprite.y;
    // sprite.rotation = Math.atan2(dy, dx) * 180 / Math.PI;
    // 鼠标到Sprite之间连线
    // public function onMouseMove(event:MouseEvent):void {
    // graphics.clear();
    // graphics.lineStyle(1, 0, 1);
    // graphics.moveTo(sprite1.x, sprite1.y);
    // graphics.lineTo(mouseX, mouseY);
    // var dx:Number=sprite1.x-mouseX;
    // var dy:Number=sprite1.y-mouseY;
    // var dist:Number=int(Math.sqrt(dx*dx+dy*dy));
    // textField.text=dist.toString();
    // }
}