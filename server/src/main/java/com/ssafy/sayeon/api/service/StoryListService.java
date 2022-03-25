package com.ssafy.sayeon.api.service;

import java.util.*;

import org.springframework.stereotype.Service;

import com.ssafy.sayeon.model.entity.ReceivedStory;

import com.ssafy.sayeon.model.entity.SentStory;
@Service("sayeonListService")
public interface StoryListService {
	public List<SentStory> getSentStoryList(HashMap<String, Object> hm);
	public List<ReceivedStory> getReceivedStoryList(HashMap<String, Object> hm);
	public int getSentStoryCount(String userId);
	public int getReceivedStoryCount(String userId);
}
