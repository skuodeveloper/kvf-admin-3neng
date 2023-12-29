package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.kalvin.kvf.modules.func.entity.Zhibiao;

/**
 * <p>
 * 指标 服务类
 * </p>
 * @since 2022-05-12 14:11:31
 */
public interface ZhibiaoService extends IService<Zhibiao> {

    /**
     * 获取列表。分页
     * @param zhibiao 查询参数
     * @return page
     */
    Page<Zhibiao> listZhibiaoPage(Zhibiao zhibiao);

}
