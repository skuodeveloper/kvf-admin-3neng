package com.kalvin.kvf.modules.func.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import com.kalvin.kvf.common.entity.BaseEntity;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * <p>
 * 指标
 * </p>
 * @since 2022-05-12 14:11:31
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
@TableName("func_zhibiao")
public class Zhibiao extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 指标名称
     */
    private String name;

    /**
     * 报送单位
     */
    private String dept;

    /**
     * 指标出处
     */
    private String fromt;

    /**
     * 指标属性
     */
    private Integer property;

    /**
     * 项目类别
     */
    private Integer type;

    /**
     * 项目周期
     */
    private String period;

    /**
     * 适用层面
     */
    private String scope;

    /**
     * 起评标准
     */
    private BigDecimal levelDown;

    /**
     * 封顶要求
     */
    private BigDecimal levelUp;

    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime createTime;

}
