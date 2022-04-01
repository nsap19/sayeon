package com.ssafy.sayeon.model.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.ReceivedStoryView;
import com.ssafy.sayeon.model.entity.SentStory;

public interface SentStroryRepository extends JpaRepository<SentStory, String> {
	Page<SentStory> findBySender(Member sender,Pageable pageable);
	List<SentStory> findAllBySender(Member sender);
	SentStory findByStoryId(String storyId);

	@Query(nativeQuery=true, value="select s.storyId, senderId, receiverId, dateSent, dateReceived, image, waitingId, imageType from sentstory s\r\n" + 
			"join receivedstory r\r\n" + 
			"on s.storyId=r.storyId\r\n" + 
			"where receiverId=:myId\r\n" + 
			"and senderId = :friendId\r\n" + 
			"union\r\n" + 
			"select s.storyId, senderId, receiverId, dateSent, dateReceived, image, waitingId, imageType from receivedstory r\r\n" + 
			"join sentstory s\r\n" + 
			"on s.storyId=r.storyId\r\n" + 
			"where senderId=:myId\r\n" + 
			"and receiverId=:friendId\r\n" + 
			"order by dateReceived desc")
	List<ReceivedStoryView> findAllWithConditions(@Param("myId") String myId, @Param("friendId") String friendId);

}
