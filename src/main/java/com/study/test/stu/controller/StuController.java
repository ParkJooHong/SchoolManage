package com.study.test.stu.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.test.member.service.MemberService;
import com.study.test.member.vo.MemberMenuVO;
import com.study.test.member.vo.MemberSubMenuVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.stu.service.StuService;
import com.study.test.stu.vo.StuVO;

import ch.qos.logback.core.net.SyslogOutputStream;
import jakarta.annotation.Resource;

@Controller
@RequestMapping("/stuMenu")
public class StuController {
	
	@Resource(name = "stuService")
	private StuService stuService;
	
	@Resource(name = "memberService")
	private MemberService memberService;
	
	
	//내 정보 관리
		@GetMapping("/myInfo")
		private String myInfo(Authentication authentication, String memNo, Model model, StuVO stuVO, MemberVO memberVO) {
			
			User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			stuVO.setMemNo(user.getUsername()); // id임
			memberVO.setMemNo(user.getUsername());
			

			System.out.println("#######" + stuService.seletStu(memberVO.getMemNo()));

			model.addAttribute("stuVO" , stuService.seletStu(memberVO.getMemNo()));
			
			System.out.println("아뒤 : " + memName);
			
		
			MemberMenuVO menuCode = new MemberMenuVO();
			menuCode.setMenuCode("MENU_001");
			
			System.out.println("메뉴코드는 " +menuCode.getMenuCode());
			
			model.addAttribute("menuCode", menuCode);
	
			//에러 많음 수정 필요.
			
			return "/content/info/stu_myInfo/infoManage";
		}
		
		// 내정보 수정
		@PostMapping("/updateMyInfo")
		public String updateMyInfo(StuVO stuVO) {
			stuService.updateStu(stuVO);		
			
			return "redirect:/mainPage";
					
		}
		
		//학적 관리
		@GetMapping("myStu")
		private String myStu() {
			

			
			return "/content/info/stu_myStu/my_stu";
		}
		
		//교과수업
		@GetMapping("stuClass")
		private String stuClass() {
			
			return "/content/info/stu_class/grade";
		}
		
		
		
		//게시판
		@GetMapping("board")
		private String board() {

			
			return "/content/info/stu_board/totalBoard";
		}
		
		//캘린더
		@GetMapping("calender")
		private String calender() {

			
			return "/content/info/stu_calender/departmentSchedule";
		}
			
		//-----------------------------------------------------------------------------------------------------------------------------
		
		
		//-------------------SubMenu ============================================================================================================================
		
		// ---- 내정보 관리 { 
		//MyInfo
		@GetMapping("infoManage")
		private String infoManage(Authentication authentication, String memNo, Model model, StuVO stuVO) {

			User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			stuVO.setMemNo(user.getUsername()); // id임
			
			model.addAttribute("stuVO" , stuService.seletStu(stuVO.getMemNo()));
			System.out.println("@@@@@@@@@@" + stuService.seletStu(stuVO.getMemNo()));
			System.out.println("아뒤 : " + memName);
			
			MemberMenuVO menuCode = new MemberMenuVO();
			menuCode.setMenuCode("MENU_001");
			
			System.out.println("메뉴코드는 " +menuCode.getMenuCode());
			
			model.addAttribute("menuCode", menuCode);
			
			//에러 많음 수정 필요.
			
			return "/content/info/stu_myInfo/infoManage";
		}
		
		
	  //비밀번호변경 페이지  
	  @GetMapping("changePwd") 
	  private String changePwd(Authentication authentication, Model model, StuVO stuVO) {
		  User user = (User)authentication.getPrincipal();
		  stuVO.setMemNo(user.getUsername()); 
		  
	  
		  model.addAttribute("stuVO" , stuService.seletStu(stuVO.getMemNo()));
		  System.out.println(model.addAttribute("stuVO" , stuService.seletStu(stuVO.getMemNo())));
	  
		  return "/content/info/stu_myInfo/changePwd"; 
	  }
		 
	  
	  //비밀번호 수정 Ajax
	  @ResponseBody
	  @PostMapping("/changePwdAjax")
	  public String changePwdAjax(String newPassword, String memNo, MemberVO memberVO) {
		  
		  
		  
		  memberVO.setMemPw(newPassword);
		  memberVO.setMemNo(memNo);
		  System.out.println(newPassword);
		  System.out.println(memberVO);
		  
		  stuService.updateStuPwd(memberVO);
		  System.out.println(memberVO);
			return newPassword;
		}
		  
		 
		// ----- 내 정보 관리 끝 }
		
		
		//----------학적관리 {
		@GetMapping("/academicManage")
		private String academicManage() {

			return "/content/info/stu_myStu/academicManage";
		}
		
		
		// ---- 교과수업 { 
		//성적조회
			@GetMapping("grade")
			private String grade() {
				
				return "/content/info/stu_class/grade";
			}
			
		//수강신청
		@GetMapping("application")
		private String application() {

			return "/content/info/stu_class/application";
		}
		
		//수업평가
		@GetMapping("evaluation")
		private String evaluation() {

			return "/content/info/stu_class/evaluation";
		}
		
		// 교과수업 끝 } 
			
		// ------ 게시판 {
		//전체 게시판
		@GetMapping("/totalBoard")
		private String totalBoard() {

			return "/content/info/stu_board/totalBoard";
		}
		
		//중고 나눔
		@GetMapping("/donation")
		private String donation() {

			return "/content/info/stu_board/donation";
		}
		
		// 게시판 끝 } 
		
		//----------- 캘린더 {
		//학과 일정
		@GetMapping("/departmentSchedule")
		private String departmentSchedule() {

			return "/content/info/stu_calender/departmentSchedule";
		}
		
		//내 할일
		@GetMapping("/mySchedule")
		private String mySchedule() {

			return "/content/info/stu_calender/mySchedule";
		}

}
