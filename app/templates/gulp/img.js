/**
 * @fileOverview 拷贝图片
 * @author XiaoBin Li (lixiaobin@baijiahulian.com)
 */

'use strict';

var gulp = require('gulp');


gulp.task('img', function () {

    return gulp
        .src(
            [
                // 'resource/webp/**/*.webp',
                'src/resource/img/**/*.jpg',
                'src/resource/img/**/*.png'
            ]
        )
        .pipe(gulp.dest('output/src/resource/img/'));

});