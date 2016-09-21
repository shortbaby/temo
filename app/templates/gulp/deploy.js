/**
 * @fileOverview build
 * @author XiaoBin Li (lixiaobin@baijiahulian.com)
 */

var gulp = require('gulp');

gulp.task('build',
	[
    	'concat-plugin',
    	'md5'
	]
);