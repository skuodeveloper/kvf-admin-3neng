package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import com.kalvin.kvf.modules.func.entity.Punish;
import com.kalvin.kvf.modules.func.mapper.PunishMapper;

import java.util.List;

/**
 * <p>
 * 惩戒表 服务实现类
 * </p>
 * @since 2023-01-13 13:59:20
 */
@Service
public class PunishServiceImpl extends ServiceImpl<PunishMapper, Punish> implements PunishService {

    @Override
    public Page<Punish> listPunishPage(Punish punish) {
        Page<Punish> page = new Page<>(punish.getCurrent(), punish.getSize());
        List<Punish> punishs = baseMapper.selectPunishList(punish, page);
        return page.setRecords(punishs);
    }

}
