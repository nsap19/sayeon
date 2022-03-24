package com.ssafy.sayeon.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserResgisterRequest")
public class UserRegisterReq {
	@ApiModelProperty(name="유저 닉네임", required = false)
	String email;
	@ApiModelProperty(name="유저 비밀번호", required = false)
	String password;
	@ApiModelProperty(name="유저 닉네임", required = false)
	String nickname;
	@ApiModelProperty(name="유저 프로필", required = false)
	int profilePic;
	@ApiModelProperty(name="유저 위치정보", required = false)
	String location;
}
