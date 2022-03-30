package com.ssafy.sayeon.api.service;

import java.time.LocalDateTime;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.sayeon.api.request.SayeonReq;
import com.ssafy.sayeon.common.exception.NotExistWaitingTimeException;
import com.ssafy.sayeon.common.util.ImageUtil;
import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.SelectedKeyword;
import com.ssafy.sayeon.model.entity.SentStory;
import com.ssafy.sayeon.model.entity.SentStory.ImageType;
import com.ssafy.sayeon.model.entity.WaitingTime;
import com.ssafy.sayeon.model.repository.MemberRepository;
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
			
		SelectedKeyword sk = new SelectedKeyword(story, sayeon.getKeyword());
		selectedKeywordRepository.save(sk);
	}

}
