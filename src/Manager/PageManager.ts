/**
 *主页面管理器
 * @author 
 *
 */
class PageManager extends SingleBaseClass {
	public index: Index;
	public game: Game;
	public changpin: changpin;
	public Rank: Rank;
	public zhuliRank: zhuliRank;
	public Infos: Infos;
	public Ojoin: Ojoin;


	private nowView: egret.DisplayObject;

	public static _instance: PageManager;
	public static getInstance(): PageManager {
		if (!PageManager._instance) {
			PageManager._instance = new PageManager();
		}
		return PageManager._instance;
	}
	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.createGameScene, this);
	}
	private createGameScene() {
		Main.eventManager.addEventListener(EventManager.GOTO_INDEX, this.swichPage, this);
		Main.eventManager.addEventListener(EventManager.GOTO_GAME, this.swichPage, this);
		Main.eventManager.addEventListener(EventManager.GOTO_CHANGPIN, this.swichPage, this);
		Main.eventManager.addEventListener(EventManager.GOTO_RANK, this.swichPage, this);
		Main.eventManager.addEventListener(EventManager.GOTO_ZHULIRANK, this.swichPage, this);
		Main.eventManager.addEventListener(EventManager.GOTO_INFOS, this.swichPage, this);
		Main.eventManager.addEventListener(EventManager.GOTO_OJOIN, this.swichPage, this);

	}
	private swichPage(event: egret.Event) {
		if (this.nowView) {
			this.removeChild(this.nowView);
		}
		switch (event.type) {
			case EventManager.GOTO_INDEX:
				this.index = new Index();
				this.addChild(this.index);
				this.nowView = this.index;
				break;
			case EventManager.GOTO_GAME:
				this.game = new Game();
				this.addChild(this.game);
				this.nowView = this.game;
				break;
			case EventManager.GOTO_CHANGPIN:
				this.changpin = new changpin();
				this.addChild(this.changpin);
				this.nowView = this.changpin;
				break;
			case EventManager.GOTO_RANK:
				this.Rank = new Rank();
				this.addChild(this.Rank);
				this.nowView = this.Rank;
				break;
			case EventManager.GOTO_ZHULIRANK:
				this.zhuliRank = new zhuliRank();
				this.addChild(this.zhuliRank);
				this.nowView = this.zhuliRank;
				break;
			case EventManager.GOTO_INFOS:
				this.Infos = new Infos();
				this.addChild(this.Infos);
				this.nowView = this.Infos;
				break;
			case EventManager.GOTO_OJOIN:
				this.Ojoin = new Ojoin();
				this.addChild(this.Ojoin);
				this.nowView = this.Ojoin;
				break;
			default:
				break;
		}
	}
}
