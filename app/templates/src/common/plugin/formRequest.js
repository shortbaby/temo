/**
 * @file 用form构建post请求
 * @author XiaoBin Li(lixiaobin01@baidu.com)
 */

'use strict';

/**
 * 在iframe中构建form表单提交
 *
 * @param {string} path     请求地址
 * @param {Object} params   请求参数
 */
export default function(path, params) {
    var ifr = document.createElement('iframe');
    var idom = null;

    try {
        $(ifr).css({
            'position': 'absolute',
            'left': '-10000px',
            'top': '-10000px'
        });
        // We can use $('body').append(ifr). But this can't pass the
        // jasmine-node test since the jsdom mock is not perfect. It reports
        // error or 'Wrong Document'. So we use the native document API to
        // append the new document.
        document.getElementsByTagName('body')[0].appendChild(ifr);
        // Create the form content.
        var win = ifr.contentWindow || ifr; // 获取iframe的window对象
        idom = win.document; // 获取iframe的document对象
    } catch (e) {
        // 原始ie8下iframe性能的限制，有可能存在iframe未准备好，拒绝访问
        return;
    }

    var html = ['<form id="post-form" target="_blank" ',
                'action="', path, '" method="GET">'];
    for (var item in params) {
        html.push('<input type="hidden" name="', item, '" value="',
            params[item], '"/>');
    }
    html.push('</form>');
    var formContent = html.join('');
    idom.open();
    idom.write(formContent);
    idom.close();

    // Submit the form.
    idom.getElementById('post-form').submit();
    ifr.onload = function() {
        setTimeout(function() {
            $(ifr).remove();
        }, 100);
    };
};

