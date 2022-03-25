package com.ssafy.sayeon.api.service;

import java.util.*;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.ssafy.sayeon.model.entity.ReceivedStory;

import com.ssafy.sayeon.model.entity.SentStory;
@Service("sayeonListService")
public interface StoryListService {
//	public List<SentStory> getSentStoryList(HashMap<String, Object> map);
	public List<ReceivedStory> getReceivedStoryList(HashMap<String, Object> map);
	public int getSentStoryCount(String userId);
	public int getReceivedStoryCount(String userId);
	public Page<SentStory> getSentStoryByPageRequest(String userId, Integer page, Integer size);
}
