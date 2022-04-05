package com.ssafy.sayeon.common.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
        .allowedOrigins("http://localhost:3000","http://j6a204.p.ssafy.io:3000","http://j6a204.p.ssafy.io")
        .maxAge(3600) // 3600초 동안 preflight 결과를 캐시에 저장
        .allowedMethods("*");
  }
}
