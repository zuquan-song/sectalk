package com.nyu.utils;

/**
 * @Description:
 *      200: SUCCESS
 *      500: FAIL
 *      501: Bean validation failure
 *      502: Interceptor intercepts error in user token
 *      555: Error thrown
 */
public class ISectalkJSONResult {
    private static final int FAILURE = 500;
    private static final int FAILURE_BEAN_VALIDATION = 501;
    private static final int INTERCEPTOR_ERROR = 502;
    private static final int FAILURE_ERROR_THROWN = 555;
    private static final int SUCCESS = 200;

    private Integer status;
    private String msg;
    private Object data;
    private String ok;


    public static ISectalkJSONResult build(Integer status, String msg, Object data) {
        return new ISectalkJSONResult(status, msg, data);
    }

    public static ISectalkJSONResult ok(Object data) {
        return new ISectalkJSONResult(data);
    }

    public static ISectalkJSONResult ok() {
        return new ISectalkJSONResult();
    }

    public static ISectalkJSONResult errorMsg(String msg) {
        return new ISectalkJSONResult(FAILURE, msg);
    }

    public static ISectalkJSONResult errorMap(Object data) {
        return new ISectalkJSONResult(FAILURE_BEAN_VALIDATION, "error", data);
    }

    public static ISectalkJSONResult errorTokenMsg(String msg) {
        return new ISectalkJSONResult(INTERCEPTOR_ERROR, msg);
    }

    public static ISectalkJSONResult errorException(String msg) {
        return new ISectalkJSONResult(FAILURE_ERROR_THROWN, msg);
    }

    public ISectalkJSONResult(Integer status, String msg, Object data) {
        this.status = status;
        this.msg = msg;
        this.data = data;
    }


    public ISectalkJSONResult(Integer status, String msg) {
        this(status, msg, null);
    }

    public ISectalkJSONResult(Object data) {
        this(SUCCESS, "OK", data);
    }

    public ISectalkJSONResult() {
        this(null);
    }

    public Boolean isOK() {
        return this.status == 200;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getOk() {
        return ok;
    }

    public void setOk(String ok) {
        this.ok = ok;
    }
}
