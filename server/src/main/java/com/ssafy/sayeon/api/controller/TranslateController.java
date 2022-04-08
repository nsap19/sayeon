package com.ssafy.sayeon.api.controller;

import java.text.ParseException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.sayeon.api.request.KeywordsReq;
import com.ssafy.sayeon.api.response.TranslatedKeywordsBody;
import com.ssafy.sayeon.api.service.TranslationService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

@Api(value = "키워드 번역 API", tags = { "Translate" })
@RequiredArgsConstructor
@RestController
@RequestMapping("/translation")
public class TranslateController {

	@Autowired
	private TranslationService translationService;

	@PostMapping
	@ApiOperation(value = "키워드 번역")
	@ApiResponses({ @ApiResponse(code = 200, message = "키워드 번역 성공"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<?> translateKeywords(HttpServletRequest request,
			@RequestBody KeywordsReq keywordsRequest) throws ParseException {
		String result = translationService.translateKeywords(keywordsRequest.getKeywords());
		
		return ResponseEntity.ok(new TranslatedKeywordsBody(result));

	}
	
}
