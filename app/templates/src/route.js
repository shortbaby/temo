/**
 * @file 飞度定制版-路由配置
 * @author xuguanlong
 */

'use strict';

export function configRouter (router) {

	router.map({
		'/home': {
			tab: 'home',
			component: require('./modules/home/index.vue')
		},
		'*': {
			tab: '',
			component: require('./modules/not-found.vue')
		}
	});
	router.redirect({
	   '/': '/home',
	})
}