package com.ssafy.sayeon.api.service;

import java.awt.print.Pageable;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

//	@Override
//	public List<SentStory> getSentStoryList(HashMap<String, Object> hm) {
//		// TODO Auto-generated method stub
//		String userId = (String) hm.get("userId");
////		return sentStroryRepository.findBySenderId(userId);
//		return null;
//	}

	@Override
	public Page<ReceivedStory> getReceivedStoryList(String receiverId, Integer page, Integer size) {
		// TODO Auto-generated method stub
		PageRequest pageRequest = PageRequest.of(page,size, Sort.by("dateReceived").ascending()); //기본적으로 최신순으로 정렬

		return receivedStroryRepository.findByReceiverId(receiverId, pageRequest);
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

	@Override
	public Page<SentStory> getSentStoryByPageRequest(String senderId, Integer page, Integer size) {
		// TODO Auto-generated method stub
		
		PageRequest pageRequest = PageRequest.of(page,size, Sort.by("dateSent").ascending()); //기본적으로 최신순으로 정렬
		return sentStroryRepository.findBySenderId(senderId,pageRequest);
	}

}
