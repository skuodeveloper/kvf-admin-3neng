package com.kalvin.kvf.modules.func.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.kalvin.kvf.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.Date;

/**
 * <p>
 * 惩戒表
 * </p>
 * @author Administrator
 * @since 2023-01-13 13:59:20
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
@TableName("func_punish")
public class Punish extends BaseEntity {

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
     * 身份证号
     */
    @TableField(exist = false)
    private String sfzh;

    /**
     * 惩戒内容
     */
    private Integer content;

    /**
     * 惩戒时间
     */
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate ggTime;

    /**
     * 分值
     */
    private Double score;

    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createTime;

}
