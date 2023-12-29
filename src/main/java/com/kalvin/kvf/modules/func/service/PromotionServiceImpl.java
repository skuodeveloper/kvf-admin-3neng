package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import com.kalvin.kvf.modules.func.entity.Promotion;
import com.kalvin.kvf.modules.func.mapper.PromotionMapper;

import java.util.List;

/**
 * <p>
 * 报名管理表 服务实现类
 * </p>
 * @since 2023-02-02 11:02:18
 */
@Service
public class PromotionServiceImpl extends ServiceImpl<PromotionMapper, Promotion> implements PromotionService {

    @Override
    public Page<Promotion> listPromotionPage(Promotion promotion) {
        Page<Promotion> page = new Page<>(promotion.getCurrent(), promotion.getSize());
        List<Promotion> promotions = baseMapper.selectPromotionList(promotion, page);
        return page.setRecords(promotions);
    }

}
