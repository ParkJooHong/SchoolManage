package com.study.test.intercepter;

import java.util.Map;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.study.test.professor.service.ProfessorService;
import com.study.test.professor.vo.ProfessorMenuVO;
import com.study.test.professor.vo.ProfessorSubMenuVO;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class ProfessorMenuIntercepter implements HandlerInterceptor{
	@Resource(name = "professorService")
	private ProfessorService professorService;

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		
		Map<String, Object> data = modelAndView.getModel();
		if(data != null) {	
			if((ProfessorSubMenuVO)data.get("professorSubMenuVO") != null) {
				ProfessorSubMenuVO subMenu = (ProfessorSubMenuVO)data.get("professorSubMenuVO");
				modelAndView.addObject("professorMenuList",professorService.getProfessorMenuList());
				modelAndView.addObject("professorSubMenuList",professorService.getProfessorSubMenuList(subMenu.getMenuCode()));
			}
			else {
				modelAndView.addObject("professorMenuList",professorService.getProfessorMenuList());
			}
		}
		
	}
	
}
