var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Mode = (function () {
    function Mode() {
    }
    return Mode;
}());
//用户id
Mode.openid = "";
//用户头像地址
Mode.imgUrl = "";
//用户姓名
Mode.userName = "";
/**是否正在震屏*/
Mode.isD = false;
/*本次游戏分数 */
Mode.score = 0;
/*token*/
Mode.nowTimer = 0;
/*服务器上分数 */
Mode.allScore = 0;
/*游戏剩余可玩次数 */
Mode.nums = 0;
Mode.porp = 0;
/*产品编号数 */
Mode.cpnum = 0;
/**排行榜按钮判断*/
Mode.isindex = false;
/**结束页音效判断*/
Mode.isgame = false;
/*加密的apikey */
Mode.apikey = "";
/*是否填写过信息*/
Mode.is_info = -1;
/*是否填写过信息*/
Mode.shareid = -1;
/**点赞完成*/
Mode.isdianzan = false;
//信息
Mode.namss = "";
Mode.iphss = "";
Mode.addzhi = "";
/**diyici*/
Mode.diyici = 0;
__reflect(Mode.prototype, "Mode");
//# sourceMappingURL=Mode.js.map