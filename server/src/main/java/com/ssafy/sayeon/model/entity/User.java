package com.ssafy.sayeon.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class User {
	@Id
	@GeneratedValue(generator="uuid")
	@GenericGenerator(name="uuid", strategy = "uuid2")
	@Column(name="userId", nullable=false, unique=true, length=100)
	String userId;
	
	@Column(name="email", length=100, nullable=false, unique=true)
	String email;
	
	@JsonIgnore
	@JsonProperty(access=JsonProperty.Access.WRITE_ONLY)
	@Column(name="password", length=300, nullable=false, unique=true)
	String password;
	
}
