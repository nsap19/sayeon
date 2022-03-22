package com.ssafy.sayeon.api.service;

import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.MemberProfile;

public interface MemberService {
	Member getMemberByUserId(String userId);
	MemberProfile getMemberProfileByNickname(String nickname);
}
