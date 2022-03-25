package com.ssafy.sayeon.api.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.sayeon.model.entity.ReceivedStory;
import com.ssafy.sayeon.model.entity.SentStory;
import com.ssafy.sayeon.model.repository.MemberProfileRepository;
import com.ssafy.sayeon.model.repository.MemberRepository;
import com.ssafy.sayeon.model.repository.ReceivedStroryRepository;
import com.ssafy.sayeon.model.repository.SentStroryRepository;

@Service("sayeonListService")
public class StoryListServiceImpl implements StoryListService{
	
	@Autowired
	MemberProfileRepository memberProfileRepository;
	@Autowired
	ReceivedStroryRepository receivedStroryRepository;
	@Autowired
	SentStroryRepository sentStroryRepository;
	@Autowired
	MemberRepository memberRepository;

	@Override
	public List<SentStory> getSentStoryList(HashMap<String, Object> hm) {
		// TODO Auto-generated method stub
		String userId = (String) hm.get("userId");
		return sentStroryRepository.findBySenderId(userId);
	}

	@Override
	public List<ReceivedStory> getReceivedStoryList(HashMap<String, Object> hm) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int getSentStoryCount(String userId) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int getReceivedStoryCount(String userId) {
		// TODO Auto-generated method stub
		return 0;
	}
}
