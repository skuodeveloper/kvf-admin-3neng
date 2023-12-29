package com.kalvin.kvf.modules.func.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.kalvin.kvf.modules.func.entity.Zhibiao;

import java.util.List;

/**
 * <p>
 * 指标 Mapper 接口
 * </p>
 * @since 2022-05-12 14:11:31
 */
public interface ZhibiaoMapper extends BaseMapper<Zhibiao> {

    /**
     * 查询列表(分页)
     * @param zhibiao 查询参数
     * @param page 分页参数
     * @return list
     */
    List<Zhibiao> selectZhibiaoList(Zhibiao zhibiao, IPage page);

}
