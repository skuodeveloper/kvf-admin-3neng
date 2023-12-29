package com.kalvin.kvf.modules.func.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import com.kalvin.kvf.common.entity.BaseEntity;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * <p>
 * 民警基础信息表
 * </p>
 * @since 2023-01-04 14:46:27
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
@TableName("func_police_info")
public class PoliceInfo extends BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 姓名
     */
    private String xm;

    /**
     * 头像
     */
    @TableField(exist = false)
    private String headUrl;

    /**
     * 身份证号
     */
    private String sfzh;

    /**
     * 电话号码
     */
    private String tel;

    /**
     * 部门
     */
    private Long deptId;

    /**
     * 部门名称
     */
    private String dept;

    /**
     * 性别
     */
    private Integer xb;

    /**
     * 出生年月
     */
    private String csny;

    /**
     * 参加工作年月
     */
    private String cjgzny;

    /**
     * 参加公安年月
     */
    private String cjgany;

    /**
     * 警务序列：执法勤务、警务技术
     */
    private Integer jwxl;

    /**
     * 任一级警长、警务技术一级主管年月
     */
    private String yjny;

    /**
     * 是否已审核
     */
    private Long pass;

    /**
     * 创建时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createTime;

    /**
     * 总得分
     */
    private Double score;
}
