package com.kalvin.kvf.modules.func.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import com.kalvin.kvf.common.entity.BaseEntity;
import java.math.BigDecimal;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * <p>
 * 业绩表
 * </p>
 * @since 2023-01-10 10:24:47
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
@TableName("func_achievement")
public class Achievement extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 警员id
     */
    private Integer pId;

    /**
     * 警员姓名
     */
    private String pName;

    /**
     * 奖励类型
     */
    private Integer content;

    /**
     * 奖励名称
     */
    private String content1;

    /**
     * 获取时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate ggTime;

    /**
     * 获得年度
     */
    private String ggYear;

    /**
     * 附件
     */
    private String fileUrl;

    /**
     * 分值
     */
    private double score;

    /**
     * 状态
     */
    private Integer status;

    /**
     * 退回理由
     */
    private String reason;

    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createTime;

    /**
     * 审核时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date updateTime;

}
