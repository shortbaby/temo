/**
 * @fileOverview 获取某个订单的条形码
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

/**
 * 获取某个订单的条形码
 * @param {string} code
 */
Vue.filter('barcode', function(code) {
	if (!code) {
		return '';
	}
	return `http://m.genshuixue.com/static/barcode?&code=${code}`;
});