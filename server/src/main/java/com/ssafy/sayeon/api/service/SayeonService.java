package com.ssafy.sayeon.api.service;

import com.ssafy.sayeon.api.request.SayeonReq;

public interface SayeonService {
	void saveStory(String userId, SayeonReq sayeon);
}
