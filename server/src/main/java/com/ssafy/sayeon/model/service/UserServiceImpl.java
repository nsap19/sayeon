package com.ssafy.sayeon.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.sayeon.exception.NotExistUserException;
import com.ssafy.sayeon.model.entity.User;
import com.ssafy.sayeon.model.repository.UserRepository;

@Service("myInfoService")
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserRepository userRepository;

	@Override
	public User getUserInfo(String userId) {
		return userRepository.findByUserId(userId).orElseThrow(() -> new NotExistUserException());
	}

}
