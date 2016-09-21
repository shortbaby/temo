/**
 * @File vue disable指令
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

Vue.directive('disable', {
    update: function (value) {
         // 这里的 this 指向一个directive对象。
         // this.el 指向当前被绑定的DOM元素
         // value则是所绑定数据的新值
         if (!!value) {
         	$(this.el).addClass('disabled');
         	$(this.el).prop('disabled', !!value);
         }   
    }
})