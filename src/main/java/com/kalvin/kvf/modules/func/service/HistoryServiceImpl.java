package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import com.kalvin.kvf.modules.func.entity.History;
import com.kalvin.kvf.modules.func.mapper.HistoryMapper;

import java.util.List;

/**
 * <p>
 * 履历表 服务实现类
 * </p>
 * @since 2023-01-05 15:09:29
 */
@Service
public class HistoryServiceImpl extends ServiceImpl<HistoryMapper, History> implements HistoryService {

    @Override
    public Page<History> listHistoryPage(History history) {
        Page<History> page = new Page<>(history.getCurrent(), history.getSize());
        List<History> historys = baseMapper.selectHistoryList(history, page);
        return page.setRecords(historys);
    }

}
