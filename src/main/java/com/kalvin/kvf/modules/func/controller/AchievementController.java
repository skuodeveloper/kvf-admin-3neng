package com.kalvin.kvf.modules.func.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.LambdaUpdateWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.kalvin.kvf.common.utils.ShiroKit;
import com.kalvin.kvf.modules.func.entity.History;
import com.kalvin.kvf.modules.func.entity.PoliceInfo;
import com.kalvin.kvf.modules.func.service.PoliceInfoService;
import com.kalvin.kvf.modules.util.ScoreUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import com.kalvin.kvf.common.controller.BaseController;
import com.kalvin.kvf.common.dto.R;
import com.kalvin.kvf.modules.func.entity.Achievement;
import com.kalvin.kvf.modules.func.service.AchievementService;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;


/**
 * <p>
 * 业绩表 前端控制器
 * </p>
 *
 * @since 2023-01-10 10:24:47
 */
@RestController
@RequestMapping("func/achievement")
public class AchievementController extends BaseController {

    @Autowired
    private AchievementService achievementService;

    @Autowired
    private PoliceInfoService policeInfoService;

    @Autowired
    private ScoreUtil scoreUtil;

    @RequiresPermissions("func:achievement:index")
    @GetMapping("index")
    public ModelAndView index(@RequestParam Integer pId) {
        ModelAndView mv = new ModelAndView("func/achievement");
        mv.addObject("pId", pId);
        return mv;
    }

    @RequiresPermissions("func:achievement:index")
    @GetMapping("index1")
    public ModelAndView index1() {
        ModelAndView mv;
        if (ShiroKit.getUser().getUsername().equals("admin")) {
            mv = new ModelAndView("func/achievement1");
        } else {
            PoliceInfo policeInfo = policeInfoService.getOne(new LambdaQueryWrapper<PoliceInfo>()
                    .eq(PoliceInfo::getSfzh, ShiroKit.getUser().getUsername()));

            mv = new ModelAndView("func/achievement")
                    .addObject("pId", policeInfo.getId());
        }
        return mv;
    }

    @GetMapping(value = "edit")
    public ModelAndView edit(Long id) {
        ModelAndView mv = new ModelAndView("func/achievement_edit");
        Achievement achievement;
        if (id == null) {
            achievement = new Achievement();
        } else {
            achievement = achievementService.getById(id);
        }
        mv.addObject("editInfo", achievement);
        return mv;
    }

    @GetMapping(value = "edit1")
    public ModelAndView edit1(Integer pId) {
        ModelAndView mv = new ModelAndView("func/achievement_edit");
        Achievement achievement = new Achievement();
        achievement.setPId(pId);

        PoliceInfo policeInfo = policeInfoService.getById(pId);
        achievement.setPName(policeInfo.getXm());

        mv.addObject("editInfo", achievement);
        return mv;
    }

    @GetMapping(value = "list/data")
    public R listData(Achievement achievement) {
        Page<Achievement> page = achievementService.listAchievementPage(achievement);
        return R.ok(page);
    }

    @RequiresPermissions("func:achievement:add")
    @PostMapping(value = "add")
    public R add(Achievement achievement) {
        double[] arrScore = {15, 9, 6, 3, 15, 9, 8, 6, 3, 12, 6, 6, 3, 4, 1, 2, 1, 2, 1, 0.3};
        achievement.setStatus(0);
        achievement.setScore(arrScore[achievement.getContent() - 1]);
        achievement.setCreateTime(new Date());
        achievementService.save(achievement);

        PoliceInfo policeInfo = policeInfoService.getById(achievement.getPId());
        scoreUtil.update(policeInfo);
        return R.ok();
    }

    @RequiresPermissions("func:achievement:del")
    @PostMapping(value = "batchdel")
    public R batchdel(@RequestParam("ids") List<Long> ids) {
        ids.forEach(o -> {
            Achievement achievement = achievementService.getById(o);
            achievementService.removeById(o);

            PoliceInfo policeInfo = policeInfoService.getById(achievement.getPId());
            scoreUtil.update(policeInfo);
        });
        return R.ok();
    }

    @RequiresPermissions("func:achievement:edit")
    @PostMapping(value = "edit")
    public R edit(Achievement achievement) {
        Achievement a = achievementService.getById(achievement.getId());
        a.setStatus(achievement.getStatus());
        if (StringUtils.isNotEmpty(achievement.getReason())) {
            a.setReason(achievement.getReason());
        }
        a.setUpdateTime(new Date());
        achievementService.updateById(a);

        PoliceInfo policeInfo = policeInfoService.getById(a.getPId());
        scoreUtil.update(policeInfo);
        return R.ok();
    }

    @RequiresPermissions("func:achievement:del")
    @PostMapping(value = "del/{id}")
    public R del(@PathVariable Long id) {
        Achievement achievement = achievementService.getById(id);
        achievementService.removeById(id);

        PoliceInfo policeInfo = policeInfoService.getById(achievement.getPId());
        scoreUtil.update(policeInfo);
        return R.ok();
    }

    @GetMapping(value = "get/{id}")
    public R get(@PathVariable Long id) {
        return R.ok(achievementService.getById(id));
    }
}

