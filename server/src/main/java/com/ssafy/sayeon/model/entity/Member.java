package com.ssafy.sayeon.model.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import net.bytebuddy.utility.RandomString;

import java.util.UUID;

import javax.persistence.*;

@Entity
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="user")
public class Member {

    @Id
    @Column(name = "userid", unique = true)
    private String userId;

    @Column(name = "email", unique = true)
    private String email;
    @Column(name = "password")
    private String password;

    public Member(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public static Member createMember(String email, String password) {
       String uid = UUID.randomUUID().toString().replace("-", "").substring(0, 10);
    	return new Member(uid, email,password);
    }

}