package com.ssafy.sayeon.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name="receivedstory")
public class ReceivedStory {

	@OneToOne
	@MapsId 
	@JoinColumn(name = "storyId")
	@JsonIgnore
	SentStory sentStory;
	
	@Id
	@Column(name = "storyId", nullable = false)
	@JsonIgnore
	String storyId;
	
	@Column(name = "receiverId", length = 100, nullable = false)
	String receiverId;

    @Column(name="dateReceived", length=100, nullable=false)
    private String dateReceived;


}
