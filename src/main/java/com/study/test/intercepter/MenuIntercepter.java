package com.study.test.intercepter;

import java.util.Map;

import org.springframework.security.core.userdetails.User;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.study.test.admin.vo.AdminSubMenuVO;
import com.study.test.member.service.MemberService;
import com.study.test.member.vo.MemberMenuVO;
import com.study.test.member.vo.MemberSubMenuVO;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

	

public class MenuIntercepter implements HandlerInterceptor {
	
	@Resource(name="memberService")
	private MemberService memberService;
	
	

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {

		
		MemberMenuVO memberMenuVO = new MemberMenuVO();
		MemberSubMenuVO memberSubMenuVO = new MemberSubMenuVO();

		String menuCode = request.getParameter("menuCode");
		String subMenuCode = request.getParameter("subMenuCode");
		
		
	
		System.out.println("!!!!!!!!!!!!!!!!!!!!!!" + menuCode);
		System.out.println("#######################" + subMenuCode);
		
		if (modelAndView == null) {
		    modelAndView = new ModelAndView();
		}

		if (modelAndView != null) {
		    modelAndView.addObject("menuList", memberService.stuMenuList());
		    modelAndView.addObject("subMenuList", memberService.stuSubMenuList(menuCode));
		}
		
		memberSubMenuVO.setSubMenuCode(subMenuCode);
	}

	
}
