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
		/*
		//컨트롤러에서 html로 전달되는 데이터 받기
		 Map<String, Object> data = modelAndView.getModel();
		 String menuCode = data.get("menuCode").toString();
		 
		// adminService.getMenuList(); 이걸 밑에 넣어준다.
		modelAndView.addObject("menuCode", memberService.stuMenuList());
		modelAndView.addObject("subMenuCode", memberService.stuSubMenuList(menuCode));
		*/
		
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
		
		//memberSubMenuVO.setSubMenuCode(subMenuCode);
		
	}

	
}
