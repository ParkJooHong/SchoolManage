package com.study.test.security;

import java.io.IOException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	private AuthenticationEntryPointException authenticationEntryException;
	
	
	//인증과 인가에 대한 설정 세팅
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity security) throws Exception {
		
		security.csrf().disable()
				.authorizeHttpRequests()
				.requestMatchers("/"
								, "/member/findPwAjax").permitAll()
				.requestMatchers("admin/**").hasRole("ADMIN")
				.anyRequest().authenticated()
			.and()
				.formLogin()
				.loginPage("/")
				.loginProcessingUrl("/member/login")
				.usernameParameter("memNo")
				.passwordParameter("memPw")
				.successHandler(geSuccessHandler())
				.failureHandler(getFailureHandler())
				.permitAll()
			.and()
				.logout()
				.logoutUrl("/member/logout")
				.invalidateHttpSession(true)
				.logoutSuccessUrl("/");
			
			security.sessionManagement()
					.maximumSessions(1)
					.maxSessionsPreventsLogin(true)
					.expiredUrl("/");
			security.exceptionHandling()
					.authenticationEntryPoint(authenticationEntryException);
				//.AccessDeniedHandler(참고용)
		return security.build();
	}
	

	
	
	
	//암호화 객체 생성
	@Bean
	public PasswordEncoder getPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	//로그인 성공시 실행되는 핸들러 객체생성
	@Bean
	public SuccessHandler geSuccessHandler() {
		return new SuccessHandler();
	}
	
	//로그인 실패시 실행되는 핸들러 객체생성
	@Bean
	public FailureHandler getFailureHandler() {
		return new FailureHandler();
	}
	
	//js, img, css 접근제한 해제
	@Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/js/**", "/css/**", "/upload/**", "/image/**");
    }
	
	@Component
	public class AuthenticationEntryPointException implements AuthenticationEntryPoint{

		@Override
		public void commence(HttpServletRequest request, HttpServletResponse response,
				AuthenticationException authException) throws IOException, ServletException {
			response.sendRedirect("/");
		}
		
	}

}
