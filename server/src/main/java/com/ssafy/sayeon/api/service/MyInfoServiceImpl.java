package com.ssafy.sayeon.api.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.sayeon.api.request.UserProfileUpdateReq;
import com.ssafy.sayeon.model.entity.UserProfile;
import com.ssafy.sayeon.model.repository.UserProfileRepository;
import com.ssafy.sayeon.model.repository.UserRepository;

@Service("myInfoService")
public class MyInfoServiceImpl implements MyInfoService {
	
	@Autowired
	UserProfileRepository userProfileRepository;
	
	@Autowired
	UserRepository userRepository;

	@Override
	@Transactional
	public void modifyUserProfile(String userId, UserProfileUpdateReq profileUpdateInfo) {
		UserProfile userProfile = userProfileRepository.getById(userId);

		if(!profileUpdateInfo.getNickname().equals(null)) userProfile.setNickname(profileUpdateInfo.getNickname());
		
		if(profileUpdateInfo.getProfilePic()!=0) userProfile.setProfilePic(profileUpdateInfo.getProfilePic());
		
		if(!profileUpdateInfo.getLocation().equals(null)) userProfile.setLocation(profileUpdateInfo.getLocation());

		userProfileRepository.save(userProfile);
	}
}
