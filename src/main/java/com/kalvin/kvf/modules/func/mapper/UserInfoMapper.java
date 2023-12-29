package com.kalvin.kvf.modules.func.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.kalvin.kvf.modules.func.entity.UserInfo;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 * @since 2023-02-14 10:54:14
 */
public interface UserInfoMapper extends BaseMapper<UserInfo> {

    /**
     * 查询列表(分页)
     * @param userInfo 查询参数
     * @param page 分页参数
     * @return list
     */
    List<UserInfo> selectUserInfoList(UserInfo userInfo, IPage page);

}
