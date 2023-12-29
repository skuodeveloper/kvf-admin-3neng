package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import com.kalvin.kvf.modules.func.entity.FufenRecord;
import com.kalvin.kvf.modules.func.mapper.FufenRecordMapper;

import java.util.List;

/**
 * <p>
 * 民警赋分记录表 服务实现类
 * </p>
 * @since 2022-05-13 15:14:18
 */
@Service
public class FufenRecordServiceImpl extends ServiceImpl<FufenRecordMapper, FufenRecord> implements FufenRecordService {

    @Override
    public Page<FufenRecord> listFufenRecordPage(FufenRecord fufenRecord) {
        Page<FufenRecord> page = new Page<>(fufenRecord.getCurrent(), fufenRecord.getSize());
        List<FufenRecord> fufenRecords = baseMapper.selectFufenRecordList(fufenRecord, page);
        return page.setRecords(fufenRecords);
    }

}
