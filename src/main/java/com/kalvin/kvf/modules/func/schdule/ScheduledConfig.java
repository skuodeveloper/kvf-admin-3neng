package com.kalvin.kvf.modules.func.schdule;

import com.diboot.core.binding.Binder;
import com.diboot.core.controller.BaseCrudRestController;
import com.kalvin.kvf.modules.func.entity.Achievement;
import com.kalvin.kvf.modules.func.entity.History;
import com.kalvin.kvf.modules.func.entity.PoliceInfo;
import com.kalvin.kvf.modules.func.entity.Punish;
import com.kalvin.kvf.modules.func.service.PoliceInfoService;
import com.kalvin.kvf.modules.func.vo.PoliceInfoVo;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;
import org.springframework.stereotype.Component;

import java.io.*;
import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.concurrent.Executors;

@Component
@EnableScheduling
public class ScheduledConfig extends BaseCrudRestController implements SchedulingConfigurer {
    @Autowired
    private PoliceInfoService policeInfoService;

    @Override
    public void configureTasks(ScheduledTaskRegistrar scheduledTaskRegistrar) {
        //参数传入一个size为10的线程池
        scheduledTaskRegistrar.setScheduler(Executors.newScheduledThreadPool(10));
    }

    @Scheduled(cron = "0 0 1 * * ?")
//@Scheduled(fixedDelay = Long.MAX_VALUE)
    public void schedule_1() {
        try {
            List<PoliceInfo> policeInfos = policeInfoService.list();
            List<PoliceInfoVo> pfs = Binder.convertAndBindRelations(policeInfos, PoliceInfoVo.class);
            pfs.forEach(o -> {
                if(o.getId() == 654){
                    System.out.println("肖文渊");
                }

                Double s = 0.0;
                //履历积分
                if (o.getHistorys() != null) {
                    for (History h : o.getHistorys()) {
                        s += h.getScore();
                    }
                }

                //奖励积分
                if (o.getAchievements() != null) {
                    for (Achievement h : o.getAchievements()) {
                        //审核通过
                        if (h.getStatus() == 1) {
                            s += h.getScore();
                        }
                    }
                }

                //惩戒扣分
                if (o.getPunishes() != null) {
                    for (Punish h : o.getPunishes()) {
                        s -= h.getScore();
                    }
                }

                //参加工作时间每年计3分，不足的不计分
                Period period = getPeriod(o.getCjgzny());
                int y = period.getYears();
                s += y * 3;

                //任一级警长后每年计0.5分，不足一年的按百分比计算
                if (StringUtils.isNotEmpty(o.getYjny())) {
                    period = getPeriod(o.getYjny());
                    y = period.getYears();
                    int m = period.getMonths();
                    s += Math.round((y * 12 + m) * 100 / 12 * 0.5) / 100.0;
                }

                NumberFormat format = NumberFormat.getInstance();
                format.setMaximumFractionDigits(2);
                String str = format.format(s);
                s = Double.parseDouble(str);
                o.setScore(s);
            });

            policeInfos = (List<PoliceInfo>) deepClone(pfs);
            policeInfoService.saveOrUpdateBatch(policeInfos);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }

    /**
     * 深拷贝
     * @param o
     * @return
     * @throws ClassNotFoundException
     * @throws IOException
     */
    private Object deepClone(Object o) throws ClassNotFoundException, IOException {
        //将对象写入流中
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(outputStream);
        oos.writeObject(o);

        //将对象从流中去取
        ByteArrayInputStream inputStream = new ByteArrayInputStream(outputStream.toByteArray());
        ObjectInputStream ois = new ObjectInputStream(inputStream);
        return ois.readObject();
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
        ;
        String tEnd = today.format(df);
        int yearD = Integer.parseInt(tEnd.substring(0, 4));
        int monthD = Integer.parseInt(tEnd.substring(4, 6));
        LocalDate newDate = LocalDate.of(yearD, monthD, 1);

        return Period.between(oldDate, newDate);
    }
}
