package com.kalvin.kvf.modules.func.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import com.kalvin.kvf.common.entity.BaseEntity;

/**
 * <p>
 * 
 * </p>
 * @since 2023-02-14 10:54:14
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
@TableName("func_user_info")
public class UserInfo extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 
     */
    @TableId(value = "id", type = IdType.AUTO)
    private String id;

    /**
     * 
     */
    private String guid;

    /**
     * 
     */
    private String nickname;

    /**
     * 
     */
    private String avatar;

    /**
     * 
     */
    private String serialNumber;

    /**
     * 
     */
    private String realname;

    /**
     * 
     */
    private String idNumber;

    /**
     * 
     */
    private String currentPosition;

    /**
     * 
     */
    private String mobilephoneNumber;

    /**
     * 
     */
    private String mobilephoneShortNumber;

    /**
     * 
     */
    private String telephoneNumber;

    /**
     * 
     */
    private String tag;

    /**
     * 
     */
    private String appId;

    /**
     * 
     */
    private String permission;

    /**
     * 
     */
    private String groupId;

    /**
     * 
     */
    private String type;

    /**
     * 
     */
    private String status;

    /**
     * 
     */
    private String orderBy;

    /**
     * 
     */
    private String remark;

    /**
     * 
     */
    private String dataTime;

    /**
     * 
     */
    private String dataIp;

    /**
     * 
     */
    private String dataClientInfo;

    /**
     * 
     */
    private String dataStatus;

    /**
     * 
     */
    private String dataApp;

    /**
     * 
     */
    private String isOnline;

    /**
     * 
     */
    private String lastLoginTime;

    /**
     * 
     */
    private String lastLoginInfo;

    /**
     * 
     */
    private String lastLoginIdentifier;

}
