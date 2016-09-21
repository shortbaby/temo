/**
 * @file 浏览图片
 * @author xuguanong
 */


'use strict';

import ImagePlayer from '../plugin/imagePlayer';

export default function (event) {

    var target = $(event.currentTarget);
    var url = target.data('url') || target.data('src');
    var clazz = target.data('clazz');
    event.preventDefault();
    event.stopPropagation();

    var imgs = $('.' + clazz);

    var imgArray = [];

    imgs.each(function () {
        imgArray.push(
            this.dataset.url || this.dataset.src
        );
    });

    new ImagePlayer({
        datasource: imgArray,
        current: imgs.index(target)
    });
}