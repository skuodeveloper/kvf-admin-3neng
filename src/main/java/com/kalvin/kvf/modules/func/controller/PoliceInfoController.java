package com.kalvin.kvf.modules.func.controller;

import java.util.Date;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.OrderItem;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.diboot.core.binding.Binder;
import com.diboot.core.binding.RelationsBinder;
import com.diboot.core.controller.BaseCrudRestController;
import com.kalvin.kvf.common.utils.ShiroKit;
import com.kalvin.kvf.modules.func.entity.Achievement;
import com.kalvin.kvf.modules.func.entity.History;
import com.kalvin.kvf.modules.func.entity.Punish;
import com.kalvin.kvf.modules.func.vo.PoliceInfoVo;
import com.kalvin.kvf.modules.sys.entity.Dept;
import com.kalvin.kvf.modules.sys.entity.User;
import com.kalvin.kvf.modules.sys.service.IDeptService;
import com.kalvin.kvf.modules.sys.service.IUserService;
import com.kalvin.kvf.modules.util.ScoreUtil;
import lombok.val;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import com.kalvin.kvf.common.controller.BaseController;
import com.kalvin.kvf.common.dto.R;
import com.kalvin.kvf.modules.func.entity.PoliceInfo;
import com.kalvin.kvf.modules.func.service.PoliceInfoService;

import java.text.NumberFormat;
import java.time.LocalDate;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.util.*;


/**
 * <p>
 * 民警基础信息表 前端控制器
 * </p>
 *
 * @since 2023-01-04 14:46:27
 */
@RestController
@RequestMapping("func/policeInfo")
public class PoliceInfoController extends BaseCrudRestController {

    @Autowired
    private PoliceInfoService policeInfoService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IDeptService deptService;

    @Autowired
    private ScoreUtil scoreUtil;

    @RequiresPermissions("func:policeInfo:index")
    @GetMapping("index")
    public ModelAndView index() {
        String user = ShiroKit.getUser().getUsername();
        return new ModelAndView("func/policeInfo")
                .addObject("user", user);
    }

    @RequiresPermissions("func:policeInfo:index")
    @GetMapping("index1")
    public ModelAndView index1(@RequestParam Integer id) {
        ModelAndView mv = new ModelAndView("func/myfile");
        PoliceInfo policeInfo = policeInfoService.getById(id);

        PoliceInfoVo policeInfoVo = RelationsBinder.convertAndBind(policeInfo, PoliceInfoVo.class);

        Double s = 0.0;
        //履历积分
        if (policeInfoVo.getHistorys() != null) {
            for (History h : policeInfoVo.getHistorys()) {
                s += h.getScore();
            }
        }

        //奖励积分
        if (policeInfoVo.getAchievements() != null) {
            for (Achievement h : policeInfoVo.getAchievements()) {
                //审核通过
                if (h.getStatus() == 1) {
                    s += h.getScore();
                }
            }
        }

        //惩戒扣分
        if (policeInfoVo.getPunishes() != null) {
            for (Punish h : policeInfoVo.getPunishes()) {
                s -= h.getScore();
            }
        }

        //参加工作时间每年计3分，不足的不计分
        Period period = getPeriod(policeInfoVo.getCjgzny());
        int y = period.getYears();
        s += y * 3;

        val gz = new History();
        gz.setContent(11);
        gz.setTStart(policeInfoVo.getCjgzny());
        gz.setScore(y * 3D);

        if (policeInfoVo.getHistorys() == null) {
            List<History> his = new ArrayList<>();
            policeInfoVo.setHistorys(his);
        }
        policeInfoVo.getHistorys().add(0, gz);

        //任一级警长后每年计0.5分，不足一年的按百分比计算
        if (StringUtils.isNotEmpty(policeInfoVo.getYjny())) {
            period = getPeriod(policeInfoVo.getYjny());
            y = period.getYears();
            int m = period.getMonths();
            s += Math.round((y * 12 + m) * 100 / 12 * 0.5) / 100.0;

            val yj = new History();
            yj.setContent(12);
            yj.setTStart(policeInfoVo.getYjny());
            yj.setScore(Math.round((y * 12 + m) * 100 / 12 * 0.5) / 100.0);
            policeInfoVo.getHistorys().add(1, yj);
        }


        NumberFormat format = NumberFormat.getInstance();
        format.setMaximumFractionDigits(2);
        String str = format.format(s);
        s = Double.parseDouble(str);
        policeInfoVo.setScore(s);

//        String headUrl = "http://10.120.143.75:8080/api/xp?userCardId=%s&sfzh=%s&appId=7401C77788EC1F96E050780A4D8F20F5&appSecret=RCG_gPqiw2ubT1vqwK7adw==";
//        headUrl = String.format(headUrl, policeInfoVo.getSfzh(), policeInfoVo.getSfzh());
//        policeInfoVo.setHeadUrl(headUrl);

        mv.addObject("editInfo", policeInfoVo);
        return mv;
    }

