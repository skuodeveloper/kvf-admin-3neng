package com.kalvin.kvf.modules.func.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import com.kalvin.kvf.common.entity.BaseEntity;

import java.util.Date;

/**
 * <p>
 * 履历表
 * </p>
 * @since 2023-01-05 15:09:29
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
@TableName("func_history")
public class History extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 民警id
     */
    private Integer pId;

    /**
     * 民警姓名
     */
    private String pName;

    /**
     * 内容
     */
    private Integer content;

    /**
     * 开始年月
     */
    private String tStart;

    /**
     * 结束年月
     */
    private String tEnd;

    /**
     * 积分
     */
    private Double score;

    /**
     * 备注
     */
    private String remark;

    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createTime;
}
