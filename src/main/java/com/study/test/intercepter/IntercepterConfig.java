package com.study.test.intercepter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class IntercepterConfig implements WebMvcConfigurer {

	@Override
	public void addInterceptors(InterceptorRegistry registry) {


		registry.addInterceptor(getMenuIntercepter())
				.addPathPatterns("/memberMenu/**")
				.addPathPatterns("/stuMenu/**");
		
		
		registry.addInterceptor(getAdminMenuIntercepter())
				.order(1)
				.addPathPatterns("/admin/**")
				.excludePathPatterns("/admin/join")
				.excludePathPatterns("/member/**");
		
	}

	@Bean
	public MenuIntercepter getMenuIntercepter() {
		return new MenuIntercepter();
	}
	
	@Bean
	public AdminMenuIntercepter getAdminMenuIntercepter() {
		return new AdminMenuIntercepter();
	}
	
	@Bean
	public WebMvcConfig getLocale() {
		return new WebMvcConfig();
	}
	
}
