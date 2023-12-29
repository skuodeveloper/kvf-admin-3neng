'use strict';
/**!
 * 子页公共js
 * date:2021-07-01
 * author: wuzhou;
 */

$(function () {
	// 加载头部
	var $topInfo = $('#top-info');
	$topInfo.load('../../../zjzg/zhenggong/zg/policeindex/include/header.inc.html', function () {
		//获取时间
		var $dateDom = $('#date'),
			$hourDom = $('#hour');

		function setDate() {
			var hourTxt = Util.dateFormat(new Date, 'HH:mm:ss'),
				dateTxt = Util.dateFormat(new Date, 'yyyy年MM月dd日');
			$dateDom.text(dateTxt);
			$hourDom.text(hourTxt);
		}
		setDate();
		
		setInterval(function () {
			setDate();
		}, 1000);

	});


});