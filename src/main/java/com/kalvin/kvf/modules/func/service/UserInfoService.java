package com.kalvin.kvf.modules.func.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.kalvin.kvf.modules.func.entity.UserInfo;

/**
 * <p>
 *  服务类
 * </p>
 * @since 2023-02-14 10:54:14
 */
public interface UserInfoService extends IService<UserInfo> {

    /**
     * 获取列表。分页
     * @param userInfo 查询参数
     * @return page
     */
    Page<UserInfo> listUserInfoPage(UserInfo userInfo);

}
