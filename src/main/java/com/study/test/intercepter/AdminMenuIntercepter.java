package com.study.test.intercepter;

import java.util.Map;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.study.test.admin.service.AdminService;
import com.study.test.admin.vo.AdminSubMenuVO;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AdminMenuIntercepter implements HandlerInterceptor{
	@Resource(name = "adminService")
	private AdminService adminService;

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		
		Map<String, Object> data = modelAndView.getModel();
		if(data != null) {			
			AdminSubMenuVO subMenu = (AdminSubMenuVO)data.get("adminSubMenuVO");
			modelAndView.addObject("adminMenuList",adminService.getAdminMenuList());
			modelAndView.addObject("adminSubMenuList",adminService.getAdminSubMenuList(subMenu.getMenuCode()));
		}
		
	}
	
}
