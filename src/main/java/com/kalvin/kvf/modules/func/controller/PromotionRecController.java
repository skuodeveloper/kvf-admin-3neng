package com.kalvin.kvf.modules.func.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.kalvin.kvf.common.utils.ShiroKit;
import com.kalvin.kvf.modules.func.entity.Achievement;
import com.kalvin.kvf.modules.func.entity.PoliceInfo;
import com.kalvin.kvf.modules.func.mapper.PromotionRecMapper;
import com.kalvin.kvf.modules.func.service.PoliceInfoService;
import com.kalvin.kvf.modules.sys.entity.User;
import com.kalvin.kvf.modules.sys.service.IUserService;
import com.kalvin.kvf.modules.util.ScoreUtil;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import com.kalvin.kvf.common.controller.BaseController;
import com.kalvin.kvf.common.dto.R;
import com.kalvin.kvf.modules.func.entity.PromotionRec;
import com.kalvin.kvf.modules.func.service.PromotionRecService;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;


/**
 * <p>
 * 报名记录表 前端控制器
 * </p>
 *
 * @since 2023-02-02 11:05:59
 */
@RestController
@RequestMapping("func/promotionRec")
public class PromotionRecController extends BaseController {
    @Resource
    private PromotionRecMapper promotionRecMapper;

    @Autowired
    private PromotionRecService promotionRecService;

    @Autowired
    private ScoreUtil scoreUtil;

    @Autowired
    private IUserService userService;

    @Autowired
    private PoliceInfoService policeInfoService;

    @RequiresPermissions("func:promotionRec:index")
    @GetMapping("index")
    public ModelAndView index() {
        return new ModelAndView("func/promotionRec")
                .addObject("user", ShiroKit.getUser().getUsername());
    }

    @GetMapping(value = "edit")
    public ModelAndView edit(Long id) {
        ModelAndView mv = new ModelAndView("func/promotionRec_edit");
        PromotionRec promotionRec;
        if (id == null) {
            promotionRec = new PromotionRec();
        } else {
            promotionRec = promotionRecService.getById(id);
        }
        mv.addObject("editInfo", promotionRec);
        return mv;
    }

    @GetMapping(value = "list/data")
    public R listData(PromotionRec promotionRec) {
        if (!ShiroKit.getUser().getUsername().equals("admin")) {
            promotionRec.setUserid(ShiroKit.getUserId());
        }

        Page<PromotionRec> page = promotionRecService.listPromotionRecPage(promotionRec);
        return R.ok(page);
    }

    @RequiresPermissions("func:promotionRec:add")
    @PostMapping(value = "add")
    public R add(PromotionRec promotionRec) {
        promotionRecService.save(promotionRec);
        return R.ok();
    }

    @RequiresPermissions("func:promotionRec:del")
    @PostMapping(value = "batchdel")
    public R batchdel(@RequestParam("ids") List<Long> ids) {
        promotionRecService.removeByIds(ids);
        return R.ok();
    }

    @RequiresPermissions("func:promotionRec:edit")
    @PostMapping(value = "edit")
    public R edit(PromotionRec promotionRec) {
        PromotionRec a = promotionRecService.getById(promotionRec.getId());
        a.setStatus(promotionRec.getStatus());

        User user = userService.getById(a.getUserid());
        PoliceInfo policeInfo = policeInfoService.getOne(new LambdaQueryWrapper<PoliceInfo>()
                .eq(PoliceInfo::getSfzh, user.getUsername()));

        a.setScore(policeInfo.getScore());
        promotionRecService.updateById(a);
        return R.ok();
    }

    @RequiresPermissions("func:promotionRec:sync")
    @PostMapping(value = "sync")
    public R sync(PromotionRec promotionRec) {
        try {
            promotionRecMapper.sync(promotionRec.getId());
            return R.ok();
        } catch (Exception ex) {
            return R.fail(ex.getMessage());
        }
    }

    @RequiresPermissions("func:promotionRec:del")
    @PostMapping(value = "del/{id}")
    public R del(@PathVariable Long id) {
        promotionRecService.removeById(id);
        return R.ok();
    }

    @GetMapping(value = "get/{id}")
    public R get(@PathVariable Long id) {
        PromotionRec promotionRec = promotionRecService.getById(id);
        Integer rank = promotionRecMapper.getRank(promotionRec.getPid(), promotionRec.getUserid());
        return R.ok(rank);
    }
}

