package com.ssafy.sayeon.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("SayeonRequest")
public class SayeonReq {
	@ApiModelProperty(name="이미지")
	String imageUrl;
	@ApiModelProperty(name="이미지 타입")
	String imageType;
	@ApiModelProperty(name="대기시간", required = false)
	int waitingId;
	
	
}
