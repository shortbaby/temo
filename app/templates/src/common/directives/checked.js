/**
 * @File vue checked指令
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

Vue.directive('checked', {
    // 每当绑定的数据变化时，这个函数就被调用啦
    update: function (value) {
         // 这里的 this 指向一个directive对象。
         // this.el 指向当前被绑定的DOM元素
         // value则是所绑定数据的新值
         this.el.checked = !!value;
    }
})