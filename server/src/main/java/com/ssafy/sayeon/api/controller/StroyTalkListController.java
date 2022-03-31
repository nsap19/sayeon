package com.ssafy.sayeon.api.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.sayeon.api.response.AdvancedResponseBody;
import com.ssafy.sayeon.api.response.BaseResponseBody;
import com.ssafy.sayeon.api.response.StoryTalkBody;
import com.ssafy.sayeon.api.response.StoryTalkListResponseBody;
import com.ssafy.sayeon.api.service.JwtUserDetailsService;
import com.ssafy.sayeon.api.service.MyInfoService;
import com.ssafy.sayeon.api.service.StoryListService;
import com.ssafy.sayeon.api.service.StoryTalkListService;
import com.ssafy.sayeon.common.util.JwtTokenUtil;
import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.ReceivedStoryView;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

@Api(value = "사연 대화 목록 API", tags = { "StoryTalkList" })
@RequiredArgsConstructor
@RestController
@RequestMapping("/story-talk")
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

	@GetMapping("/list")
	@ApiOperation(value = "사연 대화 목록 조회")
	@ApiResponses({ @ApiResponse(code = 200, message = "사연 대화 목록  조회 성공"),
			@ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<StoryTalkListResponseBody> getReceivedStory(HttpServletRequest request) {

		Member member = jwtTokenUtil.getMemberFromToken(request.getHeader("Authorization"));

		List<StoryTalkBody> list = storyTalkListService.getStoryTalkList(member);

		return ResponseEntity.status(200).body(StoryTalkListResponseBody.of(list));
	}

	@GetMapping("")
	@ApiOperation(value = "특정 유저와의 대화 조회")
	@ApiResponses({ @ApiResponse(code = 200, message = "특정 유저와의 대화 조회 성공"),
			@ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BaseResponseBody> getConversation(HttpServletRequest request,
			@RequestHeader(value = "userId") String userId) {
		Member me = jwtTokenUtil.getMemberFromToken(request.getHeader("Authorization"));

		List<ReceivedStoryView> list = storyTalkListService.getConversationList(me, userId);

		return ResponseEntity.status(200).body(AdvancedResponseBody.of(200, "특정 유저와의 대화 조회 성공", list));
	}

}
