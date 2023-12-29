var hrUtil = {};
/** ***eputil额外方法开始***** */
// 部门、用户权限树，顶层权限
hrUtil.topRight = "topRight";

hrUtil.idCardValidate = function(idcard, birthday, sex) {
	var errors = new Array("", "身份证号码位数不对!", "身份证号码出生日期超出范围或含有非法字符!", "身份证号码校验位错误，不予通过!", "身份证地区非法!", "身份证号码与人员出生日期校验存在误差，不予通过！", "身份证号码与人员性别校验存在误差，不予通过！");
	var area = {
		11 : "北京",
		12 : "天津",
		13 : "河北",
		14 : "山西",
		15 : "内蒙古",
		21 : "辽宁",
		22 : "吉林",
		23 : "黑龙江",
		31 : "上海",
		32 : "江苏",
		33 : "浙江",
		34 : "安徽",
		35 : "福建",
		36 : "江西",
		37 : "山东",
		41 : "河南",
		42 : "湖北",
		43 : "湖南",
		44 : "广东",
		45 : "广西",
		46 : "海南",
		50 : "重庆",
		51 : "四川",
		52 : "贵州",
		53 : "云南",
		54 : "西藏",
		61 : "陕西",
		62 : "甘肃",
		63 : "青海",
		64 : "宁夏",
		65 : "新疆",
		71 : "台湾",
		81 : "香港",
		82 : "澳门",
		91 : "国外"
	};
	var Y, JYM;
	var S, M;
	var idcardArray = new Array();
	idcard = idcard.toUpperCase();
	idcardArray = idcard.split("");
	// 地区检验
	if (area[parseInt(idcard.substr(0, 2))] == null)
		return errors[4];
	// 身份号码位数及格式检验
	switch (idcard.length) {
		case 15 :
			if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
				ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; // 测试出生日期的合法性
			} else {
				ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; // 测试出生日期的合法性
			}
			if (ereg.test(idcard)) {
				if (typeof(birthday) != "undefined" && birthday != "" && ("19" + idcard.substr(6, 6)) != eputil.dateUtil.format(birthday, "yyyyMMdd")) {
					return errors[5];
				}
				if (typeof(sex) != "undefined" && sex != "") {
					if (sex == '2' && parseInt(idcard.substr(16, 1)) % 2 != 0) {
						return errors[6];
					} else if (sex == '1' && parseInt(idcard.substr(16, 1)) % 2 != 1) {
						return errors[6];
					}
				}
				return errors[0];
			} else
				return errors[2];
			break;
		case 18 :
			if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
				// alert(1);
				ereg1 = /^[1-9][0-9]{5}20[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; // 闰年出生日期的合法性正则表达式
				ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; // 闰年出生日期的合法性正则表达式
			} else {
				// alert(2);
				ereg1 = /^[1-9][0-9]{5}20[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; // 平年出生日期的合法性正则表达式
				ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; // 平年出生日期的合法性正则表达式
			}
			if (ereg.test(idcard) || ereg1.test(idcard)) { // 测试出生日期的合法性
				// 计算校验位
				S = (parseInt(idcardArray[0]) + parseInt(idcardArray[10])) * 7 + (parseInt(idcardArray[1]) + parseInt(idcardArray[11])) * 9 + (parseInt(idcardArray[2]) + parseInt(idcardArray[12]))
						* 10 + (parseInt(idcardArray[3]) + parseInt(idcardArray[13])) * 5 + (parseInt(idcardArray[4]) + parseInt(idcardArray[14])) * 8
						+ (parseInt(idcardArray[5]) + parseInt(idcardArray[15])) * 4 + (parseInt(idcardArray[6]) + parseInt(idcardArray[16])) * 2 + parseInt(idcardArray[7]) * 1
						+ parseInt(idcardArray[8]) * 6 + parseInt(idcardArray[9]) * 3;
				Y = S % 11;
				M = "F";
				JYM = "10X98765432";
				M = JYM.substr(Y, 1); // 判断校验位
				if (M == idcardArray[17]) {
					if (typeof(birthday) != "undefined" && birthday != "" && (idcard.substr(6, 8)) != eputil.dateUtil.format(birthday, "yyyyMMdd")) {
						return errors[5];
					}
					if (typeof(sex) != "undefined" && sex != "") {
						if (sex == '2' && parseInt(idcard.substr(16, 1)) % 2 != 0) {
							return errors[6];
						} else if (sex == '1' && parseInt(idcard.substr(16, 1)) % 2 != 1) {
							return errors[6];
						}

					}
					return errors[0]; // 检测ID的校验位
				} else
					return errors[3];
			} else
				return errors[2];
			break;
		default :
			return errors[1];
			break;
	}
}
// 不展示导入的图标
// 全局去除附件上传控件箭头
/*
 * mini.findControls(function(ctr) { return ctr.type === 'webuploader'; }).forEach(function(ctr) { ctr.setShowIcon(false); });
 * 
 * mini.WebUploader.prototype.showIcon = false;
 */

eputil.mapUrl.root = "";

// 加上高度
eputil.dialogHeightBig = 800;

// eputil.previewUrl = eputil.LOCALHOST;

// 调用后台判断角色，返回提示checkUserExistRoleInTypeName
// eputil.checkRole = function(checkMsg) {
// if (checkMsg) {
// epoint.alert(checkMsg);
//
// $(".mini-button").each(function() {
// var button = mini.get(this.id);
// if (button && !$(this).hasClass("mini-messagebox-button")) {
// button.disable();
// }
// });
// // 禁用上传
// $(".mini-webuploader").each(function() {
// var uploader = mini.get(this.id);
// if (uploader) {
// uploader.disable();
// }
// });
// }
// }

/**
 * enter键搜索
 */
eputil.enterSearch = function(domId, callback) {
	$("#" + domId).keydown(function() {
		if (event.keyCode == "13") {
			if (callback) {
				callback();
			} else {
				eputil.searchDataFirst();
			}
		}
	});
}

/** 组织架构选择树 * */
eputil.frameOuTreeSelectCall = function(data) {

};

// //////////////部门权限弹出树///////////////////////

// ////////////////部门顶层权限弹出树//////////////////////
eputil.openFrameOuTopRightTreeSingle = function(e) {
	eputil.openFrameOuRightTree(e, "single", hrUtil.topRight);
};
eputil.openFrameOuTopRightTreeMulti = function(e) {
	eputil.openFrameOuRightTree(e, "multi", hrUtil.topRight);
};
// ////////////////部门顶层权限弹出树//////////////////////

