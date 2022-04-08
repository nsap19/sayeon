package com.ssafy.sayeon.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ssafy.sayeon.model.entity.SelectedKeyword;

public interface SelectedKeywordRepository extends JpaRepository<SelectedKeyword, String> {
	@Query(nativeQuery=true, value="select storyId, keyword\r\n" + "from selectedkeyword sk\r\n" + "where sk.storyId in (\r\n"
			+ "	select s.storyId from sentstory s\r\n" + "	left join receivedstory r\r\n"
			+ "	on s.storyId = r.storyId\r\n" + "	where r.receiverId is null"
					+ " and s.senderId != :myUserId)"
					+ "and sk.storyId != :myStoryId")
	List<SelectedKeyword> findAllKeywordWithNotMachingUser(@Param("myStoryId") String myStoryId, @Param("myUserId") String myUserId);
}
