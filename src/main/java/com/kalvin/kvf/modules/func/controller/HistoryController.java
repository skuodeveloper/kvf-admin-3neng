package com.kalvin.kvf.modules.func.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.kalvin.kvf.common.utils.ShiroKit;
import com.kalvin.kvf.modules.func.entity.PoliceInfo;
import com.kalvin.kvf.modules.func.service.PoliceInfoService;
import com.kalvin.kvf.modules.sys.entity.User;
import com.kalvin.kvf.modules.util.ScoreUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import com.kalvin.kvf.common.controller.BaseController;
import com.kalvin.kvf.common.dto.R;
import com.kalvin.kvf.modules.func.entity.History;
import com.kalvin.kvf.modules.func.service.HistoryService;

import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.List;


/**
 * <p>
 * 履历表 前端控制器
 * </p>
 *
 * @since 2023-01-05 15:09:29
 */
@RestController
@RequestMapping("func/history")
public class HistoryController extends BaseController {

    @Autowired
    private HistoryService historyService;

    @Autowired
    private PoliceInfoService policeInfoService;

    @Autowired
    private ScoreUtil scoreUtil;

    /**
     * 管理员 查看警员的履历
     *
     * @param pId
     * @return
     */
    @RequiresPermissions("func:history:index")
    @GetMapping("index")
    public ModelAndView index(@RequestParam Integer pId) {
        ModelAndView mv = new ModelAndView("func/history");
        mv.addObject("pId", pId);
        return mv;
    }

    /**
     * 警员-我的履历
     *
     * @return
     */
    @RequiresPermissions("func:history:index")
    @GetMapping("index1")
    public ModelAndView index1() {
        PoliceInfo policeInfo = policeInfoService.getOne(new LambdaQueryWrapper<PoliceInfo>()
                .eq(PoliceInfo::getSfzh, ShiroKit.getUser().getUsername()));

        ModelAndView mv = new ModelAndView("func/history")
                .addObject("pId", policeInfo.getId());
        return mv;
    }

    @GetMapping(value = "edit")
    public ModelAndView edit(Long id) {
        ModelAndView mv = new ModelAndView("func/history_edit");
        History history;
        if (id == null) {
            history = new History();
        } else {
            history = historyService.getById(id);
        }
        mv.addObject("editInfo", history);
        return mv;
    }

    @GetMapping(value = "edit1")
    public ModelAndView edit1(Integer pId) {
        ModelAndView mv = new ModelAndView("func/history_edit");
        History history = new History();
        history.setPId(pId);

        PoliceInfo policeInfo = policeInfoService.getById(pId);
        history.setPName(policeInfo.getXm());

        mv.addObject("editInfo", history);
        return mv;
    }

    @GetMapping(value = "list/data")
    public R listData(History history) {
        Page<History> page = historyService.listHistoryPage(history);
        return R.ok(page);
    }

