package com.ssafy.sayeon.api.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.MemberProfile;
import com.ssafy.sayeon.model.repository.MemberProfileRepository;
import com.ssafy.sayeon.model.repository.MemberRepository;
import com.ssafy.sayeon.api.service.MemberServiceImpl;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Api("유저 회원가 컨트롤러 API")
public class MemberController {

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	final MemberRepository memberRepository;
	final MemberProfileRepository memberProfileRepository;
	final PasswordEncoder encode;
	@Autowired
	final MemberServiceImpl memberServiceImpl;

	@PostMapping("/users/signup")
	@ApiOperation(value = "회원가입", notes = "회원가입 성공 시 SUCCESS 출력")	
	public String saveMember(@RequestBody MemberDto memberDto) {
			Member member = memberRepository.save(Member.createMember(memberDto.getEmail(), encode.encode(memberDto.getPassword())));
			System.out.println(member.getUserId());
			memberProfileRepository.save(new MemberProfile(member, 1, "hi", "seoul")); //이부분 수정 필요
		return SUCCESS;
	}
}

@Data
class MemberDto {
	private String email;
	private String password;
}
