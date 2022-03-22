package com.ssafy.sayeon.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.sayeon.api.request.UserProfileUpdateReq;
import com.ssafy.sayeon.api.response.AdvancedResponseBody;
import com.ssafy.sayeon.api.response.BaseResponseBody;
import com.ssafy.sayeon.api.service.MemberService;
import com.ssafy.sayeon.api.service.MyInfoService;
import com.ssafy.sayeon.model.entity.Member;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

@Api(value="내정보 API", tags= {"MyInfo"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class MyInfoController {
	
	@Autowired
	private MemberService memberService;
	
	@Autowired
	private MyInfoService myInfoService;
	
	@GetMapping("/{userId}")
	@ApiImplicitParam(name="userId", value="userId")
	@ApiOperation(value="특정 유저 정보 조회", response=Member.class)
	@ApiResponses({ @ApiResponse(code = 200, message = "유저 정보 조회 성공"),
		@ApiResponse(code = 400, message = "존재하지 않는 유저입니다."), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BaseResponseBody> readUserInfo(@PathVariable("userId") String userId){
		return ResponseEntity.status(200).body(AdvancedResponseBody.of(200,	"유저 정보 조회 성공", memberService.getMemberByUserId(userId)));
	}
	
	@PutMapping("/users/nickname/{userId}") //userId는 임시로 설정, 추후에 merge 후 토큰으로 인증
	@ApiOperation(value="닉네임 수정")
	@ApiResponses({ @ApiResponse(code = 200, message = "닉네임 수정 성공"),
		@ApiResponse(code = 400, message = "존재하지 않는 유저입니다."), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BaseResponseBody> modifyNickname(@PathVariable("userId") String userId, @RequestHeader("Authorization") String token, @RequestBody UserProfileUpdateReq updateInfo){ //수정 필요
		
		if (!memberService.getMemberByUserId(userId).getMemberProfile().getNickname().equals(updateInfo.getNickname())  // 기존 닉네임과 다른 경우(변동사항이 있는 경우)
			 && memberService.getMemberProfileByNickname(updateInfo.getNickname()) != null) { // 닉네임 중복 검사
				 return ResponseEntity.status(409).body(BaseResponseBody.of(409, "이미 등록된 닉네임입니다."));
		}
		
		myInfoService.modifyUserProfile(userId, updateInfo);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200,	"닉네임 수정 성공"));
	}
}

