package com.ssafy.sayeon.api.service;

import java.util.*;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.ssafy.sayeon.api.response.StoryTalkBody;
import com.ssafy.sayeon.api.response.StoryTalkListResponseBody;
import com.ssafy.sayeon.model.entity.ReceivedStory;

import com.ssafy.sayeon.model.entity.SentStory;
@Service("sayeonListService")
public interface StoryTalkListService {
	public List<ReceivedStory> getReceivedStoryList(String receiverId);
	public List<SentStory> getSentStoryList(String senderId);
	public List<StoryTalkBody> getStoryTalkList(String userId);
}
