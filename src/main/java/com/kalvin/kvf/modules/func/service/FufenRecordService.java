package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.kalvin.kvf.modules.func.entity.FufenRecord;

/**
 * <p>
 * 民警赋分记录表 服务类
 * </p>
 * @since 2022-05-13 15:14:18
 */
public interface FufenRecordService extends IService<FufenRecord> {

    /**
     * 获取列表。分页
     * @param fufenRecord 查询参数
     * @return page
     */
    Page<FufenRecord> listFufenRecordPage(FufenRecord fufenRecord);

}
