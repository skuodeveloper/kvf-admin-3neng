/**
 * 开始答题
 * 
 * @param {}
 *            paperInsGuid
 */
examUtil.beginOnlineExam = function(paperInsGuid, examGuid) {
	// 低版本浏览器不允许参加考试
	if (Util.browsers.isIE67 || Util.browsers.isIE8 || Util.browsers.isIE9) {
		eputil.alert("请使用IE10+或chrome浏览器答题，不支持低版本浏览器！");
		return;
	}

	// 开启F11模式，并监控键盘的F11操作，后面再说

	// 阻止各种关闭窗口事件
	// try {
	// window.onbeforeunload = onbeforeunload_handler;
	// function onbeforeunload_handler() {
	// var warning = "确认退出考试?";
	//
	// return warning;
	// }
	// } catch (e) {
	//
	// }

	var url = Util.getRootPath() + "zjzg/exam/front/paper/exampaperinsonlineanswer?paperInsGuid=" + paperInsGuid;
	if (examGuid) {
		url += "&examGuid=" + examGuid;
	}

	window.open(url);
};