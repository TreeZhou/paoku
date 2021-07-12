import DisplayObject = egret.DisplayObject;
import DisplayObjectContainer = egret.DisplayObjectContainer;
/**
 * Create by richliu1023
 * @date 2016-08-24
 * @email richliu1023@gmail.com
 * @github https://github.com/RichLiu1023
 * @description a simple explanation
 */
class GesturePanel extends DisplayObjectContainer {

	private _mousePoints:ur.Point[];
	private _currentPoint:ur.Point;
	private _layer:egret.Sprite;
	private gestureUtil:ur.UnistrokeRecognize = ur.UnistrokeRecognize.create();

	public constructor() {
		super();
	}

	init():void {
		this._layer = new egret.Sprite();
		this.addChild( this._layer );
		this.gestureUtil.addGesture( "seven",
									 [new ur.Point(256,294),new ur.Point(258,295),new ur.Point(260,295),new ur.Point(264,295),new ur.Point(270,295),new ur.Point(287,295),new ur.Point(320,297),new ur.Point(357,297),new ur.Point(390,299),new ur.Point(415,299),new ur.Point(428,299),new ur.Point(432,299),new ur.Point(436,299),new ur.Point(436,297),new ur.Point(434,299),new ur.Point(430,299),new ur.Point(415,309),new ur.Point(390,330),new ur.Point(355,362),new ur.Point(326,392),new ur.Point(305,418),new ur.Point(285,443),new ur.Point(272,463),new ur.Point(266,473),new ur.Point(264,477),new ur.Point(262,477),new ur.Point(262,477)] );
	}

	addEvent( target ):void {
		target.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this );
		target.addEventListener( egret.TouchEvent.TOUCH_END, this.mouseUp, this );
		target.addEventListener( egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this );
	}

	//响应函数
	private mouseDown( evt:egret.TouchEvent ) {
		this._layer.graphics.clear();
		var p:ur.Point = new ur.Point( evt.stageX, evt.stageY );
		this._currentPoint = p;
		this._mousePoints = [];
		this._mousePoints.push(p);
	}

	private mouseMove( evt:egret.TouchEvent ) {
		var p:ur.Point = new ur.Point( evt.stageX, evt.stageY );
		this._mousePoints.push(p);

		this._layer.graphics.lineStyle( 5, 0xffffff );
		this._layer.graphics.moveTo( this._currentPoint.x, this._currentPoint.y );
		this._layer.graphics.lineTo( p.x, p.y );
		this._layer.graphics.endFill();
		this._currentPoint = p;
	}

	private mouseUp( evt:egret.TouchEvent ) {
		this._mousePoints.push( new ur.Point( evt.stageX, evt.stageY ) );
		// var pointtmp:string = "";
		// pointtmp+="[";
		// for(var i:number=0;i<this._mousePoints.length;i++){
			
		// 	pointtmp+="new ur.Point("+this._mousePoints[i].x+","+this._mousePoints[i].y+")"
		// 	if(i!=this._mousePoints.length-1){
		// 		pointtmp+=",";
		// 	}
			
		// }
		// pointtmp+="]";
		// console.log(pointtmp);
		let start = new Date();
		egret.log('===================');
		let result = this.gestureUtil.recognize( this._mousePoints, false );
		egret.log( 'time ==>', new Date().getTime() - start.getTime() );
		egret.log( '画的名字:', result.name, '相似度:', result.score );

		this._layer.graphics.clear();
		var p:ur.Point = new ur.Point( evt.stageX, evt.stageY );
		this._currentPoint = p;
		this._mousePoints = [];
		this._mousePoints.push(p);
	}

}