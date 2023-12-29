package com.kalvin.kvf.modules.func.vo;

import com.diboot.core.binding.annotation.BindEntity;
import com.kalvin.kvf.modules.func.entity.Promotion;
import com.kalvin.kvf.modules.func.entity.PromotionRec;

public class PromotionVo extends Promotion {
    @BindEntity(entity = PromotionRec.class, condition = "this.id=pid")
    private PromotionRec promotionRec;
}
