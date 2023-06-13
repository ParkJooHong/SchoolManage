package com.study.test.member.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.test.admin.service.AdminService;
import com.study.test.admin.vo.AdminSubMenuVO;
import com.study.test.member.service.MemberService;
import com.study.test.member.vo.MailVO;
import com.study.test.member.vo.MemberMenuVO;
import com.study.test.member.vo.MemberSubMenuVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.professor.vo.ProfessorSubMenuVO;
import com.study.test.util.ConstVariable;
import com.study.test.util.MailService;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/member")
public class MemberController {
	
	@Resource(name = "memberService")
	private MemberService memberService;
	@Autowired
	private PasswordEncoder encoder;
	@Resource(name = "mailService")
	private MailService mailService;
	@Resource(name = "adminService")
	private AdminService adminService;
	
	
	//로그인
	@ResponseBody
	@PostMapping("/getMemberInfo")
	public MemberVO getMemberInfo(MemberVO memberVO) {
		
		
		return memberService.login(memberVO);
	}
	
	//아이디 찾기
	@ResponseBody
	@PostMapping("/findId")
	public String getMemNo(MemberVO memberVO) {
		System.out.println(memberVO);
		return memberService.getMemNo(memberVO);
	}
	
	//회원 목록 조회
	@ResponseBody
	@PostMapping("/getMemListAjax")
	public List<Map<String, Object>> getMemList(MemberVO memberVO) {
		List<Map<String, Object>> memList = new ArrayList<>();
		if(memberVO.getMemName()!=null && !memberVO.getMemName().equals("")) {
			memList = memberService.getMemList(memberVO);	
		}
		return memList;
	}
	
	
	//비밀번호 찾기
	@ResponseBody
	@PostMapping("/findPwAjax")
	public boolean findPwAjax(MemberVO memberVO) {
		
		if(memberVO.getMemEmail() != null) {
			//임시비번 생성 하고 db저장
			String imsiPw = mailService.createRandomPw();
			
			String encodePw = encoder.encode(imsiPw);
			memberVO.setMemPw(encodePw);
			
			memberService.setPw(memberVO);
			
			//메일 보내기
			MailVO mailVO = new MailVO();
			List<String> emailList = new ArrayList<>();
			emailList.add(memberVO.getMemEmail());
			mailVO.setTitle("임시 비밀번호 발송");
			mailVO.setRecipientList(emailList);
			mailVO.setContent("임시 비밀번호는 : " + imsiPw + "입니다.");
			mailService.sendSimpleEmail(mailVO);
		}

		return memberVO.getMemEmail() != null ? true : false;
	}
	
	
	//비밀번호 변경 페이지 이동
	@GetMapping("/changeMemPw")
	public String changeMemPw (Authentication authentication, Model model) {
		String memLayout = "";
		
		memLayout = getCode(authentication, model);
		
		model.addAttribute("memLayOut", memLayout);
		
		return "content/member/change_mem_pw";
	}
	
	//회원의 비밀번호 검증
	@PostMapping("/updatePwAjax")
	@ResponseBody
	public boolean updatePwAjax(MemberVO memberVO) {
		String beforPw = adminService.countMemPw(memberVO);
		return encoder.matches(memberVO.getMemPw(),beforPw);
	}
	
	//비밀번호 변경
	@PostMapping("/changePwAjax")
	@ResponseBody
	public int changePwAjax(MemberVO memberVO) {
		String encodedPw = encoder.encode(memberVO.getMemPw());
		memberVO.setMemPw(encodedPw);
		return adminService.changePw(memberVO);
	}
	
	
	
	
	
	
	//-------------------Menu ============================================================================================================================
	//내 정보 관리
	@GetMapping("/myInfo")
	private String myInfo(Model model, MemberMenuVO memberMenuVO, MemberSubMenuVO memberSubMenuVO, String menuCode) {
		
		System.out.println(menuCode);
		
		//인터쎕터 써가꼬 필요없음. 이해되면 지워두댐. 아래 컨트롤러도 모두 인터셉터주면서 메뉴, 서브메뉴 모델 지움.
		//model.addAttribute("menuList",memberService.stuMenuList());
		//model.addAttribute("subMenuList", memberService.stuSubMenuList(menuCode));
		
		System.out.println("###################" + memberService.stuMenuList());
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@" + memberService.stuSubMenuList(menuCode));
		
		System.out.println(memberMenuVO);
		
		
		return "/content/info/stu_myInfo/infoManage";
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
	
	
	// -------------------SubMenu
	// ============================================================================================================================

	// ---- 내정보 관리 {
	// MyInfo
	@GetMapping("infoManage")
	private String infoManage() {

		return "/content/info/stu_myInfo/infoManage";
	}

	// 비밀번호변경
	@GetMapping("changePwd")
	private String changePwd() {

		return "/content/info/stu_myInfo/changePwd";
	}

	// ----- 내 정보 관리 끝 }

	// ----------학적관리 {
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
	
	
	//레이아웃 컨트롤
   @RequestMapping("/getCode")
   public String getCode(Authentication authentication, Model model) {
	  String memLayout = "";
      User userInfo = (User) authentication.getPrincipal();
      AdminSubMenuVO adminSubMenuVO = new AdminSubMenuVO();
      ProfessorSubMenuVO professorSubMenuVO = new ProfessorSubMenuVO();
      MemberSubMenuVO memberSubMenuVO = new MemberSubMenuVO();

      List<String> authorityStrings = userInfo.getAuthorities().stream().map(GrantedAuthority::getAuthority)
            .collect(Collectors.toList());
      
      if(authorityStrings.contains("ROLE_PRO")){
    	 memLayout = "professor";
    	 professorSubMenuVO.setMenuCode(ConstVariable.DEFAULT_PROFESSOR_MENU_CODE);
         model.addAttribute("professorSubMenuVO", professorSubMenuVO);
      }
      else if(authorityStrings.contains("ROLE_ADMIN")) {
    	  memLayout = "admin";
         adminSubMenuVO.setMenuCode(ConstVariable.FOURTH_MENU_CODE);
         model.addAttribute("adminSubMenuVO", adminSubMenuVO);
      }
      else {
    	 memLayout = "info";
         memberSubMenuVO.setMenuCode(ConstVariable.FOURTH_STU_MENU_CODE);
         model.addAttribute("memberSubMenuVO", memberSubMenuVO);
      }
      
      return memLayout;
   }
	
	
	
}
