package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.kalvin.kvf.modules.func.entity.Punish;

/**
 * <p>
 * 惩戒表 服务类
 * </p>
 * @since 2023-01-13 13:59:20
 */
public interface PunishService extends IService<Punish> {

    /**
     * 获取列表。分页
     * @param punish 查询参数
     * @return page
     */
    Page<Punish> listPunishPage(Punish punish);

}
