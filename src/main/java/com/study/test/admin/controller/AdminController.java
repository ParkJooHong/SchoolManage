package com.study.test.admin.controller;

import java.io.File;
import java.util.UUID;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.study.test.admin.service.AdminService;
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
	public String joinMember() {
		
		return "content/admin/join_member";
	}
	
	//회원등록
	@PostMapping("/join")
	public String join(MemberVO memberVO, MultipartFile mainImg) {
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@" + mainImg);
		System.out.println(memberVO);
		String originFileName = mainImg.getOriginalFilename();
        String uuid = UUID.randomUUID().toString();
        String extension = originFileName.substring(originFileName.lastIndexOf("."));
        //첨부될 파일명
        String attachedFileName = uuid + extension;
        
        //파일 업로드
        
        
        try {
            File file = new File(ConstVariable.UPLOAD_PATH + attachedFileName);
            mainImg.transferTo(file);
        } catch (Exception e) {
            e.printStackTrace();
        }
		
		//memberService.regMember(memberVO);
		
		
		return "redirect:/";
	}
}
