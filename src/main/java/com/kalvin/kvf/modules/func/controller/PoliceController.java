package com.kalvin.kvf.modules.func.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import com.kalvin.kvf.common.controller.BaseController;
import com.kalvin.kvf.common.dto.R;
import com.kalvin.kvf.modules.func.entity.Police;
import com.kalvin.kvf.modules.func.service.PoliceService;

import java.util.List;


/**
 * <p>
 * 民警表 前端控制器
 * </p>
 * @since 2022-05-11 15:25:56
 */
@RestController
@RequestMapping("func/police")
public class PoliceController extends BaseController {

    @Autowired
    private PoliceService policeService;

    @RequiresPermissions("func:police:index")
    @GetMapping("index")
    public ModelAndView index() {
        return new ModelAndView("func/police");
    }

    @GetMapping(value = "edit")
    public ModelAndView edit(Long id) {
        ModelAndView mv = new ModelAndView("func/police_edit");
        Police police;
        if (id == null) {
            police = new Police();
        } else {
            police = policeService.getById(id);
        }
        mv.addObject("editInfo", police);
        return mv;
    }

    @GetMapping(value = "list/data")
    public R listData(Police police) {
        Page<Police> page = policeService.listPolicePage(police);
        return R.ok(page);
    }

    @RequiresPermissions("func:police:add")
    @PostMapping(value = "add")
    public R add(Police police) {
        policeService.save(police);
        return R.ok();
    }

    @RequiresPermissions("func:police:del")
    @PostMapping(value = "batchdel")
    public R batchdel(@RequestParam("ids") List<Long> ids) {
        policeService.removeByIds(ids);
        return R.ok();
    }

    @RequiresPermissions("func:police:edit")
    @PostMapping(value = "edit")
    public R edit(Police police) {
        policeService.updateById(police);
        return R.ok();
    }

    @RequiresPermissions("func:police:del")
    @PostMapping(value = "del/{id}")
    public R del(@PathVariable Long id) {
        policeService.removeById(id);
        return R.ok();
    }

    @GetMapping(value = "get/{id}")
    public R get(@PathVariable Long id) {
        return R.ok(policeService.getById(id));
    }

}

