/**
 * @fileOverview md5
 * @author xuguanlong
 */

'use strict';

var md5 = require("gulp-md5-plus");
var gulp = require('gulp');
var crypto = require('crypto');
var fs = require('fs');
var replace = require('gulp-replace');

gulp.task('md5:css', function () {
    return gulp
        .src([
            './output/src/resource/css/*.css'
        ])
        .pipe(md5(10, [
            './output/main.html'
        ]))
        .pipe(gulp.dest('./output/src/resource/css'));
});

gulp.task('md5:img', ['md5:css', 'img', 'html'], function() {
    return gulp
        .src([
            './output/src/resource/img/**/*.png',
            './output/src/resource/img/**/*.jpg',
            './output/src/resource/img/**/*.webp'
        ])
        .pipe(md5(10, './output/resource/css/**/*.css'))
        .pipe(gulp.dest('./output/src/resource/img'));
});

gulp.task('md5:script', ['script', 'concat-plugin', 'html'], function() {
     return gulp
        .src([
            './output/src/**/*.js'
        ])
        .pipe(md5(10, [
            './output/main.html'
        ]))
        .pipe(gulp.dest('./output/src'));
});

gulp.task('md5', [
    'md5:css',
    'md5:img',
    'md5:script'
], function (cb) {
    console.log('md5 success');
    cb();
});

