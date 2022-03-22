package com.ssafy.sayeon.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.sayeon.model.entity.MemberProfile;

public interface MemberProfileRepository  extends JpaRepository<MemberProfile, String> {
	Optional<MemberProfile> findUserProfileByNickname(String nickname);
}
