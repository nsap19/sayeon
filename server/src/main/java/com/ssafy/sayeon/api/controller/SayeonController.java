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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.ssafy.sayeon.api.response.BaseResponseBody;
import com.ssafy.sayeon.common.util.ImageUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "사연 작성 API", tags = { "Sayeon" })
@RestController
public class SayeonController {

	@Autowired
	ImageUtil imageUtil;
	
	@PostMapping("/story-img")
	@ApiOperation(value = "이미지 업로드")
	@ApiResponses({ @ApiResponse(code = 200, message = "이미지 업로드 성공"), @ApiResponse(code = 500, message = "서버 오류") })
	public ResponseEntity<? extends BaseResponseBody> uploadImage(@RequestParam("image") MultipartFile image) throws IllegalStateException, IOException {
		if(image.isEmpty()) {
			return ResponseEntity.status(400).body(BaseResponseBody.of(400, "파일 업로드 실패"));
		}
		
	
		String fileName = imageUtil.saveImage(image);
		
		String downloadURI = ServletUriComponentsBuilder.fromCurrentContextPath().path("/download/").path(fileName).toUriString();
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, downloadURI));
	}
	
	 @GetMapping(value = "/download//{fileName:.+}")
	  public ResponseEntity<?> downloadFile(HttpServletRequest request, @PathVariable String fileName) throws FileNotFoundException {
	  
	  	Resource resource = imageUtil.loadFile(fileName);

	        String contentType = null;
	        try {
	            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
	            System.out.println(contentType);
	        } catch (IOException ex) {
	            System.out.println("Could not determine file type.");
	        }

	        // Fallback to the default content type if type could not be determined
	        if(contentType == null) {
	            contentType = "application/octet-stream";
	        }
	        return ResponseEntity.ok()
	                .contentType(MediaType.parseMediaType(contentType))
	                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
	                .body(resource);
	  }

}
