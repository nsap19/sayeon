package com.ssafy.sayeon.model.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Setter;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import net.bytebuddy.utility.RandomString;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;



@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="receivedstory")
public class ReceivedStrory {

	@OneToOne
	@MapsId 
	@JoinColumn(name = "sentStory")
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