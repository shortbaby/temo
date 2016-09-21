/**
 * @fileOverview api
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

exports.routes = [
	{
		method: 'GET',
		path: '/',
		handler: function (request, reply) {
			var path = process.cwd();
			return reply.file(path + '/main.html');
		}
	},
	{
		method: 'GET',
		path: '/main.do',
		handler: function (request, reply) {
			var path = process.cwd();
			return reply.file(path + '/main.html');
		}
	}
];