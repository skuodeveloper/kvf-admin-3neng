package com.kalvin.kvf.modules.sys.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.kalvin.kvf.common.annotation.Log;
import com.kalvin.kvf.common.controller.BaseController;
import com.kalvin.kvf.common.dto.R;
import com.kalvin.kvf.common.shiro.UsernamePasswordPkiToken;
import com.kalvin.kvf.common.utils.HttpServletContextKit;
import com.kalvin.kvf.common.utils.ShiroKit;
import com.kalvin.kvf.modules.sys.entity.User;
import com.kalvin.kvf.modules.sys.service.IUserService;
import com.kalvin.kvf.modules.util.PkiUtil;
import com.wf.captcha.GifCaptcha;
import com.wf.captcha.utils.CaptchaUtil;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 作用：LayOA系统登录<br>
 * 说明：(无)
 *
 * @author Kalvin
 * @Date 2019年05月05日 15:14
 */
@RestController
public class LoginController extends BaseController {
    @Autowired
    private IUserService userService;

    @Value(value = "${kvf.login.authcode.enable}")
    private boolean needAuthCode;

    @Value(value = "${kvf.login.authcode.dynamic}")
    private boolean isDynamic;

    @GetMapping(value = "login")
    public ModelAndView login() {
        Subject subject = ShiroKit.getSubject();
        if (subject.isAuthenticated()) {
            return new ModelAndView("redirect:");
        }
        return new ModelAndView("login");
    }

    @Log("登录")
    @PostMapping(value = "login")
    public R login(@RequestParam("username") String username, @RequestParam("password") String password, boolean rememberMe, String vercode) {

        // 只有开启了验证码功能才需要验证。可在yml配置kvf.login.authcode.enable来开启或关闭
        if (needAuthCode) {
            // 验证码校验
            HttpServletRequest request = HttpServletContextKit.getHttpServletRequest();
            if (!CaptchaUtil.ver(vercode, request)) {
                // 清除session中的验证码
                CaptchaUtil.clear(request);
                return R.fail("验证码不正确");
            }
        }

        try {
            Subject subject = ShiroKit.getSubject();
            UsernamePasswordToken token = new UsernamePasswordToken(username, password, rememberMe);
            subject.login(token);

            ShiroKit.setSessionAttribute("user", username);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return R.fail(e.getMessage());
        }

        return R.ok();
    }

    @Log("PKI登录")
    @RequestMapping(value = "pki")
    public void loginkpi(HttpServletRequest request, HttpServletResponse response) {
        String serverName = request.getServerName();
        String contextPath = request.getContextPath();
        String path = "http://" + serverName + ":7788" + contextPath;

        try {
            System.out.println("kpi login!");
            Object x509Certificate = request.getAttribute(PkiUtil.X509CertificateKey);
            PkiUtil.PkiVo pkiVo = PkiUtil.getInfo((java.security.cert.X509Certificate[]) x509Certificate);
            System.out.println("---------" + pkiVo.getName() + pkiVo.getIdentityNumber() + "----------");

            User user = userService.getOne(new LambdaQueryWrapper<User>()
                    .eq(User::getUsername, pkiVo.getIdentityNumber()));

            if (user == null) {
                String url = path + "/sys/user/register?name=" + pkiVo.getName() + "&sfzh=" + pkiVo.getIdentityNumber();
                String script = "<script>window.location.href='" + url + "'</script>";
                write(response, script);
            } else if (user.getStatus() == 1) {
                String url = path + "/login";
                String script = "<script>alert('你的账号尚未审核，暂且无法登陆，请联系管理员！');window.location.href='" + url + "'</script>";
                write(response, script);
            } else {
                Subject subject = ShiroKit.getSubject();
                UsernamePasswordPkiToken token = new UsernamePasswordPkiToken(user.getUsername(), "123456", true, true);
                subject.login(token);

                ShiroKit.setSessionAttribute("user", user.getUsername());

                //重定向
                String url = path;
                response.sendRedirect(url);
            }
        } catch (Exception ex) {
            String url = path + "/login";
            String script = "<script>alert('你无法登陆，请联系管理员！');window.location.href='" + url + "'</script>";
            write(response, script);
        }
    }

    @Log("退出")
    @GetMapping(value = "logout")
    public R logout() {
        String username = ShiroKit.getUser().getUsername();
        ShiroKit.logout();
        LOGGER.info("{}退出登录", username);
        return R.ok();
    }

    /**
     * 图片验证码
     */
    @GetMapping(value = "captcha")
    public void captcha(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 可在yml配置kvf.login.authcode.dynamic切换动静态图片验证码，默认静态
        // 其它验证码样式可前往查看：https://gitee.com/whvse/EasyCaptcha
        if (isDynamic) {
            CaptchaUtil.out(new GifCaptcha(), request, response);
        } else {
            CaptchaUtil.out(request, response);
        }
    }

    private void write(HttpServletResponse response, String str) {
        response.setCharacterEncoding("utf-8");
        response.setHeader("Content-type", "text/html;charset=UTF-8");
        try (PrintWriter writer = response.getWriter()) {
            writer.write(str);
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }
}
