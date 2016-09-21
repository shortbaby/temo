'use strict';

const url = '/code/getVerifyCode.do';

export default function () {
	return url + '?time=' + new Date().getTime();
}