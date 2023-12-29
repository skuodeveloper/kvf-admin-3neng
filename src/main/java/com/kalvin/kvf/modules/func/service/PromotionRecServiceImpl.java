package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import com.kalvin.kvf.modules.func.entity.PromotionRec;
import com.kalvin.kvf.modules.func.mapper.PromotionRecMapper;

import java.util.List;

/**
 * <p>
 * 报名记录表 服务实现类
 * </p>
 * @since 2023-02-02 11:05:59
 */
@Service
public class PromotionRecServiceImpl extends ServiceImpl<PromotionRecMapper, PromotionRec> implements PromotionRecService {

    @Override
    public Page<PromotionRec> listPromotionRecPage(PromotionRec promotionRec) {
        Page<PromotionRec> page = new Page<>(promotionRec.getCurrent(), promotionRec.getSize());
        List<PromotionRec> promotionRecs = baseMapper.selectPromotionRecList(promotionRec, page);
        return page.setRecords(promotionRecs);
    }

}
