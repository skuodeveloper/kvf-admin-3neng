package com.kalvin.kvf.modules.func.controller;

import java.time.LocalDateTime;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.conditions.query.LambdaQueryChainWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.diboot.core.controller.BaseCrudRestController;
import com.kalvin.kvf.common.utils.ShiroKit;
import com.kalvin.kvf.modules.func.entity.PoliceInfo;
import com.kalvin.kvf.modules.func.entity.PromotionRec;
import com.kalvin.kvf.modules.func.service.PoliceInfoService;
import com.kalvin.kvf.modules.func.service.PromotionRecService;
import com.kalvin.kvf.modules.func.vo.PromotionVo;
import com.kalvin.kvf.modules.sys.entity.User;
import com.kalvin.kvf.modules.sys.service.IUserService;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import com.kalvin.kvf.common.controller.BaseController;
import com.kalvin.kvf.common.dto.R;
import com.kalvin.kvf.modules.func.entity.Promotion;
import com.kalvin.kvf.modules.func.service.PromotionService;

import java.util.List;


/**
 * <p>
 * 报名管理表 前端控制器
 * </p>
 *
 * @since 2023-02-02 11:02:18
 */
@RestController
@RequestMapping("func/promotion")
public class PromotionController extends BaseCrudRestController {

    @Autowired
    private PromotionService promotionService;

    @Autowired
    private PromotionRecService promotionRecService;

    @Autowired
    private IUserService userService;

    @Autowired
    private PoliceInfoService policeInfoService;

    @RequiresPermissions("func:promotion:index")
    @GetMapping("index")
    public ModelAndView index() {
        String user = ShiroKit.getUser().getUsername();
        return new ModelAndView("func/promotion")
                .addObject("user", user);
    }

    @GetMapping(value = "edit")
    public ModelAndView edit(Long id) {
        ModelAndView mv = new ModelAndView("func/promotion_edit");
        Promotion promotion;
        if (id == null) {
            promotion = new Promotion();
        } else {
            promotion = promotionService.getById(id);
        }
        mv.addObject("editInfo", promotion);
        return mv;
    }

    @GetMapping(value = "list/data")
    public R listData(Promotion promotion) {
        Page<Promotion> page = promotionService.listPromotionPage(promotion);
        for (Promotion o : page.getRecords()) {
            int cnt = promotionRecService.count(new LambdaQueryWrapper<PromotionRec>()
                    .eq(PromotionRec::getPid, o.getId())
                    .eq(PromotionRec::getUserid, ShiroKit.getUserId()));

            o.setIsApprove(cnt > 0);
        }
        return R.ok(page);
    }

    @RequiresPermissions("func:promotion:add")
    @PostMapping(value = "add")
    public R add(Promotion promotion) {
        promotionService.save(promotion);
        return R.ok();
    }

    @RequiresPermissions("func:promotion:del")
    @PostMapping(value = "batchdel")
    public R batchdel(@RequestParam("ids") List<Long> ids) {
        promotionService.removeByIds(ids);
        return R.ok();
    }

    @RequiresPermissions("func:promotion:edit")
    @PostMapping(value = "edit")
    public R edit(Promotion promotion) {
        promotionService.updateById(promotion);
        return R.ok();
    }

    @RequiresPermissions("func:promotion:del")
    @PostMapping(value = "del/{id}")
    public R del(@PathVariable Long id) {
        promotionService.removeById(id);
        return R.ok();
    }

    @RequiresPermissions("func:promotion:approve")
    @PostMapping(value = "approve/{id}")
    public R approve(@PathVariable Long id) {
        try {
            Promotion promotion = promotionService.getById(id);
            User user = userService.getById(ShiroKit.getUserId());
            PoliceInfo policeInfo = policeInfoService.getOne(new LambdaQueryWrapper<PoliceInfo>()
                    .eq(PoliceInfo::getSfzh, user.getUsername()));

            PromotionRec promotionRec = new PromotionRec();
            promotionRec.setUserid(user.getId());
            promotionRec.setUsername(user.getRealname());
            promotionRec.setPid(promotion.getId());
            promotionRec.setTitle(promotion.getTitle());
            promotionRec.setContent(promotion.getContent());
            promotionRec.setScore(policeInfo.getScore());

            promotionRecService.save(promotionRec);
            return R.ok();
        } catch (Exception ex) {
            return R.fail(ex.getMessage());
        }
    }


    @GetMapping(value = "get/{id}")
    public R get(@PathVariable Long id) {
        return R.ok(promotionService.getById(id));
    }

}

