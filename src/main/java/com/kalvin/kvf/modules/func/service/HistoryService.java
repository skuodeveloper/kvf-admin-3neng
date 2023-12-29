package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.kalvin.kvf.modules.func.entity.History;

/**
 * <p>
 * 履历表 服务类
 * </p>
 * @since 2023-01-05 15:09:29
 */
public interface HistoryService extends IService<History> {

    /**
     * 获取列表。分页
     * @param history 查询参数
     * @return page
     */
    Page<History> listHistoryPage(History history);

}
