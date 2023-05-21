package com.study.test;


import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.study.test.member.service.MemberService;
import com.study.test.member.vo.MemberMenuVO;
import com.study.test.member.vo.MemberSubMenuVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.school.colleage.ColleageVO;
import com.study.test.school.service.SchoolService;
import com.study.test.stu.service.StuService;
import com.study.test.stu.vo.StuVO;

import jakarta.annotation.Resource;



@Controller
public class IndexController {
	@Resource(name = "memberService")
	private MemberService memberService;
	
	@Resource(name = "schoolService")
	private SchoolService schoolService;
	
	@Resource(name = "stuService")
	private StuService stuService;
	
	@GetMapping("/")
	public String index() {
		return "content/login/login_page";

	}

	@GetMapping("/mainPage")
	public String index(Model model, MemberMenuVO memberMenuVO, MemberSubMenuVO memberSubMenuVO, Authentication authentication, StuVO stuVO, MemberVO memberVO) {

		if(memberMenuVO.getMenuCode() == null) {
			memberMenuVO.setMenuCode("MENU_001");
			memberSubMenuVO.setSubMenuCode("SUB_MENU_001");
		}
		if(memberSubMenuVO.getSubMenuCode() == null) {
			memberSubMenuVO.setSubMenuCode("SUB_MENU_001");
		}
		
		User user = (User)authentication.getPrincipal();
		String memName = user.getUsername();
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		
		System.out.println(memberVO);
		
		System.out.println("학생 정보 : " + stuService.seletStu(memberVO));
		model.addAttribute("memberVO", stuService.seletStu(memberVO));
		
		
		model.addAttribute("menuList", memberService.stuMenuList());
		model.addAttribute("subMenuList", memberService.stuSubMenuList(memberMenuVO.getMenuCode()));


		return "/content/stu/info_main";


	
	}
}
