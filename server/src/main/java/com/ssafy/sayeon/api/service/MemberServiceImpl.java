package com.ssafy.sayeon.api.service;

import org.springframework.beans.factory.annotation.Autowired;
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
	@Override
	public Member validateDuplicateMember(String email) {
		return  memberRepository.findUserByEmail(email);
			
	}

	@Override
	public Member getMemberByUserId(String userId) {
		return memberRepository.findById(userId).orElseThrow(() -> new NotExistUserException());
	}

	@Override
	public MemberProfile getMemberProfileByNickname(String nickname) {
		MemberProfile profile = memberProfileRepository.findUserProfileByNickname(nickname);
		return profile;
	}

	@Override
	public Member getMemberByEmail(String email) {
		return memberRepository.findUserByEmail(email);
	}
	
	@Transactional
	@Override
	public void deleteMember(Member member) {
		memberProfileRepository.delete(member.getMemberProfile());
		memberRepository.delete(member);
	}
}
