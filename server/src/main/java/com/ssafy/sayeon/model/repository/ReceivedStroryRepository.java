package com.ssafy.sayeon.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.ReceivedStory;

import java.util.List;
import java.util.Optional;
import java.lang.String;


public interface ReceivedStroryRepository extends JpaRepository<ReceivedStory, String> {
	List<ReceivedStory> findByStoryId(String storyid);
	List<ReceivedStory> findByReceiverId(String receiverid);
}
