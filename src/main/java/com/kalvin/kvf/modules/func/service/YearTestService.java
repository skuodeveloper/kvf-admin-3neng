package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.kalvin.kvf.modules.func.entity.YearTest;

/**
 * <p>
 * 年度考核表 服务类
 * </p>
 * @since 2023-01-13 15:52:38
 */
public interface YearTestService extends IService<YearTest> {

    /**
     * 获取列表。分页
     * @param yearTest 查询参数
     * @return page
     */
    Page<YearTest> listYearTestPage(YearTest yearTest);

}
