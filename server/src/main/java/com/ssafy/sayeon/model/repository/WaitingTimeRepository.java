package com.ssafy.sayeon.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.sayeon.model.entity.WaitingTime;

public interface WaitingTimeRepository extends JpaRepository<WaitingTime, Integer>{
}
