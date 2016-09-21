

'use strict';

/**
 * 格式化人民币金额
 * @param {string} date  
 * @param {string} pattern  
 * @return {string}         
 */
Vue.filter('money', function(number, decimal) {
	if (!number) {
		return '￥ 0.00';
	}
	let money;
	if (!decimal) {
		money = (parseFloat(number)).toFixed(2);
	} else if (decimal == 100) {
		money = (parseFloat(number) / decimal).toFixed(2);
	}
	
	return '￥' + money;
});