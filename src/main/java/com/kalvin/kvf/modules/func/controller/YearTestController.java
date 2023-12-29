package com.kalvin.kvf.modules.func.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.kalvin.kvf.common.utils.ShiroKit;
import com.kalvin.kvf.modules.func.entity.Achievement;
import com.kalvin.kvf.modules.func.entity.PoliceInfo;
import com.kalvin.kvf.modules.func.service.PoliceInfoService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import com.kalvin.kvf.common.controller.BaseController;
import com.kalvin.kvf.common.dto.R;
import com.kalvin.kvf.modules.func.entity.YearTest;
import com.kalvin.kvf.modules.func.service.YearTestService;

import java.util.Date;
import java.util.List;


/**
 * <p>
 * 年度考核表 前端控制器
 * </p>
 *
 * @since 2023-01-13 15:52:38
 */
@RestController
@RequestMapping("func/yearTest")
public class YearTestController extends BaseController {

    @Autowired
    private YearTestService yearTestService;

    @Autowired
    private PoliceInfoService policeInfoService;

    @RequiresPermissions("func:yearTest:index")
    @GetMapping("index")
    public ModelAndView index(@RequestParam Integer pId) {
        ModelAndView mv = new ModelAndView("func/yearTest");
        mv.addObject("pId", pId);
        return mv;
    }

    @RequiresPermissions("func:yearTest:index")
    @GetMapping("index1")
    public ModelAndView index1() {
        ModelAndView mv;
        if(ShiroKit.getUser().getUsername().equals("admin")){
            mv = new ModelAndView("func/yearTest1");
        }else {
            PoliceInfo policeInfo = policeInfoService.getOne(new LambdaQueryWrapper<PoliceInfo>()
                    .eq(PoliceInfo::getSfzh, ShiroKit.getUser().getUsername()));

            mv = new ModelAndView("func/yearTest")
                    .addObject("pId", policeInfo.getId());
        }
        return mv;
    }

    @GetMapping(value = "edit")
    public ModelAndView edit(Long id) {
        ModelAndView mv = new ModelAndView("func/yearTest_edit1");
        YearTest yearTest;
        if (id == null) {
            yearTest = new YearTest();
        } else {
            yearTest = yearTestService.getById(id);
            PoliceInfo policeInfo = policeInfoService.getById(yearTest.getPId());
            yearTest.setSfzh(policeInfo.getSfzh());
        }
        mv.addObject("editInfo", yearTest);
        return mv;
    }


    @GetMapping(value = "edit1")
    public ModelAndView edit1(Integer pId) {
        ModelAndView mv = new ModelAndView("func/yearTest_edit");
        YearTest yearTest = new YearTest();
        yearTest.setPId(pId);

        PoliceInfo policeInfo = policeInfoService.getById(pId);
        yearTest.setPName(policeInfo.getXm());

        mv.addObject("editInfo", yearTest);
        return mv;
    }

    @GetMapping(value = "edit2")
    public ModelAndView edit2(Long id) {
        ModelAndView mv = new ModelAndView("func/yearTest_edit");
        YearTest yearTest;
        if (id == null) {
            yearTest = new YearTest();
        } else {
            yearTest = yearTestService.getById(id);
        }
        mv.addObject("editInfo", yearTest);
        return mv;
    }

    @GetMapping(value = "list/data")
    public R listData(YearTest yearTest) {
        Page<YearTest> page = yearTestService.listYearTestPage(yearTest);
        return R.ok(page);
    }


    @GetMapping(value = "getPoliceName")
    public R getPoliceName(@RequestParam String sfzh) {
        try {
            PoliceInfo policeInfo = policeInfoService.getOne(new LambdaQueryWrapper<PoliceInfo>()
                    .eq(PoliceInfo::getSfzh, sfzh));
            if(policeInfo != null){
                return R.ok(policeInfo);
            }else{
                return R.fail("对不起，该警员在数据库中不存在，请联系管理员！");
            }
        } catch (Exception e) {
            return R.fail(e.getMessage());
        }
    }

    @RequiresPermissions("func:yearTest:add")
    @PostMapping(value = "add")
    public R add(YearTest yearTest) {
        yearTest.setCreateTime(new Date());
        yearTestService.save(yearTest);
        return R.ok();
    }

    @RequiresPermissions("func:yearTest:del")
    @PostMapping(value = "batchdel")
    public R batchdel(@RequestParam("ids") List<Long> ids) {
        yearTestService.removeByIds(ids);
        return R.ok();
    }

    @RequiresPermissions("func:yearTest:edit")
    @PostMapping(value = "edit")
    public R edit(YearTest yearTest) {
        yearTestService.updateById(yearTest);
        return R.ok();
    }

    @RequiresPermissions("func:yearTest:del")
    @PostMapping(value = "del/{id}")
    public R del(@PathVariable Long id) {
        yearTestService.removeById(id);
        return R.ok();
    }

    @GetMapping(value = "get/{id}")
    public R get(@PathVariable Long id) {
        return R.ok(yearTestService.getById(id));
    }
}

