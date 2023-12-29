package com.kalvin.kvf.modules.util;

public class TestUtils {
    /**
     * 从链接中获取文件名
     *
     * @param url
     * @return
     */
    public static String getFileName(String url) {
        int s = url.lastIndexOf("/");
        return url.substring(s + 1);
    }

    /**
     * 获取履历内容
     * @param type
     * @return
     */
    public static String getHistory(Integer type) {
        String[] his = {
                "享受正科级待遇"
                , "担任副科长级及以上干部（区管干部）"
                , "担任中层正职"
                , "担任中层副职"
                , "任一级警长、警务技术一级主管后且目前仍在派出所工作"
                , "任一级警长、警务技术一级主管后且目前仍在交警路面中队工作"
                , "任一级警长、警务技术一级主管后且目前仍在交警事故中队工作"
                , "任一级警长、警务技术一级主管后且目前仍在责任区刑侦队工作"
                , "任一级警长、警务技术一级主管后且目前仍在刑科室工作"
                , "任一级警长、警务技术一级主管后且目前仍在拘留所工作"
                , "获得警务技术职务副高级任职资格"
                , "参加工作"
                , "任一级警长、警务技术一级主管（起算）"
        };

        return his[type];
    }

    /**
     * 获取奖励内容
     * @param type
     * @return
     */
    public static String getAchievement(Integer type) {
        String[] his = {"全国劳动模范（含享受相当劳模待遇）"
                , "省劳动模范（含享受相当劳模待遇）"
                , "市劳动模范（含享受相当劳模待遇）"
                , "区劳动模范（含享受相当劳模待遇）"
                , "一级英模"
                , "二级英模"
                , "全国特级优秀人民警察"
                , "全国优秀人民警察"
                , "全省优秀人民警察"
                , "党中央国务院综合性工作表彰"
                , "省委省政府综合性工作表彰"
                , "党中央国务院单项或专项工作表彰"
                , "省委省政府单项或专项工作表彰"
                , "个人一等功（不含公务员奖励）"
                , "任一级警长（警务技术一级主管）后，评为全市优秀人民警察"
                , "任一级警长（警务技术一级主管）后，获得个人二等功"
                , "任一级警长（警务技术一级主管）后，获得个人三等功"
                , "任一级警长（警务技术一级主管）后，被市委市政府给与综合性工作表彰奖励"
                , "任一级警长（警务技术一级主管）后，被市委市政府给与单项或专项工作表彰奖励"
                , "任一级警长（警务技术一级主管）后，被区委区政府给与综合性工作表彰奖励、年度考核评为优秀公务员、评为优秀党员和党务工作者"
        };

        return his[type - 1];
    }

    /**
     * 获取惩戒内容
     * @param type
     * @return
     */
    public static String getPunish(Integer type) {
        String[] his = {"受党纪政纪处分和组织处理，年度考核确定为基本称职、不进行年度考核和参加参加年度考核不确定等次"
                , "受组织调整或组织处理被降职、免职、调整职务"
                , "因违规、违纪受戒勉谈话、通报批评、警诫"
                , "因病、事假累积超过半年"
        };

        return his[type - 1];
    }

    /**
     * 获取年度考核内容
     * @param type
     * @return
     */
    public static String getYearTest(Integer type) {
        String[] his = {"优秀"
                , "称职"
                , "基本称职"
                , "不称职"
                , "不进行年度考核"
                , "不定等次"
        };

        return his[type - 1];
    }
}
