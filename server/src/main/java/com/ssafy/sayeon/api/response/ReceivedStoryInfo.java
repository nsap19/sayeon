package com.ssafy.sayeon.api.response;

import lombok.*;

@AllArgsConstructor
@Setter
@Getter
@NoArgsConstructor
public class ReceivedStoryInfo {
	String storyId;
	String senderId;
	String receiverId;
	String dateSent;
	String dateReceived;
	String image;
	int waitingId;
	String imageType;
}
