package com.kalvin.kvf.modules.func.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.kalvin.kvf.common.utils.ShiroKit;
import com.kalvin.kvf.modules.func.entity.Achievement;
import com.kalvin.kvf.modules.func.entity.PoliceInfo;
import com.kalvin.kvf.modules.func.service.PoliceInfoService;
import com.kalvin.kvf.modules.util.ScoreUtil;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import com.kalvin.kvf.common.controller.BaseController;
import com.kalvin.kvf.common.dto.R;
import com.kalvin.kvf.modules.func.entity.Punish;
import com.kalvin.kvf.modules.func.service.PunishService;

import java.util.Date;
import java.util.List;


/**
 * <p>
 * 惩戒表 前端控制器
 * </p>
 * @since 2023-01-13 13:59:20
 */
@RestController
@RequestMapping("func/punish")
public class PunishController extends BaseController {

    @Autowired
    private PunishService punishService;

    @Autowired
    private PoliceInfoService policeInfoService;

    @Autowired
    private ScoreUtil scoreUtil;

    @RequiresPermissions("func:punish:index")
    @GetMapping("index")
    public ModelAndView index(@RequestParam Integer pId) {
        ModelAndView mv = new ModelAndView("func/punish");
        mv.addObject("pId", pId);
        return mv;
    }

    @RequiresPermissions("func:punish:index")
    @GetMapping("index1")
    public ModelAndView index1() {
        ModelAndView mv;
        if(ShiroKit.getUser().getUsername().equals("admin")){
            mv = new ModelAndView("func/punish1");
        }else {
            PoliceInfo policeInfo = policeInfoService.getOne(new LambdaQueryWrapper<PoliceInfo>()
                    .eq(PoliceInfo::getSfzh, ShiroKit.getUser().getUsername()));

            mv = new ModelAndView("func/punish")
                    .addObject("pId", policeInfo.getId());
        }
        return mv;
    }
//
//    @RequiresPermissions("func:punish:index")
//    @GetMapping("index1")
//    public ModelAndView index1() {
//        ModelAndView mv = new ModelAndView("func/punish1");
//        return mv;
//    }

    @GetMapping(value = "edit")
    public ModelAndView edit(Long id) {
        ModelAndView mv = new ModelAndView("func/punish_edit1");
        Punish punish;
        if (id == null) {
            punish = new Punish();
        } else {
            punish = punishService.getById(id);
            PoliceInfo policeInfo = policeInfoService.getById(punish.getPId());
            punish.setSfzh(policeInfo.getSfzh());
        }
        mv.addObject("editInfo", punish);
        return mv;
    }

    @GetMapping(value = "edit1")
    public ModelAndView edit1(Integer pId) {
        ModelAndView mv = new ModelAndView("func/punish_edit");
        Punish punish = new Punish();
        punish.setPId(pId);

        PoliceInfo policeInfo = policeInfoService.getById(pId);
        punish.setPName(policeInfo.getXm());

        mv.addObject("editInfo", punish);
        return mv;
    }

    @GetMapping(value = "list/data")
    public R listData(Punish punish) {
        Page<Punish> page = punishService.listPunishPage(punish);
        return R.ok(page);
    }

    @RequiresPermissions("func:punish:add")
    @PostMapping(value = "add")
    public R add(Punish punish) {
        punish.setCreateTime(new Date());
        punishService.save(punish);

        PoliceInfo policeInfo = policeInfoService.getById(punish.getPId());
        scoreUtil.update(policeInfo);
        return R.ok();
    }

    @RequiresPermissions("func:punish:del")
    @PostMapping(value = "batchdel")
    public R batchdel(@RequestParam("ids") List<Long> ids) {
        ids.forEach(o -> {
            Punish punish = punishService.getById(o);
            punishService.removeById(o);

            PoliceInfo policeInfo = policeInfoService.getById(punish.getPId());
            scoreUtil.update(policeInfo);
        });
        return R.ok();
    }

    @RequiresPermissions("func:punish:edit")
    @PostMapping(value = "edit")
    public R edit(Punish punish) {
        punishService.updateById(punish);

        PoliceInfo policeInfo = policeInfoService.getById(punish.getPId());
        scoreUtil.update(policeInfo);
        return R.ok();
    }

    @RequiresPermissions("func:punish:del")
    @PostMapping(value = "del/{id}")
    public R del(@PathVariable Long id) {
        Punish punish = punishService.getById(id);
        punishService.removeById(id);

        PoliceInfo policeInfo = policeInfoService.getById(punish.getPId());
        scoreUtil.update(policeInfo);
        return R.ok();
    }

    @GetMapping(value = "get/{id}")
    public R get(@PathVariable Long id) {
        return R.ok(punishService.getById(id));
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
}

