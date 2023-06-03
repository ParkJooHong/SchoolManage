package com.study.test.stu.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.codehaus.groovy.util.ListHashMap;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.HtmlUtils;

import com.study.test.stuChat.vo.Greeting;
import com.study.test.stuChat.vo.HelloMessage;
import com.study.test.admin.vo.AdminSubMenuVO;
import com.study.test.admin.vo.EmpVO;
import com.study.test.board.service.BoardReplyService;
import com.study.test.board.service.BoardService;
import com.study.test.board.vo.BoardCategoryVO;
import com.study.test.board.vo.BoardListSearchVO;
import com.study.test.board.vo.BoardReplyVO;
import com.study.test.board.vo.SearchVO;
import com.study.test.board.vo.UniBoardVO;
import com.study.test.member.service.MemberService;
import com.study.test.member.vo.MemImgVO;
import com.study.test.member.vo.MemberMenuVO;
import com.study.test.member.vo.MemberSubMenuVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.professor.vo.LectureVO;
import com.study.test.school.colleage.ColleageVO;
import com.study.test.school.dept.DeptManageVO;
import com.study.test.school.dept.DeptVO;
import com.study.test.school.enrollment.EnrollmentVO;
import com.study.test.school.semester.SemesterVO;
import com.study.test.school.service.SchoolService;
import com.study.test.school.stu_grade.StuGradeVO;
import com.study.test.stu.service.StuService;
import com.study.test.stu.vo.LeaveManageVO;
import com.study.test.stu.vo.StatusInfoVO;
import com.study.test.stu.vo.StuVO;
import com.study.test.util.ConstVariable;
import com.study.test.util.DateUtil;
import com.study.test.util.UploadUtil;

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

	@Resource(name = "boardService")
	private BoardService boardService;

	@Resource(name = "boardReplyService")
	private BoardReplyService boardReplyService;
	
	   //게시판 페이지
	   @GetMapping("/board")
	   public String board(AdminSubMenuVO adminSubMenuVO, Model model, UniBoardVO uniBoardVO) {
	      adminSubMenuVO.setMenuCode(ConstVariable.FOURTH_MENU_CODE);

			
	      return "redirect:/board/board";
	   }
	
	
	   //학사톡
	   @GetMapping("/talk")
	   public String toTalk() {
	      return "redirect:/message/messageList";
	   } 
	

	// 정보
	@GetMapping("/myInfo")
	public String myInfo(Authentication authentication, String stuNo, String memNo, Model model, StuVO stuVO, DeptManageVO deptManageVO,
			MemberVO memberVO, ColleageVO colleageVO) {

		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());

		model.addAttribute("memberVO", stuService.seletStu(memberVO));

		stuService.getColl(user.getUsername());

		System.out.println("대학 정보 :" + stuService.getColl(user.getUsername()));

		memberVO.setStuVO(stuService.getColl(user.getUsername()));

		// System.out.println(collNo);

		// memberVO.getStuVO().setCollNo(collNo);
		System.out.println(memberVO);
		
		System.out.println(" 복수 전공 신청 조회 : " + stuService.getStatusDoubleInfo(memberVO.getMemNo()));
		model.addAttribute("deptManageVO" , stuService.getStatusDoubleInfo(memberVO.getMemNo()));
		
		System.out.println("대학정보" + stuService.getColl(memberVO.getMemNo()));

		System.out.println("학생 정보 : " + stuService.seletStu(memberVO));

		model.addAttribute("stuVO", stuService.seletStu(memberVO));

		System.out.println("아뒤 : " + memName);

		MemberMenuVO menuCode = new MemberMenuVO();
		menuCode.setMenuCode("MENU_001");

		System.out.println("메뉴코드는 " + menuCode.getMenuCode());

		model.addAttribute("menuCode", menuCode);

		// 에러 많음 수정 필요.

		return "/content/stu/stu_myInfo/infoManage";
	}

	// 내정보 수정
	@PostMapping("/updateMyInfo")
	public String updateMyInfo(MemberVO memberVO, StuVO stuVO, MemImgVO memImgVO, MultipartFile mainImg) {

		stuService.updateStu(stuVO);
		stuService.updateMem(memberVO);

		return "redirect:/mainPage";

	}

	// 학적 관리
	@GetMapping("/myStu")
	private String myStu(Authentication authentication, StuVO stuVO, MemberVO memberVO, Model model, String stuNo) {
		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		stuNo = stuService.seletStu(memberVO).getStuVO().getStuNo();

		model.addAttribute("memberVO", stuService.seletStu(memberVO));
		System.out.println("멤버 브이오 : " + memberVO);
		System.out.println("학생 정보 : " + stuService.seletStu(memberVO));

		// 휴학 신청자 조회
		model.addAttribute("stuStatus", stuService.getStatusLeaveInfo(stuNo));
		
		System.out.println(" 복수 전공 신청 조회 : " + stuService.getStatusDoubleInfo(memberVO.getMemNo()));
		model.addAttribute("deptManageVO" , stuService.getStatusDoubleInfo(memberVO.getMemNo()));

		return "/content/stu/stu_myStu/leaveManage";
	}

	// 교과수업
	@RequestMapping("/stuClass")
	private String stuClass(Authentication authentication, StuVO stuVO, MemberVO memberVO, Model model, SemesterVO semesterVO, String semName,
			LectureVO lectureVO, String menuCode, String subMenuCode) {
		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		stuVO.setStuNo(memName); // id임
		memberVO.setMemNo(memName);
		model.addAttribute("memberVO", stuService.seletStu(memberVO));

		lectureVO.setStuVO(stuVO);
		System.out.println("조회할 학번 : " +lectureVO.getStuVO().getStuNo());
		
		System.out.println(lectureVO);
		
		List<Map<String, Object>> enrollList = schoolService.getLecStuList(lectureVO);
		
		System.out.println("@@@@@@@@@@@@@@@@학기별 성적조회" + enrollList);

		Map<String, Object> enrollStuList = new HashMap<>();

		enrollStuList.put("enrollList", enrollList);

		model.addAttribute("lecture", enrollStuList);
		
		model.addAttribute("menuCode", menuCode);
		model.addAttribute("subMenuCode", subMenuCode);
		
		//Map에 떤져줄 학기조회
		model.addAttribute("semester" , stuService.getSemester());

		return "/content/stu/stu_class/grade";
	}

	//board 게시판 컨트롤러 이동함.

	// 캘린더
	@GetMapping("/calender")
	private String calender() {

		return "/content/stu/stu_calender/departmentSchedule";
	}

	// -----------------------------------------------------------------------------------------------------------------------------

	// -------------------SubMenu
	// ============================================================================================================================

	// ---- 내정보 관리 {
	// MyInfo
	@GetMapping("/infoManage")
	private String infoManage(Authentication authentication, String memNo, Model model, StuVO stuVO, MemberVO memberVO,
			String subMenuCode) {

		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());

		System.out.println("멤버 브이오 : " + memberVO);
		model.addAttribute("memberVO", stuService.seletStu(memberVO));
		model.addAttribute("memberData", stuService.selectMember(memberVO));
		System.out.println("멤버데이터 왜 안나옴 : " + model.addAttribute("memberData", stuService.selectMember(memberVO)));

		System.out.println("아뒤 : " + memName);

		MemberMenuVO menuCode = new MemberMenuVO();
		menuCode.setMenuCode("MENU_001");

		System.out.println("메뉴코드는 " + menuCode.getMenuCode());

		model.addAttribute("menuCode", menuCode);
		model.addAttribute("subMenuCode", subMenuCode);

		// 에러 많음 수정 필요.

		return "/content/stu/stu_myInfo/infoManage";
	}

	// 비밀번호변경 페이지
	@GetMapping("/changePwd")
	private String changePwd(Authentication authentication, Model model, StuVO stuVO, MemberVO memberVO) {

		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		model.addAttribute("memberVO", stuService.seletStu(memberVO));

		// User user = (User)authentication.getPrincipal();
		// stuVO.setMemNo(user.getUsername());

		// model.addAttribute("stuVO" , stuService.seletStu(stuVO.getMemNo()));
		// System.out.println(model.addAttribute("stuVO" ,
		// stuService.seletStu(stuVO.getMemNo())));

		return "/content/stu/stu_myInfo/changePwd";
	}

	// 비밀번호 수정 Ajax
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

	// ----------학적관리 {

	// 휴학신청
	@GetMapping("/leaveManage")
	private String leaveManage(Authentication authentication, StuVO stuVO, MemberVO memberVO, Model model, String stuNo,
			String menuCode, String subMenuCode) {

		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		stuNo = stuService.seletStu(memberVO).getStuVO().getStuNo();

		model.addAttribute("memberVO", stuService.seletStu(memberVO));
		System.out.println("멤버 브이오 : " + memberVO);
		System.out.println("학생 정보 : " + stuService.seletStu(memberVO));

		// 복학 신청 Ajax떄매 던짐
		model.addAttribute("menuCode", menuCode);
		model.addAttribute("subMenuCode", subMenuCode);
		// 휴학 신청자 조회
		model.addAttribute("stuStatus", stuService.getStatusLeaveInfo(stuNo));

		return "/content/stu/stu_myStu/leaveManage";
	}

	// 휴학 신청Ajax
	@ResponseBody
	@PostMapping("/leaveManageAjax")
	public String leaveManageAjax(Authentication authentication, MemberVO memberVO, StuVO stuVO, String memNo,
			String menuCode, String subMenuCode, String stuStatus, String ingStatus, String applyReason,
			LeaveManageVO leaveManageVO, StatusInfoVO statusInfoVO, String stuNo) {

		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		// System.out.println(memName);
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		stuService.seletStu(memberVO);

		System.out.println("학생 정보 : " + stuService.seletStu(memberVO));
		System.out.println("StuVO 정보 : " + stuService.seletStu(memberVO).getStuVO().getStuNo());

		// System.out.println("승인 상태 : " + ingStatus);

		System.out.println("학적 상태 : " + stuStatus);
		System.out.println("승인 상태 : " + ingStatus);
		statusInfoVO.setStuNo(stuService.seletStu(memberVO).getStuVO().getStuNo());

		statusInfoVO.setStatusReason(applyReason);

		statusInfoVO.setNowStatus(stuStatus);
		System.out.println("상태정보VO : " + statusInfoVO);

		// System.out.println("휴학 신청하기 : " +ingStatus);

		if (stuStatus.equals("재학") && ingStatus.equals("승인완료")) {
			stuService.leav(statusInfoVO);
			// 승인 대기로 다시 변경

		} else if (stuStatus.equals("재학") && ingStatus.equals("0")) {
			stuService.leav(statusInfoVO);
			// 승인 대기로 다시 변경

		}

		stuNo = statusInfoVO.getStuNo();
		System.out.println("asfdasfd" + statusInfoVO.getStuNo());

		System.out.println(statusInfoVO.getIngStatus());

		Map<String, Object> data = new HashMap<>();
		data.put("menuCode", menuCode);
		data.put("subMenuCode", subMenuCode);

		data.put("ingStatus", statusInfoVO.getIngStatus());

		return statusInfoVO.getStuNo();
	}

	// 복학 신청
	@GetMapping("/returnManage")
	private String returnManage(Authentication authentication, StuVO stuVO, MemberVO memberVO, Model model,
			String stuNo, String menuCode, String subMenuCode, StatusInfoVO statusInfoVO, String ingStatus) {

		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		stuNo = stuService.seletStu(memberVO).getStuVO().getStuNo();
		model.addAttribute("memberVO", stuService.seletStu(memberVO));

		System.out.println("학생 정보 : " + stuService.seletStu(memberVO));

		// 복학 신청자 조회
		model.addAttribute("stuStatus", stuService.getStatusReturnInfo(stuNo));

		stuService.getStatusInfo(stuNo);

		System.out.println("statusInfoVO 상태 : " + statusInfoVO);

		System.out.println("학번 : " + stuNo);
		System.out.println("승인상태 : " + ingStatus);

		// 복학 신청 Ajax떄매 던짐
		model.addAttribute("menuCode", menuCode);
		model.addAttribute("subMenuCode", subMenuCode);

		return "/content/stu/stu_myStu/returnManage";
	}

	// 복학 신청Ajax
	@ResponseBody
	@PostMapping("/returnManageAjax")
	public Map<String, Object> returnManageAjax(Authentication authentication, MemberVO memberVO, StuVO stuVO,
			String memNo, String stuNo, String stuStatus, String ingStatus, String applyReason,
			LeaveManageVO leaveManageVO, StatusInfoVO statusInfoVO, String menuCode, String subMenuCode) {

		System.out.println(menuCode);
		System.out.println(subMenuCode);

		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		// System.out.println(memName);
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		stuService.seletStu(memberVO);

		System.out.println("학생 정보 : " + stuService.seletStu(memberVO));
		System.out.println("StuVO 정보 : " + stuService.seletStu(memberVO).getStuVO().getStuNo());

		System.out.println("학적 상태 : " + stuStatus);
		System.out.println("승인 상태 : " + ingStatus);
		statusInfoVO.setStuNo(stuService.seletStu(memberVO).getStuVO().getStuNo());
		statusInfoVO.setStatusReason(applyReason);

		statusInfoVO.setNowStatus(stuStatus);
		System.out.println("상태정보VO : " + statusInfoVO);

		stuNo = statusInfoVO.getStuNo();
		System.out.println(stuNo);

		if (stuStatus.equals("휴학") && ingStatus.equals("승인완료")) {
			stuService.returnManage(statusInfoVO);
			// 승인 대기로 다시 변경

		} else if (stuStatus.equals("휴학") && ingStatus.equals("0")) {
			stuService.returnManage(statusInfoVO);
			// 승인 대기로 다시 변경

		}

		else {
			// statusInfoVO.setIngStatus("승인대기");
		}
		System.out.println(statusInfoVO.getIngStatus());

		Map<String, Object> data = new HashMap<>();
		data.put("menuCode", menuCode);
		data.put("subMenuCode", subMenuCode);

		data.put("ingStatus", statusInfoVO.getIngStatus());

		return data;
	}

	// 전과신청
	@GetMapping("/moveManage")
	private String moveManage(Authentication authentication, StuVO stuVO, MemberVO memberVO, Model model, String collNo,
			String menuCode, String subMenuCode, String stuNo) {
		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		stuNo = memberVO.getMemNo();

		stuService.getColl(user.getUsername());
		memberVO.setStuVO(stuService.getColl(user.getUsername()));
		System.out.println(memberVO);
		model.addAttribute("memberVO", stuService.seletStu(memberVO));

		System.out.println(stuService.seletStu(memberVO));

		// 대학 리스트 조회
		model.addAttribute("colleageVO", schoolService.getCollList());
		System.out.println("전과신청 학과 조회 :  " + schoolService.getCollList());

		// 학과 리스트 조회
		System.out.println("대학 코드 : " + memberVO.getStuVO().getCollNo());
		collNo = memberVO.getStuVO().getCollNo();
		model.addAttribute("deptVO", schoolService.getDept(collNo));

		model.addAttribute("deptManageVO", stuService.getDeptManager(stuNo));

		// 게시판 상세보기할때 던질 메뉴코드, 서브메뉴코드 데이터
		model.addAttribute("menuCode", menuCode);
		model.addAttribute("subMenuCode", subMenuCode);

		return "/content/stu/stu_myStu/moveManage";
	}

	// 전과 신청 , 수강신청 전 학과 변경 AJax
	@ResponseBody
	@PostMapping("/deptUpdateAjax")
	public Map<String, Object> deptUpdateAjax(String collNo, DeptVO deptVO, ColleageVO colleageVO, String menuCode,
			String subMenuCode) {

		colleageVO.setCollNo(collNo);
		System.out.println(menuCode);
		System.out.println(subMenuCode);

		Map<String, Object> deptMap = new HashMap<>();

		List<DeptVO> deptList = schoolService.getDeptList(colleageVO.getCollNo());
		System.out.println("학과 리스트 : " + deptList);

		List<ColleageVO> collList = schoolService.getCollList();
		System.out.println("대학 리스트 : " + collList);

		deptMap.put("deptList", deptList);
		deptMap.put("collList", collList);

		System.out.println("맵 데이터 :" + deptMap);

		return deptMap;
	}

	// 전과신청 AJax
	@ResponseBody
	@PostMapping("/moveManageAjax")
	public String moveManageAjax(Authentication authentication, String menuCode, Model model, StuVO stuVO,
			String newPassword, String memNo, MemberVO memberVO, DeptManageVO deptManageVO, String toColl,
			String toDept) {

		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());

		menuCode = "MENU_002";
		model.addAttribute("subMenuList", memberService.stuSubMenuList(menuCode));

		stuService.getColl(user.getUsername());
		memberVO.setStuVO(stuService.getColl(user.getUsername()));
		System.out.println("!#@!#@!#@!#@" + memberVO);

		memberVO = stuService.seletStu(memberVO);
		System.out.println(stuService.seletStu(memberVO));
		System.out.println("멤버 데이터 : " + memberVO);
		System.out.println(toColl);

		deptManageVO.setStuNo(memberVO.getStuVO().getStuNo());
		deptManageVO.setApplyCode(memberVO.getStuVO().getDeptNo());// applyCode
		deptManageVO.setFromColl(memberVO.getColleageVO().getCollNo());
		// deptManageVO.setToColl(memberVO.getColleageVO().getCollNo());
		deptManageVO.setToColl(toColl);

		deptManageVO.setFromDept(memberVO.getDeptVO().getDeptNo());
		deptManageVO.setToDept(toDept);
		// deptManageVO.setToDept(memberVO.getStuVO().getDeptNo());

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
	private String doubleMajorManage(Authentication authentication, StuVO stuVO, MemberVO memberVO, Model model,
			String collNo, String stuNo, String menuCode, String subMenuCode) {
		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		stuNo = memberVO.getMemNo();
		model.addAttribute("memberVO", stuService.seletStu(memberVO));

		// 대학 리스트 조회
		model.addAttribute("colleageVO", schoolService.getCollList());
		System.out.println("전과신청 학과 조회 :  " + schoolService.getCollList());

		stuService.getColl(user.getUsername());
		memberVO.setStuVO(stuService.getColl(user.getUsername()));
		// 학과 리스트 조회
		System.out.println("대학 코드 : " + memberVO.getStuVO().getCollNo());
		collNo = memberVO.getStuVO().getCollNo();
		model.addAttribute("deptVO", schoolService.getDept(collNo));

		model.addAttribute("deptManageVO", stuService.getDeptManager(stuNo));

		model.addAttribute("menuCode", menuCode);
		model.addAttribute("subMenuCode", subMenuCode);

		return "/content/stu/stu_myStu/doubleMajorManage";
	}

	// 복수전공 신청 Ajax
	@ResponseBody
	@PostMapping("/doubleManageAjax")
	public Map<String, Object> doubleManageAjax(Authentication authentication, String menuCode, Model model,
			StuVO stuVO, MemberVO memberVO, String subMenuCode, DeptManageVO deptManageVO, String applyReason,
			String doubleMajorColl, String doubleMajorDept, int stuYear, int stuSem, String stuNo, String applyCode) {

		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());

		memberVO.setStuVO(stuService.getColl(user.getUsername()));
		System.out.println("!#@!#@!#@!#@" + memberVO);

		memberVO = stuService.seletStu(memberVO);

		stuVO.setStuNo(memberVO.getMemNo());
		stuNo = stuVO.getStuNo();
		System.out.println(memberVO.getStuVO().getDeptNo());
		applyCode = memberVO.getStuVO().getDeptNo();

		deptManageVO.setStuNo(stuNo);
		deptManageVO.setApplyCode(applyCode);
		deptManageVO.setApplyReason(applyReason);
		deptManageVO.setDoubleMajorColl(doubleMajorColl);
		deptManageVO.setDoubleMajorDept(doubleMajorDept);
		deptManageVO.setStuYear(stuYear);
		deptManageVO.setStuSem(stuSem);

		// 복수전공 신청 하기
		stuService.doubleMajorApply(deptManageVO);

		System.out.println(deptManageVO);

		Map<String, Object> data = new HashMap<>();
		data.put("menuCode", menuCode);
		data.put("subMenuCode", subMenuCode);

		model.addAttribute("subMenuCode", subMenuCode);
		model.addAttribute("menuCode", menuCode);

		return data;
	}

	// 학적신청현황조회
	@GetMapping("/academicManage")
	private String academicManage(Authentication authentication, String stuNo, DeptManageVO deptManageVO,
			MemberVO memberVO, Model model, StuVO stuVO, String memNo, String nowStatus, StatusInfoVO statusInfoVO) {
		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		model.addAttribute("memberVO", stuService.seletStu(memberVO));
		nowStatus = stuService.seletStu(memberVO).getStuVO().getStuStatus();
		statusInfoVO.setNowStatus(nowStatus);

		stuNo = stuService.seletStu(memberVO).getStuVO().getStuNo();

		System.out.println("휴학 신청자 " + stuService.getStatusLeaveInfo(stuNo));
		// 휴학 신청자 조회
		model.addAttribute("stuStatus", stuService.getStatusLeaveInfo(stuNo));

		System.out.println("복학신청자" + stuService.getStatusReturnInfo(stuNo));
		// 복학 신청자 조회
		model.addAttribute("stuStatusReturn", stuService.getStatusReturnInfo(stuNo));

		stuService.getStatusMoveInfo(stuNo);
		deptManageVO.setMemberVO(stuService.seletStu(memberVO));
		// 전과 신청자 조회
		System.out.println("전과 신청자" + stuService.getStatusMoveInfo(stuNo));
		System.out.println("fsadafdsafdsafdsafds" + deptManageVO);
		model.addAttribute("stuStatusMove", stuService.getStatusMoveInfo(stuNo));

		// 복수 전공 신청자 조회
		System.out.println("복수 전공 신청자 : " + stuService.getStatusDoubleInfo(stuNo));
		model.addAttribute("stuStatusDouble", stuService.getStatusDoubleInfo(stuNo));

		model.addAttribute("probation", stuService.getProbation(stuNo));

		System.out.println(statusInfoVO);

		return "/content/stu/stu_myStu/academicManage";
	}

	// ---- 교과수업 {
	// 성적조회
	@GetMapping("/grade")
	private String grade(Authentication authentication, StuVO stuVO, MemberVO memberVO, Model model,
			LectureVO lectureVO, String menuCode, String subMenuCode, SemesterVO semesterVO, String semNo) {
		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		stuVO.setStuNo(memName); // id임
		memberVO.setMemNo(user.getUsername());
		model.addAttribute("memberVO", stuService.seletStu(memberVO));
		
		lectureVO.setSemNo(semNo);
		System.out.println(lectureVO);
		lectureVO.setStuVO(stuVO);

		List<Map<String, Object>> enrollList = schoolService.getLecStuList(lectureVO);

		System.out.println(" asfddfsfds fds" + enrollList);

		Map<String, Object> enrollStuList = new HashMap<>();

		enrollStuList.put("enrollList", enrollList);

		model.addAttribute("lecture", enrollStuList);

		model.addAttribute("menuCode", menuCode);
		model.addAttribute("subMenuCode", subMenuCode);
		
		//Map에 떤져줄 학기조회
		model.addAttribute("semester" , stuService.getSemester());

		return "/content/stu/stu_class/grade";
	}

	// 성적조회 차트
	@ResponseBody
	@PostMapping("/getChartDataAjax")
	public Map<String, Object> getChartDataAjax(Authentication authentication, StuVO stuVO, MemberVO memberVO,
			String menuCode, String subMenuCode, Model model, LectureVO lectureVO, String semNo) {
		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		stuVO.setStuNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		model.addAttribute("memberVO", stuService.seletStu(memberVO));

		lectureVO.setSemNo(semNo);
		lectureVO.setStuVO(stuVO);
		System.out.println("Ajax에서 semNo : " +lectureVO.getSemNo());
		System.out.println("Ajax에서 stuNo : " +lectureVO.getStuVO().getStuNo());
		
		List<Map<String, Object>> enrollList = schoolService.getLecStuList(lectureVO);

		// 총 들은 학점 조회
		int lecScore = 0;
		int lecScoreSum = 0;
		
		Map<String, Object> dataZero = new HashMap<>();

		for (Map<String, Object> data : enrollList) {
			Object lecScoreObj = data.get("LEC_SCORE");
			if (lecScoreObj != null) {
				lecScore = Integer.parseInt(lecScoreObj.toString());
				System.out.println("LEC_SCORE: " + lecScore);
				lecScoreSum += lecScore;
			} else {
				System.out.println("LEC_SCORE is null");
			}
		}
		System.out.println(lecScoreSum);
		
		if(lecScoreSum == 0) {
			return dataZero;
		}
		
		// 각 등급별 개수 조회
		int aPlus = 0;
		int a = 0;
		int bPlus = 0;
		int b = 0;
		int cPlus = 0;
		int c = 0;
		int dPlus = 0;
		int d = 0;
		int f = 0;

		for (Map<String, Object> data : enrollList) {
			Object gradeObj = data.get("GRADE");
			if (gradeObj != null) {
				String grade = gradeObj.toString();
				System.out.println("GRADE : " + grade);
				switch (grade) {
				case "A+":
					aPlus++;
					break;
				case "A":
					a++;
					break;
				case "B+":
					bPlus++;
					break;
				case "B":
					b++;
					break;
				case "C+":
					cPlus++;
					break;
				case "C":
					c++;
					break;
				case "D+":
					dPlus++;
					break;
				case "D":
					d++;
					break;
				case "F":
					f++;
					break;
				default:
					// 다른 등급 처리
					break;
				}
			} else {
				System.out.println("GRADE is null");
			}
		}
		System.out.println(aPlus);
		System.out.println(a);
		System.out.println(bPlus);
		System.out.println(b);
		System.out.println(cPlus);
		System.out.println(c);
		System.out.println(dPlus);
		System.out.println(d);
		System.out.println(f);

		System.out.println(" 데이터:" + enrollList);

		enrollList.get(0);
		System.out.println("adfsafdsfds : " + enrollList.get(0));

		Map<String, Object> data = new HashMap<>();
		data.put("menuCode", menuCode);
		data.put("subMenuCode", subMenuCode);
		data.put("lecScoreSum", lecScoreSum);
		data.put("aPlus", aPlus);
		data.put("a", a);
		data.put("bPlus", bPlus);
		data.put("b", b);
		data.put("cPlus", cPlus);
		data.put("c", c);
		data.put("dPlus", dPlus);
		data.put("d", d);
		data.put("f", f);

		return data;
	}

	// 수강신청
	@RequestMapping("/application")
	private String application(String menuCode, String subMenuCode, Model model, StuVO stuVO, String orderBy,
			MemberVO memberVO, Authentication authentication, String collNo, LectureVO lectureVO) {

		System.out.println(orderBy);

		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		stuVO.setStuNo(user.getUsername());
		model.addAttribute("memberVO", stuService.seletStu(memberVO));
		memberVO.setStuVO(stuService.getColl(user.getUsername()));

		// 검색 정렬
		if (lectureVO.getSearchKeyword() == null) {
			lectureVO.setSearchKeyword("");
		}
		if (lectureVO.getSearchValue() == null) {
			lectureVO.setSearchValue("");
		}
		if (lectureVO.getSearchColl() == null) {
			lectureVO.setSearchColl("");
		}
		if (lectureVO.getSearchDept() == null) {
			lectureVO.setSearchDept("");
		}

		// 학점별, 인원별 정렬
		if (lectureVO.getOrderBy() == null) {
			lectureVO.setOrderBy("");
		}

		System.out.println(lectureVO.getSearchColl());
		System.out.println(lectureVO.getSearchDept());

		System.out.println(lectureVO.getSearchKeyword());
		System.out.println(lectureVO.getSearchValue());

		// 대학 조회
		model.addAttribute("colleageVO", schoolService.getCollList());

		// 학과 조회
		model.addAttribute("deptVO", schoolService.getDeptList(collNo));

		// stu에 있는 deptNo에 학과 삽입
		stuVO.setDeptNo(lectureVO.getSearchDept());

		System.out.println(stuVO.getDeptNo());
		// 수강 조회
		lectureVO.setLecStatus("Y");
		model.addAttribute("lectureListVO", schoolService.getLectureList(lectureVO));

		System.out.println("수업데이터 : " + schoolService.getLectureList(lectureVO));
		System.out.println(stuVO.getStuNo());

		// 수강신청항목 리스트 조회
		model.addAttribute("applyLecture", stuService.applyLectureList(stuVO.getStuNo()));
		System.out.println("수강신청한 강의 리스트 :" + stuService.applyLectureList(stuVO.getStuNo()));

		model.addAttribute("menuCode", menuCode);
		model.addAttribute("subMenuCode", subMenuCode);

		return "/content/stu/stu_class/application";
	}

	// 수강신창 화면
	@ResponseBody
	@PostMapping("/apllyLectureAjax")
	public Map<String, Object> apllyLectureAjax(EnrollmentVO enrollmentVO, StuGradeVO stuGradeVO, LectureVO lectureVO,
			Model model, String menuCode, String subMenuCode, String lecNo, String semNo, int maxMem, int nowMem,
			String stuNo) {

		enrollmentVO.setSemNo(semNo);
		enrollmentVO.setLecNo(lecNo);
		enrollmentVO.setStuNo(stuNo);

		lectureVO.setMaxMem(maxMem);
		lectureVO.setNowMem(nowMem);
		lectureVO.setLecNo(lecNo);

		stuGradeVO.setLecNo(lecNo);
		stuGradeVO.setStuNo(stuNo);
		stuGradeVO.setSemNo(semNo);

		int duply = stuService.getFindEnol(enrollmentVO);
		System.out.println("중복 확인 : " +duply);
		System.out.println(duply);
	
		if(duply <= 0) {
			// 수강신청하기.
			stuService.applyLecture(enrollmentVO);
			// 수강신청시 학생 점수판 삽입
			stuService.insertGrade(stuGradeVO);
			// 수강 신청시 해당 과목 인원수 업데이트
			stuService.updateLectureCount(lectureVO);
			
			Map<String, Object> data = new HashMap<>();
			data.put("menuCode", menuCode);
			data.put("subMenuCode", subMenuCode);

			model.addAttribute("subMenuCode", subMenuCode);
			model.addAttribute("menuCode", menuCode);
			
			return data;
		}
		
		Map<String, Object> falseData = new HashMap<>();
		
		return falseData;

		

		
	}

	// 수강 취소 화면
	@ResponseBody
	@PostMapping("/cancelLectureAjax")
	public Map<String, Object> cancelLectureAjax(EnrollmentVO enrollmentVO, LectureVO lectureVO, Model model,
			StuGradeVO stuGradeVO, String menuCode, String subMenuCode, String lecNo, String semNo, int maxMem,
			int nowMem, String stuNo) {

		enrollmentVO.setSemNo(semNo);
		enrollmentVO.setLecNo(lecNo);
		enrollmentVO.setStuNo(stuNo);

		lectureVO.setMaxMem(maxMem);
		lectureVO.setNowMem(nowMem);
		lectureVO.setLecNo(lecNo);

		stuGradeVO.setLecNo(lecNo);
		stuGradeVO.setStuNo(stuNo);
		stuGradeVO.setSemNo(semNo);

		// 수강 취소하기.
		stuService.lectureCancel(enrollmentVO);
		// 수강 취소시 학생 점수테이블도 삭제.
		stuService.gradeCancel(stuGradeVO);
		// 수강 취소시 과목 인원수 업데이트
		stuService.lectureCancelUpdateCount(lectureVO);

		Map<String, Object> data = new HashMap<>();
		data.put("menuCode", menuCode);
		data.put("subMenuCode", subMenuCode);

		model.addAttribute("subMenuCode", subMenuCode);
		model.addAttribute("menuCode", menuCode);

		return data;
	}

	// 수업평가
	@GetMapping("/evaluation")
	private String evaluation(Authentication authentication, StuVO stuVO, MemberVO memberVO, Model model) {
		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		model.addAttribute("memberVO", stuService.seletStu(memberVO));

		return "/content/stu/stu_class/evaluation";
	}

	// 교과수업 끝 }

	// ------ 게시판 {
	// 나의 게시판
	@RequestMapping("/myBoard")
	private String myBoard(Authentication authentication, Model model, MemberVO memberVO, StuVO stuVO,
			String boardWriter, String toDate, String fromDate, UniBoardVO uniBoardVO, BoardCategoryVO boardCategoryVO,
			String cateNo, String menuCode, SearchVO searchVO, String subMenuCode, BoardListSearchVO boardListSearchVO,
			String boardNo, @RequestParam(name = "month", required = false) Integer month) {

		System.out.println(month);

		if (uniBoardVO.getOrderBy() == null) {
			uniBoardVO.setOrderBy("REG_BOARD_DATE");
		}
		if (uniBoardVO.getSearchKeyword() == null) {
			uniBoardVO.setSearchKeyword("BOARD_WRITER");
		}
		if (uniBoardVO.getSearchValue() == null) {
			uniBoardVO.setSearchValue("");
		}

		if (uniBoardVO.getMonth() == 0) {
			uniBoardVO.setMonth(0);
		}

		System.out.println(uniBoardVO.getSearchKeyword());
		System.out.println(uniBoardVO.getSearchValue());

		System.out.println(uniBoardVO.getOrderBy());
		// 오늘 날짜
		String nowDate = DateUtil.getNowDateToString();

		// 이번달의 첫날
		String firstDate = DateUtil.getFirstDateOfMonth();

		System.out.println(month);

		if(uniBoardVO.getMonth() == 0) {
			uniBoardVO.setFromDate(null);
			uniBoardVO.setToDate(null);
		} else if(uniBoardVO.getMonth() == -1) {
			uniBoardVO.setFromDate(null);
			uniBoardVO.setToDate(null);
		}else if(uniBoardVO.getMonth() == -3) {
			uniBoardVO.setFromDate(null);
			uniBoardVO.setToDate(null);
		}
		else {
			if (uniBoardVO.getFromDate() == null) {
				uniBoardVO.setFromDate(firstDate);
			}

			if (uniBoardVO.getToDate() == null) {
				uniBoardVO.setToDate(nowDate);
			}
		}
		
		if(uniBoardVO.getToDate() != null || uniBoardVO.getFromDate() != null) {
			uniBoardVO.setMonth(0);
		}

		
		System.out.println(uniBoardVO.getFromDate());
		model.addAttribute("uniBoardFromDate", uniBoardVO.getFromDate());
		System.out.println(uniBoardVO.getToDate());
		model.addAttribute("uniBoardToDate", uniBoardVO.getToDate());

		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		// System.out.println(memName);
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		model.addAttribute("memberVO", stuService.seletStu(memberVO));
		System.out.println("학생정보 : " + stuService.seletStu(memberVO));

		stuVO.setStuNo(memName);
		// 내가 작성한 보드 세팅
		System.out.println("보드쓴사람" + stuVO.getStuNo());
		uniBoardVO.setBoardWriter(stuVO.getStuNo());

		model.addAttribute("boardCategoryVO", boardService.getBoardCategoryList());
		System.out.println("보드 카테고리 정보 : " + boardService.getBoardCategoryList());
		System.out.println(uniBoardVO);

		// 보드 개시판 개수 조회
		int totalDataCnt = boardService.totalBoardCount(uniBoardVO);
		System.out.println("보드 개수 : " + boardService.totalBoardCount(uniBoardVO));
		uniBoardVO.setTotalDataCnt(totalDataCnt);

		// 페이지 정보 세팅
		uniBoardVO.setPageInfo();

		cateNo = boardCategoryVO.getCateNo();

		System.out.println("유니보드데이터 : " + uniBoardVO);
		model.addAttribute("uniBoardList", boardService.getTotalMyBoardList(uniBoardVO));

		// 게시판 상세보기할때 던질 메뉴코드, 서브메뉴코드 데이터
		model.addAttribute("menuCode", menuCode);
		model.addAttribute("subMenuCode", subMenuCode);

		return "/content/stu/stu_board/myBoard";
	}

	// 전체 게시판
	@RequestMapping("/totalBoard")
	private String totalBoard(Authentication authentication, Model model, MemberVO memberVO, StuVO stuVO, String toDate,
			String fromDate, UniBoardVO uniBoardVO, BoardCategoryVO boardCategoryVO, String cateNo, String menuCode,
			String subMenuCode) {
		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		// System.out.println(memName);
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		model.addAttribute("memberVO", stuService.seletStu(memberVO));
		System.out.println("학생정보 : " + stuService.seletStu(memberVO));

		// 오늘 날짜
		String nowDate = DateUtil.getNowDateToString();

		// 이번달의 첫날
		String firstDate = DateUtil.getFirstDateOfMonth();

		if (uniBoardVO.getOrderBy() == null) {
			uniBoardVO.setOrderBy("REG_BOARD_DATE");
		}
		if (uniBoardVO.getSearchKeyword() == null) {
			uniBoardVO.setSearchKeyword("BOARD_WRITER");
		}
		if (uniBoardVO.getSearchValue() == null) {
			uniBoardVO.setSearchValue("");
		}

		if (uniBoardVO.getMonth() == 0) {
			uniBoardVO.setMonth(0);
		}
		
		System.out.println(uniBoardVO.getOrderBy());
		
		// Month랑 toDate, FromDate 함꼐 실행 불가
		if(uniBoardVO.getMonth() == 0) {
			uniBoardVO.setFromDate(null);
			uniBoardVO.setToDate(null);
		} else if(uniBoardVO.getMonth() == -1) {
			uniBoardVO.setFromDate(null);
			uniBoardVO.setToDate(null);
		}else if(uniBoardVO.getMonth() == -3) {
			uniBoardVO.setFromDate(null);
			uniBoardVO.setToDate(null);
		}
		else {
			if (uniBoardVO.getFromDate() == null) {
				uniBoardVO.setFromDate(firstDate);
			}

			if (uniBoardVO.getToDate() == null) {
				uniBoardVO.setToDate(nowDate);
			}
		}
		
		if(uniBoardVO.getToDate() != null || uniBoardVO.getFromDate() != null) {
			uniBoardVO.setMonth(0);
		}
		
		System.out.println(uniBoardVO.getFromDate());
		model.addAttribute("uniBoardFromDate", uniBoardVO.getFromDate());
		System.out.println(uniBoardVO.getToDate());
		model.addAttribute("uniBoardToDate", uniBoardVO.getToDate());

		cateNo = boardCategoryVO.getCateNo();

		int totalDateCnt = boardService.totalBoardPage(uniBoardVO);
		uniBoardVO.setTotalDataCnt(totalDateCnt);

		// 페이징 정보 세팅
		uniBoardVO.setPageInfo();

		System.out.println("페이징 정보 : " + uniBoardVO);

		model.addAttribute("boardCategoryVO", boardService.getBoardCategoryList());
		System.out.println("보드 카테고리 정보 : " + boardService.getBoardCategoryList());
		model.addAttribute("uniBoardList", boardService.getTotalBoardList(uniBoardVO));

		// 게시판 상세보기할때 던질 메뉴코드, 서브메뉴코드 데이터
		model.addAttribute("menuCode", menuCode);
		model.addAttribute("subMenuCode", subMenuCode);

		return "/content/stu/stu_board/totalBoard";
	}

	// 학과 게시판
	@GetMapping("/deptBoard")
	private String deptBoard(Authentication authentication, StuVO stuVO, MemberVO memberVO, Model model,
			String menuCode, String subMenuCode, UniBoardVO uniBoardVO) {
		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		// System.out.println(memName);
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		model.addAttribute("memberVO", stuService.seletStu(memberVO));
		System.out.println("학생정보 : " + stuService.seletStu(memberVO));

		uniBoardVO.setDeptNo(stuService.seletStu(memberVO).getDeptVO().getDeptNo());

		model.addAttribute("uniBoardList", boardService.getTotalDeptBoardList(uniBoardVO));

		// 게시판 상세보기할때 던질 메뉴코드, 서브메뉴코드 데이터
		model.addAttribute("menuCode", menuCode);
		model.addAttribute("subMenuCode", subMenuCode);

		return "/content/stu/stu_board/deptBoard";
	}

	// 게시글 비밀번호 확인
	@ResponseBody
	@PostMapping("/pwdAjax")
	public Map<String, Object> pwdAjax(String menuCode, String subMenuCode, String isPrivate, String boardNo,
			Model model, int readCnt) {

		System.out.println(isPrivate);

		Map<String, Object> data = new HashMap<>();
		data.put("menuCode", menuCode);
		data.put("subMenuCode", subMenuCode);

		model.addAttribute("subMenuCode", subMenuCode);
		model.addAttribute("menuCode", menuCode);

		++readCnt;

		return data;
	}

	// 글쓰기
	@ResponseBody
	@PostMapping("/boardWriteAjax")
	public Map<String, Object> boardWrite(String menuCode, String subMenuCode, String boardTitle, String boardContent,
			String isPrivate, String isNotice, String cateNo, UniBoardVO uniBoardVO, Model model, String inputPwd,
			String deptNo) {

		System.out.println("카테고리 코드 : " + cateNo);
		System.out.println(deptNo);
		
		// 카테고리가 학과로 표시되어있으면, DEPT_NO 삽입
		if (cateNo == "CATE_002") {
			uniBoardVO.setDeptNo(deptNo);
		}

		uniBoardVO.setBoardTitle(boardTitle);
		uniBoardVO.setBoardContent(boardContent);

		if (inputPwd != null) {
			uniBoardVO.setIsPrivate(inputPwd);
		} else {
			uniBoardVO.setIsPrivate(isPrivate);
		}

		uniBoardVO.setIsNotice(isNotice);

		System.out.println(uniBoardVO);

		Map<String, Object> data = new HashMap<>();
		data.put("menuCode", menuCode);
		data.put("subMenuCode", subMenuCode);

		model.addAttribute("subMenuCode", subMenuCode);
		model.addAttribute("menuCode", menuCode);

		boardService.insertBoard(uniBoardVO);

		return data;

	}

	// 게시글 상세보기
	@GetMapping("/boardDetail")
	private String boardDetail(Authentication authentication, String cateNo, String boardNo, Model model,
			UniBoardVO uniBoardVO, BoardReplyVO boardReplyVO, MemberVO memberVO, StuVO stuVO, String menuCode,
			String subMenuCode, MemberMenuVO memberMenuVO, MemberSubMenuVO memberSubMenuVO, int readCnt) {

		model.addAttribute("menuCode", menuCode);
		model.addAttribute("subMenuCode", subMenuCode);
		System.out.println(" @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" + menuCode);
		System.out.println(" @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" + subMenuCode);

		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		// System.out.println(memName);
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		model.addAttribute("memberVO", stuService.seletStu(memberVO));

		System.out.println(boardNo);
		boardService.boardDetail(boardNo);

		// 게시판 조회 수 업데이트
		readCnt += 1;
		uniBoardVO.setReadCnt(readCnt);
		boardService.readCnt(uniBoardVO);

		// 댓글 수 업데이트
		System.out.println(boardReplyVO);
		// boardReplyService.replyCnt(boardReplyVO);

		// uniBoardVO = (UniBoardVO)boardService.boardDetail(boardNo);

		System.out.println("보드VO" + uniBoardVO);
		System.out.println("보드 상세 정보  : " + boardService.boardDetail(boardNo));
		model.addAttribute("uniBoardVO", boardService.boardDetail(boardNo));

		// 게시글 댓글 수
		System.out.println(boardNo);
		boardReplyService.replyCount(boardNo);
		System.out.println("댓글 수 : " + boardReplyService.replyCount(boardNo));

		cateNo = uniBoardVO.getCateNo();
		// 게시판 카테고리 정보
		model.addAttribute("boardCategoryVO", boardService.getBoardCategoryList());

		// 댓글 보기
		model.addAttribute("boardReplyVO", boardReplyService.selectReply(boardNo));

		// 이전글다음글

		String numberStr = boardNo.substring(6);
		System.out.println(numberStr);
		int prevNumber = Integer.parseInt(boardNo.substring(6)) - 1;
		System.out.println(prevNumber);
		int nextNumber = Integer.parseInt(boardNo.substring(6)) + 1;
		System.out.println(nextNumber);

		String prevStr = boardNo.replace(numberStr, String.format("%03d", prevNumber)); // 숫자를 3자리로 포맷팅하여 대체
		String nextStr = boardNo.replace(numberStr, String.format("%03d", nextNumber)); // 숫자를 3자리로 포맷팅하여 대체

		UniBoardVO prevDetail = boardService.boardDetail(prevStr);
		UniBoardVO nextDetail = boardService.boardDetail(nextStr);

		System.out.println("@@@@@@@@@@@@@@@이전글" + prevDetail);
		System.out.println("@@@@@@@@@@@@다음글" + nextDetail);

		if (prevDetail == null) {
			prevDetail = new UniBoardVO();
			prevDetail.setBoardTitle("이전글이 없습니다.");
		}
		if (nextDetail == null) {
			nextDetail = new UniBoardVO();
			nextDetail.setBoardTitle("다음글이 없습니다.");
		}

		model.addAttribute("prevList", prevDetail);
		model.addAttribute("nextList", nextDetail);

		return "/content/stu/stu_board/boardDetail";
	}

	// 댓글 쓰기
	@GetMapping("/insertReply")
	private String insertReply(BoardReplyVO boardReplyVO, String replyContent) {

		System.out.println(replyContent);

		return "redirect:/stuMenu/insertReply";
	}

	// 댓글 등록
	@ResponseBody
	@PostMapping("/replyAjax")
	public Map<String, Object> replyAjax(String menuCode, String subMenuCode, String stuNo, String boardNo,
			String replyContent, BoardReplyVO boardReplyVO, Model model) {

		// 댓글 수 ++
		boardReplyService.replyPlus(boardNo);

		boardReplyVO.setBoardNo(boardNo);
		boardReplyVO.setReplyContent(replyContent);
		boardReplyVO.setReplyWriter(stuNo);
		System.out.println(boardReplyVO);

		Map<String, Object> data = new HashMap<>();
		data.put("menuCode", menuCode);
		data.put("subMenuCode", subMenuCode);

		model.addAttribute("subMenuCode", subMenuCode);
		model.addAttribute("menuCode", menuCode);

		boardReplyService.insertReply(boardReplyVO);

		return data;

	}

	// 중고 나눔
	@GetMapping("/donation")
	private String donation(Authentication authentication, String boardNo, Model model, UniBoardVO uniBoardVO,
			MemberVO memberVO, StuVO stuVO, MemberMenuVO memberMenuVO, MemberSubMenuVO memberSubMenuVO) {

		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		// System.out.println(memName);
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		model.addAttribute("memberVO", stuService.seletStu(memberVO));

		return "/content/stu/stu_board/donation";
	}

	// 게시판 끝 }

	// ----------- 캘린더 {
	// 학과 일정
	@GetMapping("/departmentSchedule")
	private String departmentSchedule() {

		return "/content/stu/stu_calender/departmentSchedule";
	}

	// 내 할일
	@GetMapping("/mySchedule")
	private String mySchedule(String menuCode, 	String subMenuCode, Model model) {
		
		

		return "/content/stu/stu_calender/mySchedule";
	}

	@GetMapping("/chat")
	private String chat(Authentication authentication, StuVO stuVO, MemberVO memberVO, Model model, String menuCode,
			String subMenuCode) {

		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		model.addAttribute("memberVO", stuService.seletStu(memberVO));

		model.addAttribute("subMenuCode", subMenuCode);
		model.addAttribute("menuCode", menuCode);

		return "/content/stu/stu_chat/totalChat";
	}

	// 채팅 추가
	@MessageMapping("/hello")
	@SendTo("/topic/greetings")
	public Greeting greeting(HelloMessage message, MemberVO memberVO, StuVO stuVO, Authentication authentication)
			throws Exception {

		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		stuVO.setStuNo(user.getUsername()); // id임	
		memberVO.setMemNo(user.getUsername());
		memberVO =  stuService.seletStu(memberVO);
		System.out.println(stuService.seletStu(memberVO));

		Thread.sleep(100);
		return new Greeting(memberVO.getMemName() + " / " + memberVO.getMemNo() +" : "+ HtmlUtils.htmlEscape(message.getName()));

	}
}
