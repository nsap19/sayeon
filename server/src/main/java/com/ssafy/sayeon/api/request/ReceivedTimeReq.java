package com.ssafy.sayeon.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ReceivedTimeRequest")
public class ReceivedTimeReq {
	@ApiModelProperty(name="받는 사람 아이디", required = true)
	String receiverId;
	@ApiModelProperty(name="대기 시간 타입", required = true)
	Integer waitingId;
}
