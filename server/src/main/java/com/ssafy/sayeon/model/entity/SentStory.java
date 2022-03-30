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
@Table(name="sentstory")
public class SentStory {

    @Id
    @GeneratedValue(generator="uuid")
	@GenericGenerator(name="uuid", strategy = "uuid2")
	@Column(name="storyId", nullable=false, unique=true, length=100,columnDefinition = "BINARY(16)")
    private String storyId;

    @Column(name="senderId", length=100, nullable=false)
    private String senderId;
    
    @Column(name="dateSent", length=100, nullable=false)
    private String dateSent;
    
    @Column(name="image", length=300, nullable=false)
    private String image;

	@Column(name="waitingId", nullable=false)
    private int waitingId;
	
	@Column(name="imageType", nullable=false)
    private String imageType;
	
	@JsonIgnore
	@OneToOne(mappedBy="sentStory")
	ReceivedStory receivedStory; 
	
}
}
