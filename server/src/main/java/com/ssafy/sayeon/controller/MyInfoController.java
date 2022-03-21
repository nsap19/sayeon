package com.ssafy.sayeon.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.sayeon.model.entity.User;
import com.ssafy.sayeon.model.response.AdvancedResponseBody;
import com.ssafy.sayeon.model.response.BaseResponseBody;
import com.ssafy.sayeon.model.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

@Api(value="내정보 API", tags= {"MyInfo"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/users")
public class MyInfoController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/{userId}")
	@ApiImplicitParam(name="userId", value="userId")
	@ApiOperation(value="특정 유저 정보 조회", response=User.class)
	@ApiResponses({ @ApiResponse(code = 200, message = "유저 정보 조회 성공"),
		@ApiResponse(code = 400, message = "존재하지 않는 유저입니다."), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BaseResponseBody> readUserInfo(@PathVariable("userId") String userId){
		return ResponseEntity.status(200).body(AdvancedResponseBody.of(200,	"유저 정보 조회 성공", userService.getUserInfo(userId)));
	}
	
	
}
