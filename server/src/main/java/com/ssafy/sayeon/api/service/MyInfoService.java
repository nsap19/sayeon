package com.ssafy.sayeon.api.service;

import com.ssafy.sayeon.api.request.UserProfileUpdateReq;

public interface MyInfoService {
	void modifyUserProfile(String userId, UserProfileUpdateReq updateProfile);
}
