package com.ssafy.sayeon.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="waitingtime")
public class WaitingTime {

	@Id
	@Column(name="waitingId", nullable = false)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int waitingId;
	
	@Column(name="waitingTime", nullable=false)
	float waitingTime;
	
	@Column(name="waitingName", nullable=false)
	String waitingName;
	
	
}
