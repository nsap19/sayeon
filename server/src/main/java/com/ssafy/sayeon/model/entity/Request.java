package com.ssafy.sayeon.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
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
@Table(name="request")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@IdClass(RequestPK.class)
public class Request {
	@Id
	@ManyToOne
	@JoinColumn(name="userId")
	@JsonIgnore
	private Member userId;
	
	@Id
	@ManyToOne
	@JoinColumn(name="requestedId")
	@JsonIgnore
	private Member requestedId;

	@Column(name="requestType")
	private RequestType requestType;
	
	public enum RequestType {
		DELETE, REPORT, BLOCK
	}

}
