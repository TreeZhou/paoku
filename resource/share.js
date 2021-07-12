function doresige() {
	if (sessionStorage['appId']) {
		wx.config({
			debug: false,
			appId: sessionStorage['appId'],
			timestamp: sessionStorage['timestamp'],
			nonceStr: sessionStorage['nonceStr'],
			signature: sessionStorage['signature'],
			jsApiList: [
				'checkJsApi',
				'onMenuShareTimeline',
				'onMenuShareAppMessage',
				'onMenuShareQQ',
				'onMenuShareWeibo',
				'onMenuShareQZone',
				'hideMenuItems',
				'showMenuItems',
				'hideAllNonBaseMenuItem',
				'showAllNonBaseMenuItem',
				'translateVoice',
				'startRecord',
				'stopRecord',
				'onVoiceRecordEnd',
				'playVoice',
				'onVoicePlayEnd',
				'pauseVoice',
				'stopVoice',
				'uploadVoice',
				'downloadVoice',
				'chooseImage',
				'previewImage',
				'uploadImage',
				'downloadImage',
				'getNetworkType',
				'openLocation',
				'getLocation',
				'hideOptionMenu',
				'showOptionMenu',
				'closeWindow',
				'scanQRCode',
				'chooseWXPay',
				'openProductSpecificView',
				'addCard',
				'chooseCard',
				'openCard'
			]
		});
		wx.ready(function () {
			wx.onMenuShareAppMessage({
				title: window.Title,
				desc: window.Content,
				link: window.WebUrl + "/main.html",
				imgUrl: window.WebUrl + "/icon.jpg",
				success: function (res) {
					var context = egret.MainContext.instance;
					context.stage.dispatchEventWith("yifenxiang", false);
					MtaH5.clickShare('wechat_friend');
				},
				cancel: function (res) {
				},
				fail: function (res) {
					// var str = "";
					// for (var i in sessionStorage) {
					// 	str += sessionStorage[i];
					// }
					// alert(str);
				}
			});

			// 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
			wx.onMenuShareTimeline({
				title: window.Content,
				desc: window.Content,
				link: window.WebUrl + "/main.html",
				imgUrl: window.WebUrl + "/icon.jpg",
				success: function (res) {
					var context = egret.MainContext.instance;
					context.stage.dispatchEventWith("yifenxiang", false);
					MtaH5.clickShare('wechat_moments');
				},
				cancel: function (res) {
				},
				fail: function (res) {
				}
			});
			// 分享到QQ”按钮点击状态及自定义分享内容接口
			wx.onMenuShareQQ({
				title: window.Content,
				desc: window.Content,
				link: window.WebUrl + "/main.html",
				imgUrl: window.WebUrl + "/icon.jpg",
				success: function () {
					MtaH5.clickShare('qq');
				},
				cancel: function () {
				}
			});
			//分享到QQ空间
			wx.onMenuShareQZone({
				title: window.Content,
				desc: window.Content,
				link: window.WebUrl + "/main.html",
				imgUrl: window.WebUrl + "/icon.jpg",
				success: function () {
					MtaH5.clickShare('qzone');
				},
				cancel: function () {
				}
			});
			wx.checkJsApi({
				jsApiList: ['onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
				success: function (res) {
					var str = JSON.stringify(res.checkResult);
					if (str.indexOf("true") > 0) {
						console.log('分享注册成功');
					}
					else {
						// console.log('因微信原因获取不到权限重定向中');
						// window.location.href = window.WebUrl + "/main.html";
					}
				}

			});
		});
		// wx.error(function(res){
		// 		console.log("服务器参数有误重定向中");
		// 		window.location.href = window.WebUrl + "/main.html";
		// });
	}
	else {
	}

}
