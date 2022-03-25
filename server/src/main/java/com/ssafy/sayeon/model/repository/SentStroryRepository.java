package com.ssafy.sayeon.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.ReceivedStory;
import com.ssafy.sayeon.model.entity.SentStory;

import java.util.List;
import java.util.Optional;
import java.lang.String;

public interface SentStroryRepository extends JpaRepository<SentStory, String> {
	List<SentStory> findBySenderId(String senderid);
}