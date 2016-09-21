/**
 * @fileOverview 显示季度
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

/**
 * 显示季度
 * @param {number} value
 */
Vue.filter('season', function(value) {
	if (!value) {
		return '';
	}
 	var seasonOptions = {
 		1: '春季',
 		2: '暑期',
 		3: '秋季',
 		4: '寒假'
 	};
 	return seasonOptions[value];
});