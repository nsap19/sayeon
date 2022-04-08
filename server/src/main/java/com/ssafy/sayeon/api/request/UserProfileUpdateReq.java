package com.ssafy.sayeon.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserProfileUpdateRequest")
public class UserProfileUpdateReq {
	@ApiModelProperty(name="유저 닉네임", required = false)
	String nickname;
	@ApiModelProperty(name="유저 프로필", required = false)
	int profilePic;
	@ApiModelProperty(name="유저 위치정보", required = false)
	String location;
	@ApiModelProperty(name="위치정보 위도")
	Double latitude;
	@ApiModelProperty(name="위치정보 경도")
	Double longitude;
}
