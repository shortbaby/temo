/**
 * @fileOverview 微信扫码签到
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

import { getWechatSignature } from '../request';
import { parse } from '../util/url';
var url = parse(window.location.href);

export default function (wechatConfig) {
	var now = Math.floor(+new Date() / 1000);
	return getWechatSignature({
			url: url.origin + url.pathname + url.search
		})
		.then((res) => {
			var data = res.data;
			wechatConfig.url = data.url;
			wechatConfig.jsapi_ticket = data.jsapi_ticket;
			wechatConfig.signature = data.signature;
			wechatConfig.appId = data.appId;
			wechatConfig.timestamp = data.timestamp;
			wechatConfig.nonceStr = data.nonceStr;
			window.wx.config(wechatConfig);
		});
}