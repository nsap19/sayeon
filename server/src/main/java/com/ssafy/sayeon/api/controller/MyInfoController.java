package com.ssafy.sayeon.api.controller;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.sayeon.api.request.UserProfileUpdateReq;
import com.ssafy.sayeon.api.request.UserPwUpdateReq;
import com.ssafy.sayeon.api.response.AdvancedResponseBody;
import com.ssafy.sayeon.api.response.BaseResponseBody;
import com.ssafy.sayeon.api.service.MemberService;
import com.ssafy.sayeon.api.service.MyInfoService;
import com.ssafy.sayeon.common.util.JwtTokenUtil;
import com.ssafy.sayeon.model.entity.Member;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

@Api(value = "내정보 API", tags = { "MyInfo" })
@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class MyInfoController {

	@Autowired
	private MemberService memberService;

	@Autowired
	private MyInfoService myInfoService;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@GetMapping("/{userId}")
	@ApiImplicitParam(name = "userId", value = "userId")
	@ApiOperation(value = "특정 유저 정보 조회", response = Member.class)
	@ApiResponses({ @ApiResponse(code = 200, message = "유저 정보 조회 성공"),
			@ApiResponse(code = 400, message = "존재하지 않는 유저입니다."), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BaseResponseBody> readUserInfo(@PathVariable("userId") String userId) {
		return ResponseEntity.status(200)
				.body(AdvancedResponseBody.of(200, "유저 정보 조회 성공", memberService.getMemberByUserId(userId)));
	}

	@PutMapping("/nickname")
	@ApiOperation(value = "닉네임 수정")
	@ApiResponses({ @ApiResponse(code = 200, message = "닉네임 수정 성공"),
			@ApiResponse(code = 400, message = "존재하지 않는 유저입니다."), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BaseResponseBody> modifyNickname(HttpServletRequest request, @RequestBody UserProfileUpdateReq updateInfo) {

		Member member = jwtTokenUtil.getMemberFromToken(request.getHeader("Authorization"));
		
		if (!member.getMemberProfile().getNickname().equals(updateInfo.getNickname()) // 기존 닉네임과 다른 경우(변동사항이 있는 경우)
				&& memberService.getMemberProfileByNickname(updateInfo.getNickname()) != null) { // 닉네임 중복 검사
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "이미 등록된 닉네임입니다."));
		}

		myInfoService.modifyUserProfile(member.getUserId(), updateInfo);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "닉네임 수정 성공"));
	}

	@PutMapping("/password")
	@ApiOperation(value = "비밀번호 수정")
	@ApiResponses({ @ApiResponse(code = 200, message = "비밀번호 수정 성공"),
			@ApiResponse(code = 400, message = "존재하지 않는 유저입니다."), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BaseResponseBody> modifyPassword(HttpServletRequest request, @RequestBody UserPwUpdateReq updatePw) {
		Member member = jwtTokenUtil.getMemberFromToken(request.getHeader("Authorization"));
		myInfoService.modifyUserPw(member.getUserId(), updatePw);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "비밀번호 수정 성공"));

	}
	
	@PutMapping("/profile-pic")
	@ApiOperation(value="프로필 사진 수정")
	@ApiResponses({ @ApiResponse(code = 200, message = "프로필 사진 수정 성공"),
		@ApiResponse(code = 400, message = "존재하지 않는 유저입니다."), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BaseResponseBody> modifyProfilePic(HttpServletRequest request, @RequestBody UserProfileUpdateReq updateInfo){
		Member member = jwtTokenUtil.getMemberFromToken(request.getHeader("Authorization"));
		
		myInfoService.modifyUserProfile(member.getUserId(), updateInfo);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "프로필 사진 수정 성공"));
	}
	
	@PutMapping("/location")
	@ApiOperation(value="위치 정보 수정")
	@ApiResponses({ @ApiResponse(code = 200, message = "위치정보 수정 성공"),
		@ApiResponse(code = 400, message = "존재하지 않는 유저입니다."), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BaseResponseBody> modifyLocation(HttpServletRequest request, @RequestBody UserProfileUpdateReq updateInfo){
		Member member = jwtTokenUtil.getMemberFromToken(request.getHeader("Authorization"));
		
		myInfoService.modifyUserProfile(member.getUserId(), updateInfo);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "위치정보 수정 성공"));
	}

}
