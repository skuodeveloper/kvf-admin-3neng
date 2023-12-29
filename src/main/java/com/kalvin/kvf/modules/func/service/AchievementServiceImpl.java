package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;
import com.kalvin.kvf.modules.func.entity.Achievement;
import com.kalvin.kvf.modules.func.mapper.AchievementMapper;

import java.util.List;

/**
 * <p>
 * 业绩表 服务实现类
 * </p>
 * @since 2023-01-10 10:24:47
 */
@Service
public class AchievementServiceImpl extends ServiceImpl<AchievementMapper, Achievement> implements AchievementService {

    @Override
    public Page<Achievement> listAchievementPage(Achievement achievement) {
        Page<Achievement> page = new Page<>(achievement.getCurrent(), achievement.getSize());
        List<Achievement> achievements = baseMapper.selectAchievementList(achievement, page);
        return page.setRecords(achievements);
    }

}
