package com.study.test.intercepter;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.study.test.professor.service.ProfessorService;
import com.study.test.professor.vo.ProfessorSubMenuVO;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class ProfessorMenuIntercepter implements HandlerInterceptor {
	@Resource(name = "professorService")
	private ProfessorService professorService;

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		if (auth != null) {
			User user = (User) auth.getPrincipal();

			System.out.println("@@@@@@@@@@@@@@@유저 데이터" + user);

			List<String> authorityStrings = user.getAuthorities().stream().map(GrantedAuthority::getAuthority)
					.collect(Collectors.toList());

			if (authorityStrings.contains("ROLE_PRO")) {
				Map<String, Object> data = modelAndView.getModel();
				if (data != null) {
					if ((ProfessorSubMenuVO) data.get("professorSubMenuVO") != null) {
						ProfessorSubMenuVO subMenu = (ProfessorSubMenuVO) data.get("professorSubMenuVO");
						modelAndView.addObject("professorMenuList", professorService.getProfessorMenuList());
						modelAndView.addObject("professorSubMenuList",
								professorService.getProfessorSubMenuList(subMenu.getMenuCode()));
					} else {
						modelAndView.addObject("professorMenuList", professorService.getProfessorMenuList());
					}
				}

			}

		}

	}
}