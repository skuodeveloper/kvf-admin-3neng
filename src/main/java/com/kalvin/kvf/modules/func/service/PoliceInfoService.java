package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.kalvin.kvf.modules.func.entity.PoliceInfo;

/**
 * <p>
 * 民警基础信息表 服务类
 * </p>
 * @since 2023-01-04 14:46:27
 */
public interface PoliceInfoService extends IService<PoliceInfo> {

    /**
     * 获取列表。分页
     * @param policeInfo 查询参数
     * @return page
     */
    Page<PoliceInfo> listPoliceInfoPage(PoliceInfo policeInfo);

}
