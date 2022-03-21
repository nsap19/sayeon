package com.ssafy.sayeon.model.service;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl {

	private final MemberRepository memberRepository;

//	public Member saveMember(Member member) {
//		validateDuplicateMember(member);
//		return memberRepository.save(member);
//	}

	public boolean validateDuplicateMember(String email) {
		Member findMember = memberRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException(email));
		if (findMember != null) {
			return false;
		}
		return true;
	}
}
