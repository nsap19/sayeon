package com.ssafy.sayeon.api.controller;

import java.io.File;
import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.sayeon.api.response.BaseResponseBody;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "사연 작성 API", tags = { "Sayeon" })
@RestController
public class SayeonController {

	@PostMapping("/story-img")
	@ApiOperation(value = "이미지 업로드")
	@ApiResponses({ @ApiResponse(code = 200, message = "이미지 업로드 성공"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BaseResponseBody> uploadImage(@RequestParam("image") MultipartFile image) throws IllegalStateException, IOException {
		if(!image.isEmpty()) {
			image.transferTo(new File(image.getOriginalFilename()));
		}
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "이미지 업로드 성공"));
	}
}
