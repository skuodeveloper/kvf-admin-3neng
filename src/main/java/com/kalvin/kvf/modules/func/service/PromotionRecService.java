package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.kalvin.kvf.modules.func.entity.PromotionRec;

/**
 * <p>
 * 报名记录表 服务类
 * </p>
 * @since 2023-02-02 11:05:59
 */
public interface PromotionRecService extends IService<PromotionRec> {

    /**
     * 获取列表。分页
     * @param promotionRec 查询参数
     * @return page
     */
    Page<PromotionRec> listPromotionRecPage(PromotionRec promotionRec);

}