    @GetMapping(value = "edit")
    public ModelAndView edit(Long id) {
        ModelAndView mv = new ModelAndView("func/policeInfo_edit");
        PoliceInfo policeInfo;
        if (id == null) {
            policeInfo = new PoliceInfo();
        } else {
            policeInfo = policeInfoService.getById(id);
        }
        mv.addObject("editInfo", policeInfo);
        return mv;
    }

    @GetMapping(value = "list/data")
    public R listData(PoliceInfo policeInfo) {
        String userName = ShiroKit.getUser().getUsername();
        if (!"admin".equals(userName)) {
            policeInfo.setSfzh(userName);
        }

        Page<PoliceInfo> page = policeInfoService.listPoliceInfoPage(policeInfo);
        List<PoliceInfoVo> pfs = super.convertToVoAndBindRelations(page.getRecords(), PoliceInfoVo.class);
        pfs.forEach(o -> {
            Double s = 0.0;
            //履历积分
            if (o.getHistorys() != null) {
                for (History h : o.getHistorys()) {
                    s += h.getScore();
                }
            }

            //奖励积分
            if (o.getAchievements() != null) {
                for (Achievement h : o.getAchievements()) {
                    //审核通过
                    if (h.getStatus() == 1) {
                        s += h.getScore();
                    }
                }
            }

            //惩戒扣分
            if (o.getPunishes() != null) {
                for (Punish h : o.getPunishes()) {
                    s -= h.getScore();
                }
            }

            //参加工作时间每年计3分，不足的不计分
            Period period = getPeriod(o.getCjgzny());
            int y = period.getYears();
            s += y * 3;

            //任一级警长后每年计0.5分，不足一年的按百分比计算
            if (StringUtils.isNotEmpty(o.getYjny())) {
                period = getPeriod(o.getYjny());
                y = period.getYears();
                int m = period.getMonths();
                s += Math.round((y * 12 + m) * 100 / 12 * 0.5) / 100.0;
            }

            NumberFormat format = NumberFormat.getInstance();
            format.setMaximumFractionDigits(2);
            String str = format.format(s);
            s = Double.parseDouble(str);
            o.setScore(s);
        });


        Page<PoliceInfoVo> page1 = new Page<>();
        page1.setCurrent(page.getCurrent());
        page1.setTotal(page.getTotal());
        page1.setSize(page.getSize());
        page1.setRecords(pfs);

        return R.ok(page1);
    }

    /**
     * 获取输入时间到目前为止的时间间隔
     *
     * @param tStart
     * @return 年月
     */
    private Period getPeriod(String tStart) {
        int yearS = Integer.parseInt(tStart.substring(0, 4));
        int monthS = Integer.parseInt(tStart.substring(4, 6));
        LocalDate oldDate = LocalDate.of(yearS, monthS, 1);

        DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyyMM");
        LocalDate today = LocalDate.now();
        ;
        String tEnd = today.format(df);
        int yearD = Integer.parseInt(tEnd.substring(0, 4));
        int monthD = Integer.parseInt(tEnd.substring(4, 6));
        LocalDate newDate = LocalDate.of(yearD, monthD, 1);

        return Period.between(oldDate, newDate);
    }

    @RequiresPermissions("func:policeInfo:add")
    @PostMapping(value = "add")
    public R add(PoliceInfo policeInfo) {
        int cnt = policeInfoService.count(new LambdaQueryWrapper<PoliceInfo>()
                .eq(PoliceInfo::getSfzh, policeInfo.getSfzh()));
        if (cnt > 0) {
            return R.fail("该民警已在库中！");
        }

        policeInfo.setCreateTime(new Date());
        policeInfoService.save(policeInfo);

        //创建账号
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getUsername, policeInfo.getSfzh());
        cnt = userService.count(queryWrapper);
        if (cnt == 0) {
            User user = new User();
            user.setDeptId(policeInfo.getDeptId());
            user.setUsername(policeInfo.getSfzh());
            user.setRealname(policeInfo.getXm());
            user.setSex(policeInfo.getXb());
            user.setPhone(policeInfo.getTel());
            user.setTel(policeInfo.getTel());
            user.setStatus(0);
            user.setSort(0);
            user.setDelFlag(0);
            user.setCreateBy(1L);
            user.setCreateTime(new Date());

            List<Long> roleIds = new ArrayList<>();
            roleIds.add(6L);
            userService.addUser(user, roleIds);
        }

