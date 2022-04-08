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
@Table(name="selectedkeyword")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class SelectedKeyword {
	@OneToOne
	@MapsId
	@JoinColumn(name="storyId")
	@JsonIgnore
	SentStory sentStory;
	
	@Id
	@Column(name="storyId", nullable=false)
	@JsonIgnore
	String storyId;
	
	@Column(name="keyword", nullable=false)
	String keyword;

	public SelectedKeyword(SentStory sentStory, String keyword) {
		super();
		this.sentStory = sentStory;
		this.keyword = keyword;
	}
	
	
}
