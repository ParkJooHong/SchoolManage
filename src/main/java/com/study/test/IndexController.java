package com.study.test;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.study.test.member.service.MemberService;
import com.study.test.member.vo.MemberMenuVO;
import com.study.test.member.vo.MemberSubMenuVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.professor.vo.LectureVO;
import com.study.test.school.colleage.ColleageVO;
import com.study.test.school.service.SchoolService;
import com.study.test.stu.service.StuService;
import com.study.test.stu.vo.StuVO;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;
import jakarta.websocket.Session;



@Controller
public class IndexController {
	@Resource(name = "memberService")
	private MemberService memberService;
	
	@Resource(name = "schoolService")
	private SchoolService schoolService;
	
	@Resource(name = "stuService")
	private StuService stuService;
	
	@GetMapping("/")
	public String index(HttpSession session) {
		
		session.invalidate();
		
		return "content/login/login_page";

	}

	@GetMapping("/mainPage")
	public String index(Model model, MemberMenuVO memberMenuVO, MemberSubMenuVO memberSubMenuVO, Authentication authentication, LectureVO lectureVO,
			StuVO stuVO, MemberVO memberVO, String menuCode, String subMenuCode, String profileNickname, String memNo) {
		
		
		
		if(memberMenuVO.getMenuCode() == null) {
			memberMenuVO.setMenuCode("MENU_001");
			memberSubMenuVO.setSubMenuCode("SUB_MENU_001");
		}
		if(memberSubMenuVO.getSubMenuCode() == null) {
			memberSubMenuVO.setSubMenuCode("SUB_MENU_001");
		}
		
		
		
		
		User user = (User)authentication.getPrincipal();
		String memName = user.getUsername();
		stuVO.setMemNo(memName); // id임
		memberVO.setMemNo(memName);
		stuVO.setStuNo(user.getUsername());

		if(profileNickname != null) {
			System.out.println(profileNickname);
			System.out.println(memNo);
			profileNickname = user.getUsername();
			stuVO.setMemNo(memNo);
			memberVO.setMemNo(profileNickname);
			authentication.getPrincipal();
			
		}
		

		
		System.out.println("학생 정보 : " + stuService.seletStu(memberVO));
		model.addAttribute("memberVO", stuService.seletStu(memberVO));
		
		model.addAttribute("menuCode" , menuCode);
		model.addAttribute("subMenuCode", subMenuCode);
		
		model.addAttribute("menuList", memberService.stuMenuList());
		model.addAttribute("subMenuList", memberService.stuSubMenuList(memberMenuVO.getMenuCode()));

		//학기 조회
		model.addAttribute("semester" , stuService.getSemester());
		
		// 수강신청항목 리스트 조회
		model.addAttribute("applyLecture", stuService.applyLectureList(stuVO.getStuNo()));
		System.out.println("수강신청한 강의 리스트 :" + stuService.applyLectureList(stuVO.getStuNo()));

		return "/content/stu/info_main";


	
	}
}
