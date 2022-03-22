package com.ssafy.sayeon.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.sayeon.common.exception.NotExistUserException;
import com.ssafy.sayeon.model.entity.User;
import com.ssafy.sayeon.model.entity.UserProfile;
import com.ssafy.sayeon.model.repository.UserProfileRepository;
import com.ssafy.sayeon.model.repository.UserRepository;

@Service("userService")
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	UserProfileRepository userProfileRepository;
	
	@Override
	public User getUserByUserId(String userId) {
		return userRepository.findById(userId).orElseThrow(() -> new NotExistUserException());
	}

	@Override
	public UserProfile getUserProfileByNickname(String nickname) {
		return userProfileRepository.findUserProfileByNickname(nickname).orElseThrow(()-> new NotExistUserException());
	}

}
