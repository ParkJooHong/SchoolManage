package com.study.test.security;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLEncoder;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.study.test.member.service.MemberService;
import com.study.test.member.vo.MemberVO;

import jakarta.annotation.Resource;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
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
		
		PrintWriter p = response.getWriter();
		p.write("success");
		p.flush();

		//인증정보 가져오기
		UserDetails userDetails = (UserDetails) authentication.getPrincipal();

		// 세션에 회원이름 저장
		String memId = userDetails.getUsername();
		MemberVO memberInfo = new MemberVO();
		//memberInfo.setMemId(memId);

		HttpSession session = request.getSession();
		//session.setAttribute("memName", memberService.login(memberInfo).getMemName());

		super.onAuthenticationSuccess(request, response, authentication);
	}
	
}
