package com.ssafy.sayeon.api.service;

import com.ssafy.sayeon.api.request.RequestReq;
import com.ssafy.sayeon.model.entity.Member;

public interface RequestService {
	void saveRequest(Member member, RequestReq request);
}
