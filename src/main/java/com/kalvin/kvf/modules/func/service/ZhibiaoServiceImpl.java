package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import com.kalvin.kvf.modules.func.entity.Zhibiao;
import com.kalvin.kvf.modules.func.mapper.ZhibiaoMapper;

import java.util.List;

/**
 * <p>
 * 指标 服务实现类
 * </p>
 * @since 2022-05-12 14:11:31
 */
@Service
public class ZhibiaoServiceImpl extends ServiceImpl<ZhibiaoMapper, Zhibiao> implements ZhibiaoService {

    @Override
    public Page<Zhibiao> listZhibiaoPage(Zhibiao zhibiao) {
        Page<Zhibiao> page = new Page<>(zhibiao.getCurrent(), zhibiao.getSize());
        List<Zhibiao> zhibiaos = baseMapper.selectZhibiaoList(zhibiao, page);
        return page.setRecords(zhibiaos);
    }

}
