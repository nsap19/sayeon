package com.ssafy.sayeon.api.response;

import java.util.*;

import com.ssafy.sayeon.model.entity.ReceivedStory;

import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 서버 요청에대한 기본 응답값(바디) 정의.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("StoryTalkListResponseBody")
public class StoryTalkBody {
	List<ReceivedStoryRes> storyTalk = null;

//	public BaseResponseBody(Integer statusCode) {
//		this.statusCode = statusCode;
//	}
//



	public static StoryTalkBody of(List<ReceivedStoryRes> storyTalk) {
		StoryTalkBody body = new StoryTalkBody();
		body.storyTalk = storyTalk;
		return body;
	}
}

