

'use strict';

/**
 * 参数转成字符串 
 * @param {string || Number} val   
 * @return {string}         
 */
Vue.filter('str', {

	read: function(val) {
		if (val === undefined) {
			return '';
		}
		return val.toString();
	},
	write: function(val, oldVal) {
		if (val.constructor == Array && val.length > 0) {
			val = val[0];
		}
		if (val.constructor == Array && val.length == 0) {
			val = undefined;
		}
		return isNaN(val) ? val : parseInt(val);
	}
});