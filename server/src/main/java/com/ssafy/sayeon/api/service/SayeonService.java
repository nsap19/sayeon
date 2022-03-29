package com.ssafy.sayeon.api.service;

import java.util.List;

import com.ssafy.sayeon.api.request.SayeonReq;
import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.WaitingTime;

public interface SayeonService {
	void saveStory(Member member, SayeonReq sayeon);
	List<WaitingTime> getWaitingTime();
}
