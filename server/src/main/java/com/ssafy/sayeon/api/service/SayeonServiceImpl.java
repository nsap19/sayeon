package com.ssafy.sayeon.api.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.sayeon.api.request.SayeonReq;
import com.ssafy.sayeon.common.exception.NotExistWaitingTimeException;
import com.ssafy.sayeon.common.util.ImageUtil;
import com.ssafy.sayeon.model.entity.SentStory;
import com.ssafy.sayeon.model.entity.SentStory.ImageType;
import com.ssafy.sayeon.model.entity.WaitingTime;
import com.ssafy.sayeon.model.repository.SayeonRepository;
import com.ssafy.sayeon.model.repository.WaitingTimeRepository;

@Service
public class SayeonServiceImpl implements SayeonService {

	@Autowired
	ImageUtil imageUtil;
	
	@Autowired
	SayeonRepository sayeonRepository;
	
	@Autowired
	WaitingTimeRepository waitingTimeRepository;

	@Override
	public void saveStory(String userId, SayeonReq sayeon) {
		SentStory story = new SentStory(); 
		story.setSenderId(userId);
		story.setDateSent(LocalDate.now().toString());
		story.setImage(sayeon.getImageUrl());
		story.setImageType(ImageType.valueOf(sayeon.getImageType().toUpperCase()));
		if(sayeon.getWaitingId()!=0 || waitingTimeRepository.existsById(sayeon.getWaitingId())) {
			WaitingTime wt = waitingTimeRepository.findById(sayeon.getWaitingId()).orElseThrow(() -> new NotExistWaitingTimeException());
			story.setWatingId(wt);
		}
		
		sayeonRepository.save(story);
	}

}
