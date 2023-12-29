package com.kalvin.kvf.modules.util;

import com.jit.attr.GenGACode;
import com.jit.attr.JitAcComp;

import java.security.cert.X509Certificate;

public class PkiUtil {

    public static class PkiVo {
        private String name;
        private String departmentNumber;
        private String identityNumber;

        public PkiVo(String name, String departmentNumber, String identityNumber) {
            this.name = name;
            this.departmentNumber = departmentNumber;
            this.identityNumber = identityNumber;
        }

        public String getName() {
            return name;
        }

        public String getDepartmentNumber() {
            return departmentNumber;
        }

        public String getIdentityNumber() {
            return identityNumber;
        }
    }


    public static String X509CertificateKey = "javax.servlet.request.X509Certificate";

    /** request.getAttribute("javax.servlet.request.X509Certificate") */
    public static PkiVo getInfo(X509Certificate[] ax509certificate) {
        //X509Certificate ax509certificate[] = (X509Certificate[]) request.getAttribute("javax.servlet.request.X509Certificate");
        if (ax509certificate == null || ax509certificate.length == 0)
            throw new IllegalArgumentException("未发现证书，请检查是否插入证书！");
        try {
            X509Certificate x509Certificate = ax509certificate[0];
            String subjectDN = x509Certificate.getSubjectX500Principal().toString();
            JitAcComp jitaccomp = new JitAcComp();
            jitaccomp.setBaseDN("c=cn");
            jitaccomp.setPrivilegeSetType(2);
            String name = subjectDN.substring(3, subjectDN.indexOf(" "));
            String identityNumber = subjectDN.substring(subjectDN.indexOf(" "), subjectDN.indexOf(","));
            GenGACode genGACode = new GenGACode();
            genGACode.setx509(x509Certificate);
            genGACode.parserDN();
            String departmentNumber = genGACode.getgaxS() + genGACode.getgaxLCity() + genGACode.getgaxLCounty() + genGACode.getgaxOU78() + genGACode.getgaxOU9a() + genGACode.getgaxOUbc();
            return new PkiVo(name.trim(), departmentNumber.trim(), identityNumber.trim());
        } catch(Exception e) {
            throw new IllegalArgumentException("获取证书信息错误！");
        }
    }

}
