package com.kalvin.kvf.common.shiro;

import lombok.Data;
import org.apache.shiro.authc.UsernamePasswordToken;

@Data
public class UsernamePasswordPkiToken extends UsernamePasswordToken {
    private String username;
    private char[] password;
    private boolean rememberMe;
    private boolean isPki = false;

    public UsernamePasswordPkiToken(String username, String password, boolean rememberMe, boolean isPki) {
        this(username, (char[])(password != null ? password.toCharArray() : null), rememberMe, isPki);
    }

    public UsernamePasswordPkiToken(String username, char[] password, boolean rememberMe, boolean isPki) {
        this.username = username;
        this.password = password;
        this.rememberMe = rememberMe;
        this.isPki = isPki;
    }
}
