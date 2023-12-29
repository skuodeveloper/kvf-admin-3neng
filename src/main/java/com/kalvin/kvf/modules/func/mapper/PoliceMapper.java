package com.kalvin.kvf.modules.func.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.kalvin.kvf.modules.func.entity.Police;

import java.util.List;

/**
 * <p>
 * 民警表 Mapper 接口
 * </p>
 * @since 2022-05-11 15:25:56
 */
public interface PoliceMapper extends BaseMapper<Police> {

    /**
     * 查询列表(分页)
     * @param police 查询参数
     * @param page 分页参数
     * @return list
     */
    List<Police> selectPoliceList(Police police, IPage page);

}
