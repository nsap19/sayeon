package com.ssafy.sayeon.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.sayeon.model.entity.SentStory;

public interface SayeonRepository extends JpaRepository<SentStory, String>{
}
