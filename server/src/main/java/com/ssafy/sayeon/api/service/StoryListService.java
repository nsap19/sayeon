package com.ssafy.sayeon.api.service;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.ReceivedStory;
import com.ssafy.sayeon.model.entity.SentStory;
@Service("sayeonListService")
public interface StoryListService {
	public Page<ReceivedStory> getReceivedStoryList(Member user, Integer page, Integer size);
	public Page<SentStory> getSentStoryByPageRequest(Member sender, Integer page, Integer size);
	public int getSentStoryCount(String userId);
	public int getReceivedStoryCount(String userId);
	public SentStory getSentstory(String storyId);
}
