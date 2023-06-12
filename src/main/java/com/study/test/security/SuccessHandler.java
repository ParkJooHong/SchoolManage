package com.study.test.security;

import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.security.access.method.P;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import com.study.test.member.service.MemberService;
import com.study.test.member.vo.MemberVO;

import jakarta.annotation.Resource;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

public class SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	@Resource(name = "memberService")
	private MemberService memberService;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {

		System.out.println("success 핸들러 실행!");
		
		//인증정보 가져오기
		UserDetails userDetails = (UserDetails) authentication.getPrincipal();
		
		String isAccount = "";
		
		for (GrantedAuthority authority : userDetails.getAuthorities()) {
		    if (authority.getAuthority().equals("ROLE_ADMIN")) {
		        isAccount = "admin";
		        break;
		    }
		    else if(authority.getAuthority().equals("ROLE_PRO"))
		    	isAccount = "professor";
	        	break;
		}
		
		if(isAccount.equals("admin")) {
			PrintWriter p = response.getWriter();
			p.write("admin");
			p.flush();
		}
		else if(isAccount.equals("professor")) {
			PrintWriter p = response.getWriter();
			p.write("professor");
			p.flush();
		}
		else {
			PrintWriter p = response.getWriter();
			p.write("stu");
			p.flush();
		}

		super.onAuthenticationSuccess(request, response, authentication);
	}
	
}
