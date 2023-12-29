package com.kalvin.kvf.modules.func.vo;

import com.diboot.core.binding.annotation.BindEntityList;
import com.diboot.core.binding.annotation.BindField;
import com.kalvin.kvf.modules.func.entity.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
public class PoliceInfoVo extends PoliceInfo implements Serializable {
    /**
     * 履历
     */
    @BindEntityList(entity = History.class, condition = "this.id=p_id", orderBy = "t_start:ASC")
    private List<History> historys;

    /**
     * 奖励
     */
    @BindEntityList(entity = Achievement.class, condition = "this.id=p_id and status=1", orderBy = "gg_time:ASC")
    private List<Achievement> achievements;

    /**
     * 惩戒
     */
    @BindEntityList(entity = Punish.class, condition = "this.id=p_id", orderBy = "gg_time:ASC")
    private List<Punish> punishes;

    /**
     * 考核
     */
    @BindEntityList(entity = YearTest.class, condition = "this.id=p_id", orderBy = "gg_time:ASC")
    private List<YearTest> yearTests;

    @BindField(entity = UserInfo.class, field = "avatar", condition = "this.sfzh=id_number")
    private String avatar;
}
