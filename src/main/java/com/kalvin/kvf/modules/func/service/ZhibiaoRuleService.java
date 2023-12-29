package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.kalvin.kvf.modules.func.entity.ZhibiaoRule;

/**
 * <p>
 * 赋分规则 服务类
 * </p>
 * @since 2022-05-12 14:12:22
 */
public interface ZhibiaoRuleService extends IService<ZhibiaoRule> {

    /**
     * 获取列表。分页
     * @param zhibiaoRule 查询参数
     * @return page
     */
    Page<ZhibiaoRule> listZhibiaoRulePage(ZhibiaoRule zhibiaoRule);

}
