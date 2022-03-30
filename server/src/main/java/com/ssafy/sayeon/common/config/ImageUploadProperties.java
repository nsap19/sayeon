package com.ssafy.sayeon.common.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Setter;
import lombok.Getter;

@Getter
@Setter
@ConfigurationProperties(prefix = "file.upload")
public class ImageUploadProperties {
	private String location;

}
