package com.kalvin.kvf.modules.func.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.kalvin.kvf.modules.func.entity.Promotion;

import java.util.List;

/**
 * <p>
 * 报名管理表 Mapper 接口
 * </p>
 * @since 2023-02-02 11:02:18
 */
public interface PromotionMapper extends BaseMapper<Promotion> {

    /**
     * 查询列表(分页)
     * @param promotion 查询参数
     * @param page 分页参数
     * @return list
     */
    List<Promotion> selectPromotionList(Promotion promotion, IPage page);

}
