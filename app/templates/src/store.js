/**
 * @file 飞度定制版-store
 * @author xuguanlong
 */


'use strict';
var Vue = require('vue');
var Vuex = require('vuex');

import mutations from './mutations';
import env from './common/plugin/env';


Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		showToast: false,
		toastType: '',
		env: env,
		toastMessage: ''
	},
	strict: false,
	mutations,
	modules: {
	}
});