// ////////////////部门顶层权限弹出树//////////////////////
eputil.openFrameOuRightTreeSingle = function(e, ouGuid) {
	eputil.openFrameOuRightTree(e, "single", ouGuid);
};
eputil.openFrameOuRightTreeMulti = function(e, ouGuid) {
	eputil.openFrameOuRightTree(e, "multi", ouGuid);
};

eputil.openFrameOuRightTree = function(e, mode, ouGuid) {
	// var rightOuGuid = '';
	// if (typeof (ouGuid) != "undefined") {
	// rightOuGuid = ouGuid;
	// }

	var source = {};
	var url = null;
	var param = null;

	if (e && e.source) {
		source = e.source;
	}

	if (mode == "single") {
		url = "zhenggong/hr/tree/hrframeoutreesingle?ouGuid=" + (ouGuid || '');
		param = {
			width : 550,
			height : 550
		}
	} else {
		url = "zhenggong/hr/tree/hrframeoutreemulti?ouGuid=" + (ouGuid || '');
		param = {
			width : 800,
			height : 800
		}

		if (source.type == "buttonedit") {
			param.param = {
				ouGuids : source.getValue(),
				ouNames : source.getText()
			}
		}
	}

	epoint.openTopDialog('选择部门', url, function(rtn) {
		if (eputil.treeNodeSelectDataBind(source, mode, rtn)) {
			eputil.frameOuTreeSelectCall(rtn);
		}
	}, param);
};

eputil.openFrameOuTreeSingle = function(e) {
	eputil.openFrameOuTree(e, "single");
};
eputil.openFrameOuTreeMulti = function(e) {
	eputil.openFrameOuTree(e, "multi");
};

eputil.openFrameOuTree = function(e, mode) {
	var rightOuGuid = '';
	if (typeof(ouGuid) != "undefined") {
		rightOuGuid = ouGuid;
	}

	var source = {};
	var url = null;
	var param = null;
	// 控制是否带其他选项的Flag
	var otherbuttonflag = '';
	if (e && e.source) {
		source = e.source;
	}

	if (e.source.openouright == "1") {
		rightOuGuid = "topRight"
	}
	if (e.source.fromUserInfo == 0) {
		otherbuttonflag = 0;
	}
	if (mode == "single") {
		url = "zhenggong/hr/tree/hrframeoutreesingle?ouGuid=" + (rightOuGuid || '') + "&otherbuttonflag=" + otherbuttonflag;
		param = {
			width : 350,
			height : 800
		}
	} else {
		url = "zhenggong/hr/tree/hrframeoutreemulti?ouGuid=" + (rightOuGuid || '') + "&otherbuttonflag=" + otherbuttonflag;
		param = {
			width : 800,
			height : 800
		}
		if (source.type == "buttonedit" || source.type == "combobox") {
			param.param = {
				ouGuids : source.getValue(),
				ouNames : source.getText()
			}
		}
	}
	epoint.openTopDialog('选择部门', url, function(rtn) {
		if (eputil.treeNodeSelectDataBind(source, mode, rtn)) {
			eputil.frameOuTreeSelectCall(rtn);
			// combobox.setValue(rtn.oucode);
		}
	}, param);
};

// /////////////gab部门选择树(目前仅单选)//////////////////////////
eputil.openGabFrameOuTreeSingle = function(e) {
	eputil.openGabFrameOuTree(e, "single");
};

eputil.openGabFrameOuTree = function(e, mode) {

	var source = {};
	var url = null;
	var param = null;

	if (e && e.source) {
		source = e.source;
	}

	if (mode == "single") {
		url = "zhenggong/hr/tree/hrgabframeoutreesingle";
		param = {
			width : 350,
			height : 500
		}
	}

	epoint.openTopDialog('选择部门', url, function(rtn) {
		if (eputil.treeNodeSelectDataBind(source, mode, rtn)) {
			eputil.gabFrameOuTreeSelectCall(rtn);
		}
	}, param);
};

/** 组织架构选择树 * */
eputil.gabFrameOuTreeSelectCall = function(data) {

};

// /////////////部门（选中父节点，不会选择子节点）弹出树 (目前仅多选树)///////////////////////
eputil.openFrameOuOnlyOptPnodeTreeMulti = function(e, relationOuGuids, ouLevel) {
	eputil.openFrameOuOnlyOptPnodeTree(e, "multi", relationOuGuids, ouLevel);
};

eputil.openFrameOuOnlyOptPnodeTree = function(e, mode, relationOuGuids, ouLevel) {
	var rightRelationOuGuids = '';
	var rightOuLevel = '';
	if (typeof(relationOuGuids) != "undefined") {
		rightRelationOuGuids = relationOuGuids;
	}
	if (typeof(ouLevel) != "undefined") {
		rightOuLevel = ouLevel;
	}

	var source = {};
	var url = null;
	var param = null;
	if (e && e.source) {
		source = e.source;
	}
	if (mode == "multi") {
		url = "zhenggong/hr/tree/hrframeouonlyoptpnodetreemulti";
		if (rightOuLevel) {
			url += "?ouLevel=" + rightOuLevel;
		}
		param = {
			width : 800,
			height : 800
		}
		if (source.type == "buttonedit") {
			param.param = {
				ouGuids : source.getValue(),
				ouNames : source.getText()
			}
		}
		param.param.relationOuGuids = rightRelationOuGuids || '';
	}

	epoint.openTopDialog('选择部门', url, function(rtn) {
		if (eputil.treeNodeSelectDataBind(source, mode, rtn)) {
			eputil.frameOuOnlyOptPnodeTreeSelectCall(rtn);
		}
	}, param);
};

/** 组织架构选择树 * */
eputil.frameOuOnlyOptPnodeTreeSelectCall = function(data) {

};

// //////////////////弹出用户树///////////////////////

eputil.frameOuUserTreeSelectCall = function(data) {

};

hrUtil.openFrameOuUserTreeSingle = function(e) {
	hrUtil.openFrameOuUserTree(e, "single");
};
hrUtil.openFrameOuUserTreeMulti = function(e) {
	hrUtil.openFrameOuUserTree(e, "multi");
};

eputil.openFrameOuUserTreeSingle = function(e) {
	eputil.openFrameOuUserTree(e, "single");
};
eputil.openFrameOuUserTreeMulti = function(e) {
	eputil.openFrameOuUserTree(e, "multi");
};

