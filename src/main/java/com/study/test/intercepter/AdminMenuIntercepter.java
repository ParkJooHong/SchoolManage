package com.study.test.intercepter;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.study.test.admin.service.AdminService;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AdminMenuIntercepter implements HandlerInterceptor{

	@Resource(name = "adminService")
	private AdminService adminService;

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		
		
		modelAndView.addObject("adminMenuList",adminService.getAdminMenuList());
		modelAndView.addObject("adminSubMenuList",adminService.getAdminSubMenuList());
	}
	
	
	
	
	
}
