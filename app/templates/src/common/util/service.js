/**
 * @fileOverview service util
 * @author XiaoBin Li (lixiaobin@baijiahulian.ocm)
 */

'use strict';


import env from '../plugin/env';

/**
 * 错误处理
 *
 * @inner
 * @param {Object} response 返回的 JSON 数据
 * @return {Object}
 */
function errorHandler(response) {

    var code = response.code;

    if (code !== 0) {

        // 未登录
        if (code === 2022030500) {
            window.location.href = `/login.html`;
            return;
        } else if (code === 2022036001) {  // 员工转移业务
            return;
        }

        var msg = response.msg || '系统异常';
        if (window.dispatch) {
            dispatch('TOAST', msg); 
        }
    }

    return response;
}

/**
 * 发送 post 请求
 *
 * @param {string} url 请求 url
 * @param {Object} data 发送的数据
 * @param {boolean} sync 是否是同步请求
 * @return {Promise}
 */
export function postJSON (url, data={}, handler, sync) {
    return requestJSON(url, data, handler, sync, 'post');
}

/**
 * 发送请求
 * @param {string} url 请求 url
 * @param {Object} data 发送的数据
 * @param {boolean} sync 是否是同步请求
 * @param {string} method get|post
 * @return {Promise}
 */
function requestJSON (url, data, handler, sync, method) {
    var defer = $.Deferred();

    $
        .ajax({
            url: url,
            data: JSON.stringify(data),
            method: method,
            dataType: 'json',
            async: sync ? false : true,
            contentType: 'application/json',
            processData: false
        })
        .done(function (res) {
            if (res.code) {
                if (handler) {
                    handler(res);
                } else {
                    errorHandler(res);
                }
                
                defer.reject(res);
            } else {
                defer.resolve(res);
            }
        })
        .fail(function (res) {
            errorHandler(res);
            dispatch('TOAST', '网络异常');
            defer.reject(res);
        });
        return defer;
}

/**
 * 发送 post 请求
 *
 * @param {string} url 请求 url
 * @param {Object} data 发送的数据
 * @param {boolean} sync 是否是同步请求
 * @return {Promise}
 */
export function post (url, data={}, handler, sync) {
    return request(url, data, handler, sync, 'post');
}

/**
 * 发送请求
 * @param {string} url 请求 url
 * @param {Object} data 发送的数据
 * @param {boolean} sync 是否是同步请求
 * @param {string} method get|post
 * @return {Promise}
 */
function request (url, data, handler, sync, method) {

    var defer = $.Deferred();
    // 去掉参数的字符串空格
    // if ($.type(data) == 'object') {
    //     for (let key in data) {
    //         if ($.type(data[key]) == 'string') {
    //             data[key] = data[key].replace(/[ ]/g,"");
    //         }
    //     }
    // }
    $
        .ajax({
            url: url,
            data: data,
            method: method,
            dataType: 'json',
            async: sync ? false : true
        })
        .done(function (res) {
            if (res.code) {
                if (handler) {
                    handler(res) 
                } else {
                    errorHandler(res);
                }
                defer.reject(res);
            } else {
                defer.resolve(res);
            }
        })
        .fail(function (res) {
            // errorHandler(res);
            dispatch('TOAST', '网络异常');
            defer.reject(res);
        });
        return defer;
}

/**
 * 发送 get 请求
 *
 * @param {string} url 请求 url
 * @param {Object} data 发送的数据
 * @param {boolean} sync 是否是同步请求
 * @return {Promise}
 */
export function get (url, data, handler, sync) {
    return request(url, data, handler, sync, 'get');
}

/**
 * 发送跨域的jsonp请求
 *
 * @param  {string} url
 * @param  {Object} data
 * @return {Promise}
 */
export function getJsonp(url, data) {
    return $.ajax({
        url: url,
        data: data,
        dataType: 'jsonp'
    });
}
