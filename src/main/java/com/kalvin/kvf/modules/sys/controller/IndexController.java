package com.kalvin.kvf.modules.sys.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.kalvin.kvf.common.controller.BaseController;
import com.kalvin.kvf.common.dto.R;
import com.kalvin.kvf.common.utils.ShiroKit;
import com.kalvin.kvf.modules.func.entity.PoliceInfo;
import com.kalvin.kvf.modules.func.service.PoliceInfoService;
import com.kalvin.kvf.modules.sys.entity.User;
import com.kalvin.kvf.modules.sys.service.IMenuService;
import com.kalvin.kvf.modules.sys.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
public class IndexController extends BaseController {

    @Autowired
    private IMenuService menuService;

    @Autowired
    private IUserService userService;

    @Autowired
    private PoliceInfoService policeInfoService;

    @GetMapping(value = "/")
    public ModelAndView index() {
        User user = userService.getById(ShiroKit.getUserId());
        return new ModelAndView("index").addObject("authUserInfo", user);
    }

    @GetMapping(value = "home")
    public ModelAndView home(HttpServletResponse hsr) throws ServletException, IOException {
        if (ShiroKit.getUser().getUsername().equals("admin")) {
            return new ModelAndView("home");
        } else {
            PoliceInfo policeInfo = policeInfoService.getOne(new LambdaQueryWrapper<PoliceInfo>()
                    .eq(PoliceInfo::getSfzh, ShiroKit.getUser().getUsername()));

            hsr.sendRedirect("func/policeInfo/index1?id=" + policeInfo.getId());
            return null;
        }
    }


    @GetMapping(value = "index/menus")
    public R menus() {
        return R.ok(menuService.listUserPermissionMenuWithSubByUserId(ShiroKit.getUserId()));
    }

    @GetMapping(value = "index/navMenus")
    public R navMenus() {
        return R.ok(menuService.listUserPermissionNavMenuByUserId(ShiroKit.getUserId()));
    }

}
