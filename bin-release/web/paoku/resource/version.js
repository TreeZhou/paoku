/**
 * Created by Administrator on 2016/8/9.
 */
var fs = require('fs');
var filename = "default.res.json";

fs.readFile(filename,"utf-8",function(err,data){
   if( err != void 0 ){
       console.log("error:".err);
       return;
   }

    var info = JSON.parse(data);
    var arr = info["resources"];
    var version = Math.floor(Date.now()/1000);
    for( var i = 0 ;i < arr.length; i++ ){
        var obj = arr[i];
        var url = obj["url"];
        var index = url.indexOf("?") ;
        if( index != -1 ){//先去掉旧的版本号
            url = url.slice(0,index);
        }
        url = url + "?v=" + version;
        obj["url"] = url;
    }
    var content = JSON.stringify(info);
    writeFile(filename,content);
});

function writeFile(saveName,content) {// saveName 写入文件名字 content 保存的内容
    fs.writeFile(saveName,content,null,function(err){
        if( err != void 0 ){
            console.log("save error");
        }else{
            console.log("save success");
        }
    })
}