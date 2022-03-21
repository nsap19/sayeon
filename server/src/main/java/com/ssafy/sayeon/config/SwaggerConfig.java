package com.ssafy.sayeon.config;

import java.util.Collections;

import java.util.HashSet;
import java.util.Set;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.google.common.base.Predicate;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

//http://localhost:8080/swagger-ui.html

@Configuration
@EnableSwagger2
public class SwaggerConfig {

	private String version = "V1";
	private String title = "SAYEON API " + version;

	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(RequestHandlerSelectors.basePackage("com.ssafy.sayeon.controller")).paths(PathSelectors.any())
				.build().apiInfo(apiInfo());
	}

	private ApiInfo apiInfo() {
		return new ApiInfo(title, "Some custom description of API.", "0.0.1", "Terms of service",
				new Contact("MemoStack", "https://memostack.tistory.com", "public.devhong@gmail.com"), "License of API",
				"API license URL", Collections.emptyList());
	}

	@Bean
	public Docket postsApi() {
//		List<ResponseMessage> responseMessages = new ArrayList<ResponseMessage>();
//		responseMessages.add(new ResponseMessageBuilder().code(200).message("OK !!!").build());
//		responseMessages.add(new ResponseMessageBuilder().code(500).message("서버 문제 발생 !!!").responseModel(new ModelRef("Error")).build());
//		responseMessages.add(new ResponseMessageBuilder().code(404).message("페이지를 찾을 수 없습니다 !!!").build());
		return new Docket(DocumentationType.SWAGGER_2).groupName("sayeonVueAPI").consumes(getConsumeContentTypes())
				.produces(getProduceContentTypes()).select()
				.apis(RequestHandlerSelectors.basePackage("com.ssafy.newbit.controller")).paths(postPaths()).build();
	}

	private Set<String> getConsumeContentTypes() {
		Set<String> consumes = new HashSet<>();
		consumes.add("application/json;charset=UTF-8");
		consumes.add("application/x-www-form-urlencoded");
		return consumes;
	}

	private Set<String> getProduceContentTypes() {
		Set<String> produces = new HashSet<>();
		produces.add("application/json;charset=UTF-8");
		return produces;
	}

	private Predicate<String> postPaths() {
		return PathSelectors.any();
	}

}