        scoreUtil.update(policeInfo);
        return R.ok();
    }

    @RequiresPermissions("func:policeInfo:del")
    @PostMapping(value = "batchdel")
    public R batchdel(@RequestParam("ids") List<Long> ids) {
        policeInfoService.removeByIds(ids);
        return R.ok();
    }

    @RequiresPermissions("func:policeInfo:edit")
    @PostMapping(value = "edit")
    public R edit(PoliceInfo policeInfo) {
        policeInfoService.updateById(policeInfo);

        scoreUtil.update(policeInfo);
        return R.ok();
    }

    @RequiresPermissions("func:policeInfo:del")
    @PostMapping(value = "del/{id}")
    public R del(@PathVariable Long id) {
        policeInfoService.removeById(id);
        return R.ok();
    }

    @GetMapping(value = "get/{id}")
    public R get(@PathVariable Long id) {
        return R.ok(policeInfoService.getById(id));
    }

    /**
     * post 两种方式的一种
     * RequestParam
     */
    @PostMapping(value = "upload1")
    public R upload1(@RequestParam String jsonStr) {
        try {
            JSONArray jsonArray = JSONObject.parseArray(jsonStr);
            List<PoliceInfo> zdryList = new ArrayList<>();

            for (int i = 0; i < jsonArray.size(); i++) {
                if (i == 0) {
                    continue;
                }

                PoliceInfo zdry = new PoliceInfo();
                Map m = (Map) jsonArray.get(i);

                zdryList.add(zdry);
            }
            policeInfoService.saveBatch(zdryList);
        } catch (Exception ex) {
            return R.fail(ex.getMessage());
        }

        return R.ok();
    }

    /**
     * post 两种方式的一种
     * RequestBody
     */
    @PostMapping(value = "upload")
    public R upload(@RequestBody JSONArray jsonArray) {
        try {
            List<PoliceInfo> zdryList = new ArrayList<>();

            for (int i = 0; i < jsonArray.size(); i++) {
                if (i == 0) {
                    continue;
                }

                Map map = (Map) jsonArray.get(i);

                //碰到空白行跳过
                if (StringUtils.isEmpty(map.get("G").toString())) {
                    continue;
                }

                PoliceInfo zdry = policeInfoService.getOne(new LambdaQueryWrapper<PoliceInfo>()
                        .eq(PoliceInfo::getSfzh, map.get("G").toString()));

                Dept dept = deptService.getOne(new LambdaQueryWrapper<Dept>()
                        .eq(Dept::getName, map.get("A").toString()));

                int sex;
                switch (map.get("E").toString()) {
                    case "男":
                        sex = 1;
                        break;
                    case "女":
                        sex = 2;
                        break;
                    default:
                        sex = 0;
                        break;
                }

                if (zdry == null) {
                    zdry = new PoliceInfo();

                    //创建登录账号
                    LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
                    queryWrapper.eq(User::getUsername, map.get("G").toString());
                    int cnt = userService.count(queryWrapper);
                    if (cnt == 0) {
                        User user = new User();
                        if (dept != null) {
                            user.setDeptId(dept.getId());

                        }
                        //身份证号作为登录账号
                        user.setUsername(map.get("G").toString());
                        //真是姓名
                        user.setRealname(map.get("D").toString());
                        user.setSex(sex);
                        user.setStatus(0);
                        user.setSort(0);
                        user.setDelFlag(0);
                        user.setCreateBy(1L);
                        user.setCreateTime(new Date());

                        List<Long> roleIds = new ArrayList<>();
                        roleIds.add(6L);
                        userService.addUser(user, roleIds);
                    }
                }

                zdry.setXm(map.get("D").toString());
                zdry.setSfzh(map.get("G").toString());


                if (dept != null) {
                    zdry.setDeptId(dept.getId());
                    zdry.setDept(dept.getName());
                }


                zdry.setXb(sex);

                zdry.setCsny(nullify(map.get("H")).replaceAll("\\.", ""));
                zdry.setCjgzny(nullify(map.get("L")).replaceAll("\\.", ""));
                zdry.setCjgany(nullify(map.get("K")).replaceAll("\\.", ""));
                int jwxl;
                if (map.get("S").toString().contains("警务技术")) {
                    jwxl = 2;
                } else {
                    jwxl = 1;
                }
                zdry.setJwxl(jwxl);
                String yjny = nullify(map.get("W")).replaceAll("\\.", "");
                if (StringUtils.isEmpty(yjny) || yjny.contains("-")) {
                    yjny = nullify(map.get("T")).replaceAll("\\.", "");
                }
                zdry.setYjny(yjny);
                zdry.setCreateTime(new Date());

                zdryList.add(zdry);
            }
            policeInfoService.saveOrUpdateBatch(zdryList);
        } catch (Exception ex) {
            return R.fail(ex.getMessage());
        }

        return R.ok();
    }

    /**
     * null转空字符串
     *
     * @param obj
     * @return
     */
    private String nullify(Object obj) {
        String str = "";
        if (obj != null) {
            str = obj.toString();
            // 读取数据过程中2010.10 会变成2010.1 故最后添加一个0
            if (str.length() == 6) {
                str = str + "0";
            }
        }
        return str;
    }
}

