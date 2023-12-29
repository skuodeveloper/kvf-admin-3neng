package com.kalvin.kvf.modules.func.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.kalvin.kvf.modules.func.entity.FufenRecord;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 * 民警赋分记录表 Mapper 接口
 * </p>
 * @since 2022-05-13 15:14:18
 */
public interface FufenRecordMapper extends BaseMapper<FufenRecord> {

    /**
     * 查询列表(分页)
     * @param fufenRecord 查询参数
     * @param page 分页参数
     * @return list
     */
    List<FufenRecord> selectFufenRecordList(FufenRecord fufenRecord, IPage page);

}
