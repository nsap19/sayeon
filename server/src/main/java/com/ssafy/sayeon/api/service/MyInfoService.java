package com.ssafy.sayeon.api.service;

import com.ssafy.sayeon.api.request.UserProfileUpdateReq;
import com.ssafy.sayeon.api.request.UserPwUpdateReq;
import com.ssafy.sayeon.model.entity.Member;

public interface MyInfoService {
	void modifyUserProfile(String userId, UserProfileUpdateReq updateProfile);

	void modifyUserPw(String userId, UserPwUpdateReq updatePw);
	boolean findUserPw(String email);
	void sendEmail(Member member, String pw);
}
