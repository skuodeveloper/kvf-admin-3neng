package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.kalvin.kvf.modules.func.entity.Promotion;

/**
 * <p>
 * 报名管理表 服务类
 * </p>
 * @since 2023-02-02 11:02:18
 */
public interface PromotionService extends IService<Promotion> {

    /**
     * 获取列表。分页
     * @param promotion 查询参数
     * @return page
     */
    Page<Promotion> listPromotionPage(Promotion promotion);

}
