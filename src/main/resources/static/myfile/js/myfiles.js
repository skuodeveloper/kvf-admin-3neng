'use strict';
/**!
 * 首页
 * date:2021-05-06
 * author: fxyue;
 */

$(function () {
		// 初始化页面
		epoint.initPage('zgpersonalfileaction', null, function(data) {
			//加载图片
			if(data.imgUrl){
				$('#personphoto').attr("src",data.imgUrl);
			}
			//加载基础信息
			if(data.dataBean) {
				$("#a0101").append(data.dataBean.a0101);
				$("#a0103").append(data.dataBean.a0103);
				$("#a0106").append(data.dataBean.a0106);
				$("#a0104").append(data.dataBean.a0104);
				$("#a0109").append(data.dataBean.a0109);
				$("#a0107").append(data.dataBean.a0107);
				$("#a0128").append(data.dataBean.a0128);
				$("#a0111").append(data.dataBean.a0111);
				$("#a0120").append(data.dataBean.a0120);
				$("#a0117").append(data.dataBean.a0117);
				$("#a0116").append(data.dataBean.a0116);
				$("#a0133").append(data.dataBean.a0133);
				$("#a0197").append(data.dataBean.a0197);
				$("#a0134").append(data.dataBean.a0134);
			}
			//加载学历学位
			if (data.education) {
				$('#education').append(data.education);
			}
			if (data.education1) {
				$('#education1').append(data.education1);
			}
			if (data.graduate) {
				$('#graduate').append(data.graduate);
			}
			if (data.graduate1) {
				$('#graduate1').append(data.graduate1);
			}
			if (data.degree) {
				$('#degree').append(data.degree);
			}
			if (data.degree1) {
				$('#degree1').append(data.degree1);
			}
			if (data.schoolname) {
				$('#schoolname').append(data.schoolname);
			}
			if (data.schoolname1) {
				$('#schoolname1').append(data.schoolname1);
			}
			//渲染履历模板
			var lltemp = $('#llform-temp').html();
	        $("#llform").empty().append(Mustache.render(lltemp, {
	            items: data.llarr
	        }));  
	      	//渲染表彰奖励模板
			var bzjltemp = $('#bzjlform-temp').html();
	        $("#bzjlform").empty().append(Mustache.render(bzjltemp, {
	            items: data.bzjlarr
	        }));
	      	//渲染考核模板
			var khtemp = $('#khform-temp').html();
	        $("#khform").empty().append(Mustache.render(khtemp, {
	            items: data.kharr
	        })); 
	      	//渲染家庭成员模板
			var jtcytemp = $('#jtcyform-temp').html();
	        $("#jtcyform").append(Mustache.render(jtcytemp, {
	            items: data.jtcyarr
	        })); 
		});

	var $contentWrap = $('#content-wrap');

	var $backlink=$('.back-link');

	$backlink.on('click', function () {
		window.location.href = "../policeindex/index";
	});
	
	//  折叠点击
	$contentWrap.on('click', '.records-arr', function () {
		var $this = $(this);
		$this.toggleClass('active');
		$this.parents('.records-item')
			.find('.records-content')
			.slideToggle('fast');
	});
});