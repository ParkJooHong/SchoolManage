package com.study.test.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.study.test.admin.service.AdminService;
import com.study.test.member.service.MemberService;
import com.study.test.member.vo.MemberVO;

import jakarta.annotation.Resource;



@Controller
@RequestMapping("/admin")
public class AdminController {
	@Resource(name= "memberService")
	private MemberService memberService;
	@Resource(name = "adminService")
	private AdminService adminService;
	
	//회원등록 페이지 이동
	@GetMapping("/joinMember")
	public String joinMember() {
		
		return "content/admin/join_member";
	}
	
	//회원등록
	@PostMapping("/join")
	public String join(MemberVO memberVO) {
		System.out.println(memberVO);
		
		memberService.regMember(memberVO);
		
		
		return "redirect:/";
	}
}
