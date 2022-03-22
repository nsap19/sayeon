package com.ssafy.sayeon.common.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class CurrentUser {
	public static String getUserId() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		AuthUserDetails currentUserDatail = (AuthUserDetails) auth.getDetails();
		return currentUserDatail.getMember().getUserId();
	}
}
