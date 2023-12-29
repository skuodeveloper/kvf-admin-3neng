package com.kalvin.kvf.modules.func.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import com.kalvin.kvf.common.controller.BaseController;
import com.kalvin.kvf.common.dto.R;
import com.kalvin.kvf.modules.func.entity.ZhibiaoRule;
import com.kalvin.kvf.modules.func.service.ZhibiaoRuleService;

import java.util.List;


/**
 * <p>
 * 赋分规则 前端控制器
 * </p>
 * @since 2022-05-12 14:12:22
 */
@RestController
@RequestMapping("func/zhibiaoRule")
public class ZhibiaoRuleController extends BaseController {

    @Autowired
    private ZhibiaoRuleService zhibiaoRuleService;

    @RequiresPermissions("func:zhibiaoRule:index")
    @GetMapping("index")
    public ModelAndView index(@RequestParam Integer zbId) {
        ModelAndView mv = new ModelAndView("func/zhibiaoRule");
        mv.addObject("zbId", zbId);
        return mv;
    }

    @GetMapping(value = "edit")
    public ModelAndView edit(Long id) {
        ModelAndView mv = new ModelAndView("func/zhibiaoRule_edit");
        ZhibiaoRule zhibiaoRule;
        if (id == null) {
            zhibiaoRule = new ZhibiaoRule();
        } else {
            zhibiaoRule = zhibiaoRuleService.getById(id);
        }
        mv.addObject("editInfo", zhibiaoRule);
        return mv;
    }

    @GetMapping(value = "list/data")
    public R listData(ZhibiaoRule zhibiaoRule) {
        Page<ZhibiaoRule> page = zhibiaoRuleService.listZhibiaoRulePage(zhibiaoRule);
        return R.ok(page);
    }

    @RequiresPermissions("func:zhibiaoRule:add")
    @PostMapping(value = "add")
    public R add(ZhibiaoRule zhibiaoRule) {
        zhibiaoRuleService.save(zhibiaoRule);
        return R.ok();
    }

    @RequiresPermissions("func:zhibiaoRule:del")
    @PostMapping(value = "batchdel")
    public R batchdel(@RequestParam("ids") List<Long> ids) {
        zhibiaoRuleService.removeByIds(ids);
        return R.ok();
    }

    @RequiresPermissions("func:zhibiaoRule:edit")
    @PostMapping(value = "edit")
    public R edit(ZhibiaoRule zhibiaoRule) {
        zhibiaoRuleService.updateById(zhibiaoRule);
        return R.ok();
    }

    @RequiresPermissions("func:zhibiaoRule:del")
    @PostMapping(value = "del/{id}")
    public R del(@PathVariable Long id) {
        zhibiaoRuleService.removeById(id);
        return R.ok();
    }

    @GetMapping(value = "get/{id}")
    public R get(@PathVariable Long id) {
        return R.ok(zhibiaoRuleService.getById(id));
    }

}

