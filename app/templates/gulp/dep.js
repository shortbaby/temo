/**
 * @fileOverview 拷贝fonticon
 * @author XiaoBin Li (lixiaobin@baijiahulian.com)
 */

'use strict';

var gulp = require('gulp');

gulp.task('dep', function () {
    return gulp
        .src(
            [
                'dep/**/*.woff',
                'dep/**/*.ttf',
                'dep/**/*.eot',
                'dep/**/*.svg',
                'dep/jquery/dist/jquery.js',
                'dep/vue/dist/vue.js',
                'dep/vue-router/dist/vue-router.js',
                'dep/fastclick/lib/fastclick.js'
            ]
        )
        .pipe(gulp.dest('output/dep/'));
        console.log('cp dep success');
});