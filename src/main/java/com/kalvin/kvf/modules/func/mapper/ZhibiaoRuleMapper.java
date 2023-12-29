package com.kalvin.kvf.modules.func.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.kalvin.kvf.modules.func.entity.ZhibiaoRule;

import java.util.List;

/**
 * <p>
 * 赋分规则 Mapper 接口
 * </p>
 * @since 2022-05-12 14:12:22
 */
public interface ZhibiaoRuleMapper extends BaseMapper<ZhibiaoRule> {

    /**
     * 查询列表(分页)
     * @param zhibiaoRule 查询参数
     * @param page 分页参数
     * @return list
     */
    List<ZhibiaoRule> selectZhibiaoRuleList(ZhibiaoRule zhibiaoRule, IPage page);

}
