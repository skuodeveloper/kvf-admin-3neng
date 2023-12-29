package com.kalvin.kvf.modules.func.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.kalvin.kvf.modules.func.entity.YearTest;

import java.util.List;

/**
 * <p>
 * 年度考核表 Mapper 接口
 * </p>
 * @since 2023-01-13 15:52:38
 */
public interface YearTestMapper extends BaseMapper<YearTest> {

    /**
     * 查询列表(分页)
     * @param yearTest 查询参数
     * @param page 分页参数
     * @return list
     */
    List<YearTest> selectYearTestList(YearTest yearTest, IPage page);

}
