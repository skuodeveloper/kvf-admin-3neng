package com.kalvin.kvf.modules.func.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.kalvin.kvf.modules.func.entity.Achievement;

import java.util.List;

/**
 * <p>
 * 业绩表 Mapper 接口
 * </p>
 * @since 2023-01-10 10:24:47
 */
public interface AchievementMapper extends BaseMapper<Achievement> {

    /**
     * 查询列表(分页)
     * @param achievement 查询参数
     * @param page 分页参数
     * @return list
     */
    List<Achievement> selectAchievementList(Achievement achievement, IPage page);

}
