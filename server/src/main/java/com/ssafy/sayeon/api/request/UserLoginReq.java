package com.ssafy.sayeon.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserLoginRequest")
public class UserLoginReq {
	@ApiModelProperty(name="유저 닉네임", required = false)
	String email;
	@ApiModelProperty(name="유저 비밀번호", required = false)
	String password;
}
