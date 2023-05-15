package com.study.test.intercepter;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.study.test.admin.vo.AdminSubMenuVO;
import com.study.test.member.service.MemberService;
import com.study.test.member.vo.MemberMenuVO;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

	

public class MenuIntercepter implements HandlerInterceptor {
	
	@Resource(name="memberService")
	private MemberService memberService;
	
	

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		
		String menuCode = request.getParameter("menuCode");
	
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!" + menuCode);
		
		modelAndView.addObject("menuList", memberService.stuMenuList());
		modelAndView.addObject("subMenuList", memberService.stuSubMenuList(menuCode));
	}

	

	
	
}
