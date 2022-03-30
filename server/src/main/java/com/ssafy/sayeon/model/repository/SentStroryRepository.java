package com.ssafy.sayeon.model.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.SentStory;

public interface SentStroryRepository extends JpaRepository<SentStory, String> {
	Page<SentStory> findBySender(Member sender,Pageable pageable);
	List<SentStory> findAllBySender(Member sender);
	SentStory findByStoryId(String storyId);
	
}
