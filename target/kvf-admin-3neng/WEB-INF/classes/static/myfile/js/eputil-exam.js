if (!eputil.alert) {
	eputil.alert = epoint.alert;
}
if (!eputil.alertAndClose) {
	eputil.alert = epoint.alertAndClose;
}

/**
 * 绑定树的搜索事件
 */
eputil.bindTreeSearch = function(treeId, searchId) {
	var tree = mini.get(treeId);
	if (tree) {
		tree.on("nodeselect", function(e) {
			if (e.node.id) {
				mini.get(searchId).setValue(e.node.id);
			} else {
				mini.get(searchId).setValue();
			}
			searchData();
		});
	}
};

eputil.submit = function() {
	if (eputil.beforeValidate() == false) {
		return;
	}
	if (epoint.validate()) {
		if (eputil.afterValidate() == false) {
			return;
		}

		epoint.execute('submit', 'fui-form', function(result) {
			if (!result.alertMsg) {
				result.alertMsg = "提交成功！";
			}
			eputil.closeCallback(result);
		});
	}
};

eputil.sizePaper = {
	width : eputil.dialogWidthBig,
	height : 1000
};

var examUtil = {};
/**
 * 考试参数
 * 
 * @type
 */
examUtil.config = {
	// 收藏题
	isFavorSubject : false,
	// 错题上报流程
	subjectDissentProcessGuid : null,
	// 分发布局分页数
	distributeGridPageSize : 50,
	// 难易度
	starData : {},
	// 满意度
	evaluateDatas : [{
				text : "1分",
				value : "1"
			}, {
				text : "2分",
				value : "2"
			}, {
				text : "3分",
				value : "3"
			}, {
				text : "4分",
				value : "4"
			}, {
				text : "5分",
				value : "5"
			}],
	// echarts色系
	echartsColors : ["#2EC7C9", "#B6A2DE", "#5AB1EF", "#FFCEA6", "#E3A1A6", "#AFB6C9", "#ECDD55"],
	// 题型
	subjectTypes : [],
	// 布局
	repeatLayouts : [],
	// 题目前缀
	subjectSequencePrefix : "",
	// 答题默认保留时长（7天）
	answerLocalStorageTime : 10080,
	// 单选题选项最大个数（默认10）
	singleOptionMaxCount : 10,
	// 多选题选项最大个数（默认20）
	multiOptionMaxCount : 20
};

/**
 * 常量
 * 
 * @type
 */
examUtil.constant = {};

/**
 * 试卷分发页：视图类型:1、卡片
 */
examUtil.constant.DISTRIBUTE_VIEW_TYPE_CARD = "1";

/**
 * 试卷分发页：视图类型:2、表格
 */
examUtil.constant.DISTRIBUTE_VIEW_TYPE_GRID = "2";

/**
 * 竞赛
 */
examUtil.constant.EXAM_PAPER_TYPE_CONTEST = "10";
/**
 * 考试
 */
examUtil.constant.EXAM_PAPER_TYPE_EXAM = "11";
/**
 * 试卷类型-自测
 */
examUtil.constant.EXAM_PAPER_TYPE_SELF = "12";
/**
 * 试卷类型-课程
 */
examUtil.constant.EXAM_PAPER_TYPE_COURSE = "13";
/**
 * 试卷类型-练习模式
 */
examUtil.constant.EXAM_PAPER_TYPE_TEST = "14";
/**
 * 试卷未发布
 */
examUtil.constant.EXAM_PAPER_INS_STATUS_UNKNOW = "00";
/**
 * 试卷未参加
 */
examUtil.constant.EXAM_PAPER_INS_STATUS_UN_BEGIN = "20";
/**
 * 试卷未提交
 */
examUtil.constant.EXAM_PAPER_INS_STATUS_UN_COMMIT = "30";
/**
 * 试卷已提交（未批阅）
 */
examUtil.constant.EXAM_PAPER_INS_STATUS_WAIT_REVIEW = "40";
/**
 * 试卷已提交（未批阅）（强制提交）
 */
examUtil.constant.EXAM_PAPER_INS_STATUS_WAIT_REVIEW_FORCED = "45";
/**
 * 试卷批阅中
 */
examUtil.constant.EXAM_PAPER_INS_STATUS_REVIEWING = "50";
/**
 * 试卷已批阅
 */
examUtil.constant.EXAM_PAPER_INS_STATUS_REVIEWED = "60";

/**
 * 考试编辑中（未选择试卷）
 */
examUtil.constant.EXAM_STATUS_EDITING = "10";
/**
 * 考试未分发（编辑完成发布）
 */
examUtil.constant.EXAM_STATUS_UN_DISTRIBUTE = "20";
/**
 * 考试已分发（满足时间即可答题）
 */
examUtil.constant.EXAM_STATUS_DISTRIBUTED = "30";
/**
 * 考试未批阅（考试结束）
 */
examUtil.constant.EXAM_STATUS_UN_REVIEWE = "40";
/**
 * 考试已批阅
 */
examUtil.constant.EXAM_STATUS_REVIEWED = "50";

/**
 * 竞赛编辑中（未选择试卷）
 */
examUtil.constant.EXAM_CONTEST_STATUS_EDITING = "10";
/**
 * 竞赛未分发（编辑完成发布）
 */
examUtil.constant.EXAM_CONTEST_STATUS_UN_DISTRIBUTE = "20";
/**
 * 竞赛已分发
 */
examUtil.constant.EXAM_CONTEST_STATUS_DISTRIBUTED = "30";
/**
 * 竞赛中
 */
examUtil.constant.EXAM_CONTEST_STATUS_UN_REVIEWE = "40";
/**
 * 竞赛已结束
 */
examUtil.constant.EXAM_CONTEST_STATUS_REVIEWED = "50";

/**
 * 题目类型_分篇
 * 
 * @type String
 */
examUtil.constant.EXAM_SUBJECT_TYPE_CHAPTER = "0";
/**
 * 题目类型_单选
 * 
 * @type String
 */
examUtil.constant.EXAM_SUBJECT_TYPE_SINGLE = "1";
/**
 * 题目类型_多选
 * 
 * @type String
 */
examUtil.constant.EXAM_SUBJECT_TYPE_MULTI = "2";
/**
 * 题目类型_判断
 * 
 * @type String
 */
examUtil.constant.EXAM_SUBJECT_TYPE_JUDGE = "3";
/**
 * 题目类型_简答
 * 
 * @type String
 */
examUtil.constant.EXAM_SUBJECT_TYPE_SUBJECTIVE = "4";
/**
 * 题目类型_填空
 * 
 * @type String
 */
examUtil.constant.EXAM_SUBJECT_TYPE_FILL = "5";
/**
 * 题目类型_纠错
 * 
 * @type String
 */
examUtil.constant.EXAM_SUBJECT_TYPE_CORRECTION = "6";
/**
 * 题目类型_匹配
 * 
 * @type String
 */
examUtil.constant.EXAM_SUBJECT_TYPE_MATCHING = "7";
/**
 * 题目类型_下拉
 * 
 * @type String
 */
examUtil.constant.EXAM_SUBJECT_TYPE_DROP = "8";
/**
 * 题目类型_组合
 * 
 * @type String
 */
examUtil.constant.EXAM_SUBJECT_TYPE_GROUP = "9";

/**
 * 异议待处理
 */
examUtil.constant.EXAM_SUBJECT_DISSENT_STATUS_WAIT = "00";
/**
 * 异议已处理
 */
examUtil.constant.EXAM_SUBJECT_DISSENT_STATUS_DONE = "20";

/**
 * 作业未发布
 */
examUtil.constant.HOMEWORK_INS_STATUS_UNKNOW = "00";
/**
 * 作业未提交
 */
examUtil.constant.HOMEWORK_INS_STATUS_UN_COMMIT = "30";
/**
 * 作业暂存（未提交）
 */
examUtil.constant.HOMEWORK_INS_STATUS_SAVED = "35";
/**
 * 作业已提交
 */
examUtil.constant.HOMEWORK_INS_STATUS_COMMITTED = "40";

/**
 * 作业已批阅
 */
examUtil.constant.HOMEWORK_INS_STATUS_REVIEWED = "60";
/**
 * 作业未分发（编辑题目中）
 */
examUtil.constant.HOMEWORK_STATUS_UN_DISTRIBUTE = "20";
/**
 * 作业已分发（满足时间即可答题）
 */
examUtil.constant.HOMEWORK_STATUS_DISTRIBUTED = "30";
/**
 * 作业结束
 */
examUtil.constant.HOMEWORK_STATUS_FINISH = "40";
/**
 * 问卷未发布
 */
examUtil.constant.QUESTIONNAIRE_INS_STATUS_UNKNOW = "00";
/**
 * 问卷未参加
 */
examUtil.constant.QUESTIONNAIRE_INS_STATUS_UN_BEGIN = "20";
/**
 * 问卷未提交
 */
examUtil.constant.QUESTIONNAIRE_INS_STATUS_UN_COMMIT = "30";

/**
 * 问卷已提交
 */
examUtil.constant.QUESTIONNAIRE_INS_STATUS_COMMITTED = "40";

/**
 * 问卷已提交(强制)
 */
examUtil.constant.QUESTIONNAIRE_INS_STATUS_COMMITTED_FORCED = "45";
/**
 * 问卷已提交(放弃)
 */
examUtil.constant.QUESTIONNAIRE_INS_STATUS_COMMITTED_GIVEUP = "46";

/**
 * 问卷编辑中（未选择问题）
 */
examUtil.constant.QUESTIONNAIRE_STATUS_EDITING = "10";
/**
 * 问卷未分发（编辑题目中）
 */
examUtil.constant.QUESTIONNAIRE_STATUS_UN_DISTRIBUTE = "20";
/**
 * 问卷暂停
 */
examUtil.constant.QUESTIONNAIRE_STATUS_PAUSE = "25";
/**
 * 问卷已分发（满足时间即可答题）
 */
examUtil.constant.QUESTIONNAIRE_STATUS_DISTRIBUTED = "30";
/**
 * 问卷结束
 */
examUtil.constant.QUESTIONNAIRE_STATUS_FINISH = "40";
/**
 * 投票未发布
 */