eputil.openFrameOuUserTree = function(e, mode) {
	var rightOuGuid = '';
	if (typeof(ouGuid) != "undefined") {
		rightOuGuid = ouGuid || '';
	}

	var source = {};
	var url = null;
	var param = null;

	if (e && e.source) {
		source = e.source;
	}

	if (mode == "single") {
		url = "zhenggong/hr/tree/hrframeouusertreesingle?ouGuid=" + (rightOuGuid || '');
		param = {
			width : 350,
			height : 800
		}
	} else {
		url = "zhenggong/hr/tree/hrframeouusertreemulti?ouGuid=" + (rightOuGuid || '');
		param = {
			width : 800,
			height : 800
		}

		if (source.type == "buttonedit") {
			param.param = {
				userGuids : source.getValue(),
				userNames : source.getText()
			}
		}
	}

	epoint.openTopDialog('选择用户', url, function(rtn) {
		if (eputil.treeNodeSelectDataBind(source, mode, rtn)) {
			eputil.frameOuUserTreeSelectCall(rtn);
		}
	}, param);
};

hrUtil.openFrameOuUserTree = function(e, mode) {
	var rightOuGuid = '';
	if (typeof(ouGuid) != "undefined") {
		rightOuGuid = ouGuid || '';
	}

	var source = {};
	var url = null;
	var param = null;

	if (e && e.source) {
		source = e.source;
	}

	if (mode == "single") {
		url = "zhenggong/hr/tree/hrframeouusertreesingle?ouGuid=" + (rightOuGuid || '');
		param = {
			width : 350,
			height : 600
		}
	} else {
		url = "zhenggong/hr/tree/hrframeouusertreemulti?ouGuid=" + (rightOuGuid || '');
		param = {
			width : 800,
			height : 800
		}

		if (source.type == "buttonedit") {
			param.param = {
				userGuids : source.getValue(),
				userNames : source.getText()
			}
		}
	}

	epoint.openTopDialog('选择用户', url, function(rtn) {
		if (eputil.treeNodeSelectDataBind(source, mode, rtn)) {
			eputil.frameOuUserTreeSelectCall(rtn);
		}
	}, param);
};

// 输入框关闭按钮
eputil.onCloseClick = function(e) {
	var obj = e.sender;
	obj.setText("");
	obj.setValue("");
}

eputil.bigScreenAjax = function(cfg) {
	if (!cfg) {
		console.error('参数缺失');
	}
	if (!cfg.url) {
		console.error('请输入url');
	}
	console.log(cfg.param);
	$.ajax({
		url : cfg.url,
		type : 'post',
		dataType : 'json',
		contentType : 'application/json',
		data : JSON.stringify({
			"params" : cfg.param
		}),
		beforeSend : function(XMLHttpRequest) {
			return true;
		},
		success : function(data) {
			if (cfg.success && typeof cfg.success == 'function') {
				cfg.success(data);
			}
		}
	});
}

/**
 * show成功提示 if (opt.state == 'error' || opt.state == 'deny') { opt.state = 'danger'; info }
 */
eputil.showCgTips = function(msg) {
	epoint.showTips(msg, {
		state : 'success'
	});
}

/** 组织架构选择树 * */

/** ***eputil额外方法结束***** */

/** ***hrUtil额外方法开始***** */
/**
 * 获取周岁
 * 
 * @param {}
 *            birthday 格式：yyyy-MM-dd
 */
hrUtil.getAge = function(birthday) {
	if (!birthday) {
		return "";
	}
	var r = birthday.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
	if (r == null)
		return "";
	var d = new Date(r[1], r[3] - 1, r[4]);
	if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
		var Y = new Date().getFullYear();
		return Y - r[1];
	}
	return "";
}

/**
 * 根据身份证获取生日
 * 
 * @param {}
 *            idcardNumber
 * 
 * @return yyyy-MM-dd
 */
hrUtil.getBirthday = function(idCard) {
	if (!idCard) {
		return "";
	}
	var birthday = "";
	if (idCard.length == 15) {
		birthday = "19" + idCard.slice(6, 12);
		birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
	} else if (idCard.length == 18) {
		birthday = idCard.slice(6, 14);
		birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
	}
	return birthday;
}

/**
 * 代码项父节点不允许选择
 */
hrUtil.parentNodeForbidSelect = function(e) {
	if (e.isLeaf) {
		e.cancel = false;
	} else {
		e.cancel = true;
	}
}

/**
 * 代码项树选择数据处理
 */
eputil.openCodeItemTree = function(e) {
	hrUtil.openCodeItemTreeSingleByCodeName(e);
}

// 增加文本带值的代码项选择树，格式为： 文本(值)
eputil.openCodeItemSingleTreeWithValue = function(e) {
	if (e.source.moreselect && e.source.moreselect == '1') {
		hrUtil.openCodeItemTreeByCodeName("multi", e.source);
	} else {
		hrUtil.openCodeItemTreeByCodeName("singleWithValue", e.source);
	}
}

hrUtil.openCodeItemTreeSingleByCodeName = function(e) {
	hrUtil.openCodeItemTreeByCodeName("single", e.source);
}
hrUtil.openCodeItemTreeMultiByCodeName = function(e) {
	hrUtil.openCodeItemTreeByCodeName("multi", e.source);
}
hrUtil.openCodeItemTreeByCodeName = function(model, source, codename) {
	var url = null;
	var param = null;
	var codename = codename ? codename : source.codename;
	if (!codename) {
		codename = source.id;
	}
	if (model == 'multi') {
		url = 'zhenggong/hr/tree/hrcodeitemtreemulti?codename=' + epoint.encodeUtf(codename) + '&withvalue=true' + '&value=' + source.value;
		param = {
			width : 450,
			height : 750
		};
	} else if (model == 'singleWithValue') {
		url = 'zhenggong/hr/tree/hrcodeitemtreesingle?codename=' + epoint.encodeUtf(codename) + '&withvalue=true';
		param = {
			width : 450,
			height : 750
		};
	} else {
		url = 'zhenggong/hr/tree/hrcodeitemtreesingle?codename=' + epoint.encodeUtf(codename);
		param = {
			width : 450,
			height : 750
		};
	}

	if (url) {
		epoint.openTopDialog('选择', url, function(rtn) {
			if (!rtn) {
				return;
			}
			if (rtn != "close") {
				if (source.type == "buttonedit" || source.type == "combobox") {
					var text = "";
					var value = "";
					if (model.indexOf("single") >= 0) {
						if (rtn.textnovalue) {
							text += rtn.fullPath || rtn.textnovalue;
						} else {
							text = rtn.fullPath || rtn.text;
						}

						value = rtn.id;
					} else {
						for (var i = 0, length = rtn.length; i < length; i++) {
							if (rtn.textnovalue) {
								text += rtn[i].textnovalue + ";";
							} else {
								text += rtn[i].text + ";";
							}

							value += rtn[i].value + ",";
						}
					}

					source.setValue(value);
					source.setText(text);
					source.validate(codename);
					// 20220513调整
					source.doValueChanged();
				}
			}
			hrUtil.codeItemTreeSelectCall(rtn);
		}, param);
	} else {
		epoint.alert("未知的选择树！");
	}
}
hrUtil.codeItemTreeSelectCall = function(data) {

};

