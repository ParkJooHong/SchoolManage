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

import com.study.test.member.service.MemberService;
import com.study.test.member.vo.MemberSubMenuVO;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class MenuIntercepter implements HandlerInterceptor {

	@Resource(name = "memberService")
	private MemberService memberService;

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		if (auth != null) {
			User user = (User) auth.getPrincipal();

			System.out.println("@@@@@@@@@@@@@@@유저 데이터" + user);

			List<String> authorityStrings = user.getAuthorities().stream().map(GrantedAuthority::getAuthority)
					.collect(Collectors.toList());

			if (authorityStrings.contains("ROLE_STU")) {
				// 컨트롤러에서 html로 전달되는 데이터 받기
				Map<String, Object> data = modelAndView.getModel();
				if (data != null) {
					MemberSubMenuVO memberSubMenuVO = (MemberSubMenuVO) data.get("memberSubMenuVO");
					if (memberSubMenuVO != null) {
						// adminService.getMenuList(); 이걸 밑에 넣어준다.
						modelAndView.addObject("menuList", memberService.stuMenuList());
						modelAndView.addObject("subMenuList",
								memberService.stuSubMenuList(memberSubMenuVO.getMenuCode()));
					}
				}
			}
		}
	}
}
