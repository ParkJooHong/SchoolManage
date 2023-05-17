package com.study.test.intercepter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class IntercepterConfig implements WebMvcConfigurer {

	@Override
	public void addInterceptors(InterceptorRegistry registry) {

		//학생 인터셉터
		registry.addInterceptor(getMenuIntercepter())
				.addPathPatterns("/member/**")
				.addPathPatterns("/stuMenu/**")
				.excludePathPatterns("/admin/**")
				.excludePathPatterns("/professor/**");
		
		//어드민 인터셉터
		registry.addInterceptor(getAdminMenuIntercepter())
				.order(1)
				.addPathPatterns("/admin/**")
				.excludePathPatterns("/member/**")
				.excludePathPatterns("/professor/**");
		
		//교수 인터셉터
		registry.addInterceptor(getProfessorMenuIntercepter())
				.order(2)
				.addPathPatterns("/professor/**")
				.excludePathPatterns("/admin/**")
				.excludePathPatterns("/member/**");
	}

	//학생 메인 메뉴
	@Bean
	public MenuIntercepter getMenuIntercepter() {
		return new MenuIntercepter();
	}
	
	//어드민 메인 메뉴
	@Bean
	public AdminMenuIntercepter getAdminMenuIntercepter() {
		return new AdminMenuIntercepter();
	}
	
	//교수 메인 메뉴
	@Bean
	public ProfessorMenuIntercepter getProfessorMenuIntercepter() {
		return new ProfessorMenuIntercepter();
	}
	
}
