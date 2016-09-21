/**
 * @fileOverview 合并plugin-css、js
 * @author XiaoBin Li
 */

'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('concat:plugin-script', ['dep'], function () {
    return gulp
        .src([
            'dep/jquery/dist/jquery.js',
            'dep/vue/dist/vue.js',
            'dep/vue-router/dist/vue-router.js',
            'dep/fastclick/lib/fastclick.js'
        ])
        .pipe(concat('plugins.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/'))
        .pipe(gulp.dest('output/src/'));
});

gulp.task('concat-plugin', ['concat:plugin-script'], function (cb) {
    console.log('concat plugin success');
    cb();
});
