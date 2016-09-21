/**
 * @fileOverview 格式化分钟
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

/**
 * 格式化分钟
 * @param {number} value
 * @return {string}
 */
Vue.filter('minute', function(value) {
	if (!value) {
		return '';
	}
	if (value < 60) {
		return value + '分钟';
	} else {
		var hour = Math.floor(value / 60);
		var minute = value % 60;
		var result = hour + '小时';
		if (minute) {
			result += minute + '分钟';
		}
		return result;
	}
});