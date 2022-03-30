package com.ssafy.sayeon.model.entity;

import java.io.Serializable;

import com.ssafy.sayeon.model.entity.Request.RequestType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestPK implements Serializable {
	private String userId;
	private RequestType requestType;
	private String requestedId;
}
