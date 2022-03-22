package com.ssafy.sayeon.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
public class UserProfile {
	@Id
	@Column(name = "userId", nullable = false)
	String userId;

	@OneToOne
	@MapsId // @MapsId 는 @id로 지정한 컬럼에 @OneToOne 이나 @ManyToOne 관계를 매핑시키는 역할
	@JoinColumn(name = "userId")
	User user;

	@Column(name = "profilePic", length = 100, nullable = false)
	int profilePic;

	@Column(name = "nickname", length = 100, nullable = false)
	String nickname;

	@Column(name = "location", length = 100, nullable = false)
	String location;

}
