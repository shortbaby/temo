/**
 * @file 定制版-入口文件
 * @author xuguanlong
 */

'use strict';

import {
	configRouter
} from './route';
import store from './store';
import Toast from './common/components/Toast.vue';
import SideBar from './common/components/SideBar.vue';
import {getSys} from './common/util/ua';
// directives
require('./common/directives/disable');

// filters
require('./common/filters/date');
require('./common/filters/season');
require('./common/filters/compressImage');
require('./common/filters/str');
require('./common/filters/money');
require('./common/filters/alpha');
require('./common/filters/minute');
require('./common/filters/qrcode');
require('./common/filters/barcode');

Vue.use(VueRouter);

Vue.config.debug = false;
var App = Vue.extend({
	store,
	data() {
		return {
		}
	},
	methods: {
	},
	computed: {
		
		toastMessage() {
			return this.$store.state.toastMessage;
		},
		toastType() {
			return this.$store.state.toastType;
		},
		showToast() {
			return this.$store.state.showToast;
		},
		env() {
			return this.$store.state.env;
		}
	},
	components: {
		Toast: Toast,
		SideBar: SideBar
	}
});
const router = new VueRouter();
configRouter(router);
window.vueRoot = router.start(App, 'body');
window.router = router;
window.dispatch = store.dispatch;
window.Sys = getSys();

const $body = $('body');
window.removeBodyModalOpen = function() {
	$body.removeClass('modal-open');
};
