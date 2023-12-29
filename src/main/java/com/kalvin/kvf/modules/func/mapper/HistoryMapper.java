package com.kalvin.kvf.modules.func.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.kalvin.kvf.modules.func.entity.History;

import java.util.List;

/**
 * <p>
 * 履历表 Mapper 接口
 * </p>
 * @since 2023-01-05 15:09:29
 */
public interface HistoryMapper extends BaseMapper<History> {

    /**
     * 查询列表(分页)
     * @param history 查询参数
     * @param page 分页参数
     * @return list
     */
    List<History> selectHistoryList(History history, IPage page);

}
