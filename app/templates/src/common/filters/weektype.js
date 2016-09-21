/**
 * @fileOverview 显示周几
 */

'use strict';

/**
 * 显示季度
 * @param {number} value
 */
Vue.filter('weektype', function(value) {
	if (!value) {
		return '';
	}
 	var options = {
 		1: '周一',
 		2: '周二',
 		3: '周三',
 		4: '周四',
 		5: '周五',
 		6: '周六',
 		7: '周日'
 	};
 	return options[value];
});