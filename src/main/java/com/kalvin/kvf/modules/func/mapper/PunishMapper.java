package com.kalvin.kvf.modules.func.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.kalvin.kvf.modules.func.entity.Punish;

import java.util.List;

/**
 * <p>
 * 惩戒表 Mapper 接口
 * </p>
 * @since 2023-01-13 13:59:20
 */
public interface PunishMapper extends BaseMapper<Punish> {

    /**
     * 查询列表(分页)
     * @param punish 查询参数
     * @param page 分页参数
     * @return list
     */
    List<Punish> selectPunishList(Punish punish, IPage page);

}