examUtil.constant.VOTE_STATUS_WAIT = "00";
/**
 * 投票已发布
 */
examUtil.constant.VOTE_STATUS_ING = "30";
/**
 * 投票已结束
 */
examUtil.constant.VOTE_STATUS_END = "40";
/**
 * 布局-横向
 */
examUtil.constant.LAYOUT_VERTICAL = "10";
/**
 * 布局-横向
 */
examUtil.constant.LAYOUT_HORIZONTAL = "20";
/**
 * 布局-横向(评级)
 */
examUtil.constant.LAYOUT_HORIZONTAL_STAR = "21";
/**
 * 问卷启动星级评价
 */
examUtil.constant.QUESTIONNAIRE_SUBJECT_STAR_EVALUATE = "star_evaluate";
/**
 * 问卷默认模式
 * 
 * @type String
 */
examUtil.constant.QUESTIONNAIRE_LAYOUT_TYPE_DEFAULT = "1";
/**
 * 问卷WORD模板模式
 * 
 * @type String
 */
examUtil.constant.QUESTIONNAIRE_LAYOUT_TYPE_WORD = "2";
/**
 * 
 * 考试-问卷收集方式-指定型(实名)
 */
examUtil.constant.QUESTIONNAIRE_COLLECT_WAY_APPOINT = "1";
/**
 * 
 * 考试-问卷收集方式-收集型(匿名)
 */
examUtil.constant.QUESTIONNAIRE_COLLECT_WAY_COLLECT = "2";

/**
 * 考试初始化
 */
examUtil.examBeforeOnLoad = function(data) {
	try {
		// 初始化难易度
		if (data.facilityData) {
			for (var i = 0, length = data.facilityData.length; i < length; i++) {
				examUtil.config.starData[data.facilityData[i].itemvalue] = data.facilityData[i].itemtext;
			}
		}

		if (data.subjectTypes) {
			examUtil.config.subjectTypes = data.subjectTypes;
		}
		if (data.repeatLayouts) {
			examUtil.config.repeatLayouts = data.repeatLayouts;
		}
		if (data.subjectSequencePrefix) {
			examUtil.config.subjectSequencePrefix = data.subjectSequencePrefix;
		}
		if (data.singleOptionMaxCount > 0) {
			examUtil.config.singleOptionMaxCount = data.singleOptionMaxCount;
		}
		if (data.multiOptionMaxCount > 0) {
			examUtil.config.multiOptionMaxCount = data.multiOptionMaxCount;
		}

		examUtil.config.isFavorSubject = data.isFavorSubject;
	} catch (e) {

	}
};

/**
 * 加载通用滚动条
 */
examUtil.loadPageScroll = function() {
	try {
		$lInfo.css("height", $(window).height() - $lInfo.offset().top - $lInfo.css("margin-top").replace("px", ""));
		$rInfo.css("height", $(window).height() - $rInfo.offset().top - $rInfo.css("margin-top").replace("px", ""));

		$lInfo.niceScroll({
			cursorcolor : "#eee",
			cursorwidth : "6px",
			autohidemode : false
		});

		$rInfo.niceScroll({
			cursorcolor : "#eee",
			cursorwidth : "6px",
			autohidemode : false
		});

		// 1024屏下的横向大滚条
		$(".fui-form").niceScroll({
			cursorcolor : "#eee",
			cursorwidth : "6px",
			autohidemode : false
		});
	} catch (e) {
		console.log(e);
	}
};
/**
 * 加载右侧导航栏
 */
examUtil.loadRightSubjectNavigation = function() {
	$("#subjectNavigation").on("click", "[data-guid]", function() {
		var $this = $(this);

		var $subject = $("li[data-guid=" + $this.data("guid") + "]");

		$lInfo.getNiceScroll(0).doScrollTop($subject.offset().top - $(".paper-header").offset().top);

		$("body,html").animate({
			scrollTop : $subject.offset().top
		}, 0);
	});
};

examUtil.getSubjectTypeText = function(value) {
	try {
		if (!examUtil.config.subjectTypes || !value) {
			return "";
		}

		for (var i = 0, length = examUtil.config.subjectTypes.length; i < length; i++) {
			if (examUtil.config.subjectTypes[i].itemvalue == value) {
				return examUtil.config.subjectTypes[i].itemtext;
			}
		}
	} catch (e) {

	}

	return "";
}

examUtil.$findSubject = function(subjectGuid) {
	return $(".subject-item[data-guid='" + subjectGuid + "']");
}

examUtil.$findNavigationOption = function(subjectGuid) {
	return $(".navigation-option-list a[data-guid='" + subjectGuid + "']");
}

examUtil._videoPlayer = {};

examUtil.loadExamVideo = function(id, attachGuid) {
	var player = examUtil._videoPlayer[id];
	if (!player) {
		if (!document.getElementById(id)) {
			return;
		}

		// 加载视频
		player = videojs(id, {
			controls : true,
			preload : false,
			"data-setup" : {
				autoplay : true
			},
			width : 600,
			height : 480
		});

		examUtil._videoPlayer[id] = player;
	}

	player.src({
		type : "video/mp4",
		src : attachGuid ? "examattachaction.action?cmd=getMp4Content&attachGuid=" + attachGuid : null
	});
	player.reset();
	player.load();
};

examUtil.addExamAttach = function($subject, attach) {
	var $parent = $subject.find(".item-attachs");

	var attachId = "attach_" + attach.attachguid;
	// 控件返回的和后台表的不一致
	var attachFileName = attach.attachfilename || attach.attachFileName;
	if (!attachFileName) {
		return;
	}
	var attachGuid = attach.attachguid || attach.attachGuid;

	if (attachFileName.endWith(".mp4")) {
		// 视频需要加载视频控件
		var videoId = attachId + "_video";

		var html = "<div id='" + attachId + "' class='item-attach'>";

		html += "<div class='attach-content'>";
		html += "<video id='" + videoId + "' class='video-js vjs-default-skin vjs-big-play-centered'></video>";
		html += "</div>";
		html += "</div>";

		$parent.append($(html));

		examUtil.loadExamVideo(videoId, attachGuid);
	} else {
		// 其他的就先默认图片了
		var imgId = attachId + "_image";

		var src = "attachAction.action?cmd=getContent&attachGuid=" + attachGuid;

		var html = "<div id='" + attachId + "' class='item-attach'>";

		html += "<div class='attach-content'>";
		html += "<img id='" + imgId + "' src='" + src + "'></img>";
		html += "</div>";
		html += "</div>";

		$parent.append(html);
	}
};

examUtil.getSubjectSequence = function(sequence) {
	sequence = sequence || "";
	if (sequence) {
		sequence += ".";
	}

	return examUtil.config.subjectSequencePrefix + sequence;
}

examUtil.getSubjectNameHtml = function(subject, subjectIndex, contenteditable, sequence) {
	var scoreHtml = "";
	if (subject.type == "9") {
		// 组合题显示空白
		sequence = "";
	} else {
		sequence = examUtil.getSubjectSequence(sequence);

		if (subject.score) {
			scoreHtml = '<span class="item-score">（' + subject.score + '分）</span>';
		}
	}

	contenteditable = contenteditable || false;

	var html = "<div class='item-header'>";
	html += "<h1 class='item-subject-sequence'>" + sequence + "</h1>";
	html += "<div class='item-subject-name'>";
	html += "<div class='item-subject-name-content' contenteditable='" + contenteditable + "'>" + subject.name;
	html += scoreHtml;
	html += "</div>";
	html += "</div>";
	html += "</div>";

	return html;
};

examUtil.getExamAttachUploadHtml = function() {
	var html = "<div class='item-attach-field clearfix'>";
	html += "<div class='item-attachs'>";
	html += "</div>";
	html += "</div>";

	return html;
};

examUtil.getSubjectChapterHtml = function(subject, editable) {
	subject = subject || {};

	var html = "<li class='subject-chapter' data-guid='" + (subject.rowguid || eputil.getUUID()) + "'>";

	if (editable) {
		html += "<h1 class='head-edit'>";
		html += "<span>分类编号：</span><input type='text' maxlength='2' class='name' value='" + (subject.name || "") + "'></input>";
		html += "<span>分类名称：</span><input type='text' style='width: 150px;' maxlength='25' class='remark' value='" + (subject.remark || "") + "'></input>";
		html += "<i class='chapter-btn-remove'></i>";
		html += "<i class='chapter-btn-down'></i>";
		html += "<i class='chapter-btn-up'></i>";
		html += "</h1>";
	} else {
		html += "<h1 class='head'>" + (subject.remark || subject.name || "未知的分类") + "</h1>";
	}
	html += "<ul></ul>";
	html += "</li>";

	return html;
};

examUtil.drawSubjectSetType = function(target, subject, sortable, $parent) {
	var $subjectList = null;
	if (!$parent) {
		$parent = $subjectSet;
	}

	if (subject.parentguid == null || subject.parentguid == "UNKNOWN") {
		var $subjectSetType = $parent.find(".subject-set-type[type='" + subject.type + "']");
		if ($subjectSetType.length > 0) {
			$subjectList = $subjectSetType.next();
		} else {
			var headerHtml = "<p>" + examUtil.getSubjectTypeText(subject.type) + "</p>";

			var subjectNum = null;
			var perScore = null;

			if (target.showscore == "1") {
				subjectNum = target["subject" + subject.type + "num"];
				perScore = target["subject" + subject.type + "perscore"];
			}

			if (subjectNum && perScore) {
				headerHtml += "<span class='score-header'>(共" + subjectNum + "题，合计" + (subjectNum * perScore) + "分)</span>";
			}

			$subjectSetType = $("<div class='subject-set-type' type='" + subject.type + "'>" + headerHtml + "</div>");
			$subjectList = $("<ul class='subject-list clearfix'></ul>");

			// 根据subjectTypes的顺序放置区域位置
			examUtil.insertNewSet(subject.type, "subject-set-type", $parent, $subjectSetType, $subjectList);

			if (sortable) {
				$subjectList.sortable({
					handle : ".subject-btn-move",
					stop : function(event, ui) {
						examUtil.reOrderSubjectSequence(true);
					}
				});
			}
		}
	} else {
		$subjectList = $(".subject-set-type[type='9']").next();
	}

	return $subjectList;
};

