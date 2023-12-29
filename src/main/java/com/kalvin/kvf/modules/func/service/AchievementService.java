package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.kalvin.kvf.modules.func.entity.Achievement;

/**
 * <p>
 * 业绩表 服务类
 * </p>
 * @since 2023-01-10 10:24:47
 */
public interface AchievementService extends IService<Achievement> {

    /**
     * 获取列表。分页
     * @param achievement 查询参数
     * @return page
     */
    Page<Achievement> listAchievementPage(Achievement achievement);

}
