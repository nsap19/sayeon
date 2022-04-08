package com.ssafy.sayeon.api.controller;

import lombok.RequiredArgsConstructor;
import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.MemberProfile;
import com.ssafy.sayeon.model.repository.MemberProfileRepository;
import com.ssafy.sayeon.model.repository.MemberRepository;
import com.ssafy.sayeon.api.request.UserLoginReq;
import com.ssafy.sayeon.api.request.UserRegisterReq;
import com.ssafy.sayeon.api.response.BaseResponseBody;
import com.ssafy.sayeon.api.response.JWTResponseBody;
import com.ssafy.sayeon.api.service.JwtUserDetailsService;
import com.ssafy.sayeon.api.service.MemberService;
import com.ssafy.sayeon.common.util.JwtTokenUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Api(value="유저 API",tags = { "User" })
@RequestMapping("/users")
public class MemberController {

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	final MemberRepository memberRepository;
	final MemberProfileRepository memberProfileRepository;
	final PasswordEncoder encode;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private JwtUserDetailsService userDetailService;

	@Autowired
	private MemberService memberService;

	@PostMapping("/signup")
	@ApiOperation(value = "회원가입", notes = "회원가입 성공 시 SUCCESS 출력")
	@ApiResponses({ @ApiResponse(code = 200, message = "회원가입 성공"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BaseResponseBody> saveMember(@RequestBody UserRegisterReq memberDto) {
		Member member = memberRepository
				.save(Member.createMember(memberDto.getEmail(), encode.encode(memberDto.getPassword())));
		System.out.println(member.getUserId());
		memberProfileRepository.save(
				new MemberProfile(member, memberDto.getProfilePic(), memberDto.getNickname(), memberDto.getLocation(), memberDto.getLatitude(), memberDto.getLongitude()));

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "회원가입 성공"));
	}

	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "로그인 성공 시 토큰 발급")
	@ApiResponses({ @ApiResponse(code = 200, message = "로그인 성공"), @ApiResponse(code = 401, message = "로그인 실패") })
	public ResponseEntity<?> createAuthenticationToken(@RequestBody UserLoginReq authenticationRequest)
			throws Exception {
		final Member member = userDetailService.authenticateByEmailAndPassword(authenticationRequest.getEmail(),
				authenticationRequest.getPassword());
		if (member == null)
			return ResponseEntity.status(401).body(BaseResponseBody.of(401, "로그인 실패"));
		if(member.getWithdrawal().equals("Y"))
			return ResponseEntity.status(401).body(BaseResponseBody.of(401, "탈퇴한 회원"));

		final String token = jwtTokenUtil.generateToken(member.getEmail());
		return ResponseEntity.ok(new JWTResponseBody(token));
	}

	@PostMapping("/email")
	@ApiOperation(value = "이메일 중복 체크")
	@ApiResponses({ @ApiResponse(code = 200, message = "사용 가능한 이메일"), @ApiResponse(code = 409, message = "중복된 이메일"),
			@ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BaseResponseBody> confirmEmail(@RequestParam String email) {
		System.out.println(memberService.getMemberByEmail(email));
		if (memberService.getMemberByEmail(email) != null)
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "중복된 이메일입니다."));
		else
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "사용 가능한 이메일입니다."));
	}

	@PostMapping("/nickname")
	@ApiOperation(value = "닉네임 중복 체크")
	@ApiResponses({ @ApiResponse(code = 200, message = "사용 가능한 닉네임"), @ApiResponse(code = 409, message = "중복된 닉네임"),
			@ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BaseResponseBody> confirmNickname(@RequestParam String nickname) {

		if (memberService.getMemberProfileByNickname(nickname) != null)
			return ResponseEntity.status(409).body(BaseResponseBody.of(409, "중복된 닉네임입니다."));
		else
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "사용 가능한 닉네임입니다."));
	}

}
