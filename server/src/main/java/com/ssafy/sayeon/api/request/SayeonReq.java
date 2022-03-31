package com.ssafy.sayeon.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("SayeonRequest")
public class SayeonReq {
	@ApiModelProperty(name="수신자", notes="필수값, 지정자 없을 시에 \"null\" 전달")
	String receiverId;
	@ApiModelProperty(name="이미지")
	String imageUrl;
	@ApiModelProperty(name="이미지 타입")
	String imageType;
	@ApiModelProperty(name="대기시간", required = false)
	int waitingId;
	@ApiModelProperty(name="선택 키워드", notes = "콤마(,)로 키워드 구분", example = "\"animal,cat,dog\"")
	String keyword;
}
