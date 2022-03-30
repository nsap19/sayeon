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
public class StoryTalkListResponseBody {
	List<StoryTalkBody> storyTalkList = null;

//	public BaseResponseBody(Integer statusCode) {
//		this.statusCode = statusCode;
//	}
//



	public static StoryTalkListResponseBody of(List<StoryTalkBody> storyTalkList) {
		StoryTalkListResponseBody body = new StoryTalkListResponseBody();
		body.storyTalkList = storyTalkList;
		return body;
	}
}

