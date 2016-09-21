/**
 * @fileOverview url
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

/**
 * 把查询字符串解析成对象，反向操作可用 $.param
 *
 * @param {string} queryStr 查询字符串，可直接把 location.search 或 location.hash 扔进来解析
 * @return {Object}
 */
export function parseQuery (queryStr) {
    let result = { };

    if ($.type(queryStr) === 'string' && queryStr.length > 1) {

        let startIndex = 0;

        let firstChar = queryStr.charAt(0);

        // query 如 ?a=1
        if (firstChar === '?') {
            startIndex = 1;
        }
        // hash 如 #a=1
        else if (firstChar === '#') {
            startIndex = 1;

            let secondChar = queryStr.charAt(1);
            // hash 如 #/a=1&b=2
            if (secondChar === '/') {
                startIndex = 2;
            }
        }

        if (startIndex > 0) {
            queryStr = queryStr.substr(startIndex);
        }
        $.each(
            queryStr.split('&'),
            function (index, item) {
                let parts = item.split('=');
                if (parts.length === 2) {
                    let key = $.trim(parts[0]);
                    let value = $.trim(parts[1]) || '';

                    let specialChar = value.indexOf('#');


                    if (key.indexOf('?') > 0) {
                        key = key.split('?')[1];
                    }
                    if (specialChar >= 0) {
                        value = value.substring(0, specialChar);
                    }
                    if (key) {
                        result[key] = decodeURIComponent(value);
                    }
                }
            }
        );
    }

    return result;
}

/**
 * 获取当前网页的 origin（可在现代浏览器控制台输入 location.origin）
 *
 * @param {?string} url
 * @return {string}
 */
export function getOrigin (url) {

    if (!url) {
        url = document.URL;
    }

    return exports.parse(url).origin;

}

/**
 * 解析 url，返回格式遵循 location 属性的命名
 *
 * @param {string} url
 * @return {Object}
 */
export function parse (url) {

    let link = document.createElement('a');
    link.href = url;

    // 用 a 来格式化
    url = link.href;

    let origin = '';

    if (link.protocol && link.host) {
        origin = link.protocol + '//' + link.host;
    }
    else if (/^(http[s]?:\/\/[^/]+)(?=\/)/.test(url)) {
        origin = RegExp.$1;
    }

    // xp 下 http 可能会解析出 80 端口，实际是不需要的
    let terms = origin.split(':');

    if (origin.indexOf('http:') === 0
        && terms.length === 3
        && terms[2] == 80
    ) {
        terms.length = 2;
        origin = terms.join(':');
    }

    let pathname = link.pathname;

    if (pathname && pathname.charAt(0) !== '/') {
        pathname = '/' + pathname;
    }

    return {
        origin: origin,
        pathname: pathname,
        search: link.search
    };
}
