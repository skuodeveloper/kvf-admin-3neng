package com.kalvin.kvf.modules.util;

import com.diboot.core.binding.Binder;
import com.diboot.core.controller.BaseCrudRestController;
import com.kalvin.kvf.modules.func.entity.Achievement;
import com.kalvin.kvf.modules.func.entity.History;
import com.kalvin.kvf.modules.func.entity.PoliceInfo;
import com.kalvin.kvf.modules.func.entity.Punish;
import com.kalvin.kvf.modules.func.service.PoliceInfoService;
import com.kalvin.kvf.modules.func.vo.PoliceInfoVo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;

/**
 * 计算总积分工具类
 */
@Component
public class ScoreUtil extends BaseCrudRestController {
    @Autowired
    private PoliceInfoService policeInfoService;

    public void update(PoliceInfo policeInfo) {
        PoliceInfoVo pv = Binder.convertAndBindRelations(policeInfo, PoliceInfoVo.class);

        Double s = 0.0;
        //履历积分
        if (pv.getHistorys() != null) {
            for (History h : pv.getHistorys()) {
                s += h.getScore();
            }
        }

        //奖励积分
        if (pv.getAchievements() != null) {
            for (Achievement h : pv.getAchievements()) {
                //审核通过
                if (h.getStatus() == 1) {
                    s += h.getScore();
                }
            }
        }

        //惩戒扣分
        if (pv.getPunishes() != null) {
            for (Punish h : pv.getPunishes()) {
                s -= h.getScore();
            }
        }

        //参加工作时间每年计3分，不足的不计分
        Period period = getPeriod(pv.getCjgzny());
        int y = period.getYears();
        s += y * 3;

        //任一级警长后每年计0.5分，不足一年的按百分比计算
        if (StringUtils.isNotEmpty(pv.getYjny())) {
            period = getPeriod(pv.getYjny());
            y = period.getYears();
            int m = period.getMonths();
            s += Math.round((y * 12 + m) * 100 / 12 * 0.5) / 100.0;
        }

        NumberFormat format = NumberFormat.getInstance();
        format.setMaximumFractionDigits(2);
        String str = format.format(s);
        s = Double.parseDouble(str);
        policeInfo.setScore(s);

        policeInfoService.updateById(policeInfo);
    }

    /**
     * 获取输入时间到目前为止的时间间隔
     *
     * @param tStart
     * @return 年月
     */
    private Period getPeriod(String tStart) {
        int yearS = Integer.parseInt(tStart.substring(0, 4));
        int monthS = Integer.parseInt(tStart.substring(4, 6));
        LocalDate oldDate = LocalDate.of(yearS, monthS, 1);

        DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyyMM");
        LocalDate today = LocalDate.now();

        String tEnd = today.format(df);
        int yearD = Integer.parseInt(tEnd.substring(0, 4));
        int monthD = Integer.parseInt(tEnd.substring(4, 6));
        LocalDate newDate = LocalDate.of(yearD, monthD, 1);

        return Period.between(oldDate, newDate);
    }
}
