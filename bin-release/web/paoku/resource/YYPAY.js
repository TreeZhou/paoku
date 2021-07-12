/*
 * Copyright 2010 Nicholas C. Zakas. All rights reserved.
 * BSD Licensed.
 * modified by wushufeng 2014-07-01
 */


document.domain = 'flyh5.cn';//跨域值
var YYPAY= new Object();
YYPAY.XDStorage = function(origin, path){
    this.origin = origin;
    this.path = path;
    this._iframe = null;
    this._iframeReady = false;
    this._queue = [];
    this._requests = {};
    this._id = 0;
}

YYPAY.XDStorage.prototype = {

    op:{
        WRITE: 'W',
        READ: 'R',
        DEL: 'D',
        CLEAR: 'X'
    },
    //restore constructor
    constructor: YYPAY.XDStorage,

    //public interface methods

    init: function(){

        var that = this;

        if (!this._iframe){
            if (window.postMessage && window.JSON && window.localStorage){
                this._iframe = document.createElement("iframe");
                this._iframe.style.cssText = "position:absolute;width:1px;height:1px;left:-9999px;";
                document.body.appendChild(this._iframe);
                if (window.addEventListener){
                    this._iframe.addEventListener("load", function(){ that._iframeLoaded(); }, false);
                    // window.addEventListener("message", function(event){ that._handleMessage(event); }, false);
                } else if (this._iframe.attachEvent){
                    this._iframe.attachEvent("onload", function(){ that._iframeLoaded(); }, false);
                    // window.attachEvent("onmessage", function(event){ that._handleMessage(event); });
                }
            } else {
                throw new Error("Unsupported browser.");
            }
        }

        this._iframe.src = this.origin + this.path;

    },

    getValue: function(key, callback){

        if (!this._iframe){
            this.init();
        }
    },

    setValue: function(key,value,callback){

        this._toSend({
            key: key,
            op:  this.op.WRITE,
            value: value
        },callback);
    },
    delValue: function(key,callback){
        this._toSend({
            key: key,
            op: this.op.DEL,
            value: value
        },callback);
    },
    clearValue: function(callback){
        this._toSend({
            op: this.op.CLEAR
        },callback);
    },
    //private methods

    _toSend: function(params,callback){


        if (!this._iframe){
            this.init();
        }

    },

    _sendRequest: function(data){
        this._requests[data.request.id] = data;
        console.log(data.request);
        this._iframe.contentWindow.postMessage(JSON.stringify(data.request), this.origin);
    },

    _iframeLoaded: function(){
        this._iframeReady = true;

        if (!this._iframe){
            this.init();
        }
        var data=this._iframe.contentWindow.getValue();
        document.domain = window.location.host;
        for(var i in data){//用javascript的for/in循环遍历对象的属性
            sessionStorage.setItem(i,data[i]);
        }
        document.body.removeChild(this._iframe);

        // if(sessionStorage['openid']==null||sessionStorage['openid']==undefined||sessionStorage['openid']=='')
        // {
        //     window.location=window.ShareUrl;
        // }

        GetDataComplete();
    },

    _handleMessage: function(event){
        if (event.origin == this.origin){
            console.log(event.data);
            var data = JSON.parse(event.data);
            this._requests[data.id].callback && this._requests[data.id].callback(data.key, data.value);
            delete this._requests[data.id];
        }
    }

}

var openid;

function tracevalue(value) {
    console.log(value);
    openid=value;
    document.body.removeChild(remoteStorage._iframe);
}


window.onload=function () {
    var remoteStorage = new YYPAY.XDStorage("http://game.flyh5.cn", "/test.html");
    remoteStorage.init();
}
