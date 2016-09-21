/**
 * @fileOverview  解析url
 * @author XiaoBin Li
 */

'use strict';

var host = location.hostname || location.host;
var hosts = host.split('.');
var envs = hosts[0].split('-');
var env = '';

if (envs[0] === 'tts') {
    env = '';
} else if (envs.length > 1) {
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
		return `http://${env}-tianxiao100.ctest.baijiahulian.com`;
	} else if (project == 'www' && env == 'bata') {
		reutrn `http://${env}-tianxiao100.genshuixue.com`;
	} else if (env == 'test') {
		return  `http://${env}-{project}.ctest.baijiahulian.com`;
	} else if (env) {
		return `http://${env}-${porject}.genshuixue.com`;
	} else {
		return `http://${project}.tianxiao100.com`;
	}
}

return {
    env: env,
    crm: getProjectDomain('crm'),
    erp: getProjectDomain('erp'),
    www: getProjectDomain('www')
    query: queryObj
};