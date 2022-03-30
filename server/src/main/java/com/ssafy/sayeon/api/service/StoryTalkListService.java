package com.ssafy.sayeon.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.sayeon.api.response.StoryTalkBody;
import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.ReceivedStory;
import com.ssafy.sayeon.model.entity.SentStory;
@Service("sayeonListService")
public interface StoryTalkListService {
	public List<ReceivedStory> getReceivedStoryList(Member receiver);
	public List<SentStory> getSentStoryList(Member sender);
	public List<StoryTalkBody> getStoryTalkList(Member member);
}
