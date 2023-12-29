/**
 * 框架个性化js 如果需要个性化框架通用的方法，请再此文件中进行。fui目录中的其他文件不允许修改。
 */

document.write("<script src='" + Util.getRootPath() + "ggaq/res/eputil.js'></script>");
document.write("<link rel='stylesheet' href='" + Util.getRootPath() + "ggaq/res/eputil.css'></link>");
// 考试
document.write("<script src='" + Util.getRootPath() + "exam/res/eputil-exam.js'></script>");
document.write("<link rel='stylesheet' href='" + Util.getRootPath() + "exam/res/eputil-exam.css'></link>");

document.write("<script src='" + Util.getRootPath() + "zjzg/exam/res/eputil-ywexam.js'></script>");
document.write("<link rel='stylesheet' href='" + Util.getRootPath() + "zjzg/exam/res/eputil-ywexam.css'></link>");
// 业务
document.write("<script src='" + Util.getRootPath() + "zhenggong/yewu/res/eputil-yewu.js'></script>");
document.write("<link rel='stylesheet' href='" + Util.getRootPath() + "zhenggong/yewu/res/eputil-yewu.css'></link>");
document.write("<script src='" + Util.getRootPath() + "ggaq/res/jquery.nicescroll.min.js'></script>");
document.write("<script src='" + Util.getRootPath() + "zhenggong/hr/res/eputil-hrpreview.js'></script>");

// 人事
/*document.write("<script src='" + Util.getRootPath() + "zhenggong/hr/res/eputil-hr.js'></script>");*/
SrcBoot.output([
	Util.getRootPath() + 'zhenggong/hr/res/eputil-hr.js',
]);

document.write("<link rel='stylesheet' href='" + Util.getRootPath() + "zhenggong/hr/res/eputil-hr.css'></link>");

//组件
document.write("<script src='" + Util.getRootPath() + "zj/res/eputil-zj.js'></script>");
document.write("<link rel='stylesheet' href='" + Util.getRootPath() + "zj/res/eputil-zj.css'></link>");

//组件计算工具
document.write("<script src='" + Util.getRootPath() + "zjcal/res/eputil-zjcal.js'></script>");
document.write("<link rel='stylesheet' href='" + Util.getRootPath() + "zjcal/res/eputil-zjcal.css'></link>");


// 个性化图标
document.write("<link rel='stylesheet' href='" + Util.getRootPath() + "extensionicon/iconfont.css'></link>");

// 业务分析

/*// 测试
document.write("<script src='" + Util.getRootPath() + "frame/fui/js/autoFIll.js'></script>");*/

mini.overwrite(mini.Tabs, {
	__OnMouseDown: function (e) {
		clearInterval(this._scrollTimer);
		if (this.tabPosition == "top" || this.tabPosition == "bottom") {
			var sf = this;
			var count = 0, num = 300;
			if (e.target == this._leftButtonEl) {
				this._scrollTimer = setInterval(function () {
					sf._headerEl.scrollLeft -= num;
					count++;
					if (count > 5) num = 18;
					if (count > 10) num = 25;
					sf._doScrollButton();
				}, 50);
			} else if (e.target == this._rightButtonEl) {
				this._scrollTimer = setInterval(function () {
					sf._headerEl.scrollLeft += num;
					count++;
					if (count > 5) num = 18;
					if (count > 10) num = 25;
					sf._doScrollButton();
				}, 50);
			} else if (e.target == this._headerMenuEl) {
				this._setHeaderMenuItems();
			}
			mini.on(document, "mouseup", this.__OnDocMouseUp, this);
		}
	}
});
if(location&&location.pathname){
	localStorage[location.pathname + '_leftmenustate']=true;
}