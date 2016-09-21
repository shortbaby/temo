/**
 * @fileOverview 格式化时间
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

/**
 * 格式化时间 
 * @param {string} date  
 * @param {string} pattern  
 * @return {string}         
 */
var Vue = require('vue');
Vue.filter('date', function(date, pattern, lang) {
	if (!date) {
		return '';
	}
	return Date.format(new Date(date), pattern);
});