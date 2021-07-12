/**
 * Created by JL on 2016/3/4.
 */
 
//可以放在 ts 文件内（建议在顶部或者底部，中间的没试过）或者单独放到一个 .d.ts 文件中，请不要放在其他类型的文件内。msg 类型根据函数体判断。
declare function setCookie(name,value,expiredays);
 
declare function getCookie(name);
 
declare function delCookie(name);