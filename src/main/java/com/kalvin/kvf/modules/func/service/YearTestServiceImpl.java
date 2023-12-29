package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import com.kalvin.kvf.modules.func.entity.YearTest;
import com.kalvin.kvf.modules.func.mapper.YearTestMapper;

import java.util.List;

/**
 * <p>
 * 年度考核表 服务实现类
 * </p>
 * @since 2023-01-13 15:52:38
 */
@Service
public class YearTestServiceImpl extends ServiceImpl<YearTestMapper, YearTest> implements YearTestService {

    @Override
    public Page<YearTest> listYearTestPage(YearTest yearTest) {
        Page<YearTest> page = new Page<>(yearTest.getCurrent(), yearTest.getSize());
        List<YearTest> yearTests = baseMapper.selectYearTestList(yearTest, page);
        return page.setRecords(yearTests);
    }

}
