var yewuUtil = {};

// 全局去除附件上传控件箭头
mini.findControls(function(ctr) {
	return ctr.type === 'webuploader';
}).forEach(function(ctr) {
    ctr.setShowIcon(false);
});

mini.WebUploader.prototype.showIcon = false;

// 绩效考核-教官库指标分类内置不可删除
yewuUtil.jgTargetGuid = '68bcbbd9-0014-444e-882c-795aca934d99';

//eputil.previewUrl=eputil.LOCALHOST;

eputil.mapUrl.root = "";
/** 多选框点击关闭* */
eputil.onComboBoxCloseClick = function(e) {
	if (e && e.source) {
		var eSender = e.sender;
		eSender.setText("");
		eSender.setValue("");
	}
}

eputil.beforeOnLoad = function(data) {
	this.synchronizeClock(data);
	// if (!this.isPageLoaded) {
	//
	// }
	// 加载考试事件
	examUtil.examBeforeOnLoad(data);
};

/** 组织架构选择树 * */
eputil.frameOuTreeSelectCall = function(data) {

};

eputil.openFrameOuTreeSingle = function(e) {
	eputil.openFrameOuTree(e, "single");
};
eputil.openFrameOuTreeMulti = function(e) {
	eputil.openFrameOuTree(e, "multi");
};
eputil.openFrameOuTree = function(e, mode) {
	var source = {};
	var url = null;
	var param = null;

	if (e && e.source) {
		source = e.source;
	}

	if (mode == "single") {
		url = "zhenggong/yewu/tree/yewuframeoutreesingle";
		param = {
			width : 350,
			height : 500
		}
	} else {
		url = "zhenggong/yewu/tree/yewuframeoutreemulti";
		param = {
			width : 550,
			height : 500
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

eputil.initMothSection = function(fromDateId, toDateId) {
	var fromDate = mini.get(fromDateId);
	var toDate = mini.get(toDateId);

	if (!fromDate || !toDate) {
		return;
	}

	// 不符合的清空
	fromDate.on("valuechanged", function(e) {
		if (toDate.getValue() && e.value > toDate.getValue()) {
			epoint.clear(toDateId);
		}
	});

	toDate.on("valuechanged", function(e) {
		if (fromDate.getValue() && e.value < fromDate.getValue()) {
			epoint.clear(fromDateId);
		}
	});
};
eputil.initIntSection = function(fromIntId, toIntId) {
	var fromInt= mini.get(fromIntId);
	var toInt = mini.get(toIntId);
	
	if (!fromInt || !toInt) {
		return;
	}
	// 不符合的清空
	fromInt.on("valuechanged", function(e) {
		if (toInt.getValue() && e.value > toInt.getValue()) {
			e.source.setValue(null);
		}
	});
	toInt.on("valuechanged", function(e) {
		if (fromInt.getValue() && e.value < fromInt.getValue()) {
			e.source.setValue(null);
		}
	});
}

eputil.previewUrl = eputil.LOCALHOST;

eputil.frameOuUserTreeSelectCall = function(data) {

};

eputil.openFrameOuUserTreeSingle = function(e) {
	eputil.openFrameOuUserTree(e, "single");
};
eputil.openFrameOuUserTreeMulti = function(e) {
	eputil.openFrameOuUserTree(e, "multi");
};
eputil.openFrameOuUserTree = function(e, mode) {
	var source = {};
	var url = null;
	var param = null;

	if (e && e.source) {
		source = e.source;
	}

	if (mode == "single") {
		url = "zhenggong/yewu/tree/yewuframeouusertreesingle";
		param = {
			width : 350,
			height : 500
		}
	} else {
		url = "zhenggong/yewu/tree/yewuframeouusertreemulti";
		param = {
			width : 550,
			height : 500
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
/** 组织架构选择树 * */
/** 资源类目树相关 */
eputil.openZgYewuJyxlResourceCategoryTreeMulti = function(e) {
	eputil.openZgYewuJyxlResourceCategoryTree(e, "multi");
};

eputil.openZgYewuJyxlResourceCategoryTreeSingle = function(e) {
	eputil.openZgYewuJyxlResourceCategoryTree(e, "single");
};

eputil.openZgYewuJyxlResourceCategoryTree = function(e, mode) {
	var source = {};
	var url = null;
	var param = null;

	if (e && e.source) {
		source = e.source;
	}

	if (mode == "single") {
		url = 'zhenggong/yewu/tree/zgyewujyxlresourcecategorytreesingle';
		param = {
			width : 350,
			height : 500
		}
	} else {
		url = 'zhenggong/yewu/tree/zgyewujyxlresourcecategorytreemulti';
		param = {
			width : 550,
			height : 500
		}

		if (source.type == "buttonedit") {
			param.param = {
				categoryGuids : source.getValue(),
				categoryNames : source.getText()
			}
		}
	}

	if (!url) {
		epoint.alert("未知的选择树！");
		return;
	}

	epoint.openTopDialog("选择类目", url, function(rtn) {
		if (eputil.treeNodeSelectDataBind(source, mode, rtn)) {
			eputil.zgYewuJyxlResourceCategoryTreeSelectCall(rtn);
		}
	}, param);
};

eputil.zgYewuJyxlResourceCategoryTreeSelectCall = function(data) {

};
/** 资源类目树相关结束 */
/** 标签管理树相关 */
eputil.openZgYewuJyxlLabelTreeMulti = function(e) {
	eputil.openZgYewuJyxlLabelTree(e, "multi");
};

// 教育培训-资源中心-标签分类:课程0001培训0002
// 标签-标签多选树-课程
eputil.openZgYewuJyxlLabelTreeCourseMulti = function(e) {
	eputil.openZgYewuJyxlLabelTree(e, "courseMulti");
};

// 教育培训-资源中心-标签分类:课程0001培训0002
// 标签-标签多选树-培训
eputil.openZgYewuJyxlLabelTreeTrainingMulti = function(e) {
	eputil.openZgYewuJyxlLabelTree(e, "trainingMulti");
};

eputil.openZgYewuJyxlLabelTreeInstructorMulti = function(e) {
	eputil.openZgYewuJyxlLabelTree(e, "instructorMulti");
};

eputil.openZgYewuJyxlLabelTreeSingle = function(e) {
	eputil.openZgYewuJyxlLabelTree(e, "single");
};

eputil.openZgYewuJyxlLabelTree = function(e, mode) {
	var source = {};
	var url = null;
	var param = null;

	if (e && e.source) {
		source = e.source;
	}

	if (mode == "single") {
		url = 'zhenggong/yewu/tree/zgyewujyxllabeltreesingle';
		param = {
			width : 350,
			height : 500
		}
	} else if (mode == "courseMulti") {
		url = 'zhenggong/yewu/tree/zgyewujyxllabeltreemulti?labeltype=0001';
		param = {
			width : 550,
			height : 500
		}

		if (source.type == "buttonedit") {
			param.param = {
				labelGuids : source.getValue(),
				labelNames : source.getText()
			}
		}
	} else if (mode == "trainingMulti") {
		url = 'zhenggong/yewu/tree/zgyewujyxllabeltreemulti?labeltype=0002';
		param = {
			width : 550,
			height : 500
		}

		if (source.type == "buttonedit") {
			param.param = {
				labelGuids : source.getValue(),
				labelNames : source.getText()
			}
		}
	} else if (mode == "instructorMulti") {
		url = 'zhenggong/yewu/tree/zgyewujyxllabeltreemulti?labeltype=0003';
		param = {
			width : 550,
			height : 500
		}

		if (source.type == "buttonedit") {
			param.param = {
				labelGuids : source.getValue(),
				labelNames : source.getText()
			}
		}
	} else {
		url = 'zhenggong/yewu/tree/zgyewujyxllabeltreemulti';
		param = {
			width : 550,
			height : 500
		}

		if (source.type == "buttonedit") {
			param.param = {
				labelGuids : source.getValue(),
				labelNames : source.getText()
			}
		}
	}

	if (!url) {
		epoint.alert("未知的选择树！");
		return;
	}

	epoint.openTopDialog("选择标签", url, function(rtn) {
		if (eputil.treeNodeSelectSecondDataBind(source, mode, rtn)) {
			eputil.ZgYewuJyxlLabelTreeSelectCall(rtn);
		}
	}, param);
};

eputil.ZgYewuJyxlLabelTreeSelectCall = function(data) {

};
/** 标签管理树相关结束 */

/** 课程章节树相关 */
eputil.openZgJyxlCourseOnlineChapterTreeMulti = function(e) {
	eputil.openZgJyxlCourseOnlineChapterTree(e, "multi");
};

eputil.openZgJyxlCourseOnlineChapterTreeSingle = function(e) {
	eputil.openZgJyxlCourseOnlineChapterTree(e, "single");
};

eputil.openZgJyxlCourseOnlineChapterTreeSingle = function(e, courseGuid) {
	var source = {};
	if (e && e.source) {
		source = e.source;
	}
	epoint.openTopDialog("选择章节", 'zhenggong/yewu/tree/zgjyxlcourseonlinechaptertreesingle?courseGuid=' + courseGuid, function(rtn) {
		if (eputil.treeNodeSelectSecondDataBind(source, "single", rtn)) {
			eputil.zgJyxlCourseOnlineChapterTreeSelectCall(rtn);
		}
	}, {
		width : 350,
		height : 500
	});
};

eputil.openZgJyxlCourseOnlineChapterTree = function(e, mode) {
	var source = {};
	var url = null;
	var param = null;

	if (e && e.source) {
		source = e.source;
	}

	if (mode == "single") {
		url = 'zhenggong/yewu/tree/zgjyxlcourseonlinechaptertreesingle';
		param = {
			width : 350,
			height : 500
		}
	} else {
		url = 'zhenggong/yewu/tree/zgjyxlcourseonlinechaptertreemulti';
		param = {
			width : 550,
			height : 500
		}

		if (source.type == "buttonedit") {
			param.param = {
				chapterGuids : source.getValue(),
				chapterNames : source.getText()
			}
		}
	}

	if (!url) {
		epoint.alert("未知的选择树！");
		return;
	}

	epoint.openTopDialog("选择章节", url, function(rtn) {
		if (eputil.treeNodeSelectSecondDataBind(source, mode, rtn)) {
			eputil.zgJyxlCourseOnlineChapterTreeSelectCall(rtn);
		}
	}, param);
};

eputil.zgJyxlCourseOnlineChapterTreeSelectCall = function(data) {
};
/** 课程章节树相关结束 */

/** 线下考试单选列表 * */
yewuUtil.openJyxlExamOfflineSelectSelfSingle = function(e) {
	var source = {};
	var mode = "single";
	var url = "zhenggong/yewu/jyxl/exam/offline/zgjyxlexamofflinesingleselectlist?isStudent=1";

	if (e && e.source) {
		source = e.source;
	}
	epoint.openTopDialog('线下考试选择', url, function(rtn) {
		if (rtn && rtn != "close") {
			if (source.type == "buttonedit") {
				source.setValue(rtn.rowguid);
				source.setText(rtn.examname);
				source.validate();
			}
			yewuUtil.jyxlExamOfflineSelectSingleCall(rtn);
		}
	}, {
		width : eputil.dialogWidthBig,
		height : eputil.dialogHeight
	});
}

/** 线下考试单选列表 * */
yewuUtil.openJyxlExamOfflineSelectSingle = function(e) {
	var source = {};
	var mode = "single";
	var url = "zhenggong/yewu/jyxl/exam/offline/zgjyxlexamofflinesingleselectlist";

	if (e && e.source) {
		source = e.source;
	}
	epoint.openTopDialog('线下考试选择', url, function(rtn) {
		if (rtn && rtn != "close") {
			if (source.type == "buttonedit") {
				source.setValue(rtn.rowguid);
				source.setText(rtn.examname);
				source.validate();
			}
			yewuUtil.jyxlExamOfflineSelectSingleCall(rtn);
		}
	}, {
		width : eputil.dialogWidthBig,
		height : eputil.dialogHeight
	});
}

yewuUtil.jyxlExamOfflineSelectSingleCall = function(rtn) {

}

/** 培训班单选列表 * */
yewuUtil.openJyxlClassSelectSingle = function(e) {
	var source = {};
	var mode = "single";
	var url = "zhenggong/yewu/jyxl/classinfo/zgjyxlclassselectsingle";

	if (e && e.source) {
		source = e.source;
	}
	epoint.openTopDialog('培训班选择', url, function(rtn) {
		if (rtn && rtn != "close") {
			if (source.type == "buttonedit") {
				source.setValue(rtn.rowguid);
				source.setText(rtn.classname);
				source.validate();
			}
			yewuUtil.jyxlClassSelectSingleCall(rtn);
		}

	}, {
		width : eputil.dialogWidthBig,
		height : eputil.dialogHeight
	});
}

yewuUtil.jyxlClassSelectSingleCall = function(rtn) {

}

/**
 * 通用树选择数据处理，采用,进行划分
 */
eputil.treeNodeSelectSecondDataBind = function(source, mode, rtn) {
	if (!rtn) {
		return false;
	}

	if (rtn != "close") {
		if (source.type == "buttonedit") {
			var text = "";
			var value = "";

			if (mode == "single" || mode == "singleTenant") {
				text = rtn.fullPath || rtn.text;
				value = rtn.id;
			} else {
				for (var i = 0, length = rtn.length; i < length; i++) {
					text += rtn[i].text + ",";
					value += rtn[i].value + ",";
				}
			}

			source.setValue(value);
			source.setText(text);
			source.validate();
		}
	}

	return true;
}

/** grid-selector相关 */
/**
 * 打开树选择页面的统一尺寸
 */
eputil.defaultTreeSelectParam = function(mode) {
	var dialogParam = {
		width : 350,
		height : 500
	};
	if (mode == "multi") {
		dialogParam.width = 550;
	}
	return dialogParam;
}
/**
 * 打开列表选择页面的统一尺寸
 */
eputil.defaultTableSelectParam = function(source, valueKey, textKey) {
	var dialogParam = {
		// width : 1100,
		// height : 550,
		param : {}
	};
	dialogParam.param[valueKey] = source.getValue();
	dialogParam.param[textKey] = source.getText();
	return dialogParam;
}
/**
 * 树选择的默认回调
 */
eputil.defaultTreeSelectCall = function(rtn, mode, source) {
	if (!rtn || rtn == 'close') {
		return;
	}
	if (source.type == "buttonedit") {
		var text = "";
		var value = "";
		if (mode == "single") {
			text = rtn.fullPath || rtn.text;
			value = rtn.id;
		} else {
			for (var i = 0, length = rtn.length; i < length; i++) {
				text += rtn[i].text + ";";
				value += rtn[i].value + ";";
			}
		}
		source.setValue(value);
		source.setText(text);
		source.validate();
	}
}
/**
 * 表格选择的默认回调
 */
eputil.defaultTableSelectCall = function(rtn, source, valueKey, textKey) {
	if (!rtn || rtn == 'close' || source.type != "buttonedit") {
		return;
	}
	var text = "";
	var value = "";
	for (var i = 0; i < rtn.length; i++) {
		text += rtn[i][textKey] + ";";
		value += rtn[i][valueKey] + ";";
	}
	source.setValue(value);
	source.setText(text);
	source.validate();
}
/**
 * 表格的选择布局器
 * 
 */
eputil.gridSelector = {
	selecteds : [],
	grid : null,
	valueKey : null,
	textKey : null,
	rowKey : null,
	rowText : null,
	bindGrid : function(gridId, rowKey, rowText) {
		$(".fui-right").css("padding-right", "350px");
		var $container = $(".grid-selector");
		var html = '<div class="grid-selector-td">';
		html += '<h4 class="fui-left-title">' + $container.data("title") + '</h4>';
		html += '</div>';
		html += '<div class="grid-selector-body">';
		html += '<div class="grid-selector-li">';
		html += '<div class="mini-tabstreeselect-buttons">';
		html += '<span class="mini-tabstreeselect-action mini-icon recover" title="回到初始状态"></span>';
		html += '<span class="mini-tabstreeselect-action mini-icon removeall" title="删除全部"></span>';
		html += '</div>';
		html += '<ul class="mini-tabstreeselect-list selector-nodes" >';
		html += '</ul>';
		html += '</div>';
		html += '</div>';
		$container.append(html);
		var _this = this;
		// 初始化属性
		if (typeof gridId == 'string') {
			_this.grid = mini.get(gridId);
		} else {
			_this.grid = gridId;
		}
		_this.valueKey = $container.data("valuekey");
		_this.textKey = $container.data("textkey");
		_this.rowKey = rowKey;
		_this.rowText = rowText;
		// 绑定删除
		$(".selector-nodes").on("click", ".remove", function() {
			var rowGuid = $(this).parent(".grid-selector-selection").data("guid");
			var rows = _this.grid.getSelecteds();
			for (var i = 0; i < rows.length; i++) {
				if (rowGuid == rows[i][_this.rowKey]) {
					_this.grid.deselect(rows[i]);
				}
			}
			$(this).parent(".grid-selector-selection").remove();
		})
		// 绑定全部删除
		$(".removeall").on("click", function() {
			$(".selector-nodes li").remove();
			_this.grid.clearSelect(true);
		})
		// 绑定恢复
		$(".recover").on("click", function() {
			_this.recover();
		})
		// 表格设置切页保持选中
		grid.setAllowUnselect(true);
		grid.setMultiSelect(true);
		grid.setOnlyCheckSelection(false);
		// 行选中前发生事件
		_this.grid.on("beforeselect", function(e) {
			var event = e.htmlEvent;
			if (event && event.column.type != "checkcolumn") {
				e.cancel = true;
			}
		});
		// 行选中事件
		_this.grid.on("select", function(e) {
			_this.addSelectByRow(e.record);
		});
		// 表格翻页 搜索时触发
		_this.grid.on("update", function() {
			_this.grid.on("load", function() {
				_this.refreshTableSelecteds();
			})
		});
		// 行取消选中
		_this.grid.on("beforedeselect", function(e) {
			var rowGuid = e.record[rowKey];
			$(".grid-selector-selection[data-guid='" + rowGuid + "']").remove();
		});
	},
	// 重置选择
	recover : function() {
		var _this = this;
		_this.grid.clearSelect(true);
		var rows = _this.grid.data;
		$(".selector-nodes").empty();
		_this.initSelecteds(_this.selecteds);
		_this.refreshTableSelecteds();
	},
	// 表哥刷新按照右边列表选中行记录
	refreshTableSelecteds : function() {
		var _this = this;
		var selecteds = _this.getSelecteds();
		var rows = _this.grid.data;
		for (var i = 0; i < rows.length; i++) {
			for (var j = 0; j < selecteds.length; j++) {
				if (selecteds[j][_this.valueKey] == rows[i][_this.rowKey]) {
					_this.grid.select(rows[i]);
				}
			}
		}
	},
	initSelecteds : function(selecteds) {
		var _this = this;
		if (selecteds) {
			for (var j = 0; j < selecteds.length; j++) {
				_this.addSelectNode(selecteds[j][_this.valueKey], selecteds[j][_this.textKey]);
			}
		}

		_this.refreshTableSelecteds();
	},
	addSelectByRow : function(row) {
		var _this = this;
		var selecteds = _this.getSelecteds();
		for (var i = 0; i < selecteds.length; i++) {
			if (selecteds[i][_this.valueKey] == row[_this.rowKey]) {
				return;
			}
		}
		_this.addSelectNode(row[_this.rowKey], row[_this.rowText]);
	},
	addSelectNode : function(value, text) {
		var liHtml = '<li class="mini-tabstreeselect-item grid-selector-selection" data-guid="' + value + '">';
		liHtml += '<span class="item-name" title="' + text + '">' + text + '</span>';
		liHtml += '<i class="mini-tabstreeselect-action mini-icon remove" title="删除"></i>';
		liHtml += '</li>';
		$(".selector-nodes").append(liHtml);
	},
	getSelecteds : function() {
		var _this = this;
		var result = [];
		var $li = $(".selector-nodes li");
		for (var i = 0; i < $li.length; i++) {
			var node = {};
			node[_this.valueKey] = $li.eq(i).data("guid");
			node[_this.textKey] = $li.eq(i).children(".item-name").text();
			result.push(node);
		}
		return result;
	}
};

/**
 * 搜索框拼接
 * 
 * @param {}
 *            data
 * @param {}
 *            columnNum
 * @return {String}
 */
yewuUtil.createDynamicSearchForm = function(data, columnNum, hasBind) {
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
					+ '" value="' + currentData.defaultValue + '" emptyText="请选择" allowInput="false"  showClose="true" oncloseclick="eputil.clearTextValue"';
			html += ' data-options="{\'format\':\'' + currentData.format + '\'}"   readOnly="true"/>';

		} else if (currentData.codeName) {
			html += '<input id="search_' + currentData.fieldName + '_in" bind="dataBean.' + currentData.fieldName + '" class="mini-treeselect" value="' + currentData.defaultValue
					+ '"emptyText="请选择" multiSelect="true" showClose="true"   oncloseclick="eputil.clearTextValue"  readOnly="true"';
			html += ' textField="text" valueField="id" valueFromSelect="true" parentField="pid"  showFilter="true" data=\'' + JSON.stringify(currentData.codeData) + '\' />';
		} else {
			html += '<input id="search_' + currentData.fieldName + '" bind="dataBean.' + currentData.fieldName + '"  name="' + currentData.fieldName + '" class="' + currentData.fieldType
					+ '" value="' + currentData.defaultValue + '" allowInput="true" valueFromSelect="true" showClose="true" oncloseclick="eputil.clearTextValue"  readOnly="true"/>';
		}
		html += '</div>';
		if (currentColumnNum + 1 == columnNum || i + 1 == size) {
			html += '</div>';
		}
	}
	return html;
}

yewuUtil.openCodeItemTreeSingleByCodeName = function(e) {
	yewuUtil.openCodeItemTreeByCodeName("single", e.source);
}
yewuUtil.openCodeItemTreeMultiByCodeName = function(e) {
	yewuUtil.openCodeItemTreeByCodeName("multi", e.source);
}
yewuUtil.openCodeItemTreeByCodeName = function(model, source) {
	var url = null;
	var param = null;
	if (model == 'multi') {
		url = 'zhenggong/hr/tree/hrcodeitemtreemulti?codename=' + epoint.encodeUtf(source.codename);
		param = {
			width : 450,
			height : 500
		};
	} else {
		url = 'zhenggong/hr/tree/hrcodeitemtreesingle?codename=' + epoint.encodeUtf(source.codename);
		param = {
			width : 450,
			height : 500
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
						text = rtn.fullPath || rtn.text;
						value = rtn.id;
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
			hrUtil.codeItemTreeSelectCall(rtn);
		}, param);
	} else {
		epoint.alert("未知的选择树！");
	}
}
/** grid-selector结束 */


//是否是图片
eputil.isImage = function(fileName) {
	try {
		if (fileName) {
			var extStart = fileName.lastIndexOf(".");
			var ext = fileName.substring(extStart, fileName.length).toUpperCase();
			if (ext == ".BMP" || ext == ".PNG" || ext == ".GIF" || ext == ".JPG" || ext == ".JPEG") {
				return true;
			}
		}
	} catch (e) {

	}

	return false;
}

