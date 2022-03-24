package com.ssafy.sayeon.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.sayeon.model.entity.MemberProfile;

public interface MemberProfileRepository  extends JpaRepository<MemberProfile, String> {
	MemberProfile findUserProfileByNickname(String nickname);
}