/** 表结构树调用开始* */
hrUtil.tableStructSelectCall = function(data) {

};
/* 获取警员相关表字段选择树 */
hrUtil.openTableStructListJYXXSelectSingle = function(e) {
	hrUtil.openTableStructList("single", e.source, "A");
};
/* 获取机构相关表字段选择树 */
hrUtil.openTableStructListJGXXSelectSingle = function(e) {
	hrUtil.openTableStructList("single", e.source, "B");
};
/* 获取辅警相关表字段选择树 */
hrUtil.openTableStructListFJXXSelectSingle = function(e) {
	hrUtil.openTableStructList("single", e.source, "E");
};
/* 获取相关表字段选择树 */
hrUtil.openTableStructListSelectSingle = function(e) {
	hrUtil.openTableStructList("single", e.source);
};
hrUtil.openTableStructList = function(model, source, categoryCode) {
	var url = null;
	var param = null;

	if (!categoryCode) {
		categoryCode = source.categorycode;
	}

	if (model == 'single') {
		url = 'zhenggong/hr/tree/tablestruct/zgmetadatatablestructselectsingle?categoryCode=' + (categoryCode || '');
		param = {
			width : 1200,
			height : 1000
		};
	}

	if (url) {
		epoint.openTopDialog('选择', url, function(rtn) {
			if (!rtn) {
				return;
			}
			if (rtn != "close") {
				if (source.type == "buttonedit") {
					var text = "";
					var value = "";

					if (model.indexOf("single") >= 0) {
						text = '[' + rtn.fieldname + ']' + rtn.fieldchinesename;
						value = rtn.rowguid;
					} else {
						for (var i = 0, length = rtn.length; i < length; i++) {
							text += rtn[i].text + ";";
							value += rtn[i].value + ";";
						}
					}
					source.setValue(value);
					source.setText(text);
					source.validate(source);
				}
			}
			hrUtil.tableStructSelectCall(rtn);
		}, param);
	} else {
		epoint.alert("未知的选择树！");
	}
};

/* 子集表字段多选树 */
hrUtil.openTableStructListSelectMulti = function(e) {
	hrUtil.openTableStructMultiList("multi", e.source);
};

hrUtil.openTableStructMultiList = function(model, source, categoryCode) {
	var url = null;
	var param = null;

	if (!categoryCode) {
		categoryCode = source.categorycode;
	}

	if (model == 'multi') {
		url = 'zhenggong/hr/tree/tablestruct/zgmetadatatablestructselectmulti?categoryCode=' + (categoryCode || '');
		param = {
			width : 1200,
			height : 1000
		};
	}

	if (url) {
		epoint.openTopDialog('选择', url, function(rtn) {
			if (!rtn) {
				return;
			}
			if (rtn != "close") {
				if (source.type == "buttonedit") {
					var text = "";
					var value = "";
					for (var i = 0, length = rtn.length; i < length; i++) {
						text += rtn[i].text + ";";
						value += rtn[i].value + ";";
					}
					source.setValue(value);
					source.setText(text);
					source.validate(source);
				}
			}
			hrUtil.tableStructSelectCall(rtn);
		}, param);
	} else {
		epoint.alert("未知的选择树！");
	}
};

/* 子集表字段单选列表（无权限限制） */
hrUtil.openTableStructWithoutRightListSelectSingle = function(e) {
	hrUtil.openTableStructWithoutRightListSelect("single", e.source);
};

/* 子集表字段多选列表（无权限限制） */
hrUtil.openTableStructWithoutRightListSelectMulti = function(e) {
	hrUtil.openTableStructWithoutRightListSelect("multi", e.source);
};

hrUtil.openTableStructWithoutRightListSelect = function(model, source, categoryCode) {
	var url = null;
	var param = null;

	if (!categoryCode) {
		categoryCode = source.categorycode;
	}

	if (model == 'single') {
		url = 'zhenggong/hr/tree/tablestruct/typetree/zgtypetablestructselectsingle?categoryCode=' + (categoryCode || '');
		param = {
			width : 1200,
			height : 1000
		};
	} else if (model == 'multi') {
		url = 'zhenggong/hr/tree/tablestruct/typetree/zgtypetablestructselectmulti?categoryCode=' + (categoryCode || '');
		param = {
			width : 1200,
			height : 1000
		};
	}

	if (url) {
		epoint.openTopDialog('选择', url, function(rtn) {
			if (!rtn) {
				return;
			}
			if (rtn != "close") {
				if (source.type == "buttonedit") {
					var text = "";
					var value = "";

					if (model.indexOf("single") >= 0) {
						text = '[' + rtn.fieldname + ']' + rtn.fieldchinesename;
						value = rtn.rowguid;
					} else {
						for (var i = 0, length = rtn.length; i < length; i++) {
							text += rtn[i].text + ";";
							value += rtn[i].value + ";";
						}
					}

					source.setValue(value);
					source.setText(text);
					source.validate(source);
				}
			}
			hrUtil.tableStructSelectCall(rtn);
		}, param);
	} else {
		epoint.alert("未知的选择树！");
	}
};

/** 表结构树调用结束* */

/**
 * 搜索框拼接
 * 
 * @param {}
 *            data
 * @param {}
 *            columnNum
 * @return {String}
 */
