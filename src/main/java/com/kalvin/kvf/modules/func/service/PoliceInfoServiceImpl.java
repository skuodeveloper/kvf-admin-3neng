package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import com.kalvin.kvf.modules.func.entity.PoliceInfo;
import com.kalvin.kvf.modules.func.mapper.PoliceInfoMapper;

import java.util.List;

/**
 * <p>
 * 民警基础信息表 服务实现类
 * </p>
 * @since 2023-01-04 14:46:27
 */
@Service
public class PoliceInfoServiceImpl extends ServiceImpl<PoliceInfoMapper, PoliceInfo> implements PoliceInfoService {

    @Override
    public Page<PoliceInfo> listPoliceInfoPage(PoliceInfo policeInfo) {
        Page<PoliceInfo> page = new Page<>(policeInfo.getCurrent(), policeInfo.getSize());
        List<PoliceInfo> policeInfos = baseMapper.selectPoliceInfoList(policeInfo, page);
        return page.setRecords(policeInfos);
    }

}
