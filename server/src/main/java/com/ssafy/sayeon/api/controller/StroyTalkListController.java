package com.ssafy.sayeon.api.controller;

import java.util.*;


import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.sayeon.api.request.UserProfileUpdateReq;
import com.ssafy.sayeon.api.request.UserPwUpdateReq;
import com.ssafy.sayeon.api.response.AdvancedResponseBody;
import com.ssafy.sayeon.api.response.BaseResponseBody;
import com.ssafy.sayeon.api.response.ReceivedStoryInfo;
import com.ssafy.sayeon.api.response.StoryTalkBody;
import com.ssafy.sayeon.api.response.StoryTalkListResponseBody;
import com.ssafy.sayeon.api.service.JwtUserDetailsService;
import com.ssafy.sayeon.api.service.MemberService;
import com.ssafy.sayeon.api.service.MyInfoService;
import com.ssafy.sayeon.api.service.StoryListService;
import com.ssafy.sayeon.api.service.StoryTalkListService;
import com.ssafy.sayeon.common.util.JwtTokenUtil;
import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.ReceivedStory;
import com.ssafy.sayeon.model.entity.SentStory;
import com.ssafy.sayeon.model.repository.ReceivedStroryRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

@Api(value = "사연 대화 목록 API", tags = { "StoryList" })
@RequiredArgsConstructor
@RestController
@RequestMapping("/story-talk-list")
public class StroyTalkListController {

	@Autowired
	private StoryListService storyListService;
	@Autowired
	private StoryTalkListService storyTalkListService;

	@Autowired
	private MyInfoService myInfoService;

	@Autowired
	private JwtUserDetailsService userDetailService;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	

	@GetMapping
	@ApiOperation(value = "사연 대화 목록 조회")
	@ApiResponses({ @ApiResponse(code = 200, message = "사연 대화 목록  조회 성공"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<StoryTalkListResponseBody> getReceivedStory(HttpServletRequest request) {

		Member member = jwtTokenUtil.getMemberFromToken(request.getHeader("Authorization"));

		String userId = member.getUserId();
		List<StoryTalkBody> list = storyTalkListService.getStoryTalkList(userId);
		
		return ResponseEntity.status(200).body(StoryTalkListResponseBody.of(list));
	}

	
}