hrUtil.createDynamicSearchForm = function(data, columnNum, hasBind) {
	if (!data || data.length <= 0) {
		return "";
	}
	var spanType = '';
	// 默认两列布局
	if (!columnNum) {
		columnNum = 2;
	}
	if (columnNum == 1) {
		spanType = "span5";
	} else if (columnNum == 2) {
		spanType = "span2";
	} else if (columnNum == 3) {
		spanType = "span1";
	}

	var html = '';
	for (var i = 0, size = data.length; i < size; i++) {
		var currentColumnNum = i % columnNum;
		var currentData = data[i];
		if (currentColumnNum == 0) {
			html += '<div class="form-row">';
		}
		html += '<label class="form-label">' + currentData.labelName + ':</label>';
		html += '<div style="display:inline-block" class="form-control ' + spanType + '">';
		if ("mini-datepicker" == currentData.fieldType) {
			html += '<input id="search_' + currentData.fieldName + '_moreq" bind="dataBean.' + currentData.fieldName + '"  name="' + currentData.fieldName + '" class="' + currentData.fieldType
					+ '"  value="' + currentData.defaultValue + '" emptyText="请选择" allowInput="false" alwaysView="true"  showClose="true" oncloseclick="eputil.clearTextValue"';
			html += ' data-options="{\'format\':\'' + currentData.format + '\'}"/>';
		} else if (currentData.codeName) {
			html += '<input id="search_'
					+ currentData.fieldName
					+ '_in" bind="dataBean.'
					+ currentData.fieldName
					+ '" class="mini-treeselect" value="'
					+ currentData.defaultValue
					+ '"  emptyText="请选择" showTreeIcon="false" showClose="true" showFolderCheckBox="true" checkRecursive="true"  multiSelect="true"  oncloseclick="eputil.clearTextValue" popupMaxHeight="300" popupHeight="300"';
			html += ' textField="text" valueField="id" valueFromSelect="true" parentField="pid"  showFilter="true" data=\'' + JSON.stringify(currentData.codeData) + '\' />';
		} else {
			html += '<input id="search_' + currentData.fieldName + '" bind="dataBean.' + currentData.fieldName + '"  name="' + currentData.fieldName + '" class="' + currentData.fieldType
					+ '" value="' + currentData.defaultValue + '" allowInput="true" valueFromSelect="true" showClose="true" oncloseclick="eputil.clearTextValue"/>';
		}

		html += '</div>';
		if (currentColumnNum + 1 == columnNum || i + 1 == size) {
			html += '</div>';
		}
	}
	return html;
}

hrUtil.createDynamicSearchFormNew = function(data, columnNum, hasBind) {
	if (!data || data.length <= 0) {
		return "";
	}
	var spanType = '';
	// 默认两列布局
	if (!columnNum) {
		columnNum = 2;
	}
	if (columnNum == 1) {
		spanType = "span5";
	} else if (columnNum == 2) {
		spanType = "span2";
	} else if (columnNum == 3) {
		spanType = "span1";
	}
	var lineflag = 0;// 初始化为0，0的时候拼接开始符号，2的时候拼接结束符号；
	var html = '';
	for (var i = 0, size = data.length; i < size; i++) {
		// 当上一轮为截取符号或者计数加到3的时候，置为0
		if ((i >= 1 && data[i - 1].searchlineflag) || lineflag == 3) {
			lineflag = 0;
		}
		if (0 == lineflag) {
			html += '<div class="form-row">';
		}
		var currentData = data[i];
		lineflag++;
		html += '<label class="form-label"><span class="mylabel">' + currentData.labelName + ':</span></label>';
		html += '<div style="display:inline-block" class="form-control ' + spanType + '">';
		if ("mini-datepicker" == currentData.fieldType) {
			html += '<input id="search_' + currentData.fieldName + '_moreq" bind="dataBean.' + currentData.fieldName + '_start"  name="' + currentData.fieldName + '_start" class="'
					+ currentData.fieldType + '"  value="' + currentData.defaultValue
					+ '" emptyText="请选择" allowInput="false" style="width: 45%;" alwaysView="true"  showClose="true" oncloseclick="eputil.clearTextValue"';
			html += ' data-options="{\'format\':\'' + currentData.format + '\'}"/>';

			html += '<span style="width: 10%; text-align: center">-</span>';
			html += '<input id="search_' + currentData.fieldName + '_lessq" bind="dataBean.' + currentData.fieldName + '_end"  name="' + currentData.fieldName + '_end" class="'
					+ currentData.fieldType + '"  value="' + currentData.defaultValue
					+ '" emptyText="请选择" allowInput="false" style="width: 45%;" alwaysView="true"  showClose="true" oncloseclick="eputil.clearTextValue"';
			html += ' data-options="{\'format\':\'' + currentData.format + '\'}"/>';
		} else if (currentData.codeName) {
			html += '<input id="search_'
					+ currentData.fieldName
					+ '_in" bind="dataBean.'
					+ currentData.fieldName
					+ '" class="mini-treeselect" value="'
					+ currentData.defaultValue
					+ '"  emptyText="请选择" showTreeIcon="false" showClose="true" showFolderCheckBox="true" checkRecursive="true"  multiSelect="true"  oncloseclick="eputil.clearTextValue" popupMaxHeight="300" popupHeight="300"';
			html += ' textField="text" valueField="id" valueFromSelect="true" parentField="pid"  showFilter="true" data=\'' + JSON.stringify(currentData.codeData) + '\' />';
		} else {
			if (currentData.fieldName != 'a0118') {
				html += '<input id="search_' + currentData.fieldName + '" bind="dataBean.' + currentData.fieldName + '"  name="' + currentData.fieldName + '" class="' + currentData.fieldType
						+ '" value="' + currentData.defaultValue + '" allowInput="true" valueFromSelect="true" showClose="true" oncloseclick="eputil.clearTextValue"/>';
			} else {
				html += '<input id="search_' + currentData.fieldName + '_moreq" bind="dataBean.' + currentData.fieldName + '_start"  name="' + currentData.fieldName + '_start" class="'
						+ currentData.fieldType + '" value="' + currentData.defaultValue
						+ '" allowInput="true" valueFromSelect="true" showClose="true" oncloseclick="eputil.clearTextValue" style="width: 45%;"/>';
				html += '<span style="width: 10%; text-align: center">-</span>';
				html += '<input id="search_' + currentData.fieldName + '_lessq" bind="dataBean.' + currentData.fieldName + '_end"  name="' + currentData.fieldName + '_end" class="'
						+ currentData.fieldType + '" value="' + currentData.defaultValue
						+ '" allowInput="true" valueFromSelect="true" showClose="true" oncloseclick="eputil.clearTextValue" style="width: 45%;"/>';
			}
		}

		html += '</div>';
		if (currentData.searchlineflag || lineflag == 3) {
			html += '<div style="width: 100%;"></div>'
			html += '</div>';
			continue;
		}
		if ((i + 1) == size) {
			html += '</div>';
		}
	}
	return html;
}

/**
 * 生成带头像的表单页
 * 
 * @param {}
 *            currentData
 * @param {}
 *            hasBind
 * @param {}
 *            columnNum
 * @return {String}
 */
hrUtil.createPhotoForm = function(data, allowInput, isUpdatePhoto, codeUseCombobox) {
	if (!data || data.length <= 0) {
		return "";
	}
	// 默认是编辑页面
	if (typeof(allowInput) == 'undefined') {
		allowInput = true;
	}
	var actionName = epoint.getCache('action');
	// 默认每行两列
	var columnNum = 2;

	// 获取最后一个样式表-创建css样式
	var styleSheets = document.styleSheets[document.styleSheets.length - 1];
	styleSheets.addRule(".span25", "width: 32% ");
	styleSheets.addRule(".form-control.span2", "width: 25%;");
	styleSheets.addRule(".form-control.span3", "width: 51%;");
	styleSheets.addRule(".form-row", "float: none;");

	var html = '<div class="form-row" style="padding: 0px !important"> <div class="form-control" style="width: 50%">';
	for (var i = 0, size = data.length; i < size; i++) {
		if (i == 4) {
			html += '</div><div class="form-control" style="width:42%">'
			html += '<label class="form-label ">照片:</label><div style="display: inline-block;padding-left:25px;" class="form-control span3">';

			if (allowInput == false || isUpdatePhoto != '1') {
				html += '<div style="width:150px;height:180px;"><img src="#" width="100%" height="100%" alt="照片" id="userphoto" /></div></div></div></div>'
			} else {
				html += '<div class="mini-imageuploader" imageWidth="150"  imageHeight="180" numLimit="1" sizeLimit="2048" id="uploader"';
				html += ' accept="image/png,image/jpeg,image/jpg,image/gif" onbeforequeued="beforequeued" onuploaderror="hrUtil.onUploadError" action="' + actionName
						+ '.getImageUploadModel"></div></div></div></div>';
			}
		}
		var currentColumnNum = i % columnNum;
		if (currentColumnNum == 0 || i < 4) {
			html += '<div class="form-row">';
		}

		if (i < 4) {
			html += hrUtil.createFormElement(data[i], allowInput, false, "3", "span25", codeUseCombobox);
		} else {
			html += hrUtil.createFormElement(data[i], allowInput, false, "2", null, codeUseCombobox);
		}

		if (i < 4) {
			html += '</div>';
		} else if (currentColumnNum + 1 == columnNum || i + 1 == size) {
			html += '</div>';
		}
	}
	return html;
}

/**
 * 生成普通表单页
 * 
 * @param {}
 *            currentData【数据】
 * @param {}
 *            hasBind【默认控件不绑定后台】
 * @param {}
 *            columnNum【默认两列布局】
 * @return {String}
 */
hrUtil.createCommonForm = function(data, allowInput, hasBind, columnNum, codeUseCombobox) {
	if (!data || data.length <= 0) {
		return "";
	}
	// 默认是编辑页面
	if (typeof(allowInput) == 'undefined') {
		allowInput = true;
	}
	// 默认控件不绑定后台
	if (!hasBind) {
		hasBind = false;
	}

	var formControlCls = '';
	// 默认两列布局
	if (!columnNum) {
		columnNum = 2;
	}
	if (columnNum == 1) {
		formControlCls = "5";
	} else if (columnNum == 2) {
		formControlCls = "2";
	} else if (columnNum == 3) {
		formControlCls = "1";
	}
	var html = '';
	for (var i = 0, size = data.length; i < size; i++) {
		var currentColumnNum = i % columnNum;
		if (currentColumnNum == 0) {
			html += '<div class="form-row">';
		}

		html += hrUtil.createFormElement(data[i], allowInput, hasBind, formControlCls, null, codeUseCombobox);

		if (currentColumnNum + 1 == columnNum || i + 1 == size) {
			html += '</div>';
		}
	}
	return html;
}

/**
 * 新增单个控件
 * 
 * @param {}
 *            data
 * @param {}
 *            columnNum
 * @return {String}
 */
hrUtil.createFormElement = function(currentData, allowInput, hasBind, formControlCls, formLabelCls, codeUseCombobox) {
	if (hasBind == true) {
		currentData.bind = "dataBean." + currentData.fieldName;
	}
	currentData.required = currentData.isRequired;
	currentData.label = currentData.labelName;
	currentData.span = formControlCls;
	currentData.formLabelCls = formLabelCls;
	if (!currentData.emptyText && currentData.fieldType != 'mini-textbox') {
		currentData.emptyText = "请选择";
	}
	if (allowInput == false || currentData.allowInput == false) {
		// 只读控件
		currentData.type = 'outputtext'
	} else if ("mini-datepicker" == currentData.fieldType) {
		// 时间控件
		currentData.type = 'datepicker'
	} else if (currentData.codeName) {
		if (codeUseCombobox) {
			// 代码项-默认下拉树显示
			currentData.type = 'combobox';
			currentData.dataData = JSON.stringify(currentData.codeData);
			currentData.onButtonClick = "openCodeItemTree(this, '" + currentData.codeName + "')";
			currentData.onKeyDown = "hrUtil.ComboboxKeyInput";
			currentData.onValueChanged = "hrUtil.ComboboxValueChange";
		} else {
			// 代码项-默认下拉树显示
			currentData.type = 'treeselect';
			currentData.codeData = JSON.stringify(currentData.codeData);
			currentData.onbeforenodeselect = 'hrUtil.parentNodeForbidSelect';
		}

	} else if (currentData.isFrameOu == '1') {
		// 部门树
		currentData.type = 'buttonedit';
		if (currentData.isMultiFrameOu == '1') {
			currentData.onButtonClick = "eputil.openFrameOuTreeMulti";
		} else {
			currentData.onButtonClick = "eputil.openFrameOuTreeSingle";
		}
	} else if (currentData.isFrameUser == '1') {
		// 人员树
		currentData.type = 'buttonedit'
		if (currentData.isMultiFrameOu == '1') {
			currentData.onButtonClick = "eputil.openFrameOuUserTreeMulti";
		} else {
			currentData.onButtonClick = "eputil.openFrameOuUserTreeSingle";
		}
	} else if (currentData.customtree) {
		// 用户自定义弹出树
		currentData.type = 'buttonedit'
		currentData.onButtonClick = currentData.customtree;
	} else {
		// 文本框
		currentData.type = 'textbox'
	}
	var html = formUtil.parseControl(currentData);
	return html;
}

