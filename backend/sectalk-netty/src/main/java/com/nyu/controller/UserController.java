package com.nyu.controller;

import com.nyu.pojo.Users;
import com.nyu.pojo.vo.UsersVO;
import com.nyu.service.UserService;
import com.nyu.utils.ISectalkJSONResult;
import com.nyu.utils.MD5Utils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("u")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("registOrLogin")
    public ISectalkJSONResult registOrLogin(@RequestBody Users user) throws Exception {
        if (StringUtils.isBlank(user.getUsername()) || StringUtils.isBlank(user.getPassword())) {
            return ISectalkJSONResult.errorMsg("User Name or Password cannot be null");
        }

        boolean isExist = userService.queryUsernameIsExist(user.getUsername());
        Users userResult;
        if (isExist) {
            userResult = userService.queryUserForLogin(user.getUsername(), user.getPassword());
            if (userResult == null) {
                return ISectalkJSONResult.errorMsg("Username/Password incorrect");
            }
        } else {
            user.setNickname(user.getUsername());
            user.setFaceImage("");
            user.setFaceImageBig("");
            user.setPassword(MD5Utils.getMD5Str(user.getPassword()));
            userResult = userService.saveUsers(user);
        }

        UsersVO userVO = new UsersVO();
        BeanUtils.copyProperties(userResult, userVO);
        return ISectalkJSONResult.ok(userVO);
    }
}
