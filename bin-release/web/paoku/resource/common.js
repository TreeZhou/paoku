// 动态插入script标签 
function createScript(url, callback) {
        var oScript = document.createElement('script');
        oScript.type = 'text/javascript';
        oScript.async = true;
        oScript.src = url + "?v=" + new Date().getTime();
        /* 
        ** script标签的onload和onreadystatechange事件 
        ** IE6/7/8支持onreadystatechange事件 
        ** IE9/10支持onreadystatechange和onload事件 
        ** Firefox/Chrome/Opera支持onload事件 
        */

        // 判断IE8及以下浏览器 
        var isIE = !-[1,];
        if (isIE) {
                alert('IE')
                oScript.onreadystatechange = function () {
                        if (this.readyState == 'loaded' || this.readyState == 'complete') {
                                callback();
                        }
                }
        } else {
                // IE9及以上浏览器，Firefox，Chrome，Opera 
                oScript.onload = function () {
                        callback();
                }
        }
        document.body.appendChild(oScript);
}
function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
}
if (GetQueryString("debug") == "true") {
createScript('./resource/x_debug.js', function () {
        var vConsole = new VConsole();
});
}
//重写alert 去除网址显示
window.alert = function (name) {
        var iframe = document.createElement("IFRAME");
        iframe.style.display = "none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        window.frames[0].window.alert(name);
        iframe.parentNode.removeChild(iframe);
        }
//confirm 去除网址显示
window.confirm = function (name) {
        var iframe = document.createElement("IFRAME");
        iframe.style.display = "none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        window.frames[0].window.confirm(name);
        iframe.parentNode.removeChild(iframe);
        }