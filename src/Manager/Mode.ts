class Mode {
    public constructor() {

    }
    //用户id
    public static openid: string = "";
    //用户头像地址
    public static imgUrl: string = "";
    //用户姓名
    public static userName: string = "";

    /**是否正在震屏*/
    public static isD: boolean = false;
    /*本次游戏分数 */
    public static score: number = 0;
    /*token*/
    public static nowTimer: number = 0;
    /*服务器上分数 */
    public static allScore: number = 0;
    /*游戏剩余可玩次数 */
    public static nums: number = 0;
    public static porp: number = 0;

    /*产品编号数 */
    public static cpnum: number = 0;
    /**排行榜按钮判断*/
    public static isindex: boolean = false;
    /**结束页音效判断*/
    public static isgame: boolean = false;
    /*加密的apikey */
    public static apikey: string = "";
    /*是否填写过信息*/
    public static is_info: number = -1;
    /*是否填写过信息*/
    public static shareid: number = -1;
    /**点赞完成*/
    public static isdianzan: boolean = false;

    //信息
    public static namss: string = "";

    public static iphss: string = "";

    public static addzhi: string = "";
    /**diyici*/
    public static diyici: number = 0;

}