package com.ssafy.sayeon.api.controller;

import java.io.FileNotFoundException;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.sayeon.api.request.SayeonReq;
import com.ssafy.sayeon.api.response.AdvancedResponseBody;
import com.ssafy.sayeon.api.response.BaseResponseBody;
import com.ssafy.sayeon.api.service.SayeonService;
import com.ssafy.sayeon.common.util.ImageUtil;
import com.ssafy.sayeon.common.util.JwtTokenUtil;
import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.SentStory;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "사연 작성 API", tags = { "Sayeon" })
@RestController
public class SayeonController {

	@Autowired
	private SayeonService sayeonService;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private ImageUtil imageUtil;

//	@PostMapping("/story-img")
//	@ApiOperation(value = "이미지 업로드(AI 처리)")
//	@ApiResponses({ @ApiResponse(code = 200, message = "이미지 업로드 성공"), @ApiResponse(code = 500, message = "서버 오류") })
//	public ResponseEntity<? extends BaseResponseBody> uploadImage(HttpServletRequest request,
//			@RequestBody SayeonReq sayeon) throws IllegalStateException, IOException {
//		return null;
//	}

	@GetMapping(value = "/download//{fileName:.+}")
	public ResponseEntity<?> downloadFile(HttpServletRequest request, @PathVariable String fileName)
			throws FileNotFoundException {

		Resource resource = imageUtil.loadFile(fileName);

		String contentType = null;
		try {
			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
			System.out.println(contentType);
		} catch (IOException ex) {
			System.out.println("Could not determine file type.");
		}

		// Fallback to the default content type if type could not be determined
		if (contentType == null) {
			contentType = "application/octet-stream";
		}
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
				.body(resource);
	}

	@PostMapping(value = "/story")
	@ApiOperation(value = "사연 확정")
	@ApiResponses({ @ApiResponse(code = 200, message = "사연 업로드 성공"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BaseResponseBody> saveSentStory(HttpServletRequest request,
			@RequestBody SayeonReq sayeon) {
		if (sayeon.getImageUrl() == null || sayeon.getImageUrl().equals("")) {
			return ResponseEntity.status(400).body(BaseResponseBody.of(400, "이미지 업로드 실패"));
		}

		Member member = jwtTokenUtil.getMemberFromToken(request.getHeader("Authorization"));

		SentStory story = sayeonService.saveStory(member, sayeon);
		
		//사연 매칭
		sayeonService.storyMatching(story);

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "사연 저장 성공"));

	}

	@GetMapping(value = "/waitingTime")
	@ApiOperation(value = "대기시간 조회")
	@ApiResponses({ @ApiResponse(code = 200, message = "대기시간 조회 성공"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BaseResponseBody> getWaitingTime() {
		return ResponseEntity.status(200)
				.body(AdvancedResponseBody.of(200, "대기시간 조회 성공", sayeonService.getWaitingTime()));
	}

}
