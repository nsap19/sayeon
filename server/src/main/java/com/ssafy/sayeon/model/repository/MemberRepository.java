package com.ssafy.sayeon.model.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ssafy.sayeon.model.entity.Member;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends CrudRepository<Member, String> {
	Optional<Member> findByEmail(String email);
//	Optional<Member> findByUserId(String userId);
    List<Member> findAll();
}