    @RequiresPermissions("func:history:add")
    @PostMapping(value = "add")
    public R add(History history) {
        try {
            String remark;
            PoliceInfo policeInfo = policeInfoService.getById(history.getPId());

            String tStart = history.getTStart();
            String tEnd = history.getTEnd();

            if (StringUtils.isEmpty(tEnd)) {
                // 时间格式
                DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyyMM");
                // 类型转换
                LocalDate today = LocalDate.now();

                tEnd = today.format(df);
            }

            int year_s = Integer.parseInt(tStart.substring(0, 4));
            int month_s = Integer.parseInt(tStart.substring(4, 6));
            LocalDate oldDate = LocalDate.of(year_s, month_s, 1);

            int year_d = Integer.parseInt(tEnd.substring(0, 4));
            int month_d = Integer.parseInt(tEnd.substring(4, 6));
            LocalDate newDate = LocalDate.of(year_d, month_d, 1);

            Period period = Period.between(oldDate, newDate);

            int y = period.getYears();
            int m = period.getMonths();

            double score, score1;
            List<History> historyList;
            History his = null;
            String dept;

            //任一级警长
            if (!StringUtils.isEmpty(policeInfo.getYjny())) {
                switch (history.getContent()) {
                    //享受正科级待遇
                    case 0:
                        score = (double) (Math.round((y * 12 + m) * 100 / 12 * 0.5) / 100.0);
                        history.setScore(score);
                        remark = "正科级待遇" + y + "年" + m + "个月，" + "得分" + score;
                        history.setRemark(remark);
                        break;
                    //担任副科长级及以上干部（区管干部）
                    case 1:
                        score = (double) (Math.round((y * 12 + m) * 100 / 12) / 100.0);

                        historyList = historyService.list(new LambdaQueryWrapper<History>()
                                .eq(History::getPId, history.getPId())
                                .eq(History::getContent, 2)
                                .orderByDesc(History::getTEnd));

                        //是否已经中层正职的履历
                        if (historyList.size() == 0) {
                            history.setScore(score);

                            remark = "担任副科长级及以上干部（区管干部）" + y + "年" + m + "个月，" + "得分" + score;
                            history.setRemark(remark);
                        } else {
                            his = historyList.get(0);

                            //担任副科长级及以上干部（区管干部）与中层正职重叠的时间段，重复的时间段就高计分
                            if (tStart.compareTo(his.getTEnd()) < 0 && tEnd.compareTo(his.getTStart()) > 0) {
                                year_d = Integer.parseInt(his.getTEnd().substring(0, 4));
                                month_d = Integer.parseInt(his.getTEnd().substring(4, 6));
                                newDate = LocalDate.of(year_d, month_d, 1);
                                //重复的时间段
                                Period pd = Period.between(oldDate, newDate);
                                y = pd.getYears();
                                m = pd.getMonths();
                                score1 = (double) (Math.round((y * 12 + m) * 100 / 12 * 0.5) / 100.0);

                                history.setScore(score - score1);

                                remark = "担任副科长级及以上干部（区管干部）与中层正职重叠的时间段，重复的时间段就高计分，故需要扣除"
                                        + y + "年" + m + "个月的中层正职得分，合计" + score + "-" + score1 + "=" + (score - score1);
                                history.setRemark(remark);
                            } else {
                                history.setScore(score);

                                remark = "担任副科长级及以上干部（区管干部）" + y + "年" + m + "个月，" + "得分" + score;
                                history.setRemark(remark);
                            }
                        }
                        break;
                    //担任中层正职
                    case 2:
                        score = (double) (Math.round((y * 12 + m) * 100 / 12 * 0.5) / 100.0);
                        historyList = historyService.list(new LambdaQueryWrapper<History>()
                                .eq(History::getPId, history.getPId())
                                .eq(History::getContent, 1));

                        //是否担任了副科级及以上干部
                        if (historyList.size() == 0) {
                            history.setScore(score);

                            remark = "中层正职" + y + "年" + m + "个月，" + "得分" + score;
                            history.setRemark(remark);
                        } else {
                            his = historyList.get(0);
                            //担任副科长级及以上干部（区管干部）与中层正职重叠的时间段，重复的时间段就高计分
                            if (his.getTStart().compareTo(tEnd) < 0 && his.getTEnd().compareTo(tStart) > 0) {
                                year_s = Integer.parseInt(his.getTStart().substring(0, 4));
                                month_s = Integer.parseInt(his.getTStart().substring(4, 6));
                                oldDate = LocalDate.of(year_s, month_s, 1);
                                //重复的时间段
                                Period pd = Period.between(oldDate, newDate);
                                y = pd.getYears();
                                m = pd.getMonths();
                                score1 = (double) (Math.round((y * 12 + m) * 100 / 12 * 0.5) / 100.0);

                                history.setScore(score - score1);

                                remark = "担任副科长级及以上干部（区管干部）与中层正职重叠的时间段，重复的时间段就高计分，故需要扣除"
                                        + y + "年" + m + "个月的中层正职得分，合计" + score + "-" + score1 + "=" + (score - score1);
                                history.setRemark(remark);
                            } else {
                                history.setScore(score);

//                                remark = "担任副科长级及以上干部（区管干部）" + y + "年" + m + "个月，" + "得分" + score;
                                remark = "中层正职" + y + "年" + m + "个月，" + "得分" + score;
                                history.setRemark(remark);
                            }
                        }
                        break;
                    //担任中层副职
                    case 3:
                        score = (double) (Math.round((y * 12 + m) * 100 / 12 * 0.3) / 100.0);
                        history.setScore(score);
                        remark = "中层副职" + y + "年" + m + "个月，" + "得分" + score;
                        history.setRemark(remark);
                        break;
                    //派出所工作
                    case 4:
                        dept = "派出所工作";
                        score = (double) (Math.round((y * 12 + m) * 100 / 12 * 0.2) / 100.0);
                        history.setScore(score);
                        remark = "任一级警长（警务技术一级主管）后，仍在" + dept + "，" + y + "年" + m + "个月，" + "得分" + score;
                        history.setRemark(remark);
                        break;
                    //交警路面中队工作
                    case 5:
                        dept = "交警路面中队工作";
                        score = (double) (Math.round((y * 12 + m) * 100 / 12 * 0.2) / 100.0);
                        history.setScore(score);
                        remark = "任一级警长（警务技术一级主管）后，仍在" + dept + "，" + y + "年" + m + "个月，" + "得分" + score;
                        history.setRemark(remark);
                        break;
                    //交警事故中队工作
                    case 6:
                        dept = "交警事故中队工作";
                        score = (double) (Math.round((y * 12 + m) * 100 / 12 * 0.2) / 100.0);
                        history.setScore(score);
                        remark = "任一级警长（警务技术一级主管）后，仍在" + dept + "，" + y + "年" + m + "个月，" + "得分" + score;
                        history.setRemark(remark);
                        break;
                    //责任区刑侦队工作
                    case 7:
                        dept = "责任区刑侦队工作";
                        score = (double) (Math.round((y * 12 + m) * 100 / 12 * 0.2) / 100.0);
                        history.setScore(score);
                        remark = "任一级警长（警务技术一级主管）后，仍在" + dept + "，" + y + "年" + m + "个月，" + "得分" + score;
                        history.setRemark(remark);
                        break;
                    //刑科室工作
                    case 8:
                        dept = "刑科室工作";
                        score = (double) (Math.round((y * 12 + m) * 100 / 12 * 0.2) / 100.0);
                        history.setScore(score);
                        remark = "任一级警长（警务技术一级主管）后，仍在" + dept + "，" + y + "年" + m + "个月，" + "得分" + score;
                        history.setRemark(remark);
                        break;
                    //拘留所工作
                    case 9:
                        dept = "拘留所工作";
                        score = (double) (Math.round((y * 12 + m) * 100 / 12 * 0.2) / 100.0);
                        history.setScore(score);
                        remark = "任一级警长（警务技术一级主管）后，仍在" + dept + "，" + y + "年" + m + "个月，" + "得分" + score;
                        history.setRemark(remark);
                        break;
                    //获得警务技术职务副高级任职资格
                    case 10:
                        //警务技术序列民警
                        if (policeInfo.getJwxl() == 2) {
                            //警务技术序列民警取得警务技术一级主管资格前获得警务技术职务副高级任职资格
                            if (history.getTStart().compareTo(policeInfo.getYjny()) < 0) {
                                year_d = Integer.parseInt(policeInfo.getYjny().substring(0, 4));
                                month_d = Integer.parseInt(policeInfo.getYjny().substring(4, 6));
                                newDate = LocalDate.of(year_d, month_d, 1);

                                //重复的时间段
                                Period pd = Period.between(oldDate, newDate);
                                y = pd.getYears();
                                m = pd.getMonths();
                                score1 = y * 0.1;

                                history.setScore(score1);

                                remark = "警务技术序列民警取得警务技术一级主管资格前获得警务技术职务副高级任职资格，" + y + "年" + m + "个月，" + "得分" + score1;
                                history.setRemark(remark);
                            }
                        }
                        break;
                    default:
                        break;
                }
            }
            historyService.save(history);

            scoreUtil.update(policeInfo);
            return R.ok();
        } catch (Exception e) {
            return R.fail(e.getMessage());
        }
    }

