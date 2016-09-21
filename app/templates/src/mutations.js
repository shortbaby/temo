/**
 * @file 飞度定制版 gobal mutations
 * @author xuguanlong
 */

'use strict';
export default {
	'TOAST' (state, message, type) {
		state.showToast = true;
		state.toastMessage = message;
		if (type) {
			state.toastType = type;
		} else {
			state.toastType = 'warning';
		}
	},
	'HIDE_TOAST' (state) {
		state.showToast = false;
		state.toastMessage = '';
	}
}
