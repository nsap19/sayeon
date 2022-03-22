package com.ssafy.sayeon.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.sayeon.model.entity.UserProfile;

public interface UserProfileRepository  extends JpaRepository<UserProfile, String> {
	Optional<UserProfile> findUserProfileByNickname(String nickname);
}
