package com.ssafy.sayeon.common.exception;

public class NotExistWaitingTimeException extends RuntimeException{
	public NotExistWaitingTimeException() {
		super("존재하지 않는 대기시간입니다.");
	}

}
