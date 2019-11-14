package com.nyu.utils;

import org.apache.tomcat.util.codec.binary.Base64;

import java.security.MessageDigest;

public class MD5Utils {

    public static String getMD5Str(String strValue) throws Exception {
        MessageDigest md5 = MessageDigest.getInstance("MD5");
        String newstr = Base64.encodeBase64String(md5.digest(strValue.getBytes()));
        return newstr;
    }
}
