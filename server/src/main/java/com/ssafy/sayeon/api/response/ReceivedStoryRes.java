package com.ssafy.sayeon.api.response;

import java.util.LinkedList;
import java.util.List;

import com.ssafy.sayeon.model.entity.ReceivedStory;
import com.ssafy.sayeon.model.entity.SentStory;
import com.ssafy.sayeon.model.entity.SentStory.ImageType;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Builder
@Getter
@ToString
@ApiModel("ReveibedStoryResponse")
@AllArgsConstructor
public class ReceivedStoryRes {
	@ApiModelProperty(name="storyId")
	String storyId;
	
	@ApiModelProperty(name="senderId")
	String senderId;
	
	@ApiModelProperty(name="senderNickname")
	String senderNickname;
	
	@ApiModelProperty(name="receiverId")
	String receiverId;
	
	@ApiModelProperty(name="receiverNickname")
	String receiverNickname;
	
	@ApiModelProperty(name="dateSent")
	String dateSent;
	
	@ApiModelProperty(name="deteReceived")
	String dateReceived;
	
	@ApiModelProperty(name="image")
	String image;
	
	@ApiModelProperty(name="imageType")
	String imageType;
	
	public static List<ReceivedStoryRes> of(List<ReceivedStory> receivedStories){
		List<ReceivedStoryRes> result = new LinkedList<ReceivedStoryRes>();
		
		//MINI, WIDE, SQUARE
		for(ReceivedStory story : receivedStories) {
			SentStory sent = story.getSentStory();
			String imageTypeName = "";
			switch(sent.getImageType()) {
			case MINI: 
				imageTypeName = ImageType.MINI.name();
				break;
			case WIDE : 
				imageTypeName = ImageType.WIDE.name();
				break;
			case SQUARE : 
				imageTypeName = ImageType.SQUARE.name();
				break;
				
			}
			
			result.add(ReceivedStoryRes.builder()
					.storyId(story.getStoryId())
					.senderId(sent.getSender().getUserId())
					.senderNickname(sent.getSender().getMemberProfile().getNickname())
					.receiverId(story.getReceiver().getUserId())
					.receiverNickname(story.getReceiver().getMemberProfile().getNickname())
					.dateSent(sent.getDateSent())
					.dateReceived(story.getDateReceived())
					.image(sent.getImage())
					.imageType(imageTypeName)
					.build());
		}
		
		return result;
	}
}

