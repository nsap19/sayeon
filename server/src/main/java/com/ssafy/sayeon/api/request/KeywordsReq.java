package com.ssafy.sayeon.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("KeywordsRequest")
public class KeywordsReq {
	@ApiModelProperty(name="키워드", required = true)
	String keywords;
}
