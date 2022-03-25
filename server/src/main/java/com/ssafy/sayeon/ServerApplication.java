package com.ssafy.sayeon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import com.ssafy.sayeon.common.config.ImageUploadProperties;

@EnableConfigurationProperties({ ImageUploadProperties.class })
@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

}
