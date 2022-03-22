package com.ssafy.sayeon.api.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import com.ssafy.sayeon.model.entity.Member;
import com.ssafy.sayeon.model.repository.MemberRepository;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import com.ssafy.sayeon.api.service.JwtUserDetailsService;
import com.ssafy.sayeon.common.util.JwtTokenUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@Api(value ="JWT 인증 컨트롤러 API", tags= {"JWT Authentication"})
public class JwtAuthenticationController {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailService;

    @PostMapping("/users/login")
	@ApiOperation(value = "로그인", notes = "로그인 성공 시 토큰 발급")	
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        final Member member = userDetailService.authenticateByEmailAndPassword
                (authenticationRequest.getEmail(), authenticationRequest.getPassword());
        final String token = jwtTokenUtil.generateToken(member.getEmail());
        return ResponseEntity.ok(new JwtResponse(token));
    }
}

@Data
class JwtRequest {

    private String email;
    private String password;

}

@Data
@AllArgsConstructor
class JwtResponse {

    private String token;

}

