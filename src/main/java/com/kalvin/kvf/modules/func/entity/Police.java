package com.kalvin.kvf.modules.func.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.kalvin.kvf.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.math.BigDecimal;
import java.util.Date;

/**
 * <p>
 * 民警表
 * </p>
 *
 * @since 2022-05-11 15:25:56
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
@TableName("func_police")
public class Police extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     *
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    /**
     * 部门ID
     */
    private Integer deptId;

    /**
     * 部门名称
     */
    private String dept;

    /**
     * 姓名
     */
    private String name;

    /**
     * 身份证号
     */
    private String sfzh;

    /**
     * 电话号码
     */
    private String tel;

    /**
     * 现住地址
     */
    private String xzdz;

    /**
     * 紧急联系人
     */
    private String emergencyContact;

    /**
     * 联系人电话
     */
    private String contactTel;

    /**
     * 联系人电话
     */
    private String contactCompany;

    /**
     * 联系人关系
     */
    private String relation;

    /**
     * 积分
     */
    private BigDecimal jifen;

    /**
     *
     */
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private Date createTime;

}
