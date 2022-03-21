package com.ssafy.sayeon.controller;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.service.MemberServiceImpl;
import com.ssafy.sayeon.repository.MemberRepository;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberController {

	private static final String SUCCESS = "success";
	private static final String FAIL = "fail";

	final MemberRepository memberRepository;
	final PasswordEncoder encode;
	@Autowired
	final MemberServiceImpl memberServiceImpl;

	@PostMapping("/users/signup")
	public String saveMember(@RequestBody MemberDto memberDto) {
			memberRepository.save(Member.createMember(memberDto.getEmail(), encode.encode(memberDto.getPassword())));
		return SUCCESS;
	}
}

@Data
class MemberDto {
	private String email;
	private String password;
}
