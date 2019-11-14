package com.nyu.service;

import com.nyu.pojo.Users;
import tk.mybatis.mapper.entity.Example;

public interface UserService {
    /**
     * Query the existance of username
     * @param username
     * @return
     */
    boolean queryUsernameIsExist(String username);

    Users queryUserForLogin(String username, String pwd);

    Users saveUsers(Users user);
}
