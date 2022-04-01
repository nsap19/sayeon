package com.ssafy.sayeon.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@NoArgsConstructor
@Table(name="sentstory")
public class SentStory {

    @Id
    @GeneratedValue(generator="uuid")
	@GenericGenerator(name="uuid", strategy = "uuid2")
	@Column(name="storyId", nullable=false, unique=true, length=100,columnDefinition = "BINARY(16)")
    private String storyId;

    @ManyToOne
    @JoinColumn(name="senderId")
    @JsonIgnore
    private Member sender;
    
    @Column(name="dateSent", length=100, nullable=false)
    private String dateSent;
    
    @Column(name="image", length=300, nullable=false)
    private String image;

    @ManyToOne
    @JoinColumn(name="waitingId")
    private WaitingTime watingId;
	
	@OneToOne(mappedBy="sentStory")
	ReceivedStory receivedStory; //읽기 전용 필드
	
	@Column(name="imageType", nullable=false)
	@ColumnDefault("SQUARE")
	private ImageType imageType;

	
	public enum ImageType {
		MINI, WIDE, SQUARE
	}
}
