package com.ssafy.sayeon.common.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import javax.crypto.SecretKey;

import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
@Component
public class JwtTokenUtil {

//    private static final String secret = "secretkey";
//	@Value("${spring.jwt.secret}")
//	private static String secret;
	private Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    public static final long JWT_TOKEN_VALIDITY = 1000L  * 60 * 60; // // 1시간만 토큰 유효

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

}
