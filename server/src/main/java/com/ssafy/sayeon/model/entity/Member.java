package com.ssafy.sayeon.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

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
@Table(name="user")
public class Member {

    @Id
    @GeneratedValue(generator="uuid")
	@GenericGenerator(name="uuid", strategy = "uuid2")
	@Column(name="userId", nullable=false, unique=true, length=100,columnDefinition = "BINARY(16)")
    private String userId;

    @Column(name="email", length=100, nullable=false, unique=true)
    private String email;

	@JsonIgnore
	@JsonProperty(access=JsonProperty.Access.WRITE_ONLY)
	@Column(name="password", length=300, nullable=false, unique=true)
    private String password;
	
	@OneToOne(mappedBy="member")
	MemberProfile memberProfile; //읽기 전용 필드
	
	@Column(name="withdrawal",length = 1)
	String withdrawal;
	
    public Member(String email, String password) {
        this.email = email;
        this.password = password;
        this.withdrawal = "N";
    }

    public static Member createMember(String email, String password) {
//       String uid = UUID.randomUUID().toString().replace("-", "").substring(0, 10);
    	return new Member(email,password);
    }
    
}