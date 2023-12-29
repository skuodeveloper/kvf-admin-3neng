package com.kalvin.kvf.modules.func.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.kalvin.kvf.modules.func.entity.Police;
import com.kalvin.kvf.modules.func.service.PoliceService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import com.kalvin.kvf.common.controller.BaseController;
import com.kalvin.kvf.common.dto.R;
import com.kalvin.kvf.modules.func.entity.FufenRecord;
import com.kalvin.kvf.modules.func.service.FufenRecordService;

import java.util.List;


/**
 * <p>
 * 民警赋分记录表 前端控制器
 * </p>
 * @since 2022-05-13 15:14:18
 */
@RestController
@RequestMapping("func/fufenRecord")
public class FufenRecordController extends BaseController {

    @Autowired
    private FufenRecordService fufenRecordService;

    @Autowired
    private PoliceService policeService;

    @RequiresPermissions("func:fufenRecord:index")
    @GetMapping("index")
    public ModelAndView index(@RequestParam Integer policeId) {
        ModelAndView mv = new ModelAndView("func/fufenRecord");
        mv.addObject("policeId", policeId);
        return mv;
    }

    @GetMapping(value = "edit")
    public ModelAndView edit(@RequestParam Integer policeId) {
        ModelAndView mv = new ModelAndView("func/fufenRecord_edit");
        mv.addObject("policeId", policeId);
        return mv;
    }

    @GetMapping(value = "list/data")
    public R listData(FufenRecord fufenRecord) {
        Page<FufenRecord> page = fufenRecordService.listFufenRecordPage(fufenRecord);
        return R.ok(page);
    }

    @RequiresPermissions("func:fufenRecord:add")
    @PostMapping(value = "add")
    @Transactional
    public R add(FufenRecord fufenRecord) {
        try {
            Police police = policeService.getById(fufenRecord.getPoliceId());
            police.setJifen(police.getJifen().add(fufenRecord.getJifen()));
            policeService.updateById(police);

            fufenRecordService.save(fufenRecord);
            return R.ok();
        }catch(Exception ex){
            return R.fail(ex.getMessage());
        }
    }

    @RequiresPermissions("func:fufenRecord:del")
    @PostMapping(value = "batchdel")
    @Transactional
    public R batchdel(@RequestParam("ids") List<Long> ids) {
        try {
            for (Long id: ids) {
                FufenRecord fufenRecord = fufenRecordService.getById(id);
                Police police = policeService.getById(fufenRecord.getPoliceId());
                police.setJifen(police.getJifen().subtract(fufenRecord.getJifen()));
                policeService.updateById(police);
            }

            fufenRecordService.removeByIds(ids);
            return R.ok();
        }catch(Exception ex){
            return R.fail(ex.getMessage());
        }
    }

    @RequiresPermissions("func:fufenRecord:edit")
    @PostMapping(value = "edit")
    public R edit(FufenRecord fufenRecord) {
        fufenRecordService.updateById(fufenRecord);
        return R.ok();
    }

    @RequiresPermissions("func:fufenRecord:del")
    @PostMapping(value = "del/{id}")
    public R del(@PathVariable Long id) {
        fufenRecordService.removeById(id);
        return R.ok();
    }

    @GetMapping(value = "get/{id}")
    public R get(@PathVariable Long id) {
        return R.ok(fufenRecordService.getById(id));
    }

}

