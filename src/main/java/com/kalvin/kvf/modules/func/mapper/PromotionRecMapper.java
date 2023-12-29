package com.kalvin.kvf.modules.func.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.kalvin.kvf.modules.func.entity.PromotionRec;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 * 报名记录表 Mapper 接口
 * </p>
 * @since 2023-02-02 11:05:59
 */
public interface PromotionRecMapper extends BaseMapper<PromotionRec> {

    /**
     * 查询列表(分页)
     * @param promotionRec 查询参数
     * @param page 分页参数
     * @return list
     */
    List<PromotionRec> selectPromotionRecList(PromotionRec promotionRec, IPage page);

    /**
     * mysql 5.7
     * @param pid
     * @param userid
     * @return
     */
    @Select("select b.rn from func_promotion_rec a,\n" +
            "(select id,userid,username, (@i:=@i+1) rn\n" +
            "from func_promotion_rec a, (select @i:=0) b\n" +
            "where pid = #{pid} and status = 1 order by score desc) b \n" +
            "where a.id = b.id and a.userid = #{userid}")
    Integer getRank(@Param("pid") Integer pid, @Param("userid") Long userid);

    /**
     * mysql 8.0+
     * @param pid
     * @param userid
     * @return
     */
    @Select("select rn from(\n" +
            "select id,userid,username,row_number() over(order by score desc) as rn\n" +
            "from func_promotion_rec\n" +
            "where pid = #{pid} and status = 1\n" +
            ") a\n" +
            "where userid = #{userid}")
    Integer getRank1(@Param("pid") Integer pid, @Param("userid") Long userid);

    /**
     *
     * @param id
     * @return
     */
    @Select("UPDATE func_promotion_rec a,\n" +
            "(\n" +
            "\tSELECT\n" +
            "\t\ta.xm,\n" +
            "\t\ta.sfzh,\n" +
            "\t\ta.score,\n" +
            "\t\tb.id \n" +
            "\tFROM\n" +
            "\t\tfunc_police_info a\n" +
            "\t\tLEFT JOIN sys_user b ON a.sfzh = b.username \n" +
            "\tORDER BY\n" +
            "\t\tscore DESC \n" +
            "\t) b \n" +
            "\tSET a.score = b.score \n" +
            "WHERE\n" +
            "\ta.userid = b.id \n" +
            "\tAND a.id = #{id}")
    Integer sync(@Param("id") Integer id);
}
