var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author  lq
 *
 */
var DecodeStr = (function () {
    function DecodeStr() {
    }
    DecodeStr.decode = function (input) {
        var output = "", chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
        input = this._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    };
    DecodeStr._utf8_encode = function (utftext) {
        var string = "", i = 0, c = 0, c1 = 0, c2 = 0, c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    };
    /**
     *   var time = DecodeStr.decode(Math.floor((new Date().getTime()) / 1000) + "");
        var grade = DecodeStr.decode("user_grade=" + this.layer.text);
        var sig = new md5();
        var _data = time + "." + grade + "." + sig.hex_md5(time + grade + "apikey");
        console.log(time, this.info, grade);
     *
     * */
    DecodeStr.setencode = function (data, key, time) {
        if (data === void 0) { data = null; }
        if (key === void 0) { key = null; }
        if (time === void 0) { time = new Date().getTime(); }
        var _time = DecodeStr.decode(Math.floor((time) / 1000) + "");
        var _grade = DecodeStr.decode(data);
        var _sig = new md5();
        var _data = _time + "." + _grade + "." + _sig.hex_md5(_time + _grade + key);
        return _data;
    };
    return DecodeStr;
}());
DecodeStr._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
__reflect(DecodeStr.prototype, "DecodeStr");
//# sourceMappingURL=DecodeStr.js.map