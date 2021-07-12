/**
 *  外部调用方法 TouchStyleEffects.touchStyleEffects(event.stageX,event.stageY);
 */
class TouchStyleEffects extends egret.Sprite {
	public constructor() {
		super();
	}
	private static _starColor: number;//星星颜色
	private static _size: number = 2;//星星大小
	private static _num: number = 10;//单次出现的个数
	private static _starDis: number = 10;//扩散距离

	public static touchStyleEffects(e:any, color: number = 0xeeeeee): void {
		this._starColor = color;
		for (var i: number = 0; i < this._num; i++) {
			var angle: number = 2 * Math.PI * Math.random();
			var disx: number = Math.sin(angle) * this._starDis;
			var disy: number = Math.cos(angle) * this._starDis;
			var startX: number = e.stageX + disx;
			var startY: number = e.stageY + disy;
			var endX: number = e.stageX + 4 * disx;
			var endY: number = e.stageY + 4 * disy;
			var r: number = this._size + this._size * Math.random();
			var R: number = 2 * r;
			var m: egret.Shape = new egret.Shape();
			var radius: number = 5;
			var color: number = 0xFFFFFF;
			m.graphics.lineStyle(2,Number(TouchStyleEffects.getRandomColor()));
			m.graphics.moveTo(radius, 0);
			m.graphics.beginFill(color);
			m.x = startX; m.y = startY;
			for (var k: number = 1; k < 11; k++) {
				var radius2: number = radius;
				if (k % 2 > 0) {
					radius2 = radius / 2;
				}
				var angle: number = Math.PI * 2 / 10 * k;
				m.graphics.lineTo(Math.cos(angle) * radius2, Math.sin(angle) * radius2);
			}
			egret.MainContext.instance.stage.addChild(m);

			egret.Tween.get(m).to({ alpha: 0, x: endX, y: endY, scaleX: 0.1, scaleY: 0.1 }, 500).call(this.removeStar, this, [m]);
		}
	}
	private static removeStar(star: egret.Shape) {
		egret.MainContext.instance.stage.removeChild(star);
	}
	private static getRandomColor():string{ 
		return '0x'+Math.floor(Math.random()*16777215).toString(16); 
	}
}