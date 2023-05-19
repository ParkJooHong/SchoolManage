package com.study.test.stu.controller;

import java.util.List;

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
import com.study.test.school.colleage.ColleageVO;
import com.study.test.school.dept.DeptManageVO;
import com.study.test.school.dept.DeptVO;
import com.study.test.school.service.SchoolService;
import com.study.test.stu.service.StuService;
import com.study.test.stu.vo.LeaveManageVO;
import com.study.test.stu.vo.StatusInfoVO;
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
	
	@Resource(name = "schoolService")
	private SchoolService schoolService;
	
	
	//내 정보 관리
		@GetMapping("/myInfo")
		private String myInfo(Authentication authentication, String stuNo, String memNo, Model model, StuVO stuVO, MemberVO memberVO, ColleageVO colleageVO) {
			
			User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			stuVO.setMemNo(user.getUsername()); // id임
			memberVO.setMemNo(user.getUsername());
			
			
			stuService.getColl(user.getUsername());
			
			System.out.println("대학 정보 :"+stuService.getColl(user.getUsername()));
			
			memberVO.setStuVO(stuService.getColl(user.getUsername()));
			
			//System.out.println(collNo);
			
			//memberVO.getStuVO().setCollNo(collNo);
			System.out.println(memberVO);
			
			System.out.println("대학정보" +stuService.getColl(memberVO.getMemNo()));
			
			
			System.out.println("학생 정보 : " + stuService.seletStu(memberVO));

			model.addAttribute("stuVO" , stuService.seletStu(memberVO));
			
			System.out.println("아뒤 : " + memName);
			
		
			MemberMenuVO menuCode = new MemberMenuVO();
			menuCode.setMenuCode("MENU_001");
			
			System.out.println("메뉴코드는 " +menuCode.getMenuCode());
			
			model.addAttribute("menuCode", menuCode);
	
			//에러 많음 수정 필요.
			
			return "/content/stu/stu_myInfo/infoManage";
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
			

			
			return "/content/stu/stu_myStu/my_stu";
		}
		
		//교과수업
		@GetMapping("stuClass")
		private String stuClass() {
			
			return "/content/stu/stu_class/grade";
		}
		
		
		
		//게시판
		@GetMapping("board")
		private String board() {

			
			return "/content/stu/stu_board/totalBoard";
		}
		
		//캘린더
		@GetMapping("calender")
		private String calender() {

			
			return "/content/stu/stu_calender/departmentSchedule";
		}
			
		//-----------------------------------------------------------------------------------------------------------------------------
		
		
		//-------------------SubMenu ============================================================================================================================
		
		// ---- 내정보 관리 { 
		//MyInfo
		@GetMapping("infoManage")
		private String infoManage(Authentication authentication, String memNo, Model model, StuVO stuVO, MemberVO memberVO) {
				
			
			  User user = (User)authentication.getPrincipal();
				String memName = user.getUsername();
				stuVO.setMemNo(user.getUsername()); // id임
				memberVO.setMemNo(user.getUsername());
				model.addAttribute("stuVO" , stuService.seletStu(memberVO));
			
			//User user = (User)authentication.getPrincipal();
			//String memName = user.getUsername();
			//stuVO.setMemNo(user.getUsername()); // id임
			
			//model.addAttribute("stuVO" , stuService.seletStu(stuVO.getMemNo()));
			//System.out.println("@@@@@@@@@@" + stuService.seletStu(stuVO.getMemNo()));
			System.out.println("아뒤 : " + memName);
			
			MemberMenuVO menuCode = new MemberMenuVO();
			menuCode.setMenuCode("MENU_001");
			
			System.out.println("메뉴코드는 " +menuCode.getMenuCode());
			
			model.addAttribute("menuCode", menuCode);
			
			//에러 많음 수정 필요.
			
			return "/content/stu/stu_myInfo/infoManage";
		}
		
		
	  //비밀번호변경 페이지  
	  @GetMapping("changePwd") 
	  private String changePwd(Authentication authentication, Model model, StuVO stuVO, MemberVO memberVO) {
		  
		  User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			stuVO.setMemNo(user.getUsername()); // id임
			memberVO.setMemNo(user.getUsername());
			model.addAttribute("stuVO" , stuService.seletStu(memberVO));
		  
		  //User user = (User)authentication.getPrincipal();
		  //stuVO.setMemNo(user.getUsername()); 
		  
	  
		  //model.addAttribute("stuVO" , stuService.seletStu(stuVO.getMemNo()));
		 // System.out.println(model.addAttribute("stuVO" , stuService.seletStu(stuVO.getMemNo())));
	  
		  return "/content/stu/stu_myInfo/changePwd"; 
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
	  
	  	//휴학신청
		@GetMapping("/leaveManage")
		private String leaveManage(Authentication authentication,StuVO stuVO, MemberVO memberVO, Model model) {

			
			User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			stuVO.setMemNo(user.getUsername()); // id임
			memberVO.setMemNo(user.getUsername());
			model.addAttribute("stuVO" , stuService.seletStu(memberVO));
			
			System.out.println("학생 정보 : " +stuService.seletStu(memberVO));
			
			return "/content/stu/stu_myStu/leaveManage";
		}
		
		// 휴학 신청Ajax
		@ResponseBody
		@PostMapping("/leaveManageAjax")
		public String leaveManageAjax(Authentication authentication, MemberVO memberVO, StuVO stuVO, String memNo, String stuStatus, String applyReason, LeaveManageVO leaveManageVO, StatusInfoVO statusInfoVO) {
			
			/*
			leaveManageVO.setApplyReason(applyReason);
			leaveManageVO.setStuNo(memNo);
			leaveManageVO.setStuStatus(stuStatus);
			
			System.out.println(leaveManageVO);
			
			stuService.leaveManage(leaveManageVO);
			*/
			// 집가서 다시
			User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			//System.out.println(memName);
			stuVO.setMemNo(user.getUsername()); // id임
			memberVO.setMemNo(user.getUsername());
			stuService.seletStu(memberVO);
			
			System.out.println("학생 정보 : " +stuService.seletStu(memberVO));
			System.out.println( "StuVO 정보 : " +stuService.seletStu(memberVO).getStuVO().getStuNo());
			
			System.out.println("학적 상태 : "+ stuStatus);
			statusInfoVO.setStuNo(stuService.seletStu(memberVO).getStuVO().getStuNo());
			
			statusInfoVO.setNowStatus(stuStatus);
			System.out.println("상태정보VO : " +statusInfoVO);
			
			stuService.leav(statusInfoVO);
			 
			return statusInfoVO.getStuNo();
		}
		
		// 복학 신청
		@GetMapping("/returnManage")
		private String returnManage(Authentication authentication,StuVO stuVO, MemberVO memberVO, Model model) {

			User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			stuVO.setMemNo(user.getUsername()); // id임
			memberVO.setMemNo(user.getUsername());
			model.addAttribute("stuVO" , stuService.seletStu(memberVO));
			
			System.out.println("학생 정보 : " +stuService.seletStu(memberVO));
			
			return "/content/stu/stu_myStu/returnManage";
		}
		
		// 복학 신청Ajax
			@ResponseBody
			@PostMapping("/returnManageAjax")
			public String returnManageAjax(Authentication authentication, MemberVO memberVO, StuVO stuVO, String memNo, String stuStatus, String applyReason, LeaveManageVO leaveManageVO, StatusInfoVO statusInfoVO) {
				
				User user = (User)authentication.getPrincipal();
				String memName = user.getUsername();
				//System.out.println(memName);
				stuVO.setMemNo(user.getUsername()); // id임
				memberVO.setMemNo(user.getUsername());
				stuService.seletStu(memberVO);
				
				System.out.println("학생 정보 : " +stuService.seletStu(memberVO));
				System.out.println( "StuVO 정보 : " +stuService.seletStu(memberVO).getStuVO().getStuNo());
				
				System.out.println("학적 상태 : "+ stuStatus);
				statusInfoVO.setStuNo(stuService.seletStu(memberVO).getStuVO().getStuNo());
				
				statusInfoVO.setNowStatus(stuStatus);
				System.out.println("상태정보VO : " +statusInfoVO);
				
				stuService.returnManage(statusInfoVO);
				 
				return statusInfoVO.getStuNo();
			}
		
		// 전과신청
		@GetMapping("/moveManage")
		private String moveManage(Authentication authentication,StuVO stuVO, MemberVO memberVO, Model model, String collNo) {
			User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			stuVO.setMemNo(user.getUsername()); // id임
			memberVO.setMemNo(user.getUsername());
			
			
			stuService.getColl(user.getUsername());
			memberVO.setStuVO(stuService.getColl(user.getUsername()));
			System.out.println(memberVO);
			model.addAttribute("stuVO" , stuService.seletStu(memberVO));
			
			System.out.println(stuService.seletStu(memberVO));

			//대학 리스트 조회
			model.addAttribute("colleageVO", schoolService.getCollList());
			
			//학과 리스트 조회
			System.out.println("대학 코드 : " +memberVO.getStuVO().getCollNo() );
			collNo = memberVO.getStuVO().getCollNo();
			model.addAttribute("deptVO", schoolService.getDept(collNo));
			
			return "/content/stu/stu_myStu/moveManage";
		}
		
		//전과신청 AJax
		 @ResponseBody
		  @PostMapping("/moveManageAjax")
		  public String moveManageAjax(Authentication authentication, String menuCode, Model model, StuVO stuVO,  String newPassword, String memNo, MemberVO memberVO, DeptManageVO deptManageVO, String toColl, String toDept) {
			 
			 	User user = (User)authentication.getPrincipal();
				String memName = user.getUsername();
				stuVO.setMemNo(user.getUsername()); // id임
				memberVO.setMemNo(user.getUsername());
				
				menuCode = "MENU_002";
				model.addAttribute("subMenuList", memberService.stuSubMenuList(menuCode));
				
				stuService.getColl(user.getUsername());
				memberVO.setStuVO(stuService.getColl(user.getUsername()));
				System.out.println("!#@!#@!#@!#@"+memberVO);
			 
				 memberVO = stuService.seletStu(memberVO);
				 System.out.println(stuService.seletStu(memberVO));
				 System.out.println("멤버 데이터 : " +memberVO);
				 System.out.println(toColl);
				 
				 
				 deptManageVO.setStuNo(memberVO.getStuVO().getStuNo());
				 deptManageVO.setApplyCode(memberVO.getStuVO().getDeptNo());
				 deptManageVO.setFromColl(memberVO.getColleageVO().getCollNo());
				 //deptManageVO.setToColl(memberVO.getColleageVO().getCollNo());
				 deptManageVO.setToColl(toColl);
				 
				 deptManageVO.setFromDept(memberVO.getDeptVO().getDeptNo());
				 deptManageVO.setToDept(toDept);
				 //deptManageVO.setToDept(memberVO.getStuVO().getDeptNo());
				 
				 deptManageVO.setDoubleMajorColl(memberVO.getStuVO().getCollNo());
				 deptManageVO.setDoubleMajorDept(memberVO.getStuVO().getDoubleNo());
				 
				 deptManageVO.setStuYear(memberVO.getStuVO().getStuYear());
				 deptManageVO.setStuSem(memberVO.getStuVO().getStuSem());
				 
				 
				 System.out.println(deptManageVO);
					
				 stuService.moveManage(deptManageVO);
						
				return "redirect:/mainPage";
			}
		
		
		// 복수전공신청
		@GetMapping("/doubleMajorManage")
		private String doubleMajorManage() {

			return "/content/stu/stu_myStu/doubleMajorManage";
		}
		
		// 학적신청현황조회
		@GetMapping("/academicManage")
		private String academicManage(Authentication authentication,String stuNo, DeptManageVO deptManageVO, MemberVO memberVO, Model model, StuVO stuVO, String memNo, String nowStatus, StatusInfoVO statusInfoVO) {
			  User user = (User)authentication.getPrincipal();
				String memName = user.getUsername();
				stuVO.setMemNo(user.getUsername()); // id임
				memberVO.setMemNo(user.getUsername());
				model.addAttribute("stuVO" , stuService.seletStu(memberVO));
				nowStatus = stuService.seletStu(memberVO).getStuVO().getStuStatus();
				statusInfoVO.setNowStatus(nowStatus);
				
				stuNo = stuService.seletStu(memberVO).getStuVO().getStuNo();

				
				
				System.out.println("휴학 신청자 " +stuService.getStatusLeaveInfo(stuNo)); 
				// 휴학 신청자 조회
				model.addAttribute("stuStatus",stuService.getStatusLeaveInfo(stuNo));
				
				
				System.out.println("복학신청자" + stuService.getStatusReturnInfo(stuNo));
				//복학 신청자 조회
				model.addAttribute("stuStatusReturn", stuService.getStatusReturnInfo(stuNo));
				
				
				
				stuService.getStatusMoveInfo(stuNo);
				deptManageVO.setMemberVO(stuService.seletStu(memberVO));
				//전과 신청자 조회
				System.out.println("전과 신청자" + stuService.getStatusMoveInfo(stuNo));
				System.out.println("fsadafdsafdsafdsafds" +deptManageVO);
				model.addAttribute("stuStatusMove", stuService.getStatusMoveInfo(stuNo));
				
			
				System.out.println(statusInfoVO);

			return "/content/stu/stu_myStu/academicManage";
		}
				
		
		
		
		
		// ---- 교과수업 { 
		//성적조회
			@GetMapping("grade")
			private String grade() {
				
				return "/content/stu/stu_class/grade";
			}
			
		//수강신청
		@GetMapping("application")
		private String application() {

			return "/content/stu/stu_class/application";
		}
		
		//수업평가
		@GetMapping("evaluation")
		private String evaluation() {

			return "/content/stu/stu_class/evaluation";
		}
		
		// 교과수업 끝 } 
			
		// ------ 게시판 {
		//전체 게시판
		@GetMapping("/totalBoard")
		private String totalBoard() {

			return "/content/stu/stu_board/totalBoard";
		}
		
		//중고 나눔
		@GetMapping("/donation")
		private String donation() {

			return "/content/stu/stu_board/donation";
		}
		
		// 게시판 끝 } 
		
		//----------- 캘린더 {
		//학과 일정
		@GetMapping("/departmentSchedule")
		private String departmentSchedule() {

			return "/content/stu/stu_calender/departmentSchedule";
		}
		
		//내 할일
		@GetMapping("/mySchedule")
		private String mySchedule() {

			return "/content/stu/stu_calender/mySchedule";
		}

}
