package com.study.test.intercepter;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;




@Configuration
public class IntercepterConfig implements WebMvcConfigurer {
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		
			//어드민 인터셉터
			registry.addInterceptor(getAdminMenuIntercepter())
					.order(1)
					.addPathPatterns("/admin/**")
					.addPathPatterns("/board/**")
					.addPathPatterns("/member/changeMemPw")
					.addPathPatterns("/message/**")
					.excludePathPatterns("/professor/**")
					.excludePathPatterns("/stuMenu/**")
					.excludePathPatterns("/admin/**Ajax")
					.excludePathPatterns("/board/**Ajax")
					.excludePathPatterns("/member/**Ajax")
					.excludePathPatterns("/message/**Ajax")
					.excludePathPatterns("/admin/talk")
					.excludePathPatterns("/js/**", "/css/**", "/upload/**", "/image/**");
			//교수 인터셉터
			registry.addInterceptor(getProfessorMenuIntercepter())
					.order(2)
					.addPathPatterns("/professor/**")
					.addPathPatterns("/message/**")
					.addPathPatterns("/board/**")
					.addPathPatterns("/member/changeMemPw")
					.excludePathPatterns("/admin/**")
					.excludePathPatterns("/stuMenu/**")
					.excludePathPatterns("/professor/**Ajax")
					.excludePathPatterns("/board/**Ajax")
					.excludePathPatterns("/member/**Ajax")
					.excludePathPatterns("/message/**Ajax")
					.excludePathPatterns("/professor/talk")
					.excludePathPatterns("/js/**", "/css/**", "/upload/**", "/image/**");
			//학생 인터셉터
			registry.addInterceptor(getMenuIntercepter())
					.order(3)
					.addPathPatterns("/member/**")
					.addPathPatterns("/member/changeMemPw")
					.addPathPatterns("/stu/**")
					.addPathPatterns("/stuMenu/**")
					.addPathPatterns("/board/**")
					.addPathPatterns("/message/**")
					.excludePathPatterns("/admin/**")
					.excludePathPatterns("/professor/**")
					.excludePathPatterns("/member/**Ajax")
					.excludePathPatterns("/stuMenu/**Ajax")
					.excludePathPatterns("/stu/**Ajax")
					.excludePathPatterns("/board/**Ajax")
					.excludePathPatterns("/stuMenu/updateMynfo")
					.excludePathPatterns("/stuMenu/board")
					.excludePathPatterns("/message/**Ajax")
					.excludePathPatterns("/stuMenu/talk")
					.excludePathPatterns("/js/**", "/css/**", "/upload/**", "/image/**");
			}

	// 학생 메인 메뉴
	@Bean
	public MenuIntercepter getMenuIntercepter() {
		return new MenuIntercepter();
	}

	// 어드민 메인 메뉴
	@Bean
	public AdminMenuIntercepter getAdminMenuIntercepter() {
		return new AdminMenuIntercepter();
	}

	// 교수 메인 메뉴
	@Bean
	public ProfessorMenuIntercepter getProfessorMenuIntercepter() {
		return new ProfessorMenuIntercepter();
	}
	
}