    @RequiresPermissions("func:history:del")
    @PostMapping(value = "batchdel")
    public R batchdel(@RequestParam("ids") List<Long> ids) {
        ids.forEach(o -> {
            History history = historyService.getById(o);
            historyService.removeById(o);

            PoliceInfo policeInfo = policeInfoService.getById(history.getPId());
            scoreUtil.update(policeInfo);
        });
        return R.ok();
    }

    @RequiresPermissions("func:history:edit")
    @PostMapping(value = "edit")
    public R edit(History history) {
        try {
            String remark;
            PoliceInfo policeInfo = policeInfoService.getById(history.getPId());

            String tStart = history.getTStart();
            String tEnd = history.getTEnd();

            if (StringUtils.isEmpty(tEnd)) {
                // 时间格式
                DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyyMM");
                // 类型转换
                LocalDate today = LocalDate.now();

                tEnd = today.format(df);
            }

            int year_s = Integer.parseInt(tStart.substring(0, 4));
            int month_s = Integer.parseInt(tStart.substring(4, 6));
            LocalDate oldDate = LocalDate.of(year_s, month_s, 1);

            int year_d = Integer.parseInt(tEnd.substring(0, 4));
            int month_d = Integer.parseInt(tEnd.substring(4, 6));
            LocalDate newDate = LocalDate.of(year_d, month_d, 1);

            Period period = Period.between(oldDate, newDate);

            int y = period.getYears();
            int m = period.getMonths();

            double score, score1;
            List<History> historyList;
            History his = null;
            String dept;

            //任一级警长
            if (!StringUtils.isEmpty(policeInfo.getYjny())) {
                switch (history.getContent()) {
                    //享受正科级待遇
                    case 0:
                        score = (double) (Math.round((y * 12 + m) * 100 / 12 * 0.5) / 100.0);
                        history.setScore(score);
                        remark = "正科级待遇" + y + "年" + m + "个月，" + "得分" + score;
                        history.setRemark(remark);
                        break;
                    //担任副科长级及以上干部（区管干部）
                    case 1:
                        score = (double) (Math.round((y * 12 + m) * 100 / 12) / 100.0);

                        historyList = historyService.list(new LambdaQueryWrapper<History>()
                                .eq(History::getPId, history.getPId())
                                .eq(History::getContent, 2)
                                .orderByDesc(History::getTEnd));

                        //是否已经中层正职的履历
                        if (historyList.size() == 0) {
                            history.setScore(score);

                            remark = "担任副科长级及以上干部（区管干部）" + y + "年" + m + "个月，" + "得分" + score;
                            history.setRemark(remark);
                        } else {
                            his = historyList.get(0);
                            //担任副科长级及以上干部（区管干部）与中层正职重叠的时间段，重复的时间段就高计分
                            if (tStart.compareTo(his.getTEnd()) < 0 && tEnd.compareTo(his.getTStart()) > 0) {
                                year_d = Integer.parseInt(his.getTEnd().substring(0, 4));
                                month_d = Integer.parseInt(his.getTEnd().substring(4, 6));
                                newDate = LocalDate.of(year_d, month_d, 1);
                                //重复的时间段
                                Period pd = Period.between(oldDate, newDate);
                                y = pd.getYears();
                                m = pd.getMonths();
                                score1 = (double) (Math.round((y * 12 + m) * 100 / 12 * 0.5) / 100.0);

                                history.setScore(score - score1);

                                remark = "担任副科长级及以上干部（区管干部）与中层正职重叠的时间段，重复的时间段就高计分，故需要扣除"
                                        + y + "年" + m + "个月的中层正职得分，合计" + score + "-" + score1 + "=" + (score - score1);
                                history.setRemark(remark);
                            } else {
                                history.setScore(score);

                                remark = "担任副科长级及以上干部（区管干部）" + y + "年" + m + "个月，" + "得分" + score;
                                history.setRemark(remark);
                            }
                        }
                        break;
                    //担任中层正职
                    case 2:
                        score = (double) (Math.round((y * 12 + m) * 100 / 12 * 0.5) / 100.0);
                        historyList = historyService.list(new LambdaQueryWrapper<History>()
                                .eq(History::getPId, history.getPId())
                                .eq(History::getContent, 1));

                        //是否担任了副科级及以上干部
                        if (historyList.size() == 0) {
                            history.setScore(score);

                            remark = "中层正职" + y + "年" + m + "个月，" + "得分" + score;
                            history.setRemark(remark);
                        } else {
                            his = historyList.get(0);
                            //担任副科长级及以上干部（区管干部）与中层正职重叠的时间段，重复的时间段就高计分
                            if (his.getTStart().compareTo(tEnd) < 0 && his.getTEnd().compareTo(tStart) > 0) {
                                year_s = Integer.parseInt(his.getTStart().substring(0, 4));
                                month_s = Integer.parseInt(his.getTStart().substring(4, 6));
                                oldDate = LocalDate.of(year_s, month_s, 1);
                                //重复的时间段
                                Period pd = Period.between(oldDate, newDate);
                                y = pd.getYears();
                                m = pd.getMonths();
                                score1 = (double) (Math.round((y * 12 + m) * 100 / 12 * 0.5) / 100.0);

                                history.setScore(score - score1);

                                remark = "担任副科长级及以上干部（区管干部）与中层正职重叠的时间段，重复的时间段就高计分，故需要扣除"
                                        + y + "年" + m + "个月的中层正职得分，合计" + score + "-" + score1 + "=" + (score - score1);
                                history.setRemark(remark);
                            } else {
                                history.setScore(score);

                                remark = "担任副科长级及以上干部（区管干部）" + y + "年" + m + "个月，" + "得分" + score;
                                history.setRemark(remark);
                            }
                        }
                        break;
                    //担任中层副职
                    case 3:
                        score = (double) (Math.round((y * 12 + m) * 100 / 12 * 0.3) / 100.0);
                        history.setScore(score);
                        remark = "中层副职" + y + "年" + m + "个月，" + "得分" + score;
                        history.setRemark(remark);
                        break;
                    //派出所工作
                    case 4:
                        dept = "派出所工作";
                        score = (double) (Math.round((y * 12 + m) * 100 / 12 * 0.2) / 100.0);
                        history.setScore(score);
                        remark = "任一级警长（警务技术一级主管）后，仍在" + dept + "，" + y + "年" + m + "个月，" + "得分" + score;
                        history.setRemark(remark);
                        break;
                    //交警路面中队工作
                    case 5:
                        dept = "交警路面中队工作";
                        score = (double) (Math.round((y * 12 + m) * 100 / 12 * 0.2) / 100.0);
                        history.setScore(score);
                        remark = "任一级警长（警务技术一级主管）后，仍在" + dept + "，" + y + "年" + m + "个月，" + "得分" + score;
                        history.setRemark(remark);
                        break;
                    //交警事故中队工作
                    case 6:
                        dept = "交警事故中队工作";
                        score = (double) (Math.round((y * 12 + m) * 100 / 12 * 0.2) / 100.0);
                        history.setScore(score);
                        remark = "任一级警长（警务技术一级主管）后，仍在" + dept + "，" + y + "年" + m + "个月，" + "得分" + score;
                        history.setRemark(remark);
                        break;
                    //责任区刑侦队工作
                    case 7:
                        dept = "责任区刑侦队工作";
                        score = (double) (Math.round((y * 12 + m) * 100 / 12 * 0.2) / 100.0);
                        history.setScore(score);
                        remark = "任一级警长（警务技术一级主管）后，仍在" + dept + "，" + y + "年" + m + "个月，" + "得分" + score;
                        history.setRemark(remark);
                        break;
                    //刑科室工作
                    case 8:
                        dept = "刑科室工作";
                        score = (double) (Math.round((y * 12 + m) * 100 / 12 * 0.2) / 100.0);
                        history.setScore(score);
                        remark = "任一级警长（警务技术一级主管）后，仍在" + dept + "，" + y + "年" + m + "个月，" + "得分" + score;
                        history.setRemark(remark);
                        break;
                    //拘留所工作
                    case 9:
                        dept = "拘留所工作";
                        score = (double) (Math.round((y * 12 + m) * 100 / 12 * 0.2) / 100.0);
                        history.setScore(score);
                        remark = "任一级警长（警务技术一级主管）后，仍在" + dept + "，" + y + "年" + m + "个月，" + "得分" + score;
                        history.setRemark(remark);
                        break;
                    //获得警务技术职务副高级任职资格
                    case 10:
                        //警务技术序列民警
                        if (policeInfo.getJwxl() == 2) {
                            //警务技术序列民警取得警务技术一级主管资格前获得警务技术职务副高级任职资格
                            if (history.getTStart().compareTo(policeInfo.getYjny()) < 0) {
                                year_d = Integer.parseInt(policeInfo.getYjny().substring(0, 4));
                                month_d = Integer.parseInt(policeInfo.getYjny().substring(4, 6));
                                newDate = LocalDate.of(year_d, month_d, 1);

                                //重复的时间段
                                Period pd = Period.between(oldDate, newDate);
                                y = pd.getYears();
                                m = pd.getMonths();
                                score1 = y * 0.1;

                                history.setScore(score1);

                                remark = "警务技术序列民警取得警务技术一级主管资格前获得警务技术职务副高级任职资格，" + y + "年" + m + "个月，" + "得分" + score1;
                                history.setRemark(remark);
                            }
                        }
                        break;
                    default:
                        break;
                }
            }

            historyService.updateById(history);

            scoreUtil.update(policeInfo);
            return R.ok();
        } catch (Exception e) {
            return R.fail(e.getMessage());
        }
    }

    @RequiresPermissions("func:history:del")
    @PostMapping(value = "del/{id}")
    public R del(@PathVariable Long id) {
        History history = historyService.getById(id);
        historyService.removeById(id);

        PoliceInfo policeInfo = policeInfoService.getById(history.getPId());
        scoreUtil.update(policeInfo);
        return R.ok();
    }

    @GetMapping(value = "get/{id}")
    public R get(@PathVariable Long id) {
        return R.ok(historyService.getById(id));
    }

}

