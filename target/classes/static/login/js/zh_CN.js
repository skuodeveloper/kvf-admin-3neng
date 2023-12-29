(function() {
    // 深冻结函数.
    function deepFreeze(obj) {
        // 取回定义在obj上的属性名
        var propNames = Object.getOwnPropertyNames(obj);

        // 在冻结自身之前冻结属性
        propNames.forEach(function(name) {
            var prop = obj[name];

            // 如果prop是个对象，冻结它
            if (typeof prop == 'object' && prop !== null) deepFreeze(prop);
        });

        // 冻结自身(no-op if already frozen)
        return Object.freeze(obj);
    }

    window.epoint_local = deepFreeze({
        locale: 'zh_CN',
        epoint: '国泰新点软件股份有限公司',
        search_text: '搜索',
        search_title: '展开更多条件',
        reset_text: '重置',
        close_text: '关闭',
        selected_text: '已选条件',
        upload_text: '上传',
        delete_text: '删除',
        more_text: '更多',
        retry_text: '重试',
        preview_text: '预览',
        edit_text: '编辑',
        remove_text: '移除',
        error_tip: '错误提示',
        warning_tip: '警告提示',
        validate_failed: '验证失败',
        default_error_message: '有字段验证未通过，请再检查一下！',
        empty_beginning_text: '请输入',
        no_longer_tips: '不再提示',
        back_to_top_text: '返回顶部',
        remove_all_text: '移除全部',
        helper_text: '帮助提醒',
        ajax_error_text: '请求出现异常，请联系管理员',
        detail_text: '详情',
        service_error_text: '服务不可用',
        success_text: '成功',
        failed_text: '失败',
        operate_text: '操作',
        click_to_sort_text: '点击排序',
        click_to_filter_text: '点击过滤',
        all_text: '全部',
        save_text: '保存',
        order_text: '序',
        select_text: '选择',
        loadingMsg: '数据加载中，请稍后...',
        dateInfo: {
            monthsLong: [
                '一月',
                '二月',
                '三月',
                '四月',
                '五月',
                '六月',
                '七月',
                '八月',
                '九月',
                '十月',
                '十一月',
                '十二月'
            ],
            monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            daysLong: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            daysShort: ['日', '一', '二', '三', '四', '五', '六'],
            quarterLong: ['一季度', '二季度', '三季度', '四季度'],
            quarterShort: ['Q1', 'Q2', 'Q2', 'Q4'],
            halfYearLong: ['上半年', '下半年'],
            patterns: {
                d: 'yyyy-M-d',
                D: 'yyyy年M月d日',
                f: 'yyyy年M月d日 H:mm',
                F: 'yyyy年M月d日 H:mm:ss',
                g: 'yyyy-M-d H:mm',
                G: 'yyyy-M-d H:mm:ss',
                m: 'MMMd日',
                o: 'yyyy-MM-ddTHH:mm:ss.fff',
                s: 'yyyy-MM-ddTHH:mm:ss',
                t: 'H:mm',
                T: 'H:mm:ss',
                U: 'yyyy年M月d日 HH:mm:ss',
                y: 'yyyy年MM月'
            },
            tt: {
                AM: '上午',
                PM: '下午'
            },
            ten: {
                Early: '上旬',
                Mid: '中旬',
                Late: '下旬'
            },
            today: '今天',
            clockType: 24
        },
        culture: {
            name: 'zh-CN',
            numberFormat: {
                number: {
                    pattern: ['n', '-n'],
                    decimals: 2,
                    decimalsSeparator: '.',
                    groupSeparator: ',',
                    groupSize: [3]
                },
                percent: {
                    pattern: ['n%', '-n%'],
                    decimals: 2,
                    decimalsSeparator: '.',
                    groupSeparator: ',',
                    groupSize: [3],
                    symbol: '%'
                },
                currency: {
                    pattern: ['$n', '$-n'],
                    decimals: 2,
                    decimalsSeparator: '.',
                    groupSeparator: ',',
                    groupSize: [3],
                    symbol: '¥'
                }
            }
        },
        VTypes: {
            minDateErrorText: '不能小于日期 {0}',
            maxDateErrorText: '不能大于日期 {0}',

            uniqueErrorText: '字段不能重复',
            requiredErrorText: '不能为空',
            emailErrorText: '请输入邮件格式',
            urlErrorText: '请输入URL格式',
            floatErrorText: '请输入数字',
            intErrorText: '请输入整数',
            dateErrorText: '请输入日期格式 {0}',
            maxLengthErrorText: '不能超过 {0} 个字符',
            minLengthErrorText: '不能少于 {0} 个字符',
            maxErrorText: '数字不能大于 {0} ',
            minErrorText: '数字不能小于 {0} ',
            rangeLengthErrorText: '字符长度必须在 {0} 到 {1} 之间',
            rangeCharErrorText: '字符数必须在 {0} 到 {1} 之间',
            rangeErrorText: '数字必须在 {0} 到 {1} 之间',

            mobileErrorText: '输入的手机号码格式不正确',
            telErrorText: '输入的固定电话号码格式不正确',
            phoneErrorText: '输入的电话号码格式不正确',
            phoneWithShortNumErrorText: '输入的电话号码格式不正确',
            postCodeErrorText: '输入的邮政编码格式不正确',
            orgCodeErrorText: '输入的统一社会信用代码格式不正确',
            creditCodeErrorText: '输入的统一社会信用代码格式不正确',
            idCardErrorText: '输入的身份证号码格式不正确，若最后一位为“X”则只允许输入大写的“X”',
            decimalLengthErrorText: '请输入数字，且最多只能输入{0}位小数',
            projectCodeErrorText: '输入的投资项目统一代码格式不正确'
        },
        Notice: {
            buttonText: {
                ok: '确定',
                cancel: '取消',
                yes: '是',
                no: '否'
            }
        },
        WebUploaderUI: {
            uploadErrorText: '上传出错!',
            cantPreviewAlert: '此文件不能预览！',
            filePreviewTitle: '文件预览',
            cantEditAlert: '文件还未上传，不能编辑！',
            fileEditTitle: '文件编辑'
        },
        MessageBox: {
            alertTitle: '提醒',
            confirmTitle: '确认',
            deleteConfirmTitle: '删除确认',
            deleteConfirmTpl: '删除后不可恢复，请输入%s确认',
            confirmErrorText: '输入内容不匹配',
            prompTitle: '输入',
            prompMessage: '请输入内容：',
            buttonText: {
                ok: '确定', //'OK',
                cancel: '取消', //'Cancel',
                yes: '是', //'Yes',
                no: '否', //'No'
                confirmDelete: '确定删除'
            }
        },
        ValidatorBase: {
            requiredErrorText: '不能为空'
        },
        Calendar: {
            firstDayOfWeek: 0,
            yesterdayText: '昨天',
            todayText: '今天',
            clearText: '清除',
            okText: '确定',
            cancelText: '取消',
            daysShort: ['日', '一', '二', '三', '四', '五', '六'],
            format: 'yyyy年MM月',

            timeFormat: 'H:mm'
        },
        Pager: {
            firstText: '首页',
            prevText: '上一页',
            nextText: '下一页',
            lastText: '尾页',
            reloadText: '刷新',
            pageInfoText: '每页 {0} 条, 共 {1} 条'
        },
        Pagination: {
            pageInfoText: '共{0}条',
            jumpText: '跳至<input class="pagination-number"  value="{0}"/>页',
            sizeText: '条/页'
        },
        DataGrid: {
            emptyText: '没有数据',
            notSelectedTip: '请选择一条记录！',
            confirmDeleteTip: '确定删除选中记录？',
            confirmTitle: '系统提示',
            waitingText: '操作中，请稍后......',
            deleteSuccessfulText: '删除成功',
            deleteFailedText: '删除失败'
        },
        WebUploader: {
            pickerText: '选择文件',
            startText: '开始上传',
            pauseText: '暂停上传',
            batchDownloadText: '下载全部',
            numLimitErrorText: '选择的文件过多！</br>最多可上传{0}个文件',
            sizeLimitErrorText: '选择的文件过大！</br>最多可上传{0}KB文件',
            typeDeniedErrorText: '选择的文件类型错误！</br>可上传的文件类型为：{0}',
            sizeErrorText: '选择的文件过大！</br>可上传的单文件最大为{0}KB',
            emptyFileErrorText: '不能上传空文件！',
            duplicateErrorText: '不能上传重复的文件！',
            uploadErrorText: '上传失败！请重新上传！',
            secrecyLevelSaveErrorText: '保密等级保存失败！请重试',
            noflashInnerHTML:
                '<a class="noflash" title="要使用上传功能，请下载安装Falsh后，刷新页面" href="http://get.adobe.com/flashplayer/" target="_blank">初始化错误</a>',
            noflashPageWarning:
                '检测到您的系统未安装Flash，上传功能不可用。请<a href="http://get.adobe.com/flashplayer/" target="_blank">下载安装Falsh</a>后，刷新页面'
        },
        DataExport: {
            expandText: '导出',
            collapseText: '导出',
            exportText: '导 出',
            panelTitle: '导出列配置',
            leftListTitle: '待选列',
            rightListTitle: '已选列',
            tipInfo: '不填页码即导出当前页',
            fromText: '从页面导出',
            pageNumInfo: '页导出到第',
            pageText: '页',
            exportModelText: '导出为模板',
            selectExportText: '仅导出选中行',
            allExportText: '导出全部',
            curPageExportText: '导出当前页'
        },
        AutoComplete: {
            popupEmptyText: '无搜索结果',
            loadingText: '加载中...',
            errorText: '错误'
        },
        HtmlFile: {
            buttonText: '浏览...',
            limitTypeErrorText: '上传文件格式为:'
        },
        CatalogImport: {
            pickerText: '导入文件',
            deleteText: '删除',
            uploadingText: '正在上传',
            validateText: '校验结果',
            resultTpl: '总计：{{0}}条，成功：{{1}}，失败：{{2}}条。',
            expandText: '展开详情',
            importResultText: '导入结果',
            importErrorText: '数据导入失败，请重试！',
            importSuccessText: '导入已完成',
            exportText: '校验结果导出'
        },
        Cropper: {
            title: '裁剪',
            imageSizeText: '图片尺寸',
            selectImgText: '选择图片',
            onlinePhotoText: '在线拍照',
            previewText: '预览',
            reselectText: '重新选择',
            finishText: '完成',
            cancelText: '取消',
            validateText: '请选择有效的图片文件',
            imageSizeAlertText: '图片不能超过 ',
            noImageAlert: '请选择图片或在线拍照'
        },
        DataImport: {
            pickerText: '导入文件',
            expandText: '展开详情',
            collapseText: '收起详情',
            continueImportTip: '上次导入中断，修改完后继续导入',
            continueText: '继续导入',
            retryText: '重新导入',
            retryTip: '重新尝试导入这个文件',
            viewDetailText: '查看详情',
            validateText: '校验结果',
            resultTpl: '总计：{{0}}条，成功：{{1}}，失败：{{2}}条。',
            importResultText: '导入结果',
            importFailAlert: '数据导入失败，请重试！',
            importSuccessText: '导入已完成'
        },
        DistrictPicker: {
            emptyText: '请输入或选择地区',
            selectText: '请选择'
        },
        FilterTree: {
            emptyText: '请输入内容查询'
        },
        ImageUploader: {
            deleteAlert: '确定移除此图片？',
            deleteAlertTitle: '删除提醒',
            typeErrorAlert: '选择的文件类型错误',
            typeAcceptedText: '可上传的文件类型为',
            imageCountAlert: '你选择的图片文件过多，只能选择一个',
            imageNameLengthAlert: '选中的图片文件名不能超过{{0}}个字符',
            imageSizeAlert: '选中的图片文件过大，最大允许上传{{0}}KB的图片',
            imageMeasureAlert: '图片宽高校验失败，只允许上传{{0}}px *{{1}}px的图片',
            fileCountAlert: '您选择的文件过多，最多还能选择 {{0}} 个图片'
        },
        LargeFileUploader: {
            pickerText: '选择文件',
            startText: '开始上传',
            pauseText: '暂停上传',
            numLimitErrorText: '选择的文件过多！</br>最多可上传{0}个文件',
            sizeLimitErrorText: '选择的文件过大！</br>最多可上传{0}KB文件',
            typeDeniedErrorText: '选择的文件类型错误！</br>可上传的文件类型为：{0}',
            sizeErrorText: '选择的文件过大！</br>可上传的单文件最大为{0}KB',
            emptyFileErrorText: '不能上传空文件！',
            epointUserText: '国泰新点用户',
            ntkoLoadErrorText: '不能装载NTKO大文件上传控件',
            deleteFileConfirmText: '确定删除文件？',
            systemTipText: '系统提示',
            ntkoInitErrorTitle: '不能装载NTKO大文件上传控件。请确保使用IE浏览器，并检查浏览器的安全设置。',
            ntkoInitErrorText: '初始化错误',
            ntkoErrorCheckBrowserText: '不能装载NTKO大文件上传控件。请确保使用IE浏览器，并检查浏览器的安全设置',
            analyzingText: '正在分析文件',
            uploadedText: '已上传',
            uploadFailedText: '上传失败！请重新上传！',
            uploadErrorText: '上传出错！'
        },
        DateRangePicker: {
            footTipText: '注：点击某日期两次代表选择某一天',
            quickSelectText: {
                thisWeek: '本周',
                thisMonth: '本月',
                thisQuarter: '本季度',
                thisYear: '本年'
            }
        },
        MonthRangePicker: {
            footTipText: '注：点击某月份两次代表选择某一月',
            quickSelectText: {
                thisMonth: '本月',
                thisQuarter: '本季度',
                thisYear: '本年'
            }
        },
        QuarterPicker: {
            itemText: ['第1季度', '第2季度', '第3季度', '第4季度'],
            yearText: '年',
            clearText: '清除',
            okText: '确定'
        },
        QuarterRangePicker: {
            footTipText: '注：点击某季度两次代表选择某一季度'
        },
        TabsTreeSelect: {
            selectedPanelTitle: '已选人员',
            actionTitles: {
                sort: '一键排序',
                top: '置顶',
                bottom: '置底',
                remove: '删除',
                removeall: '删除全部',
                recover: '回到初始状态'
            },

            sortTitles: {
                none: '一键排序',
                asc: '正序',
                desc: '倒序'
            }
        },
        VerifyCode: {
            changeAnotherText: '看不清楚，换一个？'
        }
    });
})();
