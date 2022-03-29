package com.ssafy.sayeon.api.service;

import com.ssafy.sayeon.api.request.UserProfileUpdateReq;
import com.ssafy.sayeon.api.request.UserPwUpdateReq;

public interface MyInfoService {
	void modifyUserProfile(String userId, UserProfileUpdateReq updateProfile);

	void modifyUserPw(String userId, UserPwUpdateReq updatePw);
}