examUtil.drawExamSubjectNavigation = function(target, subject, model, showHeader) {
	showHeader = showHeader == null ? true : false;

	var $navigationOptionList = null;
	var $navigationHeader = null;

	// 绘制结构
	if (showHeader) {
		if (subject.type == "0") {
			// 这是一个分篇，先构建结构
			$navigationOptionList = $subjectNavigation.find(".navigation-option-list");
			if ($navigationOptionList.length == 0) {
				$navigationHeader = $("<h1 class='navigation-type-header'></h1>");
				$navigationOptionList = $("<ul class='navigation-option-list clearfix'></ul>");

				$subjectNavigation.append($navigationHeader);
				$subjectNavigation.append($navigationOptionList);
			};
		} else if (subject.parentguid == null || subject.parentguid == "UNKNOWN") {
			var $parent = $subjectNavigation.find("a[data-guid='" + subject.chapterguid + "']").next();
			if ($parent.length == 0) {
				$parent = $subjectNavigation;
			}

			var $navigationHeader = $parent.find(".navigation-type-header[type='" + subject.type + "']");
			if ($navigationHeader.length > 0) {
				$navigationOptionList = $navigationHeader.next();
			} else {
				var headerHtml = examUtil.getSubjectTypeText(subject.type);

				var subjectNum = null;
				var perScore = null;

				if (target.showscore == "1") {
					subjectNum = target["subject" + subject.type + "num"];
					perScore = target["subject" + subject.type + "perscore"];
				}

				if (subjectNum && perScore) {
					headerHtml += "（" + (subjectNum * perScore) + "）分";
				}

				$navigationHeaderer = $("<h1 class='navigation-type-header' type='" + subject.type + "'>" + (headerHtml + "") + "</h1>");
				$navigationOptionList = $("<ul class='navigation-option-list clearfix'></ul>");

				examUtil.insertNewSet(subject.type, "navigation-type-header", $parent, $navigationHeaderer, $navigationOptionList);
			}
		} else {
			// 这是组合题的子体
			$navigationOptionList = $(".navigation-type-header[type='9']").next();
		}
	} else {
		$navigationOptionList = $subjectNavigation.find(".navigation-option-list");
		if ($navigationOptionList.length == 0) {
			$navigationHeader = $("<h1 class='navigation-type-header'></h1>");
			$navigationOptionList = $("<ul class='navigation-option-list clearfix'></ul>");

			$subjectNavigation.append($navigationHeader);
			$subjectNavigation.append($navigationOptionList);
		}
	}

	// 选项
	if ($navigationOptionList.find("a[data-guid='" + subject.rowguid + "']").length > 0) {
		// 若已经渲染了选项，不再重复渲染
		return;
	}

	var navigationOptionHtml = "";
	if (subject.type == "0") {
		// 分篇节点
		navigationOptionHtml += "<li class='chapter'><a class='chapter-sequence' data-guid='" + subject.rowguid + "'>" + (subject.remark || subject.name || "") + "</a><ul class='clearfix'></ul></li>";
	} else if (subject.type == "9") {
		// 组合题节点
		navigationOptionHtml += "<li class='group'><a data-guid='" + subject.rowguid + "'></a><ul class='clearfix'></ul></li>";
	} else {
		var disabledClass = subject.disabled ? " disabled" : "";
		navigationOptionHtml += "<li class='subject" + disabledClass + "'><a data-guid='" + subject.rowguid + "' data-sequencenumber='" + subject.sequencenumber + "' data-isskip='"
				+ (subject.isskip || "0") + "'";

		var fontLimint = "";
		if (subject.type == "4") {
			if (subject.minfontnum) {
				fontLimint += " data-minfontnum='" + subject.minfontnum + "'";
			}
			if (subject.maxfontnum) {
				fontLimint += " data-maxfontnum='" + subject.maxfontnum + "'";
			}
		}

		navigationOptionHtml += fontLimint;

		if (model == "review") {
			// 试卷批阅的
			if (subject.realscore) {
				navigationOptionHtml += " title='" + (subject.realscore || 0) + "分'";
				navigationOptionHtml += " class='right'";
			}
		} else if (model == "questionnaire") {
			if (subject.answers && subject.answers.length > 0) {
				navigationOptionHtml += " class='right answered'";
			}
		} else if (model == "exampaper") {
			if (subject.answers && subject.answers.length > 0) {
				navigationOptionHtml += " class='right answered'";
			}
		} else if (model == "exampaperinsdetail") {
			if (subject.realscore === "" || subject.realscore === undefined) {
				// 没有得分，未答题或者未批阅
				navigationOptionHtml += " class='wrong'";
			} else {
				if (subject.type == "4" || subject.type == "6") {
					navigationOptionHtml += " title='" + (subject.realscore || 0) + "分'";
				}
				if (subject.score == subject.realscore) {
					navigationOptionHtml += " class='right'";
				} else {
					navigationOptionHtml += " class='wrong'";
				}
			}
		} else {
			if (subject.realscore === "" || subject.realscore === undefined) {
				// 没有得分，未答题或者未批阅
			} else {
				if (subject.type == "4" || subject.type == "6") {
					navigationOptionHtml += " title='" + (subject.realscore || 0) + "分'";
				} else {
					if (subject.score == subject.realscore) {
						navigationOptionHtml += " class='right'";
					} else {
						navigationOptionHtml += " class='wrong'";
					}
				}
			}
		}

		navigationOptionHtml += "></a>";
		navigationOptionHtml += "</li>";
	}

	if (subject.parentguid && subject.parentguid != 'UNKNOWN') {
		// 组合题子题
		$navigationOptionList.find("a[data-guid='" + subject.parentguid + "']").next().append(navigationOptionHtml);
	} else if (subject.chapterguid) {
		// 分篇（分类）
		var $chapter = $subjectNavigation.find("a[data-guid='" + subject.chapterguid + "']");
		var $ul = $chapter.next().find(".navigation-type-header[type='" + subject.type + "']").next();
		if ($ul.length == 0) {
			$ul = $chapter.next();
		}

		$ul.append(navigationOptionHtml);
	} else {
		if (subject.type == "0") {
			$navigationOptionList.append(navigationOptionHtml);
		} else {
			// 如果有分篇，添加到最后一个分篇
			var $chapter = $navigationOptionList.find(".chapter:last");
			if ($chapter.length > 0) {
				$chapter.children("ul").append(navigationOptionHtml);
			} else {
				// 常规选项
				// 这边要注意，题目有顺序，需要找到他合适的顺序进行插入
				var $prev = $navigationOptionList.find("a[data-sequencenumber='" + (subject.sequencenumber - 1) + "']");
				if ($prev.length > 0) {
					// 
					$prev.parent().after(navigationOptionHtml);
				} else {
					// 没有前置节点，插入尾部
					$navigationOptionList.append(navigationOptionHtml);
				}
			}
		}
	}
};

examUtil.removeExamSubjectNavigation = function(subjectGuid) {
	var $navigationOptionList = $(".navigation-option-list");
	$navigationOptionList.find("a[data-guid='" + subjectGuid + "']").parent().remove();
};

examUtil.insertNewSet = function(type, cssClassName, $parent, $set, $list) {
	for (var i = 0, length = examUtil.config.subjectTypes.length; i < length; i++) {
		if (examUtil.config.subjectTypes[i].itemvalue == type) {
			// 
			var $sibling = null;

			var locate = 0;

			for (var j = 0; j < length; j++) {
				$sibling = $parent.find("." + cssClassName + "[type='" + examUtil.config.subjectTypes[j].itemvalue + "']");
				if ($sibling.length > 0 && j > i) {
					locate = j;
					break;
				}
			}

			if (locate < i) {
				$sibling = $sibling.next();
			}

			if ($sibling == null || $sibling.length == 0) {
				$parent.append($set);
				$parent.append($list);
			} else {
				if ($sibling.hasClass(cssClassName)) {
					$sibling.before($set);
					$sibling.before($list);
				} else {
					$sibling.after($set);
					$sibling.after($list);
				}
			}
		}
	}
};

examUtil.pasteFilter = function(e) {
	e.preventDefault();
	var text = null;
	// 得到剪贴板中的文本
	if (window.clipboardData && clipboardData.setData) {
		// IE
		text = window.clipboardData.getData('text') || "";
	} else {
		text = (e.originalEvent || e).clipboardData.getData('text/plain') || "";
	}

	if (document.body.createTextRange) {
		if (document.selection) {
			textRange = document.selection.createRange();
		} else if (window.getSelection) {
			sel = window.getSelection();
			var range = sel.getRangeAt(0);

			// 创建临时元素，使得TextRange可以移动到正确的位置
			var tempEl = document.createElement("span");
			tempEl.innerHTML = "&#FEFF;";
			range.deleteContents();
			range.insertNode(tempEl);
			textRange = document.body.createTextRange();
			textRange.moveToElementText(tempEl);
			tempEl.parentNode.removeChild(tempEl);
		}
		textRange.text = text;
		textRange.collapse(false);
		textRange.select();
	} else {
		// Chrome之类浏览器
		document.execCommand("insertText", false, text);
	}
};

examUtil.reOrderSubjectSequence = function(firstSubjectIndex) {
	// 根据目前题目的顺序重新调整顺序
	var subjectIndex = (firstSubjectIndex || 0);
	$(".subject-item").each(function() {
		var $this = $(this);

		if ($this.data("type") == "9") {

		} else {
			$this.find(".item-header>.item-subject-sequence").html(examUtil.getSubjectSequence(++subjectIndex));
		}
	});

	$(".subject-item[data-type='9']").each(function() {
		var $this = $(this);
		// 组合题组调整提示性文字
		var fromSubjectIndex = 0;
		var toSubjectIndex = 0;

		// 子项
		$this.nextAll(".subject-item[data-parentguid='" + $this.data("guid") + "']").each(function() {
			var $subSubjectItem = $(this);

			if (fromSubjectIndex == 0) {
				fromSubjectIndex = parseInt($subSubjectItem.find(".item-header>.item-subject-sequence").html().replace(examUtil.config.subjectSequencePrefix, "").replace(".", ""));
			}

			toSubjectIndex = parseInt($subSubjectItem.find(".item-header>.item-subject-sequence").html().replace(examUtil.config.subjectSequencePrefix, "").replace(".", ""));
		});

		$this.find(".item-options .from").html(fromSubjectIndex);
		$this.find(".item-options .to").html(toSubjectIndex);
	});

	var subjectIndex = (firstSubjectIndex || 0);
	var groupIndex = 0;
	$subjectNavigation.find("li").each(function(i) {
		var $this = $(this);

		if ($this.hasClass("chapter")) {

		} else if ($this.hasClass("group")) {
			$this.children("a").html("第" + (++groupIndex) + "道组合题");
		} else {
			$this.children().html(++subjectIndex);
		}
	});
};

// 题目配置
examUtil.onExamBankSubjectSettingRenderer = function(e) {
	return epoint.renderCell(e, "action-icon icon-gear", "examUtil.openExamBankSubjectSetting", "epoint_total");
}

examUtil.openExamBankSubjectSetting = function(e) {
	var tile = (e.bankname ? e.bankname + "-" : "") + "题目配置"

	epoint.openTopDialog(tile, 'exam/backend/examine/bank/subject/exambanksubjectlist?bankGuid=' + e.rowguid, function() {
		searchData();
	});
}

// 问卷题库题目配置
examUtil.onQuestionnaireBankSubjectSettingRenderer = function(e) {
	return epoint.renderCell(e, "action-icon icon-gear", "examUtil.openQuestionnaireBankSubjectSetting", "epoint_total");
}

examUtil.openQuestionnaireBankSubjectSetting = function(e) {
	var tile = (e.bankname ? e.bankname + "-" : "") + "题目配置"

	epoint.openTopDialog(tile, 'exam/backend/questionnaire/bank/questionnairebanksubjectlist?bankGuid=' + e.rowguid, function() {
		searchData();
	});
}

examUtil.onCourseDetailRenderer = function(e) {
	return epoint.renderCell(e, "modicon-2", "examUtil.openCourseDetail", "epoint_total");
};

examUtil.openCourseDetail = function(e) {
	epoint.openTopDialog('课程详情', 'exam/front/course/courseinfodetail?guid=' + (e.courseguid || e.rowguid || e), eputil.dialogCallback);
};

// 考试试卷进行题目的相关配置
examUtil.onExamPaperSubjectConfigureRenderer = function(e) {
	return epoint.renderCell(e, "action-icon icon-gear", "examUtil.openExamPaperSubjectConfigure", "epoint_total");
};

examUtil.openExamPaperSubjectConfigure = function(e) {
	var url = null;
	var size = null;
	if (e.canedit == "1") {
		if (e.buildtypevalue == "1" || e.buildtypevalue == "3") {
			// 手动配置/综合试卷
			url = "exam/backend/paper/subject/exampapersubjectmanage?paperGuid=" + e.rowguid;
			size = eputil.sizePaper;
		} else if (e.buildtypevalue == "2") {
			// 自动生成
			url = "exam/backend/paper/bank/exampaperbankmanage?paperGuid=" + e.rowguid;
			size = {
				width : 1100,
				height : 550
			};
		}
	} else {
		if (e.buildtypevalue == "1" || e.buildtypevalue == "3") {
			url = "exam/backend/paper/subject/exampapersubjectmanagedetail?paperGuid=" + e.rowguid;
			size = eputil.sizePaper;
		} else if (e.buildtypevalue == "2") {
			url = "exam/backend/paper/bank/exampaperbankdetail?paperGuid=" + e.rowguid;
			size = {
				width : 1100,
				height : 550
			};
		}
	}

	epoint.openTopDialog('题目配置', url, examUtil.openExamPaperSubjectConfigureCall, size);
};

// 问卷进行配置题目
examUtil.onQuestionnaireInfoSubjectConfigureRenderer = function(e) {
	return epoint.renderCell(e, "action-icon icon-gear", "examUtil.openQuestionnaireInfoSubjectConfigure", "epoint_total");
};

examUtil.openQuestionnaireInfoSubjectConfigure = function(e) {
	var url = "";
	var title = "";
	if (e.flowstatus == examUtil.constant.QUESTIONNAIRE_STATUS_EDITING || e.flowstatus == examUtil.constant.QUESTIONNAIRE_STATUS_UN_DISTRIBUTE) {
		if (e.layouttype == '2') {
			url = 'exam/backend/questionnaire/questionnairetemplatefieldmanage?questionnaireGuid=' + e.rowguid;
		} else {
			url = "exam/backend/questionnaire/questionnairesubjectmanage?questionnaireGuid=" + e.rowguid;// 题目配置页面
		}
		title = "题目配置";
	} else {
		if (e.layouttype == '2') {
			url = 'exam/backend/questionnaire/questionnairetemplatefieldmanagedetail?questionnaireGuid=' + e.rowguid;
		} else {
			url = "exam/backend/questionnaire/questionnairesubjectmanagedetail?questionnaireGuid=" + e.rowguid;// 详情页面，已开始，或者已发送，不能改目配置
		}
		title = "题目详情";
	}

	epoint.openTopDialog(title, url, examUtil.openQuestionnaireInfoSubjectConfigureCall, eputil.examPaper)
};

examUtil.openExamPaperSubjectConfigureCall = function() {
	searchData();
};

examUtil.openQuestionnaireInfoSubjectConfigureCall = function() {
	searchData();
};

examUtil.courseChapterTreeSelectCall = function(rtn) {

};

examUtil.onExamBankSubjectRenderer = function(e) {
	return epoint.renderCell(e, "action-icon icon-search", "examUtil.openExamBankSubjectDetail", "epoint_total");
};

examUtil.openExamBankSubjectDetail = function(e) {
	epoint.openTopDialog('题目详情', "exam/backend/examine/bank/subject/exambanksubjectdetail?guid=" + e.rowguid, searchData, {
		width : 1180,
		height : 750
	});
};

examUtil.onExamBankSubjectHisRenderer = function(e) {
	return epoint.renderCell(e, "action-icon icon-search", "examUtil.openExamBankSubjectHisDetail", "epoint_total");
};

examUtil.openExamBankSubjectHisDetail = function(e) {
	epoint.openTopDialog('题目详情', "exam/backend/examine/bank/subject/his/exambanksubjecthisdetail?guid=" + e.rowguid, searchData, {
		width : 1180,
		height : 750
	});
};

examUtil.openCourseChapterTreeSingle = function(e, courseGuid) {
	var source = {};

	if (e && e.source) {
		source = e.source;
	}

	epoint.openTopDialog('选择章节', 'exam/tree/coursechaptertreesingle?courseGuid=' + courseGuid, function(rtn) {
		if (eputil.treeNodeSelectDataBind(source, "single", rtn)) {
			examUtil.courseChapterTreeSelectCall(rtn);
		}
	}, {
		width : 400,
		height : 500
	});
};

/**
 * 课程学习
 */
examUtil.onCourseStudyRenderer = function(e) {
	return epoint.renderCell(e, "action-icon icon-start", "examUtil.openCourseStudy", "epoint_total");
};

examUtil.openCourseStudy = function(e) {
	epoint.openTopDialog('学习界面', 'exam/front/course/coursestudy?chooseGuid=' + e.rowguid, function(data) {
		// 从缓存中读取数据提交
		var cookies = examUtil.getCookies(e.rowguid);
		if (cookies && cookies.length > 0) {
			var playRecords = [];

			for (var i = 0, length = cookies.length; i < length; i++) {
				if (cookies[i].key.indexOf("#") < 0) {
					continue;
				}

				var lengths = cookies[i].value.split("_");
				if (!lengths[0] || !lengths[1]) {
					continue;
				}

				playRecords.push({
					materialguid : cookies[i].key.split("#")[1],
					maxlength : lengths[0],
					newlength : lengths[1]
				});

				// 提交数据后清理cookie
				examUtil.deleteCookie(cookies[i].key);
			}

			epoint.execute("coursefrontaction.updateCourseProgress", "@none", [e.rowguid, playRecords], function() {
				searchData();
			});
		}
	});
};
// //////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 收藏题树
 */
examUtil.openExamSubjectFavoritesCategoryTreeMulti = function(e) {
	examUtil.openExamSubjectFavoritesCategoryTree(e, "multi");
};

examUtil.openExamSubjectFavoritesCategoryTreeSingle = function(e) {
	examUtil.openExamSubjectFavoritesCategoryTree(e, "single");
};

examUtil.openExamSubjectFavoritesCategoryTree = function(e, mode) {
	var source = {};
	var url = null;
	var param = null;

	if (e && e.source) {
		source = e.source;
	}

	if (mode == "single") {
		url = 'exam/tree/examsubjectfavoritescategorytreesingle';
		param = {
			width : 350,
			height : 500
		}
	}

	if (!url) {
		eputil.alert("未知的选择树！");
		return;
	}

	epoint.openTopDialog("选择收藏类型", url, function(rtn) {
		if (eputil.treeNodeSelectDataBind(source, mode, rtn)) {
			examUtil.examSubjectFavoritesCategoryTreeSelectCall(rtn);
		}
	}, param);
};

examUtil.examSubjectFavoritesCategoryTreeSelectCall = function(data) {

};
// //////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 错题树
 */
examUtil.openExamSubjectWrongCategoryTreeMulti = function(e) {
	examUtil.openExamSubjectWrongCategoryTree(e, "multi");
};

examUtil.openExamSubjectWrongCategoryTreeSingle = function(e) {
	examUtil.openExamSubjectWrongCategoryTree(e, "single");
};

examUtil.openExamSubjectWrongCategoryTree = function(e, mode) {
	var source = {};
	var url = null;
	var param = null;

	if (e && e.source) {
		source = e.source;
	}

	if (mode == "single") {
		url = 'exam/tree/examsubjectwrongcategorytreesingle';
		param = {
			width : 350,
			height : 500
		}
	}

	if (!url) {
		eputil.alert("未知的选择树！");
		return;
	}

	epoint.openTopDialog("选择错题类型", url, function(rtn) {
		if (eputil.treeNodeSelectDataBind(source, mode, rtn)) {
			examUtil.examSubjectWrongCategoryTreeSelectCall(rtn);
		}
	}, param);
};

examUtil.examSubjectWrongCategoryTreeSelectCall = function(data) {

};

// //////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 题库题目树
 */
examUtil.examBankSubjectSelectCall = function(rtn, source) {

};

examUtil.openExamBankSubjectSelectExamSingle = function(e) {
	examUtil.openExamBankSubjectSelect("single", e ? e.source : null, "11");
};
examUtil.openExamBankSubjectSelectExamMultiParam = function(e,param) {
	examUtil.openExamBankSubjectSelect("multi", e ? e.source : null, "11",null,param);
};
examUtil.openExamBankSubjectSelectExamMulti = function(e) {
	examUtil.openExamBankSubjectSelect("multi", e ? e.source : null, "11");
};
examUtil.openExamBankSubjectSelectSelfSingle = function(e) {
	examUtil.openExamBankSubjectSelect("single", e ? e.source : null, "12");
};
examUtil.openExamBankSubjectSelectSelfMultiParam = function(e,param) {
	examUtil.openExamBankSubjectSelect("multi", e ? e.source : null, "12",null,param);
};
examUtil.openExamBankSubjectSelectSelfMulti = function(e) {
	examUtil.openExamBankSubjectSelect("multi", e ? e.source : null, "12");
};

examUtil.openExamBankSubjectSelect = function(model, source, type, bankGuid, param) {
	var url = null;
	if(!param){
		param = {
				width : 1400,
				height : 1000
			};
	}

	if (type == "11") {
		url = "exam/backend/examine/bank/subject/exambanksubjectselectexam?model=" + model + "&referBankGuid=" + (bankGuid || "");
	} else {
		url = "exam/backend/examine/bank/subject/exambanksubjectselectself?model=" + model + "&referBankGuid=" + (bankGuid || "");
	}

	if (url) {
		epoint.openTopDialog('题目选择', url, function(rtn) {
			if (!rtn) {
				return;
			}

			examUtil.examBankSubjectSelectCall(rtn, source);
		},param);
	} else {
		eputil.alert("未知的选择树！");
	}
};
// //////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 问卷题目树
 */
examUtil.openQuestionnaireBankSubjectSelectSingle = function(e) {
	examUtil.openQuestionnaireBankSubjectSelect("single", e.source);
};
examUtil.openQuestionnaireBankSubjectSelectMulti = function(e) {
	examUtil.openQuestionnaireBankSubjectSelect("multi", e.source);
};
examUtil.openQuestionnaireBankSubjectSelect = function(model, source, bankGuid) {
	var url = null;
	var param = {
		width : 800,
		height : 500
	};

	url = "exam/backend/questionnaire/bank/questionnairebanksubjectselect?model=" + model + "&referBankGuid=" + (bankGuid || "");
	if (url) {
		epoint.openTopDialog('题目选择', url, function(rtn) {
			if (!rtn) {
				return;
			}

			examUtil.questionnaireBankSubjectSelectCall(rtn, source);
		});
	} else {
		eputil.alert("未知的选择树！");
	}
};
examUtil.questionnaireBankSubjectSelectCall = function(rtn, source) {

};

// //////////////////////////////////////////////////////////////////////////////////////////////////
examUtil.questionnaireInfoTypicalSelectCall = function(rtn) {

};
examUtil.openQuestionnaireInfoTypicalSelectSingle = function(rtn) {
	var url = null;
	var param = {
		width : 800,
		height : 500
	};

	url = "exam/backend/questionnaire/info/questionnaireinfotypicalselect";
	if (url) {
		epoint.openTopDialog('题目选择', url, function(rtn) {
			if (!rtn) {
				return;
			}

			examUtil.questionnaireInfoTypicalSelectCall(rtn);
		});
	} else {
		eputil.alert("未知的选择树！");
	}
};
// //////////////////////////////////////////////////////////////////////////////////////////////////
examUtil.examBankSelectCall = function(rtn, source) {

};

examUtil.openExamBankSelectSelfSingle = function(e) {
	epoint.openTopDialog("选择自测题库", "exam/backend/examine/bank/exambankselectself?mode=single", function(rtn) {
		examUtil.examBankSelectCall(rtn, e ? e.source : null);
	}, eputil.sizePaper);
};
examUtil.openExamBankSelectExamSingle = function(e) {
	epoint.openTopDialog("选择考试题库", "exam/backend/examine/bank/exambankselectexam?mode=single", function(rtn) {
		examUtil.examBankSelectCall(rtn, e ? e.source : null);
	}, eputil.sizePaper);
};
examUtil.openExamBankSelectSelfMulti = function(e) {
	epoint.openTopDialog("选择自测题库", "exam/backend/examine/bank/exambankselectself?mode=multi", function(rtn) {
		examUtil.examBankSelectCall(rtn, e ? e.source : null);
	}, eputil.sizePaper);
};
examUtil.openExamBankSelectExamMulti = function(e) {
	epoint.openTopDialog("选择考试题库", "exam/backend/examine/bank/exambankselectexam?mode=multi", function(rtn) {
		examUtil.examBankSelectCall(rtn, e ? e.source : null);
	}, eputil.sizePaper);
};
examUtil.openExamBankSelectExerciseSingle = function(e) {
	epoint.openTopDialog("选择练习题库", "exam/front/examine/bank/exambankselectexercise?mode=single", function(rtn) {
		examUtil.examBankSelectCall(rtn, e ? e.source : null);
	}, eputil.sizePaper);
};
examUtil.openExamBankSelectExerciseMulti = function(e) {
	epoint.openTopDialog("选择练习题库", "exam/front/examine/bank/exambankselectexercise?mode=multi", function(rtn) {
		examUtil.examBankSelectCall(rtn, e ? e.source : null);
	});
};
// //////////////////////////////////////////////////////////////////////////////////////////////////
examUtil.examPaperSelectCall = function(rtn, source) {

};

examUtil.openExamPaperSelectExam = function(e, referPaperGuid) {
	epoint.openTopDialog('选择考试试卷', 'exam/backend/paper/exampaperselectexam?referPaperGuid=' + (referPaperGuid || ""), function(rtn) {
		examUtil.examPaperSelectCall(rtn, e.source);
	}, eputil.sizePaper);
};

examUtil.openExamPaperSelectContest = function(e, referPaperGuid) {
	epoint.openTopDialog('选择竞赛试卷', 'exam/backend/paper/exampaperselectcontest?referPaperGuid=' + (referPaperGuid || ""), function(rtn) {
		examUtil.examPaperSelectCall(rtn, e.source);
	}, eputil.sizePaper);
};
examUtil.openExamPaperSelectSelf = function(e, referPaperGuid) {
	epoint.openTopDialog('选择自测试卷', 'exam/backend/paper/exampaperselectself?referPaperGuid=' + (referPaperGuid || ""), function(rtn) {
		examUtil.examPaperSelectCall(rtn, e.source);
	}, eputil.sizePaper);
};

// //////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * 开始答题
 * 
 * @param {}
 *            paperInsGuid
 */
examUtil.beginExam = function(paperInsGuid, examGuid) {
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

	var url = "exam/front/paper/exampaperinsanswer?paperInsGuid=" + paperInsGuid;
	if (examGuid) {
		url += "&examGuid=" + examGuid;
	}

	epoint.openTopDialog('开始答题', url, function() {
		searchData();
	}, {
		width : 1400,
		height : 1000
		// ,
	// showCloseButton : false
}	);
};
/**
 * 开始练习题
 * 
 * @param {}
 *            paperInsGuid
 */
examUtil.beginExercise = function(paperInsGuid) {
	var url = "exam/front/paper/exercise/exampaperinsexerciseanswer?paperInsGuid=" + paperInsGuid;
	epoint.openTopDialog('开始练习', url, function() {
		searchData();
	}, {
		width : 1180,
		height : 900,
		showCloseButton : false
	});
}

/**
 * 查看成绩
 * 
 * @param {}
 *            paperInsGuid
 */
examUtil.showExamResultFront = function(paperInsGuid) {
	var url = "exam/front/paper/exampaperinsfrontdetail?paperInsGuid=" + paperInsGuid;
	epoint.openTopDialog('查看成绩', url, null, eputil.sizePaper);
};

/**
 * 查看成绩
 * 
 * @param {}
 *            paperInsGuid
 */
examUtil.showExamResultBackend = function(data) {
	var url = "exam/backend/examine/ins/exampaperinsbackenddetail?paperInsGuid=" + data.rowguid + "&examGuid=" + data.examguid;
	epoint.openTopDialog('查看成绩', url, null, eputil.sizePaper);
};

examUtil.initFacilityValue = function($root, defaultValue) {
	var oneBrightUrl = _rootPath + "/exam/res/images/star/one_star_bright.png";// 1亮
	var oneGrayUrl = _rootPath + "/exam/res/images/star/one_star_gray.png";// 1灰

	// 初始化html
	var $facilityStar = null;
	if ($root) {
		$facilityStar = $root.find(".facility-star");
	} else {
		$facilityStar = $(".facility-star");
	}

	$facilityStar.each(function() {
		var $star = $(this);

		if ($star.hasClass("modify")) {
			var html = "";
			for (var key in examUtil.config.starData) {
				html += '<a href="javascript:void(0);" style="width:12px" key="' + key + '"><img src="' + oneGrayUrl + '"/></a>';
			}
			html += '<span class="message" style="width:40px;margin-left:10px;color:red"></span>';
			$star.append(html);

			// 点击亮星与设值
			$star.on("click", "a", function() {
				var $this = $(this);
				// 亮灯
				$this.find("img").attr("src", oneBrightUrl);
				$this.nextAll().find("img").attr("src", oneGrayUrl);
				$this.prevAll().find("img").attr("src", oneBrightUrl);
				// 说明文字
				var key = $this.attr("key");
				$star.find(".message").html(examUtil.config.starData[key]);// 设置提示语，下面以此类推

				$this.parent().attr("facilityvalue", key);
			});

			// 鼠标移入移出效果
			$star.on("mouseover", "a", function() {
				var $this = $(this);
				$this.find("img").attr("src", oneBrightUrl);
				$this.nextAll().find("img").attr("src", oneGrayUrl);
				$this.prevAll().find("img").attr("src", oneBrightUrl);
				// 说明文字
				var key = $this.attr("key");
				$star.find(".message").html(examUtil.config.starData[key]);
			});
			// 鼠标移出效果
			$star.on("mouseout", "a", function() {
				var $this = $(this);

				var key = $this.parent().attr("facilityvalue");
				if (key) {
					$this.parent().find("a[key='" + key + "']").click();
				} else {
					$this.parent().find("img").attr("src", oneGrayUrl);
					$star.find(".message").html("");
				}
			});

			// 初始化
			if (!defaultValue) {
				defaultValue = $star.attr("facilityvalue");
				if (!defaultValue) {
					$star.attr("facilityvalue", 1);
					defaultValue = 1;
				}
			}

			$star.find("a[key='" + defaultValue + "']").click();
		} else {
			if (defaultValue == null) {
				defaultValue = $star.attr("facilityvalue");
			}
			$star.append("<div class='facility-bg'><div class='facility-over' style='width:" + (parseInt(defaultValue) || 0) * 12 + "px;'></div></div>");
		}
	})
};

// 分数渲染
examUtil.onExamScoreRenderer = function(e) {
	if (!e || !e.row) {
		return "";
	}

	if (e.row.showscore != "1") {
		return "不公开";
	}

	return e.value;
};

// 难度等级List页面
examUtil.onFacilityValueRenderer = function(e) {
	var level = e.row.facilityvalue;
	return '<div class="facility-bg"><div class="facility-over" style="width:' + (level || 0) * 12 + 'px;"></div></div>';
};

examUtil.getCookie = function(name) {
	if (document.cookie.length > 0) {
		var arr = null;
		var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

		if (arr = document.cookie.match(reg)) {
			return unescape(arr[2]);
		}
	}

	return "";
};

examUtil.getCookies = function(name) {
	var rtn = [];
	if (document.cookie.length > 0) {
		var cookies = document.cookie.split(";");
		for (var i = 0, length = cookies.length; i < length; i++) {
			if (cookies[i].trim().startWith(name)) {
				var exp = cookies[i].split("=");
				rtn.push({
					key : exp[0].trim(),
					value : exp[1]
				});
			}
		}
	}

	return rtn;
};

examUtil.setCookie = function(name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
};

examUtil.deleteCookie = function(name) {
	var dateNow = new Date();
	dateNow.setTime(dateNow.getTime() - 1);
	var currentCookie = examUtil.getCookie(name);
	if (currentCookie != null) {
		document.cookie = name + "=" + currentCookie + ";expires=" + dateNow.toGMTString();
	}
};

examUtil.deleteCookies = function(name) {
	var cookies = examUtil.getCookies(name);
	for (var i = 0, length = cookies.length; i < length; i++) {
		examUtil.deleteCookie(cookies[i].key);
	}
};

examUtil.examQuestionnaireSelectCall = function(rtn) {

};
examUtil.openQuestionnaireBankSelect = function(e) {
	epoint.openTopDialog("选择问卷题库", "exam/backend/questionnaire/bank/questionnairebanksubjectselect", function(rtn) {
		examUtil.examQuestionnaireSelectCall(rtn);
	}, eputil.sizePaper);
};

// *** 几颗系统组织架构树 *** //
examUtil.openExamOuTreeSingle = function(e, moduleType) {
	examUtil.openExamOuTree(e, "single", moduleType);
};
examUtil.openExamOuTreeMulti = function(e, moduleType) {
	examUtil.openExamOuTree(e, "multi", moduleType);
};
examUtil.openExamOuTree = function(e, mode, moduleType) {
	var source = {};
	var url = null;
	var param = null;

	if (e && e.source) {
		source = e.source;
	}

	if (mode == "single") {
		url = "exam/tree/examoutreesingle?moduleType=" + moduleType;
		param = {
			width : 350,
			height : 500
		}
	} else {
		url = "exam/tree/examoutreemulti?moduleType=" + moduleType;
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
		if (!rtn) {
			return;
		}

		if (rtn != "close") {
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

		examUtil.examOuTreeSelectCall(rtn);
	}, param);
};

examUtil.examOuTreeSelectCall = function(data) {

};
//
examUtil.openExamOuUserTreeSingle = function(e, moduleType) {
	examUtil.openExamOuUserTree(e, "single", moduleType);
};
examUtil.openExamOuUserTreeMulti = function(e, moduleType) {
	examUtil.openExamOuUserTree(e, "multi", moduleType);
};
examUtil.openExamOuUserTree = function(e, mode, moduleType) {
	var source = {};
	var url = null;
	var param = null;

	if (e && e.source) {
		source = e.source;
	}

	if (mode == "single") {
		url = "exam/tree/examouusertreesingle?moduleType=" + moduleType;
		param = {
			width : 900,
			height : 500
		}
	} else {
		url = "exam/tree/examouusertreemulti?moduleType=" + moduleType;
		param = {
			width : 900,
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
		if (!rtn) {
			return;
		}

		if (rtn != "close") {
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

		examUtil.examOuUserTreeSelectCall(rtn);
	}, param);
};

examUtil.examOuUserTreeSelectCall = function(data) {

};
//
examUtil.openExamRoleUserTreeSingle = function(e, moduleType) {
	examUtil.openExamRoleUserTree(e, "single", moduleType);
};
examUtil.openExamRoleUserTreeMulti = function(e, moduleType) {
	examUtil.openExamRoleUserTree(e, "multi", moduleType);
};
examUtil.openExamRoleUserTree = function(e, mode, moduleType) {
	var source = {};
	var url = null;
	var param = null;

	if (e && e.source) {
		source = e.source;
	}

	if (mode == "single") {
		url = "exam/tree/examroleusertreesingle?moduleType=" + moduleType;
		param = {
			width : 350,
			height : 500
		}
	} else {
		url = "exam/tree/examroleusertreemulti?moduleType=" + moduleType;
		param = {
			width : 550,
			height : 500
		}

		if (source.type == "buttonedit") {
			param.param = {
				userGuids : source.getValue(),
				useerNames : source.getText()
			}
		}
	}

	epoint.openTopDialog('选择用户', url, function(rtn) {
		if (!rtn) {
			return;
		}

		if (rtn != "close") {
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

		examUtil.examOuUserTreeSelectCall(rtn);
	}, param);
};
// *** 几颗系统组织架构树 *** //

/** 考试类别分类树相关 */
examUtil.openExamCategoryTreeSingle = function(e) {
	var url = "exam/tree/examcategorytreesingle";
	var size = {
		width : 350,
		height : 500
	};

	var source = {};

	if (e && e.source) {
		source = e.source;
	}

	epoint.openTopDialog('选择', url, function(rtn) {
		if (!rtn) {
			return;
		}

		if (rtn != "close") {
			if (source.type == "buttonedit") {
				source.setValue(rtn.id);
				source.setText(rtn.fullPath || rtn.text);
				source.validate();
			}
		}
	}, size);
};

/** 考试题库类别分类树相关 */
examUtil.openExamBankCategoryTreeSingle = function(e) {
	examUtil.openExamBankCategoryTree(e, "single");
};

examUtil.openExamBankCategoryTree = function(e, mode) {
	var source = {};
	var url = null;
	var param = null;

	if (e && e.source) {
		source = e.source;
	}

	if (mode == "single") {
		url = 'exam/tree/exambankcategorytreesingle';
		param = {
			width : 350,
			height : 500
		}
	} else {

	}

	if (!url) {
		eputil.alert("未知的选择树！");
	}

	epoint.openTopDialog("选择", url, function(rtn) {
		if (!rtn) {
			return;
		}

		if (rtn != "close") {
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

		examUtil.examBankCategoryTreeSelectCall(rtn);
	}, param);
};

examUtil.examBankCategoryTreeSelectCall = function(data) {

};

/** 试卷题库类别分类树相关 */
examUtil.openQuestionnaireBankCategoryTreeMulti = function(e) {
	examUtil.openQuestionnaireBankCategoryTree(e, "multi");
};

examUtil.openQuestionnaireBankCategoryTreeSingle = function(e) {
	examUtil.openQuestionnaireBankCategoryTree(e, "single");
};

examUtil.openQuestionnaireBankCategoryTree = function(e, mode) {
	var source = {};
	var url = null;
	var param = null;

	if (e && e.source) {
		source = e.source;
	}

	if (mode == "single") {
		url = 'exam/tree/questionnairebankcategorytreesingle';
		param = {
			width : 350,
			height : 500
		}
	} else {
		/*
		 * url = ''; param = { width : 550, height : 500 }
		 * 
		 * if (source.type == "buttonedit") { param.param = { rowguids : source.getValue(), categorynames : source.getText() } }
		 */
	}

	if (!url) {
		eputil.alert("未知的选择树！");
	}

	epoint.openTopDialog("选择", url, function(rtn) {
		if (!rtn) {
			return;
		}

		if (rtn != "close") {
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

		examUtil.questionnaireBankCategoryTreeSelectCall(rtn);
	}, param);
};

examUtil.questionnaireBankCategoryTreeSelectCall = function(data) {

};
/** 试卷题库类别分类树相关结束 */

/** 试卷信息类别分类树相关 */
examUtil.openQuestionnaireCategoryTreeMulti = function(e) {
	examUtil.openQuestionnaireCategoryTree(e, "multi");
};

examUtil.openQuestionnaireCategoryTreeSingle = function(e) {
	examUtil.openQuestionnaireCategoryTree(e, "single");
};

examUtil.openQuestionnaireCategoryTree = function(e, mode) {
	var source = {};
	var url = null;
	var param = null;

	if (e && e.source) {
		source = e.source;
	}

	if (mode == "single") {
		url = 'exam/tree/questionnairecategorytreesingle';
		param = {
			width : 350,
			height : 500
		}
	} else {
		/*
		 * url = ''; param = { width : 550, height : 500 }
		 * 
		 * if (source.type == "buttonedit") { param.param = { rowguids : source.getValue(), categorynames : source.getText() } }
		 */
	}

	if (!url) {
		eputil.alert("未知的选择树！");
	}

	epoint.openTopDialog("选择", url, function(rtn) {
		if (!rtn) {
			return;
		}

		if (rtn != "close") {
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

		examUtil.questionnaireCategoryTreeSelectCall(rtn);
	}, param);
};

examUtil.questionnaireCategoryTreeSelectCall = function(data) {

};
/** 试卷题库类别分类树相关结束 */

/** 试卷分类树相关 */
examUtil.openExamPaperCategoryTreeMulti = function(e) {
	examUtil.openExamPaperCategoryTree(e, "multi");
};

examUtil.openExamPaperCategoryTreeSingle = function(e) {
	examUtil.openExamPaperCategoryTree(e, "single");
};

examUtil.openExamPaperCategoryTree = function(e, mode) {
	var source = {};
	var url = null;
	var param = null;

	if (e && e.source) {
		source = e.source;
	}

	if (mode == "single") {
		url = 'exam/tree/exampapercategorytreesingle';
		param = {
			width : 350,
			height : 500
		}
	} else {
		url = 'exam/tree/exampapercategorytreemulti';
		param = {
			width : 550,
			height : 500
		}

		if (source.type == "buttonedit") {
			param.param = {
				rowguids : source.getValue(),
				categorynames : source.getText()
			}
		}
	}

	if (!url) {
		eputil.alert("未知的选择树！");
		return;
	}

	epoint.openTopDialog("选择试卷分类", url, function(rtn) {
		if (!rtn) {
			return;
		}

		if (rtn != "close") {
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

		examUtil.examPaperCategoryTreeSelectCall(rtn);
	}, param);
};

examUtil.examPaperCategoryTreeSelectCall = function(data) {

};
/** 试卷分类树相关结束 */
/** HOMEWORK_CATEGORY树相关 */
examUtil.openHomeworkCategoryTreeMulti = function(e) {
	examUtil.openHomeworkCategoryTree(e, "multi");
};

examUtil.openHomeworkCategoryTreeSingle = function(e) {
	examUtil.openHomeworkCategoryTree(e, "single");
};

examUtil.openHomeworkCategoryTree = function(e, mode) {
	var source = {};
	var url = null;
	var param = null;

	if (e && e.source) {
		source = e.source;
	}

	if (mode == "single") {
		url = 'exam/tree/homeworkcategorytreesingle';
		param = {
			width : 350,
			height : 500
		}
	} else {
		url = 'exam/tree/homeworkcategorytreemulti';
		param = {
			width : 550,
			height : 500
		}

		if (source.type == "buttonedit") {
			param.param = {
				rowguids : source.getValue(),
				categorynames : source.getText()
			}
		}
	}

	if (!url) {
		eputil.alert("未知的选择树！");
		return;
	}

	epoint.openTopDialog("选择", url, function(rtn) {
		if (!rtn) {
			return;
		}

		if (rtn != "close") {
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

		examUtil.homeworkCategoryTreeSelectCall(rtn);
	}, param);
};

examUtil.homeworkCategoryTreeSelectCall = function(data) {

};
/** HOMEWORK_CATEGORY树相关结束 */

examUtil.openCourseCategoryTreeMulti = function(e) {
	examUtil.openCourseCategoryTree(e, "multi");
};

examUtil.openCourseCategoryTreeSingle = function(e) {
	examUtil.openCourseCategoryTree(e, "single");
};

examUtil.openCourseCategoryTree = function(e, mode) {
	var source = {};
	var url = null;
	var param = null;

	if (e && e.source) {
		source = e.source;
	}

	if (mode == "single") {
		url = 'exam/tree/coursecategorytreesingle';
		param = {
			width : 350,
			height : 500
		}
	} else {
		url = 'exam/tree/coursecategorytreemulti';
		param = {
			width : 550,
			height : 500
		}

		if (source.type == "buttonedit") {
			param.param = {
				rowguids : source.getValue(),
				categorynames : source.getText()
			}
		}
	}

	if (!url) {
		eputil.alert("未知的选择树！");
		return;
	}

	epoint.openTopDialog("选择", url, function(rtn) {
		if (!rtn) {
			return;
		}

		if (rtn != "close") {
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

		examUtil.homeworkCategoryTreeSelectCall(rtn);
	}, param);
};

examUtil.courseCategoryTreeSelectCall = function(data) {

};
/**
 * 分发布局
 */
examUtil.renderDistributeGrid = function(users, totalCount, $page, pageIndex, clickCall, deleteCall) {
	var $grid = $("#datagrid");
	$grid.empty();
	$(".userCount").html(0);

	if (!users) {
		return;
	}

	var pageSize = examUtil.config.distributeGridPageSize;
	if ($page) {
		try {
			$page.pagination("destroy");
		} catch (e) {

		}

		$page.pagination({
			pageIndex : pageIndex,
			pageSize : pageSize,
			total : totalCount
		});
		$page.on("pageClicked", function(e, data) {
			clickCall(data.pageIndex);
		});
	}

	$(".userCount").html(totalCount);

	var html = "";
	for (var i = 0, length = users.length; i < length; i++) {
		var user = users[i];

		var imageId = "examerImage" + i;

		html += '<div class="item-inner" data-guid="' + (user.userguid || "") + '">';
		html += '<img class="item-image" id="' + imageId + '"></img>';
		html += '<div class="item-text">';
		html += '<font class="username" title="' + (user.username || "") + '">' + (user.username || "") + '</font>';
		html += '<a class="delete" href="javascript:void(0)" color="red">撤回</a>';
		html += '<p class="userouname" title="' + (user.ouname || "") + '">' + (user.ouname || "") + '</p>';

		// 课程相关的
		if (user.studiedcount != null && user.studiedcount != undefined) {
			html += "<p>已学习课程：" + (user.studiedcount || 0) + "门</p>";
			html += "<p>" + (user.isfinish == "1" ? "已完成" : "未完成") + "</p>";
		}

		html += '</div>';
		html += '</div>';
	}

	$grid.html(html);

	$(".item-inner>.item-text>a").on("click", function() {
		var $this = $(this);

		var $inner = $this.closest(".item-inner");

		if (deleteCall) {
			deleteCall($inner.data("guid"), $inner.find(".item-text>font").text());
		}
	})

	// 加载照片
	$(".item-inner").each(function() {
		var $this = $(this);

		var $inner = $this.closest(".item-inner");

		examUtil.loadUserPhoto($inner.children(".item-image").prop("id"), $inner.data("guid"));
	})
};

examUtil.loadUserPhoto = function(imgId, userGuid) {
	if (!imgId) {
		return;
	}

	var $img = $("#" + imgId);
	if ($img.length == 0) {
		return;
	}

	var defaultPhoto = _rootPath + "/frame/fui/css/images/default-profile.png";

	if (userGuid) {
		var src = _rootPath + "/rest/examattachaction/getFrameUserPhotoContent?isCommondto=true&userGuid=" + userGuid;
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
};

/**
 * 上报错题
 * 
 * @param {}
 *            paperInsSubjectGuid
 */
examUtil.openExamSubjectDissentWorkflow = function(paperInsGuid, paperInsSubjectGuid) {
	epoint.execute("exampaperinsexerciseansweraction.hasUnCheckedReport", "@none", [paperInsSubjectGuid], function(result) {
		if (!result.msg) {
			eputil.alert(result.msg);
			return;
		}

		epoint.execute("examworkflowprocessmanageaction.getProcessGuid", "@none", ["subjectDissent"], function(result) {
			if (!result.processGuid) {
				eputil.alert("未配置上报流程，无法上报错题！");
				return;
			}

			epoint.openTopDialog("上报错题", "frame/pages/epointworkflow/client/processcreateinstance?ProcessGuid=" + result.processGuid + "&paperInsSubjectGuid=" + paperInsSubjectGuid + "&paperInsGuid="
					+ paperInsGuid, eputil.dialogCallback, {
				width : eputil.dialogWidthSmall,
				height : 500
			});
		});
	});

};

/**
 * 收藏相关题目
 */
examUtil.favorExamSubject = function(paperInsGuid, paperInsSubjectGuid, examGuid, source) {
	epoint.openTopDialog("选择收藏分类", 'exam/tree/examsubjectfavoritescategorytreesingle', function(rtn) {
		if (rtn && rtn != "close") {
			epoint.execute('examsubjectfavoritesaddaction.favor', '@none', [paperInsGuid, paperInsSubjectGuid, rtn.id], function(result) {
				eputil.alert(result.msg, "收藏");

				examUtil.favorExamSubjectCall(result.msg, "1", source);
			});
		}
	}, {
		width : 350,
		height : 500
	});
};

/**
 * 取消收藏题目
 * 
 * @param {}
 *            paperInsSubjectGuid
 */
examUtil.cancelFavorExamSubject = function(paperInsSubjectGuid, examGuid, source) {
	epoint.execute('examsubjectfavoritesaddaction.cancelByPaperInsSubjectGuid', '@none', [paperInsSubjectGuid], function(result) {
		eputil.alert(result.msg, "取消");

		examUtil.favorExamSubjectCall(result.msg, "0", source);
	});
};

examUtil.favorExamSubjectCall = function(msg, operateType, source) {

}

examUtil.escape2Html = function(str) {
	if (!str) {
		return "";
	}

	var arrEntities = {
		'lt' : '<',
		'gt' : '>',
		'nbsp' : ' ',
		'amp' : '&',
		'quot' : '"'
	};

	return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function(all, t) {
		return arrEntities[t];
	});
}

examUtil.onSubjectNameRenderer = function(e) {
	var name = e.row[e.field];

	return examUtil.escape2Html(name);
};

examUtil.openExamPaperInsSubjectFront = function(paperInsSubjectGuid, paperInsGuid) {
	var url = "exam/front/paper/subject/exampaperinssubjectfrontdetail?paperInsSubjectGuid=" + (paperInsSubjectGuid || "") + "&paperInsGuid=" + (paperInsGuid || "");
	epoint.openTopDialog('课程详情', url, eputil.dialogCallback, {
		width : 1100,
		height : 600
	});
};

/**
 * 验证客户端地图
 */
examUtil.validateClientDate = function() {
	// 未同步服务器时间，不做验证
	// if (!eputil._systemTimepstamp) {
	// return true;
	// }
	//
	// var direction = "";
	// var difference = eputil._systemTimepstamp - new Date().getTime();
	//
	// if (Math.abs(difference) > 120000) {
	// eputil.alert("你比服务器" + (difference > 0 ? "慢" : "快") + parseInt(Math.abs(difference) / 1000) + "秒，请校对本机时间！");
	// return false;
	// }
	//
	// return true;
};

/**
 * 插入填空填充值
 */
examUtil.insertFillHolder = function(parentNode) {
	var holder = "&nbsp;<span class='subject-fill-holder'>" + 1 + "</span>&nbsp;";

	examUtil.insertHtmlAtCaret(parentNode, holder);
};

examUtil.insertHtmlAtCaret = function(parentNode, html) {
	if (window.getSelection) {
		// IE9 and non-IE
		var selection = window.getSelection();

		if (selection.getRangeAt && selection.rangeCount) {
			var range = selection.getRangeAt(0);
			range.deleteContents();
			// Range.createContextualFragment() would be useful here but is
			// non-standard and not supported in all browsers (IE9, for one)
			var el = document.createElement("div");
			el.innerHTML = html;
			var frag = document.createDocumentFragment(), node, lastNode;
			while ((node = el.firstChild)) {
				lastNode = frag.appendChild(node);
			}
			range.insertNode(frag);
			// Preserve the selection
			if (lastNode) {
				range = range.cloneRange();
				range.setStartAfter(lastNode);
				range.collapse(true);
				selection.removeAllRanges();
				selection.addRange(range);
			}
		}
	} else if (document.selection && document.selection.type != "Control") {
		eputil.alert("你的浏览器不支持此操作，请选择高版本浏览器！");
		// IE < 9
		// document.selection.createRange().pasteHTML(html);
	}
};

// 获取每题答案得分，来确认每题答案是否正确
examUtil.getScoreOfAnswer = function(subject) {
	var answers = subject.answers;
	var options = subject.options;
	var type = subject.type;
	// 简答、阅读理解、纠错，
	if (examUtil.constant.EXAM_SUBJECT_TYPE_SUBJECTIVE == type || examUtil.constant.EXAM_SUBJECT_TYPE_CORRECTION == type) {
		return 0;
	}
	if (!answers || answers.length <= 0) {
		return 0;
	}
	// 匹配题
	if (examUtil.constant.EXAM_SUBJECT_TYPE_MATCHING == type) {
		var match = true;
		for (var i = 0, optionLength = options.length; i < optionLength; i++) {
			if (options[i].paperinssubjectguid == subject.rowguid) {
				continue;
			}
			for (var j = 0, answersLength = answers.length; j < answersLength; j++) {
				if (answers[j].optionguid != options[i].rowguid) {
					continue;
				}
				if (options[i].iscorrect != answers[j].content) {
					match = false;
					break;
				}
			}
		}
		if (match) {
			return subject.score;
		}
	} else {
		// 单选、多选、
		var correctCount = 0;
		var answerCorrectCount = 0;

		for (var i = 0, optionLength = options.length; i < optionLength; i++) {
			if (options[i].paperinssubjectguid != subject.rowguid) {
				continue;
			}

			if ("1" == options[i].iscorrect) {
				correctCount++;

				for (var j = 0, answerLength = answers.length; j < answerLength; j++) {
					if (options[i].rowguid == answers[j].content) {
						answerCorrectCount++;
					}
				}
			}

		}
		// 正确答案的数量
		if (correctCount == answerCorrectCount && answers.length == answerCorrectCount) {
			return subject.score;
		}
	}
	return 0;
};

/**
 * 表格的选择布局器
 * 
 */
examUtil.gridSelector = {
	selecteds : [],
	grid : null,
	gridId : null,
	newgrid : null,
	newgridId : null,
	rowKey : null,
	bindGrid : function(gridId, newgridId, rowKey, callBack) {

		var _this = this;
		// 初始化属性
		if (typeof gridId == 'string') {
			_this.grid = mini.get(gridId);
		} else {
			_this.grid = gridId;
		}
		// 初始化新表格属性
		if (typeof newgridId == 'string') {
			_this.newgrid = mini.get(newgridId);
		} else {
			_this.newgrid = newgridId;
		}
		_this.newgridId = newgridId
		_this.gridId = gridId;

		_this.rowKey = rowKey;

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
		_this.grid.setAllowUnselect(true);
		_this.grid.setMultiSelect(true);
		_this.grid.setOnlyCheckSelection(false);

		// 行选中事件
		_this.grid.on('select', function(e) {
			_this.addSelectByRow(e.record);
			callBack();

		});
		// 行取消选中
		_this.grid.on('deselect', function(e) {
			_this.removeSelectByRow(e.record);
		});

		// 表格翻页 搜索时触发
		_this.grid.on('load', function() {
			_this.grid.on("update", function() {
				_this.refreshTableSelecteds();
			});
		});

	},
	// 重置选择
	recover : function() {
		var _this = this;
		_this.grid.clearSelect(true);
		var rows = _this.grid.data;
		$(".selector-nodes").clear();
		_this.initSelecteds(_this.selecteds);
		_this.refreshTableSelecteds();
	},
	// 表格刷新按照右边列表选中行记录
	refreshTableSelecteds : function() {
		var _this = this;
		var selecteds = _this.getSelecteds();
		var rows = _this.grid.data;
		for (var i = 0; i < rows.length; i++) {
			for (var j = 0; j < selecteds.length; j++) {
				if (selecteds[j][_this.rowKey] == rows[i][_this.rowKey]) {
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
			_this.refreshTableSelecteds();
		}

	},
	removeSelectByRow : function(row) {
		var _this = this;
		var selecteds = _this.getSelecteds();
		for (var i = 0; i < selecteds.length; i++) {
			if (selecteds[i][_this.rowKey] == row[_this.rowKey]) {
				_this.newgrid.removeRow(selecteds[i])
				return;
			}
		}
	},
	addSelectByRow : function(row) {
		var _this = this;
		var selecteds = _this.getSelecteds();
		for (var i = 0; i < selecteds.length; i++) {
			if (selecteds[i][_this.rowKey] == row[_this.rowKey]) {
				return;
			}
		}
		var newRow = {};
		for (var i in row) {
			newRow[i] = row[i];
			if (i == '_id' || i == "_uid") {
				newRow[i] = selecteds.length;
			}
		}
		_this.newgrid.addRow(newRow);
	},
	getSelecteds : function() {
		var _this = this;
		var result = [];
		var rows = mini.get(_this.newgridId).getList();
		return rows;
	}
};

/**
 * 写入LocalStorage
 * 
 * @param {}
 *            key
 * @param {}
 *            value
 * @param {}
 *            expiresTime 失效时间（分钟）
 */
examUtil.writeLocalStorage = function(key, data, expiresTime) {
	var option = {
		value : data
	}

	var expiresTimestamp = new Date().getTime();
	if (expiresTime) {
		expiresTimestamp += expiresTime * 60 * 1000;
	} else {
		// 未设置失效时间，默认最多30天
		expiresTimestamp += 30 * 24 * 60 * 60 * 1000;
	}
	option.expiresTimestamp = expiresTimestamp;

	// 以options.name为key，options为值放进去
	localStorage.setItem(key, JSON.stringify(option));
};

/**
 * 读取cookie
 * 
 * @param {string}
 *            key cookie 名称
 * @returns 读取到的cookie值
 */
examUtil.readLocalStorage = function(key) {
	var item = localStorage.getItem(key);
	if (!item) {
		return false;
	}
	// 先将拿到的试着进行json转为对象的形式
	try {
		item = JSON.parse(item);
	} catch (error) {
		// 如果不行就不是json的字符串，就直接返回
		item = item;
	}
	// 如果有startTime的值，说明设置了失效时间
	if (item.expiresTimestamp) {
		// 何时将值取出减去刚存入的时间，与item.expires比较，如果大于就是过期了，如果小于或等于就还没过期
		if (new Date().getTime() > item.expiresTimestamp) {
			// 缓存过期，清除缓存，返回false
			localStorage.removeItem(key);
			return null;
		} else {
			// 缓存未过期，返回值
			return item.value;
		}
	} else {
		// 如果没有设置失效时间，直接返回值
		return item;
	}
};

/**
 * 移除一个cookie
 * 
 * @param {string}
 *            key cookie名称
 * @param {object}
 *            options cookie配置
 * @returns
 */
examUtil.removeLocalStorage = function(key) {
	localStorage.removeItem(key);
};

/**
 * 渲染
 * 
 * @param {}
 *            $root
 */
examUtil.renderPaperHeader = function(title, items, subjectTypes) {
	var $root = $(".paper-header");
	$root.empty();

	var $headerInfo = $("<div class='header-info'></div>");
	$root.append($headerInfo);

	var $h1 = $("<h1>" + (title || "") + "</h1>");
	$headerInfo.append($h1);

	if (items) {
		var $headerItems = $("<div class='header-items clearfix'></div>");
		$root.append($headerItems);

		var html = "";
		for (var i = 0, length = items.length; i < length; i++) {
			var item = items[i];

			html += "<p class='paper-item'>" + (item.label ? item.label + "：" : "") + "<span>" + (item.value || "") + "</span>" + (item.unit || "") + "</p>";
		}

		$headerItems.append(html);
	}

	if (subjectTypes) {
		var $headerSubjects = $("<div class='header-subjects clearfix'></div>");
		$root.append($headerSubjects);

		var html = "";
		for (var i = 0, length = subjectTypes.length; i < length; i++) {
			var subjectType = subjectTypes[i];

			html += "<p class='paper-item'>" + subjectType.label + "数：<span data-name='subject" + subjectType.value + "num'>" + (subjectType.value || 0) + "</span><span>题</span></p>";
		}

		$headerSubjects.append(html);
	}
};

//数字控件范围限制
examUtil.initNumSection  = function(smallNumId, bigNumId) {
	var smallNum = mini.get(smallNumId);
	var bigNum = mini.get(bigNumId);

	if (!smallNum || !bigNum) {
		return;
	}


	// 不符合的清空
	smallNum.on("valuechanged", function(e) {
		if (bigNum.getValue() && e.value > bigNum.getValue()) {
			epoint.showTips("最少数量不能大于最多数量！");
			e.source.setValue(null);
		}
	});

	bigNum.on("valuechanged", function(e) {
		if (smallNum.getValue() && e.value < smallNum.getValue()) {
			epoint.showTips("最多数量不能小于最少数量！");
			e.source.setValue(null);
		}
	});
};
