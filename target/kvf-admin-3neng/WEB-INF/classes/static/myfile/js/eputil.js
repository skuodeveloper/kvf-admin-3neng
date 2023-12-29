String.prototype.startWith = function(str) {
	var reg = new RegExp("^" + str);
	return reg.test(this);
};

String.prototype.endWith = function(str) {
	var reg = new RegExp(str + "$");
	return reg.test(this);
};

// 公用类
var eputil = {
	_version : "9.5.0.12",
	// res路径，根据实际项目修改
	resPath : "ggaq/res/",

	// 地图地址配置
	mapUrl : {
		// 根路径
		root : ""
	},
	// 系统时间
	_systemTimepstamp : 0,
	// 弹出页面默认尺寸,
	dialogWidth : 1100,
	dialogHeight : 600,
	// 大尺寸
	dialogWidthBig : 1500,
	// 小尺寸
	dialogWidthSmall : 700,
	// 迷你
	dialogWidthMini : 400,
	// 前台通用的yesNoModel的数据
	yesNoData : [{
				id : "1",
				text : "是"
			}, {
				id : "0",
				text : "否"
			}],
	SEX_MALE : "1",// 男
	SEX_FEMALE : "2",// 女
	SUCCESS : "success",
	alertType : "2", // 弹窗模式，1：alert，2：showtip
	LOCALHOST : "localhost",
	/**
	 * 附件可拖动
	 */
	attachSortable : false,
	/**
	 * 旋转效果持久化
	 */
	persistRotate : false,
	/**
	 * 模型数据源
	 * 
	 * @type
	 */
	_selectItemData : {},
	/**
	 * 获取时间戳
	 * 
	 * @param {}
	 *            date
	 * @return {Number}
	 */
	getTime : function(date) {
		if (!date) {
			return 0;
		}

		if (typeof date == "string") {
			date = eputil.dateUtil.parse(date);
		}

		return date.getTime();
	},

	// 加载图片，失败就显示默认头像图片
	loadPhoto : function(imgId, attachGuid, defaultPhoto) {
		if (!imgId) {
			return;
		}
		var $img = $("#" + imgId);
		if ($img.length == 0) {
			return;
		}

		if (!defaultPhoto) {
			defaultPhoto = Util.getRootPath() + "frame/fui/css/images/default-profile.png";
		}

		if (attachGuid) {
			var src = Util.getRootPath() + "rest/attachAction/getContent?isCommondto=true&attachGuid=" + attachGuid;
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
	},

	/**
	 * 提示
	 * 
	 * @param {}
	 *            message
	 * @param {}
	 *            title
	 * @param {}
	 *            callback
	 * @param {}
	 *            icon
	 */
	alert : function(message, successPre, title, callback, iconCls) {
		var isAlert = false;

		if (eputil.alertType == "2") {
			if (message != eputil.SUCCESS) {
				// 不是保存成功的状态，使用alert提示
				isAlert = true;
			}
		} else {
			isAlert = true;
		}

		if (message == eputil.SUCCESS) {
			message = ((successPre || "保存") + "成功！");
		}

		if (isAlert) {
			// alert模式
			epoint.alert(message, title, callback, iconCls);
		} else {
			// showtip模式
			parent.epoint.showTips(message);
		}
	},

	/**
	 * 提示并关闭
	 * 
	 * @param {}
	 *            message
	 * @param {}
	 *            title
	 * @param {}
	 *            callback
	 * @param {}
	 *            options
	 * @param {}
	 *            iconCls
	 */
	alertAndClose : function(message, successPre, title, callback, options, iconCls) {
		var isAlert = false;
		// 若当前页面为最高级页面，直接显示在当前页面
		var parent = window.parent || window.self;

		if (eputil.alertType == "2") {
			// showtip模式
			if (!parent.epoint || !parent.epoint.showTips) {
				isAlert = true;
			} else {
				if (eputil.SUCCESS != message) {
					// 不是保存成功的状态，使用alert提示
					isAlert = true;
				}
			}
		} else {
			isAlert = true;
		}

		if (message == eputil.SUCCESS) {
			message = ((successPre || "保存") + "成功！");
		}

		if (isAlert) {
			// alert模式
			epoint.alertAndClose(message, title, callback, options, iconCls);
		} else {
			// showtip模式
			parent.epoint.showTips(message);
			// 这边要手动关闭了
			epoint.closeDialog("ok");
		}
	},

	/**
	 * 关闭窗体（带addTab的处理）
	 */
	closeDialog : function(action, refreshParent) {
		var dialogId = Util.getUrlParams('_dialogId_');
		if (dialogId) {
			epoint.closeDialog(action);
		} else {
			var TabsNav = window.parent.TabsNav;

			if (TabsNav && TabsNav.getActiveTab && TabsNav.removeTab) {
				var _data = TabsNav.getActiveTab()._data;

				// 刷新父页面
				if (refreshParent) {
					var parentTabId = _data.param.parentId;
					if (parentTabId) {
						TabsNav.refreshTabContent(parentTabId);
					}
				}

				TabsNav.removeTab(_data.id);

			}
		}
	},

	toNumber : function(px) {
		if (px) {
			px = px.replace("px", "");

			if (px.indexOf(".") > 0) {
				px = parseFloat(px);
			} else {
				px = parseInt(px);
			}

			if (px == "NaN") {
				return 0;
			} else {
				return px;
			}
		}

		return 0;
	},

	getUUID : function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	},

	getSystemDate : function() {
		return new Date(this._systemTimepstamp);
	},

	/**
	 * 获取模型数据
	 * 
	 * @param {}
	 *            dataGridId
	 * @param {}
	 *            codeName
	 * @return {}
	 */
	getSelectItems : function(dataGridId, codeName) {
		if (!codeName) {
			return [];
		}

		if (!dataGridId) {
			dataGridId = "common";
		}

		var codeData = this._selectItemData[dataGridId];
		if (codeData) {
			return mini.clone(codeData[codeName]);
		}

		return [];
	},

	/**
	 * 缓存模型数据
	 * 
	 * @param {}
	 *            dataGridId
	 * @param {}
	 *            codeName
	 * @param {}
	 *            items
	 */
	addSelectItems : function(dataGridId, codeName, items) {
		if (!codeName || !items || items.length == 0) {
			return;
		}

		if (!dataGridId) {
			dataGridId = "common";
		}

		var codeData = this._selectItemData[dataGridId];
		if (!codeData) {
			codeData = {};
		}

		codeData[codeName] = items;

		this._selectItemData[dataGridId] = codeData;
	},

	/** 缓存页面首次加载的控件，在保存新增之后，会根据这些值恢复控件状态* */
	_cacheControls : {},

	initCacheControl : function() {
		var _this = this;

		var $buttonedit = $(".mini-buttonedit");
		$buttonedit.each(function(i) {
			var id = this.id;

			var buttonedit = mini.get(id);
			if (buttonedit) {
				_this._cacheControls[id] = {
					value : buttonedit.getValue(),
					text : buttonedit.getText()
				};
			}
		});

		var $hidden = $(".mini-hidden");
		$hidden.each(function(i) {
			var id = this.id;

			if (id == "_common_hidden_viewdata") {
				return;
			}

			var hidden = mini.get(id);
			if (hidden) {
				_this._cacheControls[id] = {
					value : hidden.getValue()
				};
			}
		});

		var $combo = $(".mini-combobox");
		$combo.each(function(i) {
			var id = this.id;

			var combo = mini.get(id);
			if (combo) {
				_this._cacheControls[id] = {
					value : combo.getValue()
				};
			}
		});

		var $output = $(".mini-outputtext");
		$output.each(function(i) {
			var id = this.id;

			var output = mini.get(id);
			if (output) {
				_this._cacheControls[id] = {
					value : output.getValue()
				};
			}
		});

		var $radio = $(".mini-radiobuttonlist");
		$radio.each(function(i) {
			var id = this.id;

			var radio = mini.get(id);
			if (radio) {
				_this._cacheControls[id] = {
					value : radio.getValue()
				};
			}
		});
	},

	restoreCacheControl : function() {
		var _this = this;

		for (var id in _this._cacheControls) {
			var miniObj = mini.get(id);
			if (miniObj) {
				if ("buttonedit" == miniObj.type) {
					miniObj.setValue(_this._cacheControls[id].value);
					miniObj.setText(_this._cacheControls[id].text);
				} else if ("hidden" == miniObj.type) {
					miniObj.setValue(_this._cacheControls[id].value);
				} else if ("combobox" == miniObj.type) {
					miniObj.setValue(_this._cacheControls[id].value);
				} else if ("outputtext" == miniObj.type) {
					miniObj.setValue(_this._cacheControls[id].value);
				} else if ("radiobuttonlist" == miniObj.type) {
					miniObj.setValue(_this._cacheControls[id].value);
				}
			}
		}

		// 数字类型的需要默认一个
		var $textbox = $(".mini-textbox");
		$textbox.each(function(i) {
			var id = this.id;

			var textbox = mini.get(id);
			if (textbox) {
				var vtype = textbox.vtype;

				if (vtype == "int" || vtype == "float") {
					textbox.setValue(0);
				}
			}
		});
	},
	/** 缓存结束* */

	// 保存并新建
	saveAndNew : function() {
		if (eputil.beforeValidate() == false) {
			return;
		}

		if (epoint.validate()) {
			if (eputil.afterValidate() == false) {
				return;
			}

			epoint.execute('addNew', 'fui-form', eputil.newCallback);
		}
	},
	// 保存并关闭
	saveAndClose : function() {
		if (eputil.beforeValidate() == false) {
			return;
		}

		if (epoint.validate()) {
			if (eputil.afterValidate() == false) {
				return;
			}

			epoint.execute('add', 'fui-form', eputil.closeCallback);
		}
	},
	// 保存修改
	saveModify : function() {
		if (eputil.beforeValidate() == false) {
			return;
		}

		if (epoint.validate()) {
			if (eputil.afterValidate() == false) {
				return;
			}

			epoint.execute('save', 'fui-form', eputil.closeCallback);
		}
	},
	// 工作流保存
	saveWorkflowForm : function() {
		if (eputil.beforeValidate() == false) {
			ShowTdOperate(true);
			return;
		}

		if (epoint.validate()) {
			if (eputil.afterValidate() == false) {
				ShowTdOperate(true);
				return;
			}

			epoint.execute('saveForm', 'fui-form', eputil.workflowCallback);
		} else {
			ShowTdOperate(true);
		}
	},
	// 工作流提交
	submitWorkflow : function() {
		if (eputil.beforeValidate() == false) {
			ShowTdOperate(true);
			return;
		}

		if (epoint.validate()) {
			if (eputil.afterValidate() == false) {
				ShowTdOperate(true);
				return;
			}

			epoint.execute('submit', 'fui-form', eputil.workflowCallback);
		} else {
			ShowTdOperate(true);
		}
	},

	// 验证之前
	beforeValidate : function() {
		return true;
	},

	// 验证之后
	afterValidate : function() {
		return true;
	},

	// 保存并新建
	newCallback : function(result) {
		var message = result.msg;
		if (message) {
			if (message == eputil.SUCCESS) {
				// 清理表单
				epoint.clear('fui-form');
				// 清理个性化的附件
				eputil.clearAttachList();

				eputil.restoreCacheControl();

				// 调用来源页面默认的刷新方法
				try {
					var dialog = epoint.getOwnerDialog();
					if (dialog) {
						dialog.Owner.eputil.dialogCallback("ok");
					}
				} catch (e) {

				}
			}

			eputil.alert(message, result.alertMsg, "", null, "info");
		} else {
			eputil.alert('没有返回值！');
		}

		eputil.saveAndNewCall(result);
	},

	saveAndNewCall : function(result) {

	},

	// 保存并关闭
	closeCallback : function(result) {
		var message = result.msg;
		if (message) {
			if (message == eputil.SUCCESS) {
				// var alertMsg = '保存成功！';
				// if (result.alertMsg) {
				// alertMsg = result.alertMsg;
				// }
				var dialogId = Util.getUrlParams('_dialogId_');
				if (dialogId) {
					eputil.alertAndClose(message, "", "", null, "info");
				} else {
					eputil.alert(message, "", "", function() {
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
				eputil.alert(message, result.alertMsg, "", null, "info");
			}
		} else {
			eputil.alert('没有返回值！');
		}
	},
	// 工作流回调
	workflowCallback : function(result) {
		if (result && result.msg) {
			eputil.alert(result.msg, result.alertMsg, "", null, "info");
			ShowTdOperate(true);
		} else {
			HeaderSubmit();
		}
	},

	// 弹出框的回调
	dialogCallback : function(param) {
		if (param && param != 'close') {
			// 一般是刷新树和表格，其他情况自定义
			if (searchData) {
				var $tree = $(".mini-tree");
				if ($tree.length > 0) {
					eputil.searchDataCurrent($tree.prop("id"));
				} else {
					eputil.searchDataCurrent();
				}
			}
		}
	},

	// 清理输入域
	clearTextValue : function(e) {
		var source = {};
		if (e && e.source) {
			source = e.source;
		}
		source.setValue("");
		source.setText("");
		source.validate();
	},

	// 绘制行编辑按钮
	onEditRenderer : function(e) {
		return epoint.renderCell(e, "action-icon icon-edit", "eputil.openEdit", "epoint_total");
	},
	// 绘制行查看按钮
	onDetailRenderer : function(e) {
		return epoint.renderCell(e, "action-icon icon-search", "eputil.openDetail", "epoint_total");
	},
	// 绘制设置属性按钮
	onSettingRenderer : function(e) {
		return epoint.renderCell(e, "action-icon icon-doc", "eputil.openSetting", "epoint_total");
	},
	// 绘制上移按钮
	onMoveUpRenderer : function(e) {
		return eputil.renderMoveCell(e.sender.id, e.row._uid, "action-icon icon-up", "eputil.moveUp");
	},
	// 绘制下移按钮
	onMoveDownRenderer : function(e) {
		return eputil.renderMoveCell(e.sender.id, e.row._uid, "action-icon icon-down", "eputil.moveDown");
	},
	// 绘制删除属性按钮
	onDeleteRenderer : function(e) {
		return epoint.renderCell(e, "action-icon icon-remove", "eputil.openDelete", "epoint_total");
	},
	// 绘制删除前台一行的属性按钮
	onDeleteRowRenderer : function(e) {
		return "<a href='javascript: eputil.deleteFrontRow(\"" + e.record._uid + "\", \"" + e.sender.id + "\");' class='action-icon icon-remove'></a>";
	},
	// 渲染标签
	onTagRenderer : function(tags, isClick) {
		var html = "";
		if (!tags) {
			return html;
		}

		for (var i = 0, length = tags.length; i < length; i++) {
			var tag = tags[i];

			var cls = "tag-label selected";
			if (isClick) {
				cls += " clicked";
			}

			html += "<span class='" + cls + "'";

			if (isClick) {
				html += " onclick='eputil.onTagClick(\"" + tag + "\");'";
			}

			html += ">";
			html += tag;
			html += "</span>";
		}

		return html;
	},
	// 标签点击
	onTagClick : function(tag) {

	},
	// 渲染链接
	onLinkRenderer : function(e) {
		return eputil.renderLinkCell(e, "openLink", e.value, "epoint_total");
	},
	// 渲染移动单元格
	renderMoveCell : function(dataGridId, uid, cls, func) {
		return '<i onclick="' + func + "('" + dataGridId + "', '" + uid + "')\" class=\"" + cls + '"></i>';
	},
	// 渲染成链接效果
	renderLinkCell : function(e, func, title, fieldName) {
		var param = null;
		var isJson = false;
		var cls = "ga-link";
		title = title || "";

		if (fieldName) {
			// 如果是total，处理成json
			if (fieldName == "epoint_total") {
				param = epoint.encodeJson(e.row);
				isJson = true;
			}
			// 如果是多个，处理成json
			else if (fieldName.indexOf(',') != -1) {
				var pp = {};
				var names = fieldName.split(',');
				for (var i = 0, l = names.length; i < l; i++) {
					var r = names[i];
					pp[r] = e.row[r];
				}
				param = epoint.encodeJson(pp);
				isJson = true;
			} else {
				param = e.row[fieldName];
			}
		} else {
			fieldName = e.sender.idField;
			param = e.row[fieldName];
		}

		if (isJson) {
			param = param.replace(/\"/g, "\'");
			return '<span onclick="' + func + "(" + param + ")\" class=\"" + cls + '">' + title + '</span>';
		} else {
			if (typeof param == 'string') {
				param = param.replace(/'/g, "\\'");
				param = param.replace(/\\/g, "/");
			}
			return '<span onclick="' + func + "('" + param + "')\" class=\"" + cls + '">' + title + '</span>';
		}
	},

	moveUp : function(dataGridId, uid) {
		var dataGrid = mini.get(dataGridId);
		if (!dataGrid) {
			return
		}

		var row = dataGrid.getRowByUID(uid);
		if (!row) {
			return;
		}

		dataGrid.commitEdit();
		dataGrid.moveUp([row]);

		eputil.initEditTable(dataGrid);
	},

	moveDown : function(dataGridId, uid) {
		var dataGrid = mini.get(dataGridId);
		if (!dataGrid) {
			return
		}

		var row = dataGrid.getRowByUID(uid);
		if (!row) {
			return;
		}

		dataGrid.commitEdit();
		dataGrid.moveDown([row]);

		eputil.initEditTable(dataGrid);
	},

	openEdit : function(e) {
		if (openEdit) {
			openEdit(e);
		}
	},

	openDetail : function(e) {
		if (openDetail) {
			openDetail(e);
		}
	},

	openSetting : function(e) {
		if (openSetting) {
			openSetting(e);
		}
	},

	openDelete : function(e) {
		if (openDelete) {
			openDelete(e);
		}
	},

	deleteFrontRow : function(uid, dataGridId) {
		var grid = mini.get(dataGridId);
		if (!grid) {
			return;
		}

		var row = grid.getRowByUID(uid);
		if (!row) {
			return;
		}

		grid.removeRow(row);

		eputil.afterDeleteFrontRow(row, dataGridId);
	},

	afterDeleteFrontRow : function(row, dataGridId) {

	},

	// 表格选中操作
	tableSelect : function(dataGridId, actionName, operateName, callBack) {
		if (dataGridId && actionName) {
			if (!operateName) {
				operateName = "操作";
			}

			var table = mini.get(dataGridId);
			if (table) {
				if (table.getSelecteds().length <= 0)
					eputil.alert("请选择要" + operateName + "的记录!");
				else {
					epoint.confirm("确认要" + operateName + "吗？", "提示", function() {
						var ids = [dataGridId];
						if ($("#fui-form").length > 0) {
							ids.push("fui-form");
						}

						epoint.execute(actionName, ids, null, function(result) {
							if (callBack) {
								callBack(result);
							}
						});
					});
				}
			} else {
				eputil.alert("没有找到表格！");
			}
		} else {
			eputil.alert("无效的操作！");
		}
	},

	/**
	 * 当前页查询
	 */
	searchDataCurrent : function(extraIds) {
		eputil.searchData(extraIds, true);
	},

	/**
	 * 查询回首页
	 */
	searchDataFirst : function(extraIds) {
		eputil.searchData(extraIds, false);
	},

	/**
	 * 查询
	 */
	searchData : function(extraIds, keepIndex) {
		var ids = [];
		if ($("#datagrid").length > 0) {
			ids.push("datagrid");
		}
		if ($("#fui-form").length > 0) {
			ids.push("fui-form");
		}

		if (extraIds) {
			if ($.isArray(extraIds)) {
				ids = ids.concat(extraIds);
			} else {
				ids.push(extraIds);
			}
		}
		if (ids.length > 0) {
			epoint.refresh(ids, null, keepIndex);
		}
	},

	// 表格列宽最小值，只初始化表格
	tableColumnMinWidth : function(grid) {
		if (typeof grid == 'string') {
			grid = mini.get(grid);
		}
		if (!grid) {
			return;
		}

		grid.on("load", function() {
			for (var i = 0, length = grid.columns.length; i < length; i++) {
				var column = grid.columns[i];

				var miniWidth = column["minWidth"];
				miniWidth = miniWidth ? parseInt(miniWidth) : 0;
				if (!miniWidth) {
					continue;
				}

				// 实际宽度小于最小宽度时，动态改变列宽
				var actualWidth = $(grid.getHeaderCellEl(column)).outerWidth();
				if (actualWidth >= miniWidth) {
					continue;
				}

				grid.setColumnWidth(column, miniWidth);
			}
		});
	},

	// 验证的正则表达式
	validationExpression : {
		// 大于零的整数
		intOverZero : function(e) {
			if (e.isValid && e.value) {
				var reg = /^[1-9]\d*$/;
				if (!reg.test(e.value)) {
					e.isValid = false;
					e.errorText = "必须输入大于0的整数";
				}
			}
		},
		// 小数点后最多2位的正数
		maxTwoAfterPointOverZero : function(e) {
			if (e.isValid && e.value && e.value != "0") {
				var reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
				if (!reg.test(e.value)) {
					e.isValid = false;
					e.errorText = "必须输入小数点后最多2位的数字";
				}
			}
		},
		// text必填，而非value
		textRequired : function(e) {
			if (e.isValid) {
				if (!e.source.getText()) {
					e.isValid = false;
					e.errorText = "不能为空";
				}
			}
		}
	},

	idCardValidate : function(idcard) {
		var errors = new Array("", "身份证号码位数不对!", "身份证号码出生日期超出范围或含有非法字符!", "身份证号码校验错误!", "身份证地区非法!");
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
				if (ereg.test(idcard))
					return errors[0];
				else
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
					S = (parseInt(idcardArray[0]) + parseInt(idcardArray[10])) * 7 + (parseInt(idcardArray[1]) + parseInt(idcardArray[11])) * 9
							+ (parseInt(idcardArray[2]) + parseInt(idcardArray[12])) * 10 + (parseInt(idcardArray[3]) + parseInt(idcardArray[13])) * 5
							+ (parseInt(idcardArray[4]) + parseInt(idcardArray[14])) * 8 + (parseInt(idcardArray[5]) + parseInt(idcardArray[15])) * 4
							+ (parseInt(idcardArray[6]) + parseInt(idcardArray[16])) * 2 + parseInt(idcardArray[7]) * 1 + parseInt(idcardArray[8]) * 6 + parseInt(idcardArray[9]) * 3;
					Y = S % 11;
					M = "F";
					JYM = "10X98765432";
					M = JYM.substr(Y, 1); // 判断校验位
					if (M == idcardArray[17])
						return errors[0]; // 检测ID的校验位
					else
						return errors[3];
				} else
					return errors[2];
				break;
			default :
				return errors[1];
				break;
		}
	},

	/**
	 * 日期控件范围限制
	 * 
	 * @param {}
	 *            fromDateId
	 * @param {}
	 *            toDateId
	 */
	initDateSection : function(fromDateId, toDateId) {
		var fromDate = mini.get(fromDateId);
		var toDate = mini.get(toDateId);

		if (!fromDate || !toDate) {
			return;
		}

		fromDate.on("drawDate", function(e) {
			var toValue = toDate.getValue();
			if (toValue) {
				toValue = eputil.dateUtil.parse(eputil.dateUtil.format(toValue, "yyyy-MM-dd"));

				if (e.date > toValue) {
					e.allowSelect = false;
				}
			}
		});

		toDate.on("drawDate", function(e) {
			var fromValue = fromDate.getValue();
			if (fromValue) {
				fromValue = eputil.dateUtil.parse(eputil.dateUtil.format(fromValue, "yyyy-MM-dd"));

				if (e.date < fromValue) {
					e.allowSelect = false;
				}
			}
		});

		// 不符合的清空
		fromDate.on("valuechanged", function(e) {
			if (!fromDate.getValue()) {
				return;
			}
			if (toDate.getValue() && e.value > toDate.getValue()) {
				epoint.showTips("开始时间不能大于结束时间！");
				e.source.setValue(null);
			}
		});

		toDate.on("valuechanged", function(e) {
			if (!toDate.getValue()) {
				return;
			}
			if (fromDate.getValue() && e.value < fromDate.getValue()) {
				epoint.showTips("结束时间不能小于开始时间！");
				e.source.setValue(null);
			}
		});
	},

	/**
	 * 列单选
	 * 
	 * @param {}
	 *            grid
	 * @param {}
	 *            column
	 */
	tableColumnCheckSingle : function(grid, columns) {
		if (columns == null || columns.length == 0) {
			return;
		}

		if (typeof grid == 'string') {
			grid = mini.get(grid);
		}
		if (!grid) {
			return;
		}

		var cssClass = "table-column-check-single";
		if ($(grid.getEl()).hasClass(cssClass)) {
			// 已经注册过了
			return;
		}
		grid.addCls(cssClass);

		if (!$.isArray(columns)) {
			columns = [columns];
		}

		grid.on("cellclick", function(e) {
			var column = e.column;
			if (columns.indexOf(column.field) < 0 && columns.indexOf(column.name) < 0) {
				return;
			}

			var $target = $(e.htmlEvent.target);
			if (!$target.hasClass("mini-checkbox-icon") && !$target.hasClass("mini-grid-checkbox")) {
				// 不是点击多选框
				return;
			}

			var currentRow = e.row;

			var rows = grid.getList();
			for (var i = 0, length = rows.length; i < length; i++) {
				var row = rows[i];

				if (row._uid == currentRow._uid) {
					// 同一行
					continue;
				}

				if (grid.isEditingRow(row)) {
					// 如果是处于行编辑状态，获取编辑器赋值
					var editor = grid.getCellEditor(column, row);
					if (editor == null || editor.type != "checkbox") {
						continue;
					}

					editor.setValue(editor.falseValue || "0");
				} else {
					if (column.type != "checkboxcolumn") {
						continue;
					}

					var newData = {};
					newData[e.field] = column.falseValue || "0";

					grid.updateRow(row, newData);
				}
			}
		});
	},

	/**
	 * 列全选
	 * 
	 * @param {}
	 *            grid
	 * @param {}
	 *            columns
	 */
	tableColumnCheckAll : function(grid, columns) {
		if (columns == null || columns.length == 0) {
			return;
		}

		if (typeof grid == 'string') {
			grid = mini.get(grid);
		}
		if (!grid) {
			return;
		}

		var cssClass = "table-column-check-all";
		if ($(grid.getEl()).hasClass(cssClass)) {
			// 已经注册过了
			return;
		}
		grid.addCls(cssClass);

		if (!$.isArray(columns)) {
			columns = [columns];
		}

		var checkedCssClass = "mini-grid-checkbox-checked";

		grid.on("load", function(loadEvent) {
			// 绘制标题
			for (var i = 0, length = columns.length; i < length; i++) {
				var column = grid.getColumn(columns[i]);
				if (!column) {
					continue;
				}

				column.header = '<div class="datagrid-header-check-all" data-columnfield="' + column.name + '"><span class="mini-icon mini-grid-checkbox"></span>' + column.header + '</div>';
			}

			// 绑定事件
			$(grid.el).on("click", ".datagrid-header-check-all", function(e) {
				var $this = $(this);
				var $checkAllBox = $this.find(".mini-grid-checkbox");

				var column = grid.getColumn($this.data("columnfield"));
				// 选中
				var checked = true;

				if ($checkAllBox.hasClass(checkedCssClass)) {
					$checkAllBox.removeClass(checkedCssClass);
					checked = false;
				} else {
					$checkAllBox.addClass(checkedCssClass);
					checked = true;
				}

				var rows = grid.getList();
				for (var i = 0, length = rows.length; i < length; i++) {
					var row = rows[i];

					if (grid.isEditingRow(row)) {
						// 如果是处于行编辑状态，获取编辑器赋值
						var editor = grid.getCellEditor(column, row);
						if (editor == null || editor.type != "checkbox") {
							continue;
						}

						editor.setValue(checked ? (editor.trueValue || "1") : (editor.falseValue || "0"));
					} else {
						if (column.type != "checkboxcolumn") {
							continue;
						}

						var newData = {};
						newData[column.field] = checked ? (column.falseValue || "1") : (column.falseValue || "0");

						grid.updateRow(row, newData);
					}
				}
			});
		});
	},

	/**
	 * 初始化单元格编辑器数据源
	 * 
	 * @param {}
	 *            grid
	 * @param {}
	 *            row
	 */
	initCellEditorData : function(grid, row) {
		var codeDatas = eputil._selectItemData[grid.getId()];
		if (!codeDatas) {
			// 没有绑定数据模型
			return;
		}

		for (var name in codeDatas) {
			var editor = grid.getCellEditor(name, row);
			if (editor) {
				editor.setData(codeDatas[name]);
			}
		}
	},

	/**
	 * 给表格添加一行
	 * 
	 * @param {}
	 *            grid
	 * @param {}
	 *            row
	 */
	addEditTableRow : function(grid, rows, index) {
		if (!rows || rows.length == 0) {
			return;
		}

		if (typeof grid == "string") {
			grid = mini.get(grid);
		}
		if (!grid) {
			return;
		}

		if (!index) {
			index = grid.getList().length;
		}

		if (!$.isArray(rows)) {
			rows = [rows];
		}

		var dataGridId = grid.getId();
		// 静态编辑
		var staticEdit = grid.getAllowCellEdit() == false;

		for (var i = 0, length = rows.length; i < length; i++) {
			var row = rows[i];

			grid.addRow(row, index + i);

			// 如果是静态编辑
			if (staticEdit) {
				grid.beginEditRow(row);
			}

			eputil.initCellEditorData(grid, row);
		}
	},

	/**
	 * 初始化表格静态编辑
	 * 
	 * @param {}
	 *            grid
	 * @param {}
	 *            models
	 */
	initEditTable : function(grid, models) {
		if (typeof grid == "string") {
			grid = mini.get(grid);
		}
		if (!grid) {
			return;
		}
		if (!models) {
			models = [];
		}

		var dataGridId = grid.getId();

		// 必须要关闭单元格编辑状态
		if (grid.getAllowCellEdit() !== false) {
			grid.setAllowCellEdit(false);
		}

		// 加载模型数据
		function _initDatas(action, name) {
			var def = $.Deferred();

			epoint.execute(action, "@none", function(datas) {
				eputil.addSelectItems(dataGridId, name, datas);
				def.resolve();
			});

			return def;
		}

		// 行编辑
		function _beginEditRows() {
			var rows = grid.getList();
			for (var i = 0, length = rows.length; i < length; i++) {
				var row = rows[i];

				if (!grid.isEditingRow(row)) {
					grid.beginEditRow(row);
				}

				eputil.initCellEditorData(grid, row);
			}
		}

		var fun_str = "";

		var funcs = [];

		for (var i = 0, length = models.length; i < length; i++) {
			var model = models[i];
			if (!model.action || !model.name) {
				// 要有action属性
				continue;
			}

			fun_str += "_initDatas('" + model.action + "','" + model.name + "'),";
		}

		// 给表格数据开启行编辑
		if (fun_str) {
			fun_str = fun_str.substring(0, fun_str.length - 1);
			fun_str = eval("$.when(" + fun_str + ").then(function(){_beginEditRows();})");
		} else {
			// 没有数据加载
			_beginEditRows();
		}
	},

	/**
	 * 数据导入
	 * 
	 * @param {}
	 *            uploader
	 * @param {}
	 *            acceptCall
	 * @param {}
	 *            errorCall
	 * @param {}
	 *            startCall
	 */
	initDataImport : function(uploader, acceptCall, errorCall, startCall) {
		if (typeof uploader == "string") {
			uploader = mini.get(uploader);
		}
		if (!uploader) {
			return;
		}

		var duplicate = uploader.getDuplicate();
		if (duplicate == null || duplicate == undefined) {
			if (uploader.setDuplicate) {
				uploader.setDuplicate(true);
			} else {
				uploader.set("duplicate", true);
			}
		}

		uploader.on("uploadstart", function(e) {
			epoint.showLoading();

			if (startCall) {
				startCall(e);
			}
		});

		uploader.on("uploaderror", function(e) {
			epoint.hideLoading();

			if (errorCall) {
				errorCall(e);
			} else {
				epoint.alert("导入异常！");
			}
		});

		uploader.on("uploadaccept", function(e) {
			epoint.hideLoading();

			var data = null;
			if (e.ret.extraDatas) {
				data = e.ret.extraDatas;
			}

			if (acceptCall) {
				acceptCall(e, data);
			} else {
				if (data && data.msg) {
					epoint.alert(data.msg);
				}
			}
		});
	},

	/**
	 * 加载图表
	 * 
	 * @param {}
	 *            id
	 * @param {}
	 *            option
	 * @param {}
	 *            theme
	 * @return {}
	 */
	initECharts : function(id, option, theme) {
		var dom = document.getElementById(id);
		if (dom) {
			theme = theme ? theme : "macarons";

			var myCharts = echarts.init(dom, theme);
			myCharts.setOption(Util.safeEval("(" + option + ")"));

			return myCharts;
		}
	},

	/** 地图定位渲染结束* */
	// 地图的弹出层DIALOG
	_mapDialog : null,

	// 打开地图定位
	openMapLocate : function(x, y, code) {
		if (!eputil.mapUrl || !eputil.mapUrl.locate) {
			eputil.alert("没有定位页面！");
			return;
		}

		// 如果不传参数的话，读取表单上的隐藏域
		if (!x || !y) {
			var gisx = mini.get("gisx");
			var gisy = mini.get("gisy");
			if (gisx && gisy) {
				x = gisx.getValue();
				y = gisy.getValue();
			}
		}

		if (!code) {
			var giscode = mini.get("giscode");
			if (giscode) {
				code = giscode.getValue();
			}
		}

		x = x || "";
		y = y || "";
		code = code || "";

		top.eputil._mapDialog = epoint.openTopDialog('定位', eputil.mapUrl.locate + "?x=" + x + "&y=" + y + "&code=" + code);

		// 添加消息监听，通过消息监听来完成数据的传输
		var onMapMessage = function(event) {
			var data = event.data;
			var origin = event.origin;

			var x = "";
			var y = "";
			var code = "";
			if (data) {
				var datas = data.split("#@#");
				if (datas.length > 1) {
					x = datas[0];
					y = datas[1];
				}
				if (datas.length > 2) {
					code = datas[2];
				}
			}

			// 移除监听事件
			if (top.removeEventListener) {
				top.removeEventListener('message', onMapMessage, false);
			} else if (typeof top.attachEvent) {
				top.detachEvent('onmessage', onMapMessage);
			}

			// 关闭弹出窗口
			if (top.eputil._mapDialog) {
				var source = top.eputil._mapDialog.Owner;

				var gisx = source.mini.get("gisx");
				var gisy = source.mini.get("gisy");
				var giscode = source.mini.get("giscode");
				if (gisx && gisy) {
					gisx.setValue(x);
					gisy.setValue(y);

					if (giscode) {
						giscode.setValue(code);
					}
				}

				source.eputil.renderLocate();

				top.eputil._mapDialog._CloseOwnerWindow();
				top.eputil._mapDialog = null;
			}
		};

		if (typeof top.addEventListener) {
			top.addEventListener('message', onMapMessage, false);
		} else if (typeof top.attachEvent) {
			// for ie
			top.attachEvent('onmessage', onMapMessage);
		}
	},

	openMapDraw : function(area) {
		if (!eputil.mapUrl || !eputil.mapUrl.draw) {
			eputil.alert("没有定位页面！");
			return;
		}

		// 如果不传参数的话，读取表单上的隐藏域
		if (!area) {
			var gisarea = mini.get("gisarea");
			if (gisarea) {
				area = gisarea.getValue();
			}
		}

		area = area || "";

		top.eputil._mapDialog = epoint.openTopDialog('定位', eputil.mapUrl.draw);

		// 添加消息监听
		var onMapMessage = function(event) {
			var data = event.data;
			var origin = event.origin;
			var rings = "";
			var level = "";
			if (data) {
				var datas = data.split("#@#");
				rings = datas[0];
				if (datas.length > 1) {
					level = datas[1];
				}
			}

			// 移除监听事件
			if (top.removeEventListener) {
				top.removeEventListener('message', onMapMessage, false);
			} else if (typeof top.attachEvent) {
				top.detachEvent('onmessage', onMapMessage);
			}

			// 关闭弹出窗口
			if (top.eputil._mapDialog) {
				var source = top.eputil._mapDialog.Owner;

				top.eputil._mapDialog._CloseOwnerWindow();
				top.eputil._mapDialog = null;

				var gisarea = source.mini.get("gisarea");
				var maplevel = source.mini.get("maplevel");
				if (gisarea) {
					gisarea.setValue(rings);
				}
				if (maplevel) {
					maplevel.setValue(level);
				}
				source.eputil.renderLocate();
			}
		};

		if (typeof top.addEventListener) {
			top.addEventListener('message', onMapMessage, false);
		} else if (typeof top.attachEvent) {
			// for ie
			top.attachEvent('onmessage', onMapMessage);
		}
	},

	openMapView : function() {
		if (!eputil.mapUrl || !eputil.mapUrl.view) {
			eputil.alert("没有预览页面！");
			return;
		}

		// 如果不传参数的话，读取表单上的隐藏域
		var data = {};

		var gisarea = mini.get("gisarea");
		if (gisarea) {
			data.type = "area";
			data.value = gisarea.getValue();
		} else {
			var gisx = mini.get("gisx");
			var gisy = mini.get("gisy");
			if (gisx && gisy) {
				data.type = "point";
				data.value = {
					x : gisx.getValue(),
					y : gisy.getValue()
				}
			}
		}

		var source = epoint.openTopDialog('位置', eputil.mapUrl.view)._iframeEl.contentWindow;
		// 把数据推送过去，因为子窗体加载需要一定的时间，故暂时延迟1秒，后续再看情况
		setTimeout(function() {
			source.postMessage(JSON.stringify(data), "*");
		}, 1000);
	},

	renderLocate : function(source, renderTargetId) {
		if (!source) {
			source = self;
		}

		var gisx = source.mini.get("gisx");
		var gisy = source.mini.get("gisy");
		var gisarea = source.mini.get("gisarea");

		var $locate = source.$(".gis-locate");
		var $draw = source.$(".gis-draw");
		var $view = source.$(".gis-view");

		if ($locate) {
			$locate.unbind("click");
			$locate.on("click", function() {
				eputil.openMapLocate();
			});
		}
		if ($draw) {
			$draw.unbind("click");
			$draw.on("click", function() {
				eputil.openMapDraw();
			});
		}
		if ($view) {
			$view.unbind("click");
			$view.on("click", function() {
				eputil.openMapView();
			});
		}

		if (gisx && gisy) {
			var x = gisx.getValue();
			var y = gisy.getValue();

			if (x && y) {
				$locate.removeClass("off");
				$locate.addClass("on");
				$locate.text("已定位");
				$view.removeClass("off");
				$view.addClass("on");
				$view.text("已定位");
			} else {
				$locate.removeClass("on");
				$locate.addClass("off");
				$locate.text("未定位");
				$view.removeClass("on");
				$view.addClass("off");
				$view.text("未定位");
			}
		} else if (gisarea) {
			var rings = gisarea.getValue();
			if (rings) {
				$draw.removeClass("off");
				$draw.addClass("on");
				$draw.text("已定位");
				$view.removeClass("off");
				$view.addClass("on");
				$view.text("已定位");
			} else {
				$draw.removeClass("on");
				$draw.addClass("off");
				$draw.text("未定位");
				$view.removeClass("on");
				$view.addClass("off");
				$view.text("未定位");
			}
		}
	},
	/** 地图定位渲染结束* */

	/** 辅助输入器* */
	openInputDialog : function(inputObj, size, okJs, cancelJs) {
		var oldDiv = document.getElementById('inputBodyDiv');
		if (oldDiv) {
			oldDiv.innerHTML = '';
			document.body.removeChild(oldDiv);
		}
		var oldShade = top.document.getElementById('inputShadeDiv');
		if (oldShade) {
			oldShade.innerHTML = '';
			top.document.body.removeChild(oldShade);
		}

		// 背景容器
		var shadeDiv = top.document.createElement('div');
		shadeDiv.id = 'inputShadeDiv';
		shadeDiv.className = 'dialog-shade';
		shadeDiv.style.width = top.document.body.clientWidth + 'px';
		shadeDiv.style.height = top.document.body.clientHeight + 'px';
		top.document.body.appendChild(shadeDiv);

		// 输入容器
		var inputBodyHeight = ((document.body.clientHeight - 100) > 400 ? 400 : (document.body.clientHeight - 100));

		var inputBodyWidth = ((document.body.clientWidth - 100) > 600 ? 600 : (document.body.clientWidth - 100));

		var inputBodyDiv = top.document.createElement('div');
		inputBodyDiv.id = 'inputBodyDiv';
		inputBodyDiv.className = 'input-dialog';
		inputBodyDiv.style.height = inputBodyHeight + 'px';
		inputBodyDiv.style.width = inputBodyWidth + 'px';
		inputBodyDiv.style.top = (top.document.body.clientHeight - inputBodyHeight) / 2 + 'px';
		inputBodyDiv.style.left = (top.document.body.clientWidth - inputBodyWidth) / 2 + 'px';
		top.document.body.appendChild(inputBodyDiv);

		var inputContentDiv = top.document.createElement('div');
		inputContentDiv.id = 'inputContentDiv';
		inputContentDiv.className = 'input-content';
		inputContentDiv.style.width = (inputBodyWidth - 52) + 'px';
		inputContentDiv.style.height = (inputBodyDiv.style.height.replace('px', '') - 80) + 'px';
		inputBodyDiv.appendChild(inputContentDiv);

		// 输入域
		var inputTextarea = top.document.createElement('textarea');
		inputTextarea.className = 'input-textarea';
		inputContentDiv.appendChild(inputTextarea);
		// 初始化值
		if (inputObj && inputObj.value) {
			inputTextarea.value = inputObj.value;
		}
		// 初始化文本最大上限
		if (inputObj.maxLength) {
			inputTextarea.maxLength = inputObj.maxLength;
			inputTextarea.onkeyup = function() {
				if (this.value.length >= inputObj.maxLength) {
					event.returnValue = false;
				}
			};

			inputTextarea.onkeypress = function() {
				if (this.value.length >= inputObj.maxLength) {
					event.returnValue = false;
				}
			};

			inputTextarea.onpaste = function() {
				if (this.value.length >= inputObj.maxLength) {
					event.returnValue = false;
				}
			};
		}

		var inputButtonDiv = top.document.createElement('div');
		inputButtonDiv.id = 'inputButtonDiv';
		inputButtonDiv.className = 'input-buttons';
		inputBodyDiv.appendChild(inputButtonDiv);

		// 确定，清除按钮
		var okBtn = top.document.createElement('input');
		okBtn.type = 'button';
		okBtn.value = '确定';
		okBtn.className = 'input-btn';
		inputButtonDiv.appendChild(okBtn);

		var closeBtn = top.document.createElement('input');
		closeBtn.type = 'button';
		closeBtn.value = '关闭';
		closeBtn.style.marginLeft = '50px';
		closeBtn.className = 'input-btn';
		inputButtonDiv.appendChild(closeBtn);

		// 添加事件
		okBtn.onclick = function() {
			var id = (typeof inputObj == 'string') ? inputObj : inputObj.id;
			if (id) {
				// 判断下是不是mini控件
				var obj = mini.get(inputObj.id);
				if (obj && obj.type == "textbox") {
					inputObj.setValue(inputTextarea.value);
					inputObj.validate();
				} else {
					inputObj.value = inputTextarea.value;
				}
			}

			if (inputBodyDiv) {
				inputBodyDiv.innerHTML = '';
				top.document.body.removeChild(inputBodyDiv);
			}
			if (shadeDiv) {
				shadeDiv.innerHTML = '';
				top.document.body.removeChild(shadeDiv);
			}

			if (okJs) {
				okJs();
			}
		};

		closeBtn.onclick = function() {
			if (inputBodyDiv) {
				inputBodyDiv.innerHTML = '';
				top.document.body.removeChild(inputBodyDiv);
			}
			if (shadeDiv) {
				shadeDiv.innerHTML = '';
				top.document.body.removeChild(shadeDiv);
			}

			if (cancelJs) {
				cancelJs();
			}
		};

		inputTextarea.focus();
	},
	/** 辅助输入器* */

	/** 附件列表渲染* */
	/**
	 * 渲染简单附件效果
	 * 
	 * @param {}
	 *            datas
	 * @param {}
	 *            sourceId
	 */
	renderSimpleAttach : function(datas, sourceId) {
		var $source = $("#" + sourceId);
		$source.html("");

		if (!datas || datas.length == 0) {
			return;
		}

		var attachs = [];
		// 如果是2层数组，解析成单成数组
		if (Array.isArray(datas[0])) {
			for (var i = 0, length = datas.length; i < length; i++) {
				attachs = attachs.concat(datas[i]);
			}
		} else {
			attachs = datas;
		}

		var html = "<ul style='margin-left: 50px;'>";

		for (var i = 0, length = attachs.length; i < length; i++) {
			var attach = attachs[i];

			var url = attach.url || "";
			if (url && !url.startWith("http")) {
				url = Util.getRootPath() + url;
			}

			html += "<li style='cursor: pointer;' data-guid='" + (attach.attachGuid || "") + "' link='" + url + "'>" + (attach.attachFileName || "") + "</li>";
		}

		html += "</ul>";

		$source.html(html);

		$source.on("click", "ul>li", function() {
			var $this = $(this);

			eputil.downloadAttach($this.attr("link") || $this.data("guid"));
		});
	},

	onUploadStart : function(e) {
		epoint.showLoading();
	},

	onUploadError : function(e) {
		epoint.hideLoading();
		$(".attach-list-process").remove();
	},

	onUploadProcess : function(e) {
		var $contain = eputil.getAttachContain(e.source.id);
		if (!$contain || $contain.length == 0) {
			return;
		}

		var $process = $contain.children(".attach-list-process");
		if ($process.length == 0) {
			$process = $("<div class='attach-list-process'></div>");
			$contain.prepend($process);

			var $processing = $("<div class='processing'></div>");
			$process.append($processing);
		}

		$process.children("div").css("width", (parseFloat(e.percentage) * 100) + "%");
	},

	onFileSuccess : function(e) {
		if (!e.data.attachGuid) {
			return;
		}

		epoint.hideLoading();
		$(".attach-list-process").remove();

		var $contain = eputil.getAttachContain(e.source.id);
		if (!$contain || $contain.length == 0) {
			return;
		}

		eputil.addAttach(e.data, e.source.id, e.file.source.uid);
	},

	onBeforeFileQueued : function(e) {
		// var newReg = /[`~!@#$%^&*()+=|{}':;',/\/\[\]<>/?~！@#￥%……&*+|{}【】‘；：”“’。，、？]/;
		// var exist = newReg.test(e.file.name);
		// if (exist) {
		// epoint.alert("文件名称中不能包含以下特殊字符 " + "[`~!@#$%^&*()+=|{}':;',/\/\[\]<>/?~！@#￥%……&*+|{}【】‘；：”“’。，、？]");
		// e.cancel = true;
		// return;
		// }
	},

	/**
	 * 排序计时器
	 * 
	 * @type
	 */
	_sortableTimer : null,

	// 获取附件列表容器
	getAttachContain : function(sourceId) {
		// 图片列表容器
		var $target = null;

		if (sourceId) {
			$target = $("#" + sourceId + "_attach");
		}
		if (!$target || $target.length == 0) {
			// 如果有加ID标识，则寻找最近的attach-list
			if (sourceId) {
				$target = $("#" + sourceId).next(".attach-list");
			} else {
				// 没有的话只能随便找一个了
				$target = $(".attach-list");
			}
		}

		return $target;
	},
	// 添加一个附件到列表中
	addAttach : function(data, sourceId, uid, $contain) {
		$contain = $contain || eputil.getAttachContain(sourceId);
		if (!$contain || $contain.length == 0) {
			return;
		}

		var attachGuid = data.attachGuid;

		var $ul = $contain.children("ul");
		if ($ul.length == 0) {
			$ul = $("<ul></ul>");
			$contain.append($ul);
		}

		var $item = $ul.children("li[data-guid='" + attachGuid + "']");
		if ($item.length > 0) {
			// 已经渲染过相同guid的附件了
			return;
		}

		var attachFileName = data.attachFileName;
		var downloadUrl = data.url || data.downloadUrl || "";
		if (downloadUrl && !downloadUrl.startWith("http")) {
			downloadUrl = Util.getRootPath() + downloadUrl;
		}
		// var previewUrl = eputil.getPreviewUrl(downloadUrl);

		$item = $("<li class='attach-list-item' data-guid='" + attachGuid + "' data-uid='" + (uid || "") + "' data-link='" + downloadUrl + "'></li>");
		$ul.prepend($item);

		var $itemBody = $("<div class='attach-list-item-body" + (eputil.fileUtil.isImage(attachFileName) ? " image-dialog-link" : "") + "' data-guid='" + attachGuid + "'></div>");
		var $itemFoot = $("<div class='attach-list-item-foot'></div>");
		$item.append($itemBody);
		$item.append($itemFoot);

		var $name = $("<div title='" + attachFileName + "' class='filename'>" + attachFileName + "</div>");
		$itemFoot.append($name);

		var iconUrl = "";
		if (eputil.fileUtil.isImage(attachFileName)) {
			if (downloadUrl) {
				iconUrl = downloadUrl;
			} else {
				iconUrl = Util.getRootPath() + "rest/gaattachaction/getContent?isCommondto=true&attachGuid=" + attachGuid;
			}
		} else {
			iconUrl = Util.getRootPath() + eputil.resPath + "images/attach/attach-short-";

			if (eputil.fileUtil.isPdf(attachFileName)) {
				iconUrl += "pdf.png";
			} else if (eputil.fileUtil.isExcel(attachFileName)) {
				iconUrl += "excel.png";
			} else if (eputil.fileUtil.isWord(attachFileName)) {
				iconUrl += "word.png";
			} else if (eputil.fileUtil.isPpt(attachFileName)) {
				iconUrl += "ppt.png";
			} else if (attachFileName.toUpperCase().endWith(".VSDX") || attachFileName.toUpperCase().endWith("VSD")) {
				iconUrl += "visio.png";
			} else if (attachFileName.toUpperCase().endWith(".MPPX") || attachFileName.toUpperCase().endWith(".MPP")) {
				iconUrl += "project.png";
			} else if (eputil.fileUtil.isMp4(attachFileName)) {
				iconUrl += "mp4.png";
			} else {
				iconUrl += "file.png";
			}
		}

		var $img = $("<img title='" + attachFileName + "' src='" + iconUrl + "'></img>");
		$itemBody.append($img);

		if ($contain.hasClass("modify")) {
			var $delete = $("<div class='delete'>删除</div>");
			$itemFoot.append($delete);

			$delete.on("click", function() {
				var $parent = $(this).parent().parent();

				var guid = $parent.data("guid");

				epoint.execute("deleteAttach", "@none", [guid], function(result) {
					if (result.msg == "success") {
						eputil.removeAttach(guid, sourceId, $parent.data("uid"));
					} else {
						eputil.alert(result.msg || "未知的错误");
					}
				});
			});
		}

		// 事件绑定
		$itemBody.on("click", function() {
			var $parent = $(this).parent();
			var url = $parent.data("link") || $parent.data("guid");
			var name = $parent.children(".attach-list-item-foot").children(".filename").text();

			eputil.previewAttach(url, name);
		});
		// 点文件名可下载
		$name.on("click", function() {
			var $parent = $(this).parent().parent();
			// var url = $parent.data("download") || $parent.data("link") || $parent.data("guid");
			var url = $parent.data("link") || $parent.data("guid");

			eputil.downloadAttach(url);
		});
	},
	// 从列表中移除一个附件
	removeAttach : function(attachGuid, sourceId, uid) {
		var $contain = eputil.getAttachContain(sourceId);
		if (!$contain || $contain.length == 0) {
			return;
		}

		var $item = $contain.find("li.attach-list-item[data-guid='" + attachGuid + "']");
		if ($item.length == 0) {
			return;
		}

		$item.remove();

		if (!sourceId) {
			// 如果sourceId不存在，则寻找离他最近的那个附件上传 $this.prev
			sourceId = $contain.prev(".mini-webuploader").prop("id");
		}

		var uploader = mini.get(sourceId);
		if (!uploader) {
			return;
		}

		// 判断这个文件是不是客户端的，看是否有uid
		var isClient = false;

		if (uid) {
			var files = uploader.getUploader().getFiles();
			for (var i = 0, length = files.length; i < length; i++) {
				if (uid == files[i].source.uid) {
					uploader.getUploader().removeFile(files[i], true);
					isClient = true;
					break;
				}
			}
		}

		// 服务端删除代码
		if (!isClient) {
			if (uploader.serverFileNum > 0) {
				uploader.serverFileNum -= 1;

				for (var key in uploader.serverFiles) {
					if (attachGuid == key) {
						delete uploader.serverFiles[key];
					}
				}
			}
		}

		if (uploader.fileNumLimit) {
			uploader.setFileNumLimit(uploader.fileNumLimit);
		}

		eputil.onAttachRemoved(attachGuid, sourceId, uid);
	},

	/**
	 * 附件被删除后
	 * 
	 * @param {}
	 *            attachGuid
	 * @param {}
	 *            sourceId
	 * @param {}
	 *            uid
	 */
	onAttachRemoved : function(attachGuid, sourceId, uid) {

	},

	// 清除附件列表
	clearAttachList : function(sourceId) {
		var $target = eputil.getAttachContain(sourceId);
		if ($target) {
			$target.html("");
		}

		// 清除所有上传控件的附件
		$(".mini-webuploader").each(function() {
			var uploader = mini.get(this.id);
			if (uploader) {
				uploader.clearFile();
			}
		});
	},
	// 初始化附件
	initAttachList : function(datas) {
		if (!datas) {
			return;
		}

		for (var i = 0, length = datas.length; i < length; i++) {
			this.renderAttachList(null, datas[i], i);
		}
	},
	// 渲染附件效果
	renderAttachList : function(sourceId, attaches, index) {
		// 初始化附件列表
		var $target = eputil.getAttachContain(sourceId);
		if (!$target || $target.length == 0) {
			return;
		}
		// 如果传入的附件域有位置，需要获取需要展示的位置
		if (index != null) {
			if ($target.length > index) {
				$target = $($target[index]);
			}
		}

		if (!$target.hasClass("clearfix")) {
			$target.addClass("clearfix");
		}
		$target.children("ul").html("");

		if (!attaches) {
			return;
		}

		for (var i = attaches.length - 1; i >= 0; i--) {
			// 判断一下前一个元素是不是mini-webuploader
			var _sourceId = sourceId;

			if (!_sourceId) {
				var $previous = $target.prev();
				if ($previous.hasClass("mini-webuploader")) {
					_sourceId = $previous.prop("id");
				}
			}

			eputil.addAttach(attaches[i], _sourceId, null, $target);
		}
	},

	/**
	 * 附件可拖动
	 * 
	 * @param {}
	 *            $target
	 */
	_bindAttachSortable : function($target) {
		if (!eputil.attachSortable || !$target.hasClass("modify")) {
			return;
		}
		// 需要构建一个ul出来
		var $ul = $target.children("ul");
		if ($ul.length == 0) {
			$ul = $("<ul></ul>");
			$target.append($ul);
		}

		Sortable.create($ul[0], {
			animation : 150,
			onEnd : function(evt) {
				// 延迟更新，防止高频率操作对后台有压力
				if (eputil._sortableTimer) {
					window.clearTimeout(eputil._sortableTimer);
				}

				eputil._sortableTimer = window.setTimeout(function() {
					var guids = [];

					$(evt.target).children("li").each(function() {
						var guid = $(this).data("guid");
						if (!guid) {
							return;
						}

						guids.push(guid);
					});

					epoint.execute("gaattachaction.updateOrderNumber", "@none", [JSON.stringify(guids)], function() {

					});
				}, 1000);
			}
		});
	},
	/** 附件列表渲染结束* */
	/** OFFICE预览* */

	/**
	 * 预览配置
	 * 
	 * @type
	 */
	pdfViewerMethod : {
		actionName : "gaattachaction",

		_default : {
			"rest/frame/base/attach/attachAction/getContent" : "rest/gaattachaction/previewOffice",
			"rest/attachAction/getContent" : "rest/gaattachaction/previewOffice",
			"rest/gaattachaction/getContent" : "rest/gaattachaction/previewOffice"
		},

		custom : {

		}
	},

	openOfficeTopDialog : function(guid, title, type) {
		this.openOfficeDialog(guid, title, type, top);
	},

	openOfficeDialog : function(guid, title, type, source) {
		if (!guid) {
			return;
		}

		var _this = this;

		if (!source) {
			source = self;
		}
		if (!type) {
			type = "pdf";
		}

		if (guid.length > 50) {
			// 如果传递进来的是url
			// 必然走file逻辑
			type = "file";
		}
		type = type.toLowerCase();

		var $root = source.$("body");
		// 遮盖层
		var $shade = source.$("<div class='dialog-shade'></div>");
		$root.append($shade);

		var $dialog = source.$(".pdf-dialog");
		if ($dialog.length == 0) {
			$dialog = source.$("<div class='pdf-dialog'></div>");
			$root.append($dialog);
		}

		var $head = source.$("<div class='pdf-dialog-head mini-panel-header'></div>");
		var $body = source.$("<div class='pdf-dialog-body'></div>");
		$dialog.append($head);
		$dialog.append($body);

		var $iframe = source.$("<iframe frameborder='0' allowTransparency='true'></iframe>");
		$body.append($iframe);

		var $title = source.$("<font class='mini-panel-title'></font>");
		var $close = source.$("<div class='pdf-dialog-close'></div>");
		$head.append($title);
		$head.append($close);

		$dialog.css("height", $(source).height() - _this.toNumber($dialog.css("top")) * 2);
		$dialog.css("left", ($(source).width() - _this.toNumber($dialog.css("width"))) / 2);
		// 头
		if (title) {
			$title.text(title);
		}
		$body.css("height", $dialog.height() - $head.outerHeight(true));

		var fileName = encodeURIComponent(title) || "";
		var previewUrl = null;

		if (type == "doc" || type == "ppt") {
			// 因为是进行过转换，这边先将类型强制转换成PDF
			// var fileName = "";
			// if (title) {
			// var array = title.split(".");
			// if (array.length > 1) {
			// fileName = array[array.length - 2] + ".pdf";
			// } else {
			// fileName = array[0] + ".pdf";
			// }
			// }

			previewUrl = Util.getRootPath() + eputil.resPath + "pdfviewer/viewer?fileName=" + fileName + "&";

			if (type == "doc") {
				previewUrl += "wordGuid=" + guid;
			} else if (type == "ppt") {
				previewUrl += "pptGuid=" + guid;
			}
		} else if (type == "file") {
			previewUrl = Util.getRootPath() + eputil.resPath + "pdfviewer/viewer?fileName=" + fileName + "&_fileUrl=" + encodeURIComponent(guid);
		} else if (type == "excel") {
			previewUrl = Util.getRootPath() + eputil.resPath + "excelviewer/viewer?excelGuid=" + guid;
		} else {
			previewUrl = Util.getRootPath() + eputil.resPath + "pdfviewer/viewer?fileName=" + fileName + "&attachGuid=" + guid;
		}

		$iframe.prop("src", previewUrl);

		$shade.on("click", function() {
			_this._destoryOfficeDialog(source);
		});
		$close.on("click", function() {
			_this._destoryOfficeDialog(source);
		});
	},

	_destoryOfficeDialog : function(source) {
		source.$(".pdf-dialog").remove();
		source.$(".dialog-shade").remove();
	},
	/** OFFICE预览结束* */

	/** 视频预览 * */
	openVideoTopDialog : function(guid, title) {
		this.openVideoDialog(guid, title, top);
	},

	openVideoDialog : function(guid, title, source) {
		var _this = this;

		if (!source) {
			source = self;
		}

		if (!guid) {
			return;
		}

		var $root = source.$("body");
		// 遮盖层
		var $shade = source.$("<div class='dialog-shade'></div>");
		$root.append($shade);

		var $dialog = source.$(".video-dialog");
		if ($dialog.length == 0) {
			$dialog = source.$("<div class='video-dialog'></div>");
			$root.append($dialog);
		}

		var $head = source.$("<div class='video-dialog-head mini-panel-header'></div>");
		var $body = source.$("<div class='video-dialog-body'></div>");
		$dialog.append($head);
		$dialog.append($body);

		var $iframe = source.$("<iframe frameborder='0' allowTransparency='true'></iframe>");
		$body.append($iframe);

		var $title = source.$("<font></font>");
		var $close = source.$("<div class='video-dialog-close'></div>");
		$head.append($title);
		$head.append($close);

		$dialog.css("height", $(source).height() - _this.toNumber($dialog.css("top")) * 2);
		$dialog.css("left", ($(source).width() - _this.toNumber($dialog.css("width"))) / 2);
		// 头
		if (title) {
			$title.text(title);
		}
		$body.css("height", $dialog.height() - $head.outerHeight(true));

		var previewUrl = Util.getRootPath() + eputil.resPath + "videoplayer/player?";
		if (guid.length > 50) {
			previewUrl += "file=";
		} else {
			previewUrl += "attachGuid=";
		}
		previewUrl += encodeURIComponent(guid);

		$iframe.prop("src", previewUrl);

		$shade.on("click", function() {
			_this._destoryVideoDialog(source);
		});
		$close.on("click", function() {
			_this._destoryVideoDialog(source);
		});
	},

	_destoryVideoDialog : function(source) {
		source.$(".video-dialog").remove();
		source.$(".dialog-shade").remove();
	},
	/** 视频预览结束 * */

	/** 上下区域 * */
	splitter : {
		minHeight : 300,

		_isDrag : false,
		$upper : null,
		$down : null,
		_layoutTrigger : null,
		_mouseStartY : 0,
		_upperStartHeight : 0,
		_downStartHeight : 0,

		init : function() {
			var _this = this;
			var $root = $(".ga-splitter");
			var $splitter = $root.children(".splitter");
			// 每2个splitter之间添加一个拖动按钮
			var length = $splitter.length;
			if (length <= 1) {
				// 就一个区域，没有加载的必要性
				return;
			}

			var offsetTop = $root.position().top;

			$splitter.each(function(i) {
				var isLast = (i == length - 1);

				var $this = $(this);

				_this.initHtml($this, isLast);
				_this.bindEvent($this, isLast);
			});
		},

		initHtml : function($splitter, isLast) {
			var _this = this;

			$splitter.addClass("border");

			if ($splitter.attr("url")) {
				var html = "<iframe id='" + _this.getFrameId($splitter.prop("id")) + "' src='" + $splitter.attr("url") + "'></iframe>";
				$splitter.html(html);
			}

			if (!isLast) {
				var $resizeBar = $("<div class='resize-bar'></div>");
				$splitter.append($resizeBar);
			}
		},

		bindEvent : function($splitter, isLast) {
			if (isLast) {
				return;
			}

			var _this = this;
			var $document = $(document);

			$splitter.find(".resize-bar").on("mousedown", function(e) {
				var $this = $(this);

				_this.$upper = $this.closest(".splitter");
				_this.$down = _this.$upper.next();

				_this._isDrag = true;

				_this._mouseStartY = e ? e.clientY : window.event.clientY;
				_this._upperStartHeight = _this.$upper.height();
				_this._downStartHeight = _this.$down.height();
			});
			$document.on("mouseup", function(e) {
				_this._isDrag = false;
			});
			$document.on("mousemove", function(e) {
				if (!_this._isDrag) {
					return;
				}

				e = e || window.event;

				var currentY = e ? e.clientY : e.clientY;
				var offsetHeight = currentY - _this._mouseStartY;

				var upperHeight = _this._upperStartHeight + offsetHeight;
				var downHeight = _this._downStartHeight - offsetHeight;
				if (upperHeight <= eputil.splitter.minHeight || downHeight <= eputil.splitter.minHeight) {
					return;
				}

				_this.$upper.css("height", upperHeight + "px");
				_this.$down.css("height", downHeight + "px");

				if (_this._layoutTrigger) {
					window.clearTimeout(_this._layoutTrigger);
				}
				_this._layoutTrigger = window.setTimeout(function() {
					_this.doLayout(_this.$upper);
					_this.doLayout(_this.$down);
				}, 200);
			});
		},

		/**
		 * 对内部内容进行一个布局操作
		 * 
		 * @param {}
		 *            $parent
		 */
		doLayout : function($splitter) {
			var frameWindow = this.getFrameWindow($parent.prop("id"));
			var $parent = frameWindow ? $(frameWindow) : $splitter;

			$parent.find(".mini-datagrid").each(function() {
				var dataGrid = mini.get(this.id);
				if (!dataGrid) {
					return;
				}

				dataGrid.doLayout();
			});
		},

		getFrameId : function(id) {
			if (!id) {
				return;
			}

			return id + "_splitter_frame";
		},

		/**
		 * 获取frame
		 * 
		 * @param {}
		 *            id
		 */
		getFrame : function(id) {
			return document.getElementById(this.getFrameId(id));
		},

		getFrameWindow : function(id) {
			var frame = this.getFrame(id);
			if (frame) {
				return frame.contentWindow;
			}
		}
	},

	/** 附件展示* */
	_currentDegree : 0,
	_imageMouseEvent : null,

	_orginalImageWidth : 0,
	_orginalImageHeight : 0,
	_currentImageRate : 100,

	_isImageDrag : false,
	_isImageResize : false,
	_isImageTitleDrag : false,
	_imageDialogStartX : 0,
	_imageDialogStartY : 0,
	_mouseStartX : 0,
	_mouseStartY : 0,
	_rotateTimer : null,
	_persistDegree : 0, // 持久化旋转的角度

	openImageDialog : function(guid, title, source) {
		var _this = this;

		if (!source) {
			source = self;
		}

		_this._clearImageDialog(source);

		if (typeof guid != 'string') {
			// 如果是dom节点
			guid = guid.getAttribute("data-guid");
		}

		if (!guid) {
			return;
		}

		var src = "";
		if (guid.length < 50) {
			src = Util.getRootPath() + "rest/gaattachaction/getContent?isCommondto=true&attachGuid=" + guid;
		} else {
			src = guid;
		}
		// 根
		var $root = source.$("body");
		var $document = $(source.document);
		// 遮盖层
		var $shade = source.$("<div class='dialog-shade'></div>");
		$root.append($shade);

		var $dialog = source.$(".image-dialog");
		if ($dialog.length == 0) {
			$dialog = source.$("<div class='image-dialog'></div>");
			$root.append($dialog);
		}

		var $head = source.$("<div class='image-dialog-head mini-panel-header'></div>");
		var $tool = source.$("<div class='image-dialog-toolbar'></div>");
		var $body = source.$("<div class='image-dialog-body'></div>");
		var $resize = source.$("<div class='image-dialog-resize'></div>");
		$dialog.append($head);
		$dialog.append($tool);
		$dialog.append($body);
		$dialog.append($resize);

		var $title = source.$("<font></font>");
		var $close = source.$("<div class='image-dialog-close'></div>");
		$head.append($title);
		$head.append($close);

		var $left = source.$("<div class='image-dialog-icon' type='left'></div>");
		var $right = source.$("<div class='image-dialog-icon' type='right'></div>");
		var $bigger = source.$("<div class='image-dialog-icon' type='bigger'></div>");
		var $smaller = source.$("<div class='image-dialog-icon' type='smaller'></div>");
		var $download = source.$("<div class='image-dialog-icon' type='download'></div>");
		$tool.append($left);
		$tool.append($right);
		$tool.append($bigger);
		$tool.append($smaller);
		$tool.append($download);

		var $previous = source.$("<div class='image-dialog-jump' type='previous'></div>");
		var $content = source.$("<div class='image-dialog-body-content'></div>");
		var $next = source.$("<div class='image-dialog-jump' type='next'></div>");
		$body.append($previous);
		$body.append($content);
		$body.append($next);

		var $img = source.$("<img draggable='false'></img>");
		$content.append($img);

		// 渲染效果
		$dialog.css("width", $(source).width() - _this.toNumber($dialog.css("left")) * 2);
		$dialog.css("height", $(source).height() - _this.toNumber($dialog.css("top")) * 2);
		// 头
		if (title) {
			$title.text(title);
		}
		// 主体
		$body.css("height", $dialog.height() - $head.outerHeight(true) - $tool.outerHeight(true));

		var content_width = $body.width() - $previous.outerWidth(true) - $next.outerWidth(true);
		var content_height = $body.height() - 10;

		$content.css("width", content_width);
		$content.css("height", content_height);

		var image = new Image();

		var _src = src + "&_t=" + eputil.getSystemDate();

		image.src = _src;
		$img[0].src = _src;

		image.onload = function() {
			_this._resizeImage($img, this, content_width, content_height);
		};
		if (image.complete) {
			_this._resizeImage($img, image, content_width, content_height);
		}

		// 事件
		$close.on("click", function() {
			_this._destoryImageDialog(source);
		});
		$shade.on("click", function() {
			_this._destoryImageDialog(source);
		});
		$left.on("click", function() {
			_this._rotateImage($img, -1, src);
		});
		$right.on("click", function() {
			_this._rotateImage($img, 1, src);
		});
		$bigger.on("click", function() {
			_this._zoomImage($img, $content, 1);
		});
		$smaller.on("click", function() {
			_this._zoomImage($img, $content, -1);
		});
		$download.on("click", function() {
			if (guid.length < 50) {
				Util.getSafeLocation().href = src;
			} else {
				window.open(src);
			}
		});
		$previous.on("click", function() {
			_this._jumpImage(-1, src);
		});
		$next.on("click", function() {
			_this._jumpImage(1, src);
		});

		// 拖动事件完结
		eputil._on(document, "mouseup", function(e) {
			_this._isImageResize = false;
			_this._isImageDrag = false;
			_this._isImageTitleDrag = false;
		});

		eputil._on(document, "mousemove", function(e) {
			if (_this._isImageResize) {
				var currentX = e ? e.clientX : window.event.clientX;
				var currentY = e ? e.clientY : window.event.clientY;

				var dialogPosition = $dialog.position();

				var isReSize = false;

				var width = currentX - dialogPosition.left;
				if (width > 420) {
					$dialog.css("width", width + "px");
					isReSize = true;
				}

				var height = currentY - dialogPosition.top;
				if (height > 400) {
					$dialog.css("height", height + "px");
					isReSize = true;
				}

				if (isReSize) {
					$body.css("height", $dialog.height() - $head.outerHeight(true) - $tool.outerHeight(true));

					var content_width = $body.width() - $previous.outerWidth(true) - $next.outerWidth(true);
					var content_height = $body.height() - 10;

					$content.css("width", content_width);
					$content.css("height", content_height);
					// 缩放之后动态调整图片的位置，若图片已超出左上，则不调整
					var imageLeft = _this.toNumber($img.css("marginLeft"));
					var imageTop = _this.toNumber($img.css("marginTop"));
					if (imageLeft > 0) {
						var newLeft = content_width - $img.width();
						if (newLeft < imageLeft) {
							$img.css("marginLeft", newLeft);
						}
					}
					if (imageTop > 0) {
						var newTop = content_height - $img.height();
						if (newTop < imageTop) {
							$img.css("marginTop", newTop);
						}
					}
				}
			}

			if (_this._isImageDrag) {
				var currentX = e ? e.clientX : window.event.clientX;
				var currentY = e ? e.clientY : window.event.clientY;

				$img.css("marginLeft", (_this._imageDialogStartX + currentX - _this._mouseStartX) + "px");
				$img.css("marginTop", (_this._imageDialogStartY + currentY - _this._mouseStartY) + "px");
			}

			if (_this._isImageTitleDrag) {
				var currentX = e ? e.clientX : window.event.clientX;
				var currentY = e ? e.clientY : window.event.clientY;

				var left = _this._imageDialogStartX + currentX - _this._mouseStartX;
				if (left >= 5) {
					$dialog.css("left", left + "px");
				}

				var top = _this._imageDialogStartY + currentY - _this._mouseStartY;
				if (top >= 5) {
					$dialog.css("top", top + "px");
				}
			}

			return false;
		});

		// 拖动图片
		eputil._on($img[0], "mousedown", function(e) {
			_this._isImageDrag = true;

			_this._mouseStartX = e ? e.clientX : window.event.clientX;
			_this._mouseStartY = e ? e.clientY : window.event.clientY;

			_this._imageDialogStartX = _this.toNumber(this.style.marginLeft);
			_this._imageDialogStartY = _this.toNumber(this.style.marginTop);
		});
		// 拖动面板
		eputil._on($head[0], "mousedown", function(e) {
			_this._isImageTitleDrag = true;

			_this._mouseStartX = e ? e.clientX : window.event.clientX;
			_this._mouseStartY = e ? e.clientY : window.event.clientY;

			_this._imageDialogStartX = _this.toNumber($dialog.css("left"));
			_this._imageDialogStartY = _this.toNumber($dialog.css("top"));
		});
		// 缩放面板
		eputil._on($resize[0], "mousedown", function(e) {
			_this._isImageResize = true;

			_this._mouseStartX = e ? e.clientX : window.event.clientX;
			_this._mouseStartY = e ? e.clientY : window.event.clientY;
		});

		_this._imageMouseEvent = function(e) {
			e = e || source.event;
			var direct = e.wheelDelta ? e.wheelDelta : e.detail;

			_this._mousewheelImage($img, $content, direct);
		};

		// 滚动
		if (source.document.addEventListener) {
			source.document.addEventListener("mousewheel", _this._imageMouseEvent);
		} else if (source.document.attachEvent) {
			source.document.attachEvent("onmousewheel", _this._imageMouseEvent);
		}
	},

	openImageTopDialog : function(guid, title) {
		this.openImageDialog(guid, title, top);
	},

	_clearImageDialog : function(source) {
		var $dialog = source.$(".image-dialog");
		$dialog.html('');

		source.$(".dialog-shade").remove();

		if (source.document.removeEventListener) {
			source.document.removeEventListener("mousewheel", this._imageMouseEvent);
		} else if (source.document.detachEvent) {
			source.document.detachEvent("onmousewheel", this._imageMouseEvent);
		}

		this._currentDegree = 0;
		this._imageMouseEvent = null;
		this._orginalImageWidth = 0;
		this._orginalImageHeight = 0;
		this._currentImageRate = 100;

		this._isImageDrag = false;
		this._isImageResize = false;
		this._isImageTitleDrag = false;
		this._imageDialogStartX = 0;
		this._imageDialogStartY = 0;
		this._mouseStartX = 0;
		this._mouseStartY = 0;

		return $dialog;
	},

	_destoryImageDialog : function(source) {
		var $dialog = this._clearImageDialog(source);
		$dialog.remove();
	},

	_resizeImage : function($img, imageObj, c_width, c_height) {
		var f_height = 0;
		var f_width = 0;

		if (imageObj.height > c_height || imageObj.width > c_width) {
			var ip = imageObj.height / imageObj.width;
			var cp = c_height / c_width;
			if (ip > cp) {
				f_height = c_height;
				f_width = c_height / ip;
			} else {
				f_width = c_width;
				f_height = c_width * ip;
			}
		} else {
			f_height = imageObj.height;
			f_width = imageObj.width;
		}

		this._orginalImageHeight = f_height;
		this._orginalImageWidth = f_width;

		$img.prop("height", f_height);
		$img.prop("width", f_width);
		$img.css("margin-top", (c_height - f_height) / 2);
		$img.css("margin-left", (c_width - f_width) / 2);
	},

	_rotateImage : function($img, type, guid) {
		var img = $img[0];

		if (type == 1) {
			this._currentDegree++;
			if (this._currentDegree > 3) {
				this._currentDegree = 0;
			}

			this._persistDegree++;
		} else {
			this._currentDegree--;
			if (this._currentDegree < 0) {
				this._currentDegree = 3;
			}

			this._persistDegree--;
		}

		img.style.filter = "progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand')";
		if (img.filters) {
			var deg2radians = Math.PI * 2 / 360;

			var rad = (this._currentDegree * 90) % 360 * deg2radians;
			var costheta = Math.cos(rad);
			var sintheta = Math.sin(rad);
			img.filters.item(0).M11 = costheta;
			img.filters.item(0).M12 = -sintheta;
			img.filters.item(0).M21 = sintheta;
			img.filters.item(0).M22 = costheta;
		} else {
			img.style.filter = '';

			$img.css("transform", "rotate(" + (this._currentDegree * 90) + "deg)");
			$img.css("-ms-transform", "rotate(" + (this._currentDegree * 90) + "deg)");
		}

		eputil._doPersistRotate($img, guid);
	},

	/**
	 * 执行旋转更新
	 * 
	 * @param {}
	 *            $img
	 */
	_doPersistRotate : function($img, guid) {
		if (!eputil.persistRotate) {
			return;
		}

		if (eputil._rotateTimer) {
			window.clearTimeout(eputil._rotateTimer);
		}

		_rotateTimer = window.setTimeout(function() {
			var src = $img.prop("src");
			var queryString = src.substr(src.indexOf("?") + 1);
			$.ajax({
				type : "POST",
				data : "json",
				dataType : "json",
				url : Util.getRootPath() + "rest/gaattachaction/rotateImage?degree=" + (eputil._persistDegree * 90) + "&" + queryString,
				success : function(result) {
					if (result && result.custom == eputil.SUCCESS) {
						// 需要刷新对应的附件控件
						var $img = $(".attach-list-item[data-link='" + guid + "'] img");
						$img.prop("src", $img.prop("src") + "&_t=" + eputil.getSystemDate());
						// 完成更新后归零
						eputil._persistDegree = 0;
					}
				}
			});
		}, 1000);
	},

	_zoomImage : function($img, $contain, type) {
		if (type == 1) {
			if (this._currentImageRate >= 300) {
				return;
			} else {
				this._currentImageRate += 10;
			}
		} else {
			if (this._currentImageRate <= 20) {
				return;
			} else {
				this._currentImageRate -= 10;
			}
		}

		$img.prop("height", this._orginalImageHeight * this._currentImageRate / 100);
		$img.prop("width", this._orginalImageWidth * this._currentImageRate / 100);
		$img.css("margin-top", ($contain.height() - $img.height()) / 2);
		$img.css("margin-left", ($contain.width() - $img.width()) / 2);
	},

	_mousewheelImage : function($img, $contain, nagative) {
		var type = 1;
		if (nagative == 150 || nagative == 120 || nagative == -3) {
			type = 1;
		} else {
			type = -1;
		}

		this._zoomImage($img, $contain, type);
	},

	_jumpImage : function(type, currentGuid) {
		var next = null;
		var $link = $(".image-dialog-link");

		$link.each(function(i) {
			var $this = $(this);

			var guid = $this.parent().data("link");
			if (guid) {
				if (guid == currentGuid) {
					if (type == 1) {
						next = $link[i + 1];
					} else {
						next = $link[i - 1];
					}

					return false;
				}
			}
		});

		if (next) {
			next.click();
		} else {
			alert("没有更多图片了");
		}
	},
	/** 附件展示结束* */

	/**
	 * 预览附件
	 * 
	 * @param {}
	 *            guid
	 * @param {}
	 *            name
	 */
	previewAttach : function(guid, name) {
		if (!guid || !name) {
			console.error("guid或name不存在，无法预览附件！");
			return;
		}

		guid = eputil.getPreviewUrl(guid);

		if (eputil.previewUrl) {
			if (eputil.fileUtil.isImage(name)) {
				epoint.openTopDialog(name, guid);
				//eputil.openImageTopDialog(guid, name);
			} else if (eputil.fileUtil.isMp4(name) || eputil.fileUtil.isPdf(name) || eputil.fileUtil.isOfd(name) || eputil.fileUtil.isWord(name) || eputil.fileUtil.isExcel(name)
					|| eputil.fileUtil.isTxt(name) || eputil.fileUtil.isZip(name)) {
				epoint.openTopDialog(name, guid);
			} else {
				eputil.alert("此文件无法预览，请点击文件名下载！");
			}
		} else {
			if (eputil.fileUtil.isImage(name)) {
				eputil.openImageTopDialog(guid, name);
			} else if (eputil.fileUtil.isPdf(name)) {
				eputil.openOfficeTopDialog(guid, name);
			} else if (eputil.fileUtil.isWord(name)) {
				eputil.openOfficeTopDialog(guid, name, "doc");
			} else if (eputil.fileUtil.isMp4(name)) {
				eputil.openVideoTopDialog(guid, name);
			} else {
				eputil.downloadAttach(guid);
			}
		}
	},

	/**
	 * 获取预览地址
	 * 
	 * @param {}
	 *            sourceUrl
	 * @return {}
	 */
	getPreviewUrl : function(sourceUrl) {
		if (!eputil.previewUrl) {
			return sourceUrl;
		}

		var url = null;
		if (eputil.previewUrl == eputil.LOCALHOST) {
			url = Util.getRootPath();
		} else {
			url = eputil.previewUrl;
		}

		if (!url.endWith("/")) {
			url += "/";
		}

		var index = sourceUrl.indexOf("?");
		var queryString = "";
		if (index > 0) {
			queryString = sourceUrl.substr(index + 1);
		} else {
			// 没有？，可以理解为传进来的是GUID
			queryString = "isCommondto=true&attachGuid=" + sourceUrl;
		}

		url += "rest/fpattachaction/preview?" + queryString;
		// 清洗url
		url = url.replace("?&", "?").replace("&&", "&");

		// 最后再拼上一个token
		if (eputil.previewToken) {
			url += "&previewToken=" + eputil.previewToken;
		}

		return url;
	},

	/**
	 * 下载附件
	 * 
	 * @param {}
	 *            guid
	 * @param {}
	 *            name
	 */
	downloadAttach : function(guid, name) {
		if (!guid) {
			eputil.alert("附件GUID不存在，无法下载！");
			return;
		}

		var src = null;
		if (guid.length < 50) {
			src = Util.getRootPath() + "rest/gaattachaction/getContent?isCommondto=true&attachGuid=" + guid;
		} else {
			src = guid;
		}

		Util.getSafeLocation().setHref(src);
	},

	// 页面加载后一些特殊控件的处理
	initSpecial : function(data) {
		// 单选按钮如果未有选中，默认选择第一个
		var $radiolist = $(".mini-radiobuttonlist");
		$radiolist.each(function(i) {
			var radiolist = mini.get(this.id);
			if (radiolist && !radiolist.getValue()) {
				if (radiolist.data && radiolist.data.length > 0) {
					var valueField = radiolist.getValueField() || "id";

					radiolist.setValue(radiolist.data[0][valueField]);
				}
			}
		});

		// 排序号字段默认一个0
		var ordernumber = mini.get("ordernumber");
		if (ordernumber && !ordernumber.getValue()) {
			ordernumber.setValue(0);
		}
	},
	// 数据异常处理
	initError : function(data) {
		if (data && data.dataError) {
			// 数据异常之后，禁用所有按钮，并弹出提示框
			eputil.alert("数据异常，请勿继续操作！");

			$(".mini-button").each(function() {
				var button = mini.get(this.id);
				if (button && !$(this).hasClass("mini-messagebox-button")) {
					button.disable();
				}
			});
			// 禁用上传
			$(".mini-webuploader").each(function() {
				var uploader = mini.get(this.id);
				if (uploader) {
					uploader.disable();
				}
			});
		}
	},
	// 初始化水印
	initWaterMark : function(text) {
		if (!text) {
			return;
		}

		// 只在1级页面和2级页面生成水印
		if (self != top && parent != top) {
			return;
		}

		// 默认设置
		var defaultSettings = {
			watermark_txt : text,
			watermark_x : 20, // 水印起始位置x轴坐标
			watermark_y : 20, // 水印起始位置Y轴坐标
			watermark_rows : 20, // 水印行数
			watermark_cols : 20, // 水印列数
			watermark_x_space : 100, // 水印x轴间隔
			watermark_y_space : 50, // 水印y轴间隔
			watermark_color : '#000000', // 水印字体颜色
			watermark_alpha : 0.3, // 水印透明度
			watermark_fontsize : '18px', // 水印字体大小
			watermark_font : '微软雅黑', // 水印字体
			watermark_width : 120, // 水印宽度
			watermark_height : 80, // 水印长度
			watermark_angle : 15
			// 水印倾斜度数
		};
		// 采用配置项替换默认值，作用类似jquery.extend
		if (arguments.length === 1 && typeof arguments[0] === "object") {
			var src = arguments[0] || {};
			for (key in src) {
				if (src[key] && defaultSettings[key] && src[key] === defaultSettings[key])
					continue;
				else if (src[key])
					defaultSettings[key] = src[key];
			}
		}

		var oTemp = document.createDocumentFragment();

		// 获取页面最大宽度
		var page_width = Math.max(document.body.scrollWidth, document.body.clientWidth);
		// 获取页面最大长度
		var page_height = Math.max(document.body.scrollHeight, document.body.clientHeight);

		// 如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
		if (defaultSettings.watermark_cols == 0
				|| (parseInt(defaultSettings.watermark_x + defaultSettings.watermark_width * defaultSettings.watermark_cols + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1)) > page_width)) {
			defaultSettings.watermark_cols = parseInt((page_width - defaultSettings.watermark_x + defaultSettings.watermark_x_space)
					/ (defaultSettings.watermark_width + defaultSettings.watermark_x_space));
			defaultSettings.watermark_x_space = parseInt((page_width - defaultSettings.watermark_x - defaultSettings.watermark_width * defaultSettings.watermark_cols)
					/ (defaultSettings.watermark_cols - 1));
		}
		// 如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
		if (defaultSettings.watermark_rows == 0
				|| (parseInt(defaultSettings.watermark_y + defaultSettings.watermark_height * defaultSettings.watermark_rows + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1)) > page_height)) {
			defaultSettings.watermark_rows = parseInt((defaultSettings.watermark_y_space + page_height - defaultSettings.watermark_y)
					/ (defaultSettings.watermark_height + defaultSettings.watermark_y_space));
			defaultSettings.watermark_y_space = parseInt((page_height - defaultSettings.watermark_y - defaultSettings.watermark_height * defaultSettings.watermark_rows)
					/ (defaultSettings.watermark_rows - 1));
		}
		var x;
		var y;
		for (var i = 0; i < defaultSettings.watermark_rows; i++) {
			y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i;
			for (var j = 0; j < defaultSettings.watermark_cols; j++) {
				x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;

				var mask_div = document.createElement('div');
				mask_div.id = 'mask_div' + i + j;
				mask_div.appendChild(document.createTextNode(defaultSettings.watermark_txt));
				// 设置水印div倾斜显示
				mask_div.style.webkitTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
				mask_div.style.MozTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
				mask_div.style.msTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
				mask_div.style.OTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
				mask_div.style.transform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
				mask_div.style.visibility = "";
				mask_div.style.position = "absolute";
				mask_div.style.left = x + 'px';
				mask_div.style.top = y + 'px';
				mask_div.style.overflow = "hidden";
				mask_div.style.zIndex = "9999";
				// mask_div.style.border="solid #eee 1px";
				mask_div.style.opacity = defaultSettings.watermark_alpha;
				mask_div.style.fontSize = defaultSettings.watermark_fontsize;
				mask_div.style.fontFamily = defaultSettings.watermark_font;
				mask_div.style.color = defaultSettings.watermark_color;
				mask_div.style.textAlign = "center";
				mask_div.style.width = defaultSettings.watermark_width + 'px';
				mask_div.style.height = defaultSettings.watermark_height + 'px';
				mask_div.style.display = "block";
				mask_div.style.pointerEvents = "none";
				oTemp.appendChild(mask_div);
			};
		};
		if (window.haswatermark == 1) {
			return;
		}

		document.body.appendChild(oTemp);
		window.haswatermark = 1;
	},

	/**
	 * 通用树选择数据处理
	 */
	treeNodeSelectDataBind : function(source, mode, rtn) {
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
						if (!rtn[i].value) {
							// 如果节点是空的，不用加入数组
							continue;
						}

						text += rtn[i].text + ";";
						value += rtn[i].value + ";";
					}
				}

				source.setValue(value);
				source.setText(text);
				source.validate();
			}
		}

		return true;
	},

	// 绑定数据
	bindData : function(data) {
		$("[data-name]").each(function() {
			var $this = $(this);

			var value = data[$this.data("name")];
			if (value != null && value != undefined) {
				$this.html(value);
			}
		});
	},

	bindEvent : function(data) {
		// 渲染点击音效资源文件
		if (Util.getFrameSysParam("buttonClickSound")) {
			this.bindButtonClickSound();
		}
	},

	/**
	 * 已加载过的附件控件
	 * 
	 * @type
	 */
	_loadedUploader : [],

	bindUploaderEvent : function() {
		$(".mini-webuploader").each(function() {
			var id = this.id;

			var uploader = mini.get(id);
			if (!uploader) {
				return;
			}

			// uploader.on("beforefilequeued", function(e) {
			// eputil.onBeforeFileQueued(e);
			// });

			uploader.on("load", function(e) {
				if (eputil._loadedUploader.indexOf(id) > -1) {
					return;
				}

				// 如果启用了排序，不再使用文件上传的附件清单
				if (!eputil.attachSortable) {
					var files = [];
					// 重组数组，倒序
					for (var i = e.data.files.length - 1; i >= 0; i--) {
						files.push(e.data.files[i]);
					}

					eputil.renderAttachList(id, files);
				}
				// 添加排序事件
				var $target = eputil.getAttachContain(id);
				if ($target) {
					eputil._bindAttachSortable($target);
				}

				eputil._loadedUploader.push(id);
			});
			uploader.on("filesuccess", function(e) {
				eputil.onFileSuccess(e);
			});
			uploader.on("uploadprocess", function(e) {
				eputil.onUploadProcess(e);
			});
			uploader.on("uploadstart", function(e) {
				eputil.onUploadStart(e);
			});
			uploader.on("uploaderror", function(e) {
				eputil.onUploadError(e);
			});
			uploader.on("finishedmd5file", function(e) {
				eputil.onFileSuccess(e);
			});
		});
	},

	/**
	 * 给二次请求的自定义控件添加dto属性
	 */
	bindBeforeLoad : function() {
		var SEC_AJAX_CONTROLS = ["autocompleteedit"];

		// 过滤出有二次请求的自定义控件
		var controls = mini.findControls(function(control) {
			return (SEC_AJAX_CONTROLS.indexOf(control.type) != -1);
		});

		for (i = 0, length = controls.length; i < length; i++) {
			if (controls[i].type == "autocompleteedit") {
				controls[i].on("beforeload", function(e) {
					var urlQuery = window.Util.getSafeLocation().search.substring(1);

					mini.copyTo(e.data, {
						isSecondRequest : true
					});

					var control = e.sender;
					var condition = ((control.type === 'datagrid' || control.type === 'pagertree' || control.type === 'treegrid') && conditionForm) ? conditionForm.slice(0) : [];
					if (control.extraId) {
						condition.push(control.extraId);
					}

					// 对于action配置为“xxxaction(aaa,bbb)”这种形式的，安全拦截中不允许url上出现“()”，所以需要将“()”里的内容拿下来，放到cmdParams里
					var reg = /\([\w\W]*\)/,
						match = e.url.match(reg);
					if (match) {
						e.url = e.url.replace(reg, '');

						e.data.cmdParams = match[0].replace('(', '[').replace(')', ']');
					}
					// 带上页面url上的条件
					if (urlQuery && e.url.indexOf('?') === -1) {
						e.url += ('?' + urlQuery);
					}
					DtoUtils.processBeforeLoad(e, condition.length ? condition : '');

					e.data = Util.addReplayAttackData(e.data, e.url);
				});
			}
		}
	},

	bindButtonClickSound : function() {
		// 添加背景音乐资源文件
		var audioId = "audio_click_sound";
		var soundUrl = Util.getRootPath() + eputil.resPath + "sound/click.mp3";

		var html = "<audio src='" + soundUrl + "' controls='controls' preload id='" + audioId + "' hidden></audio>";

		$("body").append(html);

		var audio = $("#" + audioId)[0];

		for (var id in mini.components) {
			var component = mini.components[id];
			if (component.type != "button") {
				continue;
			}

			component.on("click", function() {
				audio.play();
			});
		}
	},

	// 同步时钟
	synchronizeClock : function(data) {
		if (!data.systemTimepstamp) {
			return;
		}

		eputil._systemTimepstamp = data.systemTimepstamp;
		if (!eputil.systemDateTimer) {
			eputil.systemDateTimer = setInterval(function() {
				eputil._systemTimepstamp += 1000;
			}, 1000);
		}
	},

	fileUtil : {
		/**
		 * 是否图片
		 * 
		 * @param {}
		 *            fileName
		 * @return {Boolean}
		 */
		isImage : function(fileName) {
			if (!fileName) {
				return false;
			}

			fileName = fileName.toUpperCase();
			if (fileName.endWith(".BMP") || fileName.endWith(".PNG") || fileName.endWith(".GIF") || fileName.endWith(".JPG") || fileName.endWith(".JPEG")) {
				return true;
			}

			return false;
		},

		/**
		 * 是否WORD
		 * 
		 * @param {}
		 *            fileName
		 * @return {Boolean}
		 */
		isWord : function(fileName) {
			if (!fileName) {
				return false;
			}

			fileName = fileName.toUpperCase();
			if (fileName.endWith(".DOC") || fileName.endWith(".DOCX") || fileName.endWith(".WPS")) {
				return true;
			}

			return false;
		},

		/**
		 * 是否EXCEL
		 * 
		 * @param {}
		 *            fileName
		 * @return {Boolean}
		 */
		isExcel : function(fileName) {
			if (!fileName) {
				return false;
			}

			fileName = fileName.toUpperCase();
			if (fileName.endWith(".XLS") || fileName.endWith(".XLSX") || fileName.endWith(".ET")) {
				return true;
			}

			return false;
		},

		/**
		 * 是否PPT
		 * 
		 * @param {}
		 *            fileName
		 * @return {Boolean}
		 */
		isPpt : function(fileName) {
			if (!fileName) {
				return false;
			}

			fileName = fileName.toUpperCase();
			if (fileName.endWith(".PPT") || fileName.endWith(".PPTX")) {
				return true;
			}

			return false;
		},

		/**
		 * 是否MP4
		 * 
		 * @param {}
		 *            fileName
		 * @return {Boolean}
		 */
		isMp4 : function(fileName) {
			if (!fileName) {
				return false;
			}

			fileName = fileName.toUpperCase();
			if (fileName.endWith(".MP4")) {
				return true;
			}

			return false;
		},

		isPdf : function(fileName) {
			if (!fileName) {
				return false;
			}

			fileName = fileName.toUpperCase();
			if (fileName.endWith(".PDF")) {
				return true;
			}

			return false;
		},

		isOfd : function(fileName) {
			if (!fileName) {
				return false;
			}

			fileName = fileName.toUpperCase();
			if (fileName.endWith(".OFD")) {
				return true;
			}

			return false;
		},

		isTxt : function(fileName) {
			if (!fileName) {
				return false;
			}

			fileName = fileName.toUpperCase();

			// 姑且把xml和json当作文本来处理
			if (fileName.endWith(".TXT") || fileName.endWith(".XML") || fileName.endWith(".JSON")|| fileName.endWith(".LOG")) {
				return true;
			}

			return false;
		},

		isZip : function(fileName) {
			if (!fileName) {
				return false;
			}

			fileName = fileName.toUpperCase();

			// 姑且不支持rar5
			if (fileName.endWith(".ZIP")) {
				return true;
			}

			return false;
		}
	},

	dateUtil : {
		format : function(date, fmt) {
			var o = {
				"M+" : date.getMonth() + 1, // 月份
				"d+" : date.getDate(), // 日
				"h+" : date.getHours(), // 小时
				"m+" : date.getMinutes(), // 分
				"s+" : date.getSeconds(), // 秒
				"q+" : Math.floor((date.getMonth() + 3) / 3), // 季度
				"S" : date.getMilliseconds()
				// 毫秒
			};
			if (/(y+)/.test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
			}
			for (var k in o) {
				if (new RegExp("(" + k + ")").test(fmt)) {
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				}
			}
			return fmt;
		},
		parse : function(date) {
			return new Date(date.replace(/-/g, "/"));
		}
	},

	addReplayAttackData : function(e) {
		// extraId为控件二次请求时需要一起传回后台的控件id
		var control = e.sender;
		if (control.extraId) {
			var commonData = mini.decode(e.data.commonDto),
				extraData = DtoUtils.getCommonDto(control.extraId).getData(true);

			for (var j in extraData) {
				if (j !== '_common_hidden_viewdata') {
					commonData.push(extraData[j]);
				}
			}
			e.data.commonDto = mini.encode(commonData);

			if (Util.getFrameSysParam('special_character_replace')) {
				e.data.commonDto = e.data.commonDto.replace(/'/g, '_EpSingleQuotes_');
			}

		}

		Util.addReplayAttackData(e.data, e.sender.uploadUrl);
	},

	/**
	 * 事件绑定
	 * 
	 * @param {}
	 *            el
	 * @param {}
	 *            event
	 * @param {}
	 *            fn
	 */
	_on : function(el, event, fn) {
		el.addEventListener(event, fn, false);
	},

	// 页面是否已经加载完毕，用于区分是页面初始化还是后续refresh
	isPageLoaded : false,

	beforeOnLoad : function(data) {
		this.synchronizeClock(data);
		if (!this.isPageLoaded) {

		}
	},

	afterOnLoad : function(data) {
		if (!this.isPageLoaded) {
			// 页面已经加载过一次了
			this.isPageLoaded = true;
			// 特殊处理
			this.initSpecial(data);
			// 数据非法提示
			this.initError(data);
			// 渲染定位信息
			this.renderLocate();
			// 缓存控件
			this.initCacheControl();
			// 水印
			if (data.waterMarkText) {
				this.initWaterMark(data.waterMarkText);
			}

			// 初始化附件
			this.initAttachList(data.attaches);

			// 绑定控件事件
			this.bindEvent(data);

		}
	}
};

(function(win, $) {
	eputil.bindUploaderEvent();

	eputil.bindBeforeLoad();
}(this, jQuery));

/** 初始化地图地址* */
// 地图点定位地址
try {
	eputil.mapUrl.locate = eputil.mapUrl.root + "maplocate.html",
	// 地图面定位地址
	eputil.mapUrl.draw = eputil.mapUrl.root + "mapdraw.html",
	// 地址坐标预览地址
	eputil.mapUrl.view = eputil.mapUrl.root + "mapview.html"
} catch (e) {

}
/** 初始化地图地址结束* */

// initPage之之前
epoint.onBeforeInit = function(e) {
	eputil.beforeOnLoad(e);
};
epoint.onAfterInit = function(e) {
	eputil.afterOnLoad(e);
};
// 表格的搜索
function searchData(extraIds) {
	eputil.searchDataFirst(extraIds);
}

function onEditRenderer(e) {
	return eputil.onEditRenderer(e);
}

function onDetailRenderer(e) {
	return eputil.onDetailRenderer(e);
}

function onSettingRenderer(e) {
	return eputil.onSettingRenderer(e);
}