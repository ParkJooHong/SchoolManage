package com.study.test.professor.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.multipart.MultipartFile;

import com.study.test.admin.service.AdminService;
import com.study.test.admin.vo.AdminSubMenuVO;
import com.study.test.member.service.MemberService;
import com.study.test.member.vo.MemImgVO;

import com.study.test.member.vo.MemberVO;
import com.study.test.professor.vo.ProfessorMenuVO;
import com.study.test.util.ConstVariable;
import com.study.test.util.UploadUtil;

import jakarta.annotation.Resource;



@Controller
@RequestMapping("/professor")
public class ProfessorController {
	@Resource(name= "memberService")
	private MemberService memberService;
	@Resource(name = "adminService")
	private AdminService adminService;
	
	//강의등록 페이지로 이동
	@GetMapping("/regLecture")
	public String regLecture(ProfessorMenuVO professorMenuVO) {
		//메뉴코드 등록
		professorMenuVO.setMenuCode(ConstVariable.DEFAULT_PROFESSOR_MENU_CODE);
		
		//학기리스트 조회
		
		
		return "content/professor/reg_lecture";
	}
	
	//강의 시간표 페이지 이동
	@GetMapping("/lectureSchedule")
	public String lectureSchedule(ProfessorMenuVO professorMenuVO) {
		professorMenuVO.setMenuCode(ConstVariable.SECOND_PROFESSOR_MENU_CODE);
		
		return "content/professor/lecture_schedule";
	}
	
	//강의 리스트 페이지 이동
	@GetMapping("/lectureList")
	public String lectureList(ProfessorMenuVO professorMenuVO) {
		professorMenuVO.setMenuCode(ConstVariable.THIRD_PROFESSOR_MENU_CODE);

		return "content/professor/lecture_list";
	}
	
	//성적 등록 페이지 이동
	@GetMapping("/regGrade")
	public String regGrade(ProfessorMenuVO professorMenuVO) {
		professorMenuVO.setMenuCode(ConstVariable.FOURTH_PROFESSOR_MENU_CODE);

		return "content/professor/reg_grade";
	}
	
	
	
	
	
	
	
	
	
	
	
	
	//비밀번호 변겅 페이지 이동
	@GetMapping("/changePwd")
	public String changePwd(AdminSubMenuVO adminSubMenuVO) {
		adminSubMenuVO.setMenuCode(ConstVariable.DEFAULT_MENU_CODE);
		return "content/admin/change_pwd";
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
	
	//학적변동승인(복학,휴학)
	@GetMapping("/updateStuInfo")
	public String updateStuInfo(AdminSubMenuVO adminSubMenuVO) {
		adminSubMenuVO.setMenuCode(ConstVariable.SECOND_MENU_CODE);

		return "content/admin/update_stu_info";
	}
	
	//전과/복수전공
	@GetMapping("/changeMajor")
	public String changeMajor(AdminSubMenuVO adminSubMenuVO) {
		adminSubMenuVO.setMenuCode(ConstVariable.SECOND_MENU_CODE);
		
		return "content/admin/change_major";
	}
	
	//실적현황
	@GetMapping("/performanceData")
	public String performanceData(AdminSubMenuVO adminSubMenuVO) {
		adminSubMenuVO.setMenuCode(ConstVariable.SECOND_MENU_CODE);
		
		return "content/admin/performance_data";
	}
	
	//학사경고,제적
	@GetMapping("/updateStuOut")
	public String updateStuOut(AdminSubMenuVO adminSubMenuVO) {
		adminSubMenuVO.setMenuCode(ConstVariable.THIRD_MENU_CODE);
		
		return "content/admin/update_stu_out";
	}
	//제적처리 페이지
	@GetMapping("/dismissal")
	public String dismissal(AdminSubMenuVO adminSubMenuVO) {
		adminSubMenuVO.setMenuCode(ConstVariable.THIRD_MENU_CODE);
		
		return "content/admin/dismissal";
	}
	
	
}
