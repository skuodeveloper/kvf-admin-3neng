package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.kalvin.kvf.modules.func.entity.Police;

/**
 * <p>
 * 民警表 服务类
 * </p>
 * @since 2022-05-11 15:25:56
 */
public interface PoliceService extends IService<Police> {

    /**
     * 获取列表。分页
     * @param police 查询参数
     * @return page
     */
    Page<Police> listPolicePage(Police police);

}
