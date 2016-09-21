/**
 * @fileOverview  解析url
 * @author XiaoBin Li
 */


'use strict';

var host = location.hostname || location.host;
var hosts = host.split('.');
var envs = hosts[0].split('-');
var env = '';

if (envs.length > 1) {
    env = envs[0];
}

var search = location.search.slice(1);
var queries = search.split('&');
var qlen = queries.length;

var queryObj = {};

for (var i = 0; i < qlen; i++) {
    var tmpQuery = queries[i].split('=');
    queryObj[tmpQuery[0]] = tmpQuery[1];
}

/**
 * 获取项目的域名
 * @param {string} project
 */
function getProjectDomain(project) {
	if (project == 'www' && env == 'test') {
		return `http://${env}-${project}.ctest.baijiahulian.com/`;
	} else if (project == 'www' && env) {
		return `http://${env}.tianxiao100.com/`;
	} else if (project == 'www' && !env) {
		return 'http://www.tianxiao100.com/';
	} else if (env == 'test' || env == 'dev') {
		return  `http://${env}-${project}.ctest.baijiahulian.com/`;
	} else if (project == 'virgo'){
		return `http://${host}/`
	}
}

export default {
    env: env,
    virgo: getProjectDomain('virgo'),
    www: getProjectDomain('www'),
    query: queryObj
};