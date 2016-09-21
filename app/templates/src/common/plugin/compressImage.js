/**
 * @file 图片裁剪压缩
 * @author zhujialu
 */

'use strict';

function _compressPhoto(extName, width, height, rawWidth, rawHeight) {

    var factor = 0.05;

    if ((rawWidth / rawHeight) / (height / width) > 1 + 2 * factor) {

        return '@1e_'
            + width
            + 'w_1c_0i_1o_90Q_1x.'
            + extName
            + '%7C0-'
            + factor * rawHeight
            + '-'
            + width
            + '-'
            + height
            + 'a.'
            + extName;

    }
    else {

        return compressImage(extName, width, height);

    }

}

function _compressImage(extName, width, height, noCrop) {

    var result = '@' + (noCrop ? 0 : 1) + 'e_';


    if (height) {
        result += height + 'h_';
    }

    return result
        + width
        + 'w_1c_0i_1o_90Q_1x.'
        + extName;
}


/**
 * 压缩图片
 *
 * @param {Object} options
 * @property {string} options.url 原始图片地址
 * @property {number} options.width 显示宽度
 * @property {number} options.height 显示高度
 * @property {number=} options.rawWidth 原图宽度
 * @property {number=} options.rawHeight 原图高度
 * @property {boolean} options.noCrop 是否不裁剪
 * @return {string} 压缩后的图片地址
 */
var compressImage = function (url, options) {

    if (options.height === 'auto') {
        options.height = 0;
    }

    if (options.defaultImage) {
        url = url || options.defaultImage;
    }

    if (!url) {
        return;
    }

    var extName = url.split('.').pop();
    if (extName === 'gif') {
        extName = 'jpg';
    }

    var width = options.width;
    var height = options.height;
    var rawWidth = options.rawWidth;
    var rawHeight = options.rawHeight;

    width = Math.floor(width);
    height = Math.floor(height);

    if (window.devicePixelRatio > 1) {
        width = Math.floor(width * 1.5);
        height = Math.floor(height * 1.5);
    }

    if (rawWidth != null && rawHeight != null) {
        rawWidth = Math.floor(rawWidth);
        rawHeight = Math.floor(rawHeight);

        return url + _compressPhoto(extName, width, height, rawWidth, rawHeight);
    } else {
        return url + _compressImage(extName, width, height, !!options.noCrop);
    }

};


module.exports = compressImage;