hrUtil.clearDynamicButtonEditText = function(e) {
	var source = {};
	if (e && e.source) {
		source = e.source;
	}
	source.setValue("");
	source.setText("");
	source.setData(source.data);
}

/**
 * 加载上移下移的动态框
 * 
 * @param {}
 *            btnId 上移下移的按钮id
 * @param {}
 *            type移动类型：up/down
 * @param {}
 *            datagridId:移动的表格
 */
hrUtil.initMoveStepBubbleDialog = function(btnId, type, datagridId) {
	// 如果页面上已经有弹出框，先去除
	var panelBody = $('#moveStep').closest('.mini-panel-body');
	if (panelBody) {
		panelBody.find(".mini-messagebox-buttons .mini-button-state-default").click();
	}

	mini.showBubbleDialog({
		// message : '<a style="width:5%" class="mini-button"
		// onclick="hrUtil.onBubbleDialogClickStepChange(-1)"><span>-</span></a>'
		// + '<input style="width:30%" class="mini-textbox" id="moveStep"
		// vtype="int;range:1,99999" />'
		// + '<a style="width:5%" class="mini-button"
		// onclick="hrUtil.onBubbleDialogClickStepChange(1)">+</a>',
		message : '<input style="width:60%" class="mini-textbox" style="text-align:center" id="moveStep"  vtype="int;range:1,99999" maxLength="5" />',
		iconCls : '',
		invokerID : btnId,
		position : "bottom-left",
		id : "btnBubble"
	});
	mini.parse();

	mini.get('moveStep').setValue(0);

	panelBody = $('#moveStep').closest('.mini-panel-body');
	panelBody.find(".mini-messagebox-buttons").css("text-align", "center");
	panelBody.find(".mini-messagebox-msg").css("margin", "0 auto").css("text-align", "center");

	panelBody.find(".mini-messagebox-buttons .mini-button-state-primary").on('click', function(data) {
		if (!epoint.validate()) {
			return;
		}
		var moveStep = mini.get('moveStep').getValue();
		if (type == 'up') {
			moveStep = -moveStep;
		}
		if (!datagridId) {
			datagridId = 'datagrid';
		}
		epoint.execute('updateOrderNumber', [datagridId], [moveStep], function(data) {
			if (data.msg) {
				if (data.msg == 'success') {
					epoint.showTips("排序已更新！");
					searchData();
				} else {
					epoint.alert(data.msg);
				}
			}
		});
	});
}
hrUtil.onBubbleDialogClickStepChange = function(step) {
	if (!mini.get('moveStep')) {
		return;
	}
	var num = mini.get('moveStep').getValue();
	if (!num) {
		num = 0;
	}
	var moveStep = parseInt(num) + parseInt(step);
	if (moveStep < 0) {
		moveStep = 0;
	}
	mini.get('moveStep').setValue(moveStep);
}

hrUtil.sucessCallback = function(result) {
	var message = result.msg;
	if (message) {
		if (message == eputil.SUCCESS) {
			var alertMsg = '保存成功！';
			if (result.alertMsg) {
				alertMsg = result.alertMsg;
			}
			var dialogId = Util.getUrlParams('_dialogId_');
			if (dialogId) {
				hrUtil.alertSucessAndClose(alertMsg, "", "", null, "info");
			} else {
				eputil.alert(alertMsg, "", "", function() {
					if (!top.TabsNav) {
						return;
					}
					var activeTab = top.TabsNav.getActiveTab();
					var tabId = activeTab._data.id;
					var parentTabId = activeTab._data.param.parentId;
					if (parentTabId) {
						top.TabsNav.refreshTabContent(parentTabId);
					}
					top.TabsNav.removeTab(tabId);
				})
			}
		} else {
			eputil.alert(message, "", "", null, "info");
		}
	} else {
		eputil.alert('没有返回值！');
	}
}

hrUtil.alertSucessAndClose = function(message, successPre, title, callback, options, iconCls) {
	var isAlert = false;
	// 若当前页面为最高级页面，直接显示在当前页面
	var parent = window.parent || window.self;
	// showtip模式
	parent.epoint.showTips(message);
	// 这边要手动关闭了
	epoint.closeDialog("ok");
}

/**
 * alert或者tips（sucess,操作）
 */
hrUtil.alertAndRefresh = function(message, successPre, refreshId) {
	var isAlert = false;
	var refresh = false;

	if (eputil.SUCCESS == message) {
		refresh = true;
	}

	if (eputil.alertType == "2") {
		if (eputil.SUCCESS == message) {
			message = ((successPre || "保存") + "成功！");
		} else {
			isAlert = true;
		}
	} else {
		isAlert = true;
	}

	if (isAlert) {
		// alert模式
		epoint.alert(message);
	} else {
		// showtip模式
		parent.epoint.showTips(message);
	}

	if (refresh) {
		eputil.searchDataFirst(refreshId);
	}
}

// 加载辅警图片，失败就显示默认头像图片
hrUtil.loadFJPhoto = function(imgId, userGuid) {
	var src = Util.getRootPath() + "rest/fjphotoserver/getuserimg?userGuid=" + userGuid + "&datetime=" + new Date().getTime();
	hrUtil.loadPhoto(imgId, src);
}

// 加载警员图片，失败就显示默认头像图片
hrUtil.loadPolicePhoto = function(imgId, userGuid) {
	var src = Util.getRootPath() + "rest/photoserver/getuserimg?userGuid=" + userGuid + "&datetime=" + new Date().getTime();
	hrUtil.loadPhoto(imgId, src);
}

// 加载图片，失败就显示默认头像图片
hrUtil.loadPhoto = function(imgId, src) {
	if (!imgId) {
		return;
	}
	var $img = $("#" + imgId);
	if ($img.length == 0) {
		return;
	}

	var defaultPhoto = Util.getRootPath() + "frame/fui/css/images/default-profile.png";

	if (src) {
		var image = new Image();
		image.src = src;

		image.onload = function() {
			$img.prop("src", src);
		};
		if (image.complete) {
			$img.prop("src", src);
		};
		image.onerror = function() {
			$img.prop("src", defaultPhoto);
		};
	} else {
		$img.prop("src", defaultPhoto);
	}
}

/**
 * 下拉按钮再次点击收缩
 * 
 */
