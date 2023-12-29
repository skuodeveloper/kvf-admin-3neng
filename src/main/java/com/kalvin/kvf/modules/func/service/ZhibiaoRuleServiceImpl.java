package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import com.kalvin.kvf.modules.func.entity.ZhibiaoRule;
import com.kalvin.kvf.modules.func.mapper.ZhibiaoRuleMapper;

import java.util.List;

/**
 * <p>
 * 赋分规则 服务实现类
 * </p>
 * @since 2022-05-12 14:12:22
 */
@Service
public class ZhibiaoRuleServiceImpl extends ServiceImpl<ZhibiaoRuleMapper, ZhibiaoRule> implements ZhibiaoRuleService {

    @Override
    public Page<ZhibiaoRule> listZhibiaoRulePage(ZhibiaoRule zhibiaoRule) {
        Page<ZhibiaoRule> page = new Page<>(zhibiaoRule.getCurrent(), zhibiaoRule.getSize());
        List<ZhibiaoRule> zhibiaoRules = baseMapper.selectZhibiaoRuleList(zhibiaoRule, page);
        return page.setRecords(zhibiaoRules);
    }

}
