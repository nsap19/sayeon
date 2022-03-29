package com.ssafy.sayeon.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserPwUpdateRequest")
public class UserPwUpdateReq {
	@ApiModelProperty(name="유저 비밀번호")
	String password;
}
