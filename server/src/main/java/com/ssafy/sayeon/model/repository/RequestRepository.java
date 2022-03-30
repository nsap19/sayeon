package com.ssafy.sayeon.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.sayeon.model.entity.Request;
import com.ssafy.sayeon.model.entity.RequestPK;

public interface RequestRepository extends JpaRepository<Request, RequestPK> {

}
