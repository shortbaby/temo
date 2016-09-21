/**
 * @fileOverview 模态框
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

var modal = require('../../../dep/vue-strap/src/Modal.vue');
var str = 
        `<div id="vue-ui-confirm">
            <modal :show.sync="show" :title="title" :callback="callback" :close="close" :effect="effect" :width="300">
                <div class="modal-header" slot="modal-header">
                    <h4 class="modal-title">{{title}}</h4>
                </div>
                <div class="modal-body" slot="modal-body">
                    <span class="icon-info-circle"></span>
                    <div class="confirm-content">{{{content}}}</div>
                </div>
                <div slot="modal-footer">
                    <div class="modal-footer">
                        <button @click.stop="callback($event)" class="btn btn-primary">确定</button>
                        <button @click.stop="close()" class="btn btn-default">取消</button>
                    </div>
                </div>
            </modal>
      </div>`;

    $('body').append(str);

    var vm = new Vue({
        el: '#vue-ui-confirm',
        data : {
            show: false,
            effect: 'fade',
            title: '提示',
            content: '',
            close: function () {},
            callback: function () {}
        },
        components: {
            modal: modal
        }
    });

/**
 * @param {Object} option
 * @property {string} option.title 标题
 * @property {string} option.content 弹层内容
 * @property {Function} option.callback 确认弹层回调 
 */
export default function (option) {
        
    var defaultOptions = {
        show: true
    };

    $.extend(defaultOptions, 
        option,
        {
            callback: function () {
                vm.$set('show', false);
                option.callback();
            }
        },
        {
            close: function () {
                vm.$set('show', false);
                if (option.close && $.type(option.close) == 'function') {
                    option.close();
                }
            }
        }
    );

    $.each(defaultOptions, function (key, value) {
        vm.$set(key, value);
    });
}

