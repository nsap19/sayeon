package com.ssafy.sayeon.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name="userprofile")
public class MemberProfile {
	@Id
	@Column(name = "userId", nullable = false)
	String userId;

	@OneToOne
	@MapsId // @MapsId 는 @id로 지정한 컬럼에 @OneToOne 이나 @ManyToOne 관계를 매핑시키는 역할
	@JoinColumn(name = "userId")
	Member member;

	@Column(name = "profilePic", length = 100, nullable = false)
	int profilePic;

	@Column(name = "nickname", length = 100, nullable = false)
	String nickname;

	@Column(name = "location", length = 100, nullable = false)
	String location;

	public MemberProfile(Member member, int profilePic, String nickname, String location) {
		super();
		this.member = member;
		this.profilePic = profilePic;
		this.nickname = nickname;
		this.location = location;
	}

	
}
