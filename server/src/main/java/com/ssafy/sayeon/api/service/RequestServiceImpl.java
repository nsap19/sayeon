package com.ssafy.sayeon.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.sayeon.api.request.RequestReq;
import com.ssafy.sayeon.common.exception.NotExistRequestTypeException;
import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.Request;
import com.ssafy.sayeon.model.entity.Request.RequestType;
import com.ssafy.sayeon.model.repository.RequestRepository;

@Service
public class RequestServiceImpl implements RequestService {

	@Autowired
	MemberService memberService;

	@Autowired
	RequestRepository requestRepository;

	@Override
	public void saveRequest(Member member, RequestReq request) {
		Member requestedUser = memberService.getMemberByUserId(request.getRequestedId());

		try {
			RequestType rt = RequestType.valueOf(request.getRequestType().toUpperCase());
			Request req = new Request(member, requestedUser, rt);
			requestRepository.save(req);

		} catch (IllegalArgumentException e) {
			throw new NotExistRequestTypeException();
		}
	}

}
