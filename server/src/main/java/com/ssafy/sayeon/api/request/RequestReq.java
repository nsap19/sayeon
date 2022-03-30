package com.ssafy.sayeon.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserRequest")
public class RequestReq {
	@ApiModelProperty(name="삭제할 userId 혹은 차단할 userId")
	String requestedId;
	@ApiModelProperty(name="요청 종류")
	String requestType;
}
