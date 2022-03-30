package com.ssafy.sayeon.api.service;

import com.ssafy.sayeon.api.request.SayeonReq;
import com.ssafy.sayeon.model.entity.Member;

public interface SayeonService {
	void saveStory(Member member, SayeonReq sayeon);
}
