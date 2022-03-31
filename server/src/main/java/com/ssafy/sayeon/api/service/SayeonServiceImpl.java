package com.ssafy.sayeon.api.service;

import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.sayeon.api.request.SayeonReq;
import com.ssafy.sayeon.common.exception.NotExistUserException;
import com.ssafy.sayeon.common.exception.NotExistWaitingTimeException;
import com.ssafy.sayeon.common.util.ImageUtil;
import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.ReceivedStory;
import com.ssafy.sayeon.model.entity.SentStory;
import com.ssafy.sayeon.model.entity.SentStory.ImageType;
import com.ssafy.sayeon.model.entity.WaitingTime;
import com.ssafy.sayeon.model.repository.MemberRepository;
import com.ssafy.sayeon.model.repository.ReceivedStroryRepository;
import com.ssafy.sayeon.model.repository.SayeonRepository;
import com.ssafy.sayeon.model.repository.SelectedKeywordRepository;
import com.ssafy.sayeon.model.repository.WaitingTimeRepository;

@Service
public class SayeonServiceImpl implements SayeonService {

	@Autowired
	ImageUtil imageUtil;
	
	@Autowired
	SayeonRepository sayeonRepository;
	
	@Autowired
	WaitingTimeRepository waitingTimeRepository;
	
	@Autowired
	MemberRepository memberRepository;
	
	@Autowired
	SelectedKeywordRepository selectedKeywordRepository;
	
	@Autowired
	ReceivedStroryRepository receivedStoryRepository;

	@Override
	@Transactional
	public void saveStory(Member member, SayeonReq sayeon) {
		SentStory story = new SentStory(); 
		story.setSender(member);
		story.setDateSent(LocalDateTime.now().toString());
		story.setImage(sayeon.getImageUrl());
		story.setImageType(ImageType.valueOf(sayeon.getImageType().toUpperCase()));
		if(sayeon.getWaitingId()!=0 || waitingTimeRepository.existsById(sayeon.getWaitingId())) {
			WaitingTime wt = waitingTimeRepository.findById(sayeon.getWaitingId()).orElseThrow(() -> new NotExistWaitingTimeException());
			story.setWatingId(wt);
		}
		
		story = sayeonRepository.save(story);
			
		if(!sayeon.getReceiverId().equals("null")) {
			Member receiver = memberRepository.findById(sayeon.getReceiverId()).orElseThrow(()-> new NotExistUserException());
			ReceivedStory rc = new ReceivedStory(story, story.getStoryId(), receiver, LocalDateTime.now().toString());
			receivedStoryRepository.save(rc);
		}
	}

	@Override
	public List<WaitingTime> getWaitingTime() {
		return waitingTimeRepository.findAll();
	}

}
