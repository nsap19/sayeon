package com.ssafy.sayeon.api.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.sayeon.api.request.UserProfileUpdateReq;
import com.ssafy.sayeon.api.request.UserPwUpdateReq;
import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.MemberProfile;
import com.ssafy.sayeon.model.repository.MemberProfileRepository;
import com.ssafy.sayeon.model.repository.MemberRepository;

@Service("myInfoService")
public class TranslationServiceImpl implements MyInfoService {
	
	@Autowired
	MemberProfileRepository userProfileRepository;
	
	@Autowired
	MemberRepository memberRepository;
	
	@Autowired
	PasswordEncoder encode;
	
	@Override
	@Transactional
	public void modifyUserProfile(String userId, UserProfileUpdateReq profileUpdateInfo) {
		MemberProfile userProfile = userProfileRepository.getById(userId);

		if(profileUpdateInfo.getNickname()!=null) userProfile.setNickname(profileUpdateInfo.getNickname());
		
		if(profileUpdateInfo.getProfilePic()!=0) userProfile.setProfilePic(profileUpdateInfo.getProfilePic());
		
		if(profileUpdateInfo.getLocation()!=null) userProfile.setLocation(profileUpdateInfo.getLocation());

		System.out.println(userProfile.getLocation());
		System.out.println(userProfile.getNickname());
		userProfileRepository.save(userProfile);
	}

	@Override
	public void modifyUserPw(String userId, UserPwUpdateReq updatePw) {
		Member member = memberRepository.getById(userId);

		if(!updatePw.getPassword().equals(null)) member.setPassword(encode.encode(updatePw.getPassword()));

		memberRepository.save(member);
	}
}
