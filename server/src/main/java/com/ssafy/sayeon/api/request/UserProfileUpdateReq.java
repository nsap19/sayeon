package com.ssafy.sayeon.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserProfileUpdateRequest")
public class UserProfileUpdateReq {
	@ApiModelProperty(name="유저 닉네임", example="홍길동")
	String nickname;
	@ApiModelProperty(name="유저 프로필", example="1")
	int profilePic;
	@ApiModelProperty(name="유저 위치정보", example="서울특별시 종로구")
	String location;
}
