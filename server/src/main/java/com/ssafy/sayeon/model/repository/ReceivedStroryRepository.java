package com.ssafy.sayeon.model.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.entity.ReceivedStory;

public interface ReceivedStroryRepository extends JpaRepository<ReceivedStory, String> {
	Page<ReceivedStory> findByReceiver(Member receiver, Pageable pageable);

	List<ReceivedStory> findAllByReceiver(Member receiver);
	Optional<ReceivedStory> findByStoryId(String storyId);

}
