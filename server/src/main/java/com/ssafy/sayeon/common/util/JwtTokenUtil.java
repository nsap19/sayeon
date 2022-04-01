package com.ssafy.sayeon.common.util;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.ssafy.sayeon.api.service.MemberService;
import com.ssafy.sayeon.model.entity.Member;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
@Component
public class JwtTokenUtil {

	@Autowired
	MemberService memberService;
	
//    private static final String secret = "secretkey";
//	@Value("${spring.jwt.secret}")
//	private static String secret;
	private Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    public static final long JWT_TOKEN_VALIDITY = 1000L  * 60 * 60 * 24; // // 24시간만 토큰 유효

    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getId);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public String generateToken(String id) {
        return generateToken(id, new HashMap<>());
    }

    public String generateToken(String id, Map<String, Object> claims) {
        return doGenerateToken(id, claims);
    }

    private String doGenerateToken(String id, Map<String, Object> claims) {
        return Jwts.builder()
                .setClaims(claims)
                .setId(id)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }
    
    public Member getMemberFromToken(String token) {
    	String email = Objects.requireNonNull(this.getUsernameFromToken(token.replace("Bearer ", "")));
		
		return memberService.getMemberByEmail(email);
    }

    public String getUserEmailFromJwt(String token) {
		Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(key).build()
				.parseClaimsJws(token.replace("Bearer ", ""));
		return claims.getBody().getSubject();
	}


}
