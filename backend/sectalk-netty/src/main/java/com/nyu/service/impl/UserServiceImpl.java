package com.nyu.service.impl;

import com.nyu.mapper.UsersMapper;
import com.nyu.pojo.Users;
import com.nyu.service.UserService;
import org.n3r.idworker.Sid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import tk.mybatis.mapper.entity.Example;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UsersMapper userMapper;

    @Autowired
    private Sid sid;
    /**
     * Query the existance of username
     *
     * @param username
     * @return
     */
    @Override
    public boolean queryUsernameIsExist(String username) {
        Users user = new Users();
        user.setUsername(username);
        Users result = userMapper.selectOne(user);

        return result != null;
    }

    @Transactional(propagation = Propagation.SUPPORTS)
    @Override
    public Users queryUserForLogin(String username, String pwd) {
        Example userExample = new Example(Users.class);
        Example.Criteria criteria = userExample.createCriteria();

        criteria.andEqualTo("username", username);
        criteria.andEqualTo("password", pwd);

        Users result = userMapper.selectOneByExample(userExample);
        return result;
    }

    @Override
    public Users saveUsers(Users user) {
        String userId = sid.nextShort();
        // TODO create QR code for user
        user.setQrcode("");
        user.setId(userId);

        userMapper.insert(user);
        return user;
    }
}
