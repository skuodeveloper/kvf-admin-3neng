package com.kalvin.kvf.modules.func.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.kalvin.kvf.modules.func.entity.PoliceInfo;

import java.util.List;

/**
 * <p>
 * 民警基础信息表 Mapper 接口
 * </p>
 * @since 2023-01-04 14:46:27
 */
public interface PoliceInfoMapper extends BaseMapper<PoliceInfo> {

    /**
     * 查询列表(分页)
     * @param policeInfo 查询参数
     * @param page 分页参数
     * @return list
     */
    List<PoliceInfo> selectPoliceInfoList(PoliceInfo policeInfo, IPage page);

}