hrUtil.btnPopu = function(domId) {
	var btn = mini.get(domId);
	// 判空返回
	if (!btn) {
		return;
	}
	var menu = btn.menu,
		show = false;
	btn.on('click', function() {
		if (show) {
			show = false;
			menu.hide();
		} else {
			show = true;
		}
	});

	$('body').on('click', function(e) {
		if (!$(e.target).closest('#' + domId).length) {
			show = false;
		}
	});
}

/**
 * 
 * 添加光标插入方法
 */
hrUtil.insertAtCaret = function($DOM, myValue) {
	if ($DOM) {
		var conditionlen = $DOM[0].value.length;
		$DOM[0].focus();
		if ($DOM[0].selection) {
			$DOM[0].selection.createRange().text = e.item.text;
		} else {
			$DOM[0].value = $DOM[0].value.substr(0, $DOM[0].selectionStart) + myValue + $DOM[0].value.substring($DOM[0].selectionStart, conditionlen);
		}
	}
};

hrUtil.insertAtCaret = function($DOM, myValue, selectionStart) {
	if ($DOM) {
		var conditionlen = $DOM[0].value.length;
		$DOM[0].focus();
		if ($DOM[0].selection) {
			$DOM[0].selection.createRange().text = e.item.text;
		} else {
			$DOM[0].value = $DOM[0].value.substr(0, selectionStart) + myValue + $DOM[0].value.substring(selectionStart, conditionlen);
		}

		selectionStart = $DOM[0].value.length;
	}
};

/**
 * post 请求后台下载附件 //参数长度无限制，但会闪屏 post("xxx.action", { "cmd" : "fun", "params" : params });
 */
hrUtil.post = function(url, params) {
	// 创建form元素
	var temp_form = document.createElement("form");
	// 设置form属性
	temp_form.action = url;
	temp_form.target = "_blank";
	temp_form.method = "post";
	temp_form.style.display = "none";
	// 处理需要传递的参数
	for (var x in params) {
		var opt = document.createElement("textarea");
		opt.name = x;
		opt.value = params[x];
		temp_form.appendChild(opt);
	}
	document.body.appendChild(temp_form);
	// 提交表单
	temp_form.submit();
}

/**
 * mini-treeselect设置选择所有选中节点，包含父节点
 */
hrUtil.treeSelectClickNode = function(treeId) {
	// 获取mini-treeselect组件
	var selectTree = mini.get(treeId);
	if (selectTree) {
		selectTree.on('valuechanged', function() {
			selectTree.setValue(selectTree.tree.getValue());
		});
	}
}

hrUtil.onUploadError = function(e) {
	epoint.hideLoading();
	$(".attach-list-process").remove();
	epoint.refresh([e.source.id]);
}

/**
 * mini-combobox的键盘输入事件监听。目的在于输入值时将下拉框可以展示出来
 */
hrUtil.ComboboxKeyInput = function(e) {
	var curTree = e.sender;
	curTree.on('beforeshowpopup', function(e) {
		e.cancel = false;
	});
}

/**
 * mini-combobox的值改变事件监听。目的在于将文本值改为不带值的文本
 */
hrUtil.ComboboxValueChange = function(e) {
	if (e && e.selected) {
		if (e.selected.textnovalue) {
			e.source.setText(e.selected.textnovalue);
		} else {
			e.source.setText(e.selected.text);
		}
	}
}

/**
 * 警号验证
 */
hrUtil.onPoliceNumValidation = function(e) {
	if (e.isValid) {
		if (/^\d{6}$/.test(e.value) == false) {
			e.errorText = "必须输入警号";
			e.isValid = false;
		}
	}
}

hrUtil.compareDate = function(startTime, endTime) {
	var t1 = new Date(Date.parse(startTime));
	var t2 = new Date(Date.parse(endTime));
	return t1.getTime() - t2.getTime();
}
/**
 * 计算某日期到今天相差年份
 * 
 * @param e
 */
hrUtil.calDate = function(e) {
	// debugger;
	var day = 24 * 60 * 60 * 1000;

	// var startDateStr = e.value;
	// var endDateStr = document.getElementsByName("endDate")[0].value;

	var sDate = e.value;
	var eDate = new Date();

	// 获得各自的年、月、日
	var sY = sDate.getFullYear();
	var sM = sDate.getMonth() + 1;
	var sD = sDate.getDate();
	var eY = eDate.getFullYear();
	var eM = eDate.getMonth() + 1;
	var eD = eDate.getDate();

	var yL = eY - sY;
	var mL = eM - sM;
	var dL = eD - sD;

	if (dL < 0) {
		mL--;
	}
	if (mL < 0) {
		yL--;
	}
	if (yL > 0) {
		// result.value = yL;
		return yL;
	} else {
		// result.value = 0;
		return 0;
	}
}
/** ***hrUtil额外方法结束始***** */

/** *******hrUtil常量定义***************** */
hrUtil.constant = {};

hrUtil.constant.TABLE_NAME_A01 = "a01";
hrUtil.constant.TABLE_NAME_A02 = "a02";
hrUtil.constant.TABLE_NAME_A03 = "a03";
hrUtil.constant.TABLE_NAME_A04 = "a04";
hrUtil.constant.TABLE_NAME_A05 = "a05";

// 身份证号码字段
hrUtil.constant.TABLE_A01_FIELD_A0116 = "a0116";
hrUtil.constant.METADATE_TABLE_E001_E0184 = "e0184";

// 出生日期字段
hrUtil.constant.TABLE_A01_FIELD_A0104 = "a0104";
hrUtil.constant.METADATE_TABLE_E001_E0107 = "e0107";

// 性别
hrUtil.constant.TABLE_A01_FIELD_A0103 = "a0103";
hrUtil.constant.METADATE_TABLE_E001_E0104 = "e0104";

// 姓名
hrUtil.constant.TABLE_A01_FIELD_A0101 = "a0101";
hrUtil.constant.METADATE_TABLE_E001_E0101 = "e0101";

// 手机号
hrUtil.constant.TABLE_A01_FIELD_A0169 = "a0169";
hrUtil.constant.METADATE_TABLE_E001_E0142 = "e0142";

// 警号
hrUtil.constant.TABLE_A01_FIELD_A0117 = "a0117";
hrUtil.constant.METADATE_TABLE_E001_E0118 = "e0118";

// 政治面貌
hrUtil.constant.TABLE_A01_FIELD_A0127 = "a0127";
hrUtil.constant.METADATE_TABLE_E001_E0141 = "e0141";

// 年龄
hrUtil.constant.TABLE_A01_FIELD_A0144 = "a0144";
hrUtil.constant.METADATE_TABLE_E001_E0144 = "e0144";
