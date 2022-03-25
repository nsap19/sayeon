package com.ssafy.sayeon.api.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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
import com.ssafy.sayeon.api.service.JwtUserDetailsService;
import com.ssafy.sayeon.api.service.MemberService;
import com.ssafy.sayeon.api.service.MyInfoService;
import com.ssafy.sayeon.api.service.StoryListService;
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

@Api(value = "사연함 API", tags = { "StoryList" })
@RequiredArgsConstructor
@RestController
@RequestMapping("/story-list")
public class StroyListController {

	@Autowired
	private StoryListService storyListService;

	@Autowired
	private MyInfoService myInfoService;

	@Autowired
	private JwtUserDetailsService userDetailService;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@GetMapping("/sent")
	@ApiOperation(value = "보낸 사연함 조회")
	@ApiResponses({ @ApiResponse(code = 200, message = "보낸 사연함 조회 성공"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BaseResponseBody> getSentStory(HttpServletRequest request,
			@RequestParam @ApiParam(value = "가져올 페이지", required = true) Integer page,
			@RequestParam @ApiParam(value = "한 페이지당 개수", required = true) Integer size) {

		Member member = jwtTokenUtil.getMemberFromToken(request.getHeader("Authorization"));

		Page<SentStory> sentStoryList = storyListService.getSentStoryByPageRequest(member.getUserId(), page, size);

		return ResponseEntity.status(200)
				.body(AdvancedResponseBody.of(200, "보낸 사연함 조회 성공", sentStoryList.getContent()));
	}

	@GetMapping("/received")
	@ApiOperation(value = "받은 사연함 조회")
	@ApiResponses({ @ApiResponse(code = 200, message = "받은 사연함 조회 성공"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BaseResponseBody> getReceivedStory(HttpServletRequest request,
			@RequestParam @ApiParam(value = "가져올 페이지", required = true) Integer page,
			@RequestParam @ApiParam(value = "한 페이지당 개수", required = true) Integer size) {

		Member member = jwtTokenUtil.getMemberFromToken(request.getHeader("Authorization"));

		Page<ReceivedStory> receivedStoryList = storyListService.getReceivedStoryList(member.getUserId(), page, size);
		return ResponseEntity.status(200)
				.body(AdvancedResponseBody.of(200, "보낸 사연함 조회 성공", receivedStoryList.getContent()));
	}

}
