/**
 * @fileOverview 拷贝html
 * @author XiaoBin Li (lixiaobin@baijiahulian.com)
 */

'use strict';

var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var replace = require('gulp-replace');

gulp.task('html', function () {
    return gulp
        .src([
        	'main.html',
            'area.html',
        	'favicon.ico'
        ])
        .pipe(replace(/output\//g, ''))
        .pipe(replace(/\.scss/g, '.css'))
        .pipe(minifyHtml())
        .pipe(gulp.dest('output/'));
});