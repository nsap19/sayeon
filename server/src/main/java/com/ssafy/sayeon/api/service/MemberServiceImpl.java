package com.ssafy.sayeon.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.MemberProfile;
import com.ssafy.sayeon.model.repository.MemberProfileRepository;
import com.ssafy.sayeon.model.repository.MemberRepository;
import com.ssafy.sayeon.common.exception.NotExistUserException;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

	@Autowired
	private final MemberRepository memberRepository;
	
	@Autowired
	MemberProfileRepository memberProfileRepository;

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

	@Override
	public Member getMemberByUserId(String userId) {
		return memberRepository.findById(userId).orElseThrow(() -> new NotExistUserException());
	}

	@Override
	public MemberProfile getMemberProfileByNickname(String nickname) {
		return memberProfileRepository.findUserProfileByNickname(nickname).orElseThrow(()-> new NotExistUserException());
	}

	@Override
	public Member getMemberByEmail(String email) {
		return memberRepository.findByEmail(email).orElseThrow(() -> new NotExistUserException());
	}
}
