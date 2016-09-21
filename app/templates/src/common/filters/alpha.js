'use strict';

/**
 * 数字转成字母
 * @param {string} index     
 * @return {string}         
 */
const AlphaArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
Vue.filter('alpha', function(index) {
    if (index === null || index === undefined) {
        return '';
    }
    let i = parseInt(index);
    if (isNaN(i) || i < 0 || i > 26) {
        return '';
    }

    return AlphaArray[i];
});
