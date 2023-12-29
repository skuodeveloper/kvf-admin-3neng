package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import com.kalvin.kvf.modules.func.entity.Police;
import com.kalvin.kvf.modules.func.mapper.PoliceMapper;

import java.util.List;

/**
 * <p>
 * 民警表 服务实现类
 * </p>
 * @since 2022-05-11 15:25:56
 */
@Service
public class PoliceServiceImpl extends ServiceImpl<PoliceMapper, Police> implements PoliceService {

    @Override
    public Page<Police> listPolicePage(Police police) {
        Page<Police> page = new Page<>(police.getCurrent(), police.getSize());
        List<Police> polices = baseMapper.selectPoliceList(police, page);
        return page.setRecords(polices);
    }

}
