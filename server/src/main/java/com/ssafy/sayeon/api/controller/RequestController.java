package com.ssafy.sayeon.api.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.sayeon.api.request.RequestReq;
import com.ssafy.sayeon.api.response.BaseResponseBody;
import com.ssafy.sayeon.api.service.RequestService;
import com.ssafy.sayeon.common.util.JwtTokenUtil;
import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.Request.RequestType;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "요청 API (대화삭제, 수신자 차단 등)", tags = { "Request" })
@RestController
@RequestMapping("/request")
public class RequestController {

	@Autowired
	JwtTokenUtil jwtTokenUtil;

	@Autowired
	RequestService requestService;

	@PostMapping("")
	@ApiOperation(value = "사용자 요청(대화 삭제, 수신자 차단, 사연 신고)", notes = "requestType: DELETE, REPORT, BLOCK")
	@ApiResponses({ @ApiResponse(code = 200, message = "사용자 요청 저장 성공"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BaseResponseBody> deleteStoryList(HttpServletRequest request,
			@RequestBody RequestReq userRequest) {
		Member member = jwtTokenUtil.getMemberFromToken(request.getHeader("Authorization"));

		requestService.saveRequest(member, userRequest);

		RequestType rt = RequestType.valueOf(userRequest.getRequestType().toUpperCase());

		if (rt == RequestType.DELETE)
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "대화 삭제 성공"));
		else if (rt == RequestType.BLOCK)
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "수신자 차단 성공"));
		else if (rt == RequestType.REPORT)
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "사연 신고 성공"));
		return null;
	}	
}
