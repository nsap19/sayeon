package com.ssafy.sayeon.common.exception;

public class NotExistRequestTypeException extends RuntimeException{
	public NotExistRequestTypeException() {
		super("존재하지 않는 요청타입입니다");
	}

}
