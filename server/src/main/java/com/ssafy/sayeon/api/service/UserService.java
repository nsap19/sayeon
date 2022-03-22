package com.ssafy.sayeon.api.service;

import com.ssafy.sayeon.model.entity.User;
import com.ssafy.sayeon.model.entity.UserProfile;

public interface UserService {
	User getUserByUserId(String userId);
	UserProfile getUserProfileByNickname(String nickname);
}
