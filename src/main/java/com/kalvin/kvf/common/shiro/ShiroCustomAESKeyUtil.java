package com.kalvin.kvf.common.shiro;


import org.apache.shiro.codec.Base64;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

/**
 * @Title ShiroCustomAESKeyUtil.java
 * @Description 自定义生成shiro AESkey(解决：Apache Shiro 默认密钥致命令执行漏洞（CVE-2016-4437）)
 * 采用Apache Shiro官方自带的生成AES密钥
 * @Author wy
 * @Date 2020年11月17日 上午10:06:45
 */
public class ShiroCustomAESKeyUtil {
    /**
     * 生成密钥
     *
     * @return
     * @throws Exception
     */
    public static String getKey() {
        try {
            KeyGenerator keygen = KeyGenerator.getInstance("AES");
            SecretKey deskey = keygen.generateKey();
            String key = Base64.encodeToString(deskey.getEncoded());
            return key;
        } catch (Exception ex) {
            return null;
        }
    }
}