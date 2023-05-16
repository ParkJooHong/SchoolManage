package com.study.test.admin.controller;



import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.multipart.MultipartFile;


import com.study.test.admin.service.AdminService;
import com.study.test.admin.vo.AdminSubMenuVO;
import com.study.test.member.service.MemberService;
import com.study.test.member.vo.MemImgVO;

import com.study.test.member.vo.MemberVO;
import com.study.test.util.ConstVariable;
import com.study.test.util.UploadUtil;

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
	public String joinMember(AdminSubMenuVO adminSubMenuVO, Model model) {
		adminSubMenuVO.setMenuCode(ConstVariable.DEFAULT_MENU_CODE);
		adminSubMenuVO.setSubMenuCode(ConstVariable.DEFAULT_SUB_MENU_CODE);	
		model.addAttribute("adminMenuList",adminService.getAdminMenuList());
		model.addAttribute("adminSubMenuList",adminService.getAdminSubMenuList(adminSubMenuVO.getMenuCode()));
		return "content/admin/join_member";
	}
	
	//회원등록
	@PostMapping("/join")
	public String join(MemberVO memberVO, MultipartFile mainImg) {
		//UploadUtill 객체 호출해서(util패키지에 만들어놓음)MemImgVO 객체에 받음
		MemImgVO attachedImgVO = UploadUtil.uploadFile(mainImg);
		//memberVO에서 받아온 memNo memImgVO에 넣음
		attachedImgVO.setMemNo(memberVO.getMemNo());
		//다음에 들어갈 img코드 호출해서 세팅
		attachedImgVO.setImgCode(memberService.getNextImgCode());
		//memberVO.memImage에 imgCode 세팅
		memberVO.setMemImage(attachedImgVO.getImgCode());
		//memberVO안에있는 memImgVO에 UploadUtill로 불러온 데이터 넣음(트랜잭션처리때문에)
		memberVO.setMemImgVO(attachedImgVO);
		System.out.println("@@@@@@@@@@@@@@"+ memberVO);
		memberService.regMember(memberVO);
		
		
		return "redirect:/admin/join";
	}
	
	//학적변동승인
	@GetMapping("/updateStuInfo")
	public String updateStuInfo(AdminSubMenuVO adminSubMenuVO, Model model) {
		adminSubMenuVO.setMenuCode(ConstVariable.SECOND_MENU_CODE);
		adminSubMenuVO.setSubMenuCode(ConstVariable.SUB_MENU_CODE_SECOND);
		model.addAttribute("adminMenuList",adminService.getAdminMenuList());
		model.addAttribute("adminSubMenuList",adminService.getAdminSubMenuList(adminSubMenuVO.getMenuCode()));
		return "content/admin/update_stu_info";
	}
	
	
	
	
	
	
}
