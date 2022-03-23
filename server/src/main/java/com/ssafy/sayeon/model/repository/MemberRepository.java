package com.ssafy.sayeon.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.sayeon.model.entity.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
	Optional<Member> findByEmail(String email);
//	Optional<Member> findByUserId(String userId);
    List<Member> findAll();
}
