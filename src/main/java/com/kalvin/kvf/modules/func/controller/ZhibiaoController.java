package com.kalvin.kvf.modules.func.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import com.kalvin.kvf.common.controller.BaseController;
import com.kalvin.kvf.common.dto.R;
import com.kalvin.kvf.modules.func.entity.Zhibiao;
import com.kalvin.kvf.modules.func.service.ZhibiaoService;

import java.util.List;


/**
 * <p>
 * 指标 前端控制器
 * </p>
 * @since 2022-05-12 14:11:31
 */
@RestController
@RequestMapping("func/zhibiao")
public class ZhibiaoController extends BaseController {

    @Autowired
    private ZhibiaoService zhibiaoService;

    @RequiresPermissions("func:zhibiao:index")
    @GetMapping("index")
    public ModelAndView index() {
        return new ModelAndView("func/zhibiao");
    }

    @GetMapping(value = "edit")
    public ModelAndView edit(Long id) {
        ModelAndView mv = new ModelAndView("func/zhibiao_edit");
        Zhibiao zhibiao;
        if (id == null) {
            zhibiao = new Zhibiao();
        } else {
            zhibiao = zhibiaoService.getById(id);
        }
        mv.addObject("editInfo", zhibiao);
        return mv;
    }

    @GetMapping(value = "list/data")
    public R listData(Zhibiao zhibiao) {
        Page<Zhibiao> page = zhibiaoService.listZhibiaoPage(zhibiao);
        return R.ok(page);
    }

    @RequiresPermissions("func:zhibiao:add")
    @PostMapping(value = "add")
    public R add(Zhibiao zhibiao) {
        zhibiaoService.save(zhibiao);
        return R.ok();
    }

    @RequiresPermissions("func:zhibiao:del")
    @PostMapping(value = "batchdel")
    public R batchdel(@RequestParam("ids") List<Long> ids) {
        zhibiaoService.removeByIds(ids);
        return R.ok();
    }

    @RequiresPermissions("func:zhibiao:edit")
    @PostMapping(value = "edit")
    public R edit(Zhibiao zhibiao) {
        zhibiaoService.updateById(zhibiao);
        return R.ok();
    }

    @RequiresPermissions("func:zhibiao:del")
    @PostMapping(value = "del/{id}")
    public R del(@PathVariable Long id) {
        zhibiaoService.removeById(id);
        return R.ok();
    }

    @GetMapping(value = "get/{id}")
    public R get(@PathVariable Long id) {
        return R.ok(zhibiaoService.getById(id));
    }
}

