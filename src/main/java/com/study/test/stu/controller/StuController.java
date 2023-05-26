package com.study.test.stu.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.test.admin.vo.EmpVO;
import com.study.test.board.service.BoardReplyService;
import com.study.test.board.service.BoardService;
import com.study.test.board.vo.BoardCategoryVO;
import com.study.test.board.vo.BoardListSearchVO;
import com.study.test.board.vo.BoardReplyVO;
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
import com.study.test.school.service.SchoolService;
import com.study.test.stu.service.StuService;
import com.study.test.stu.vo.LeaveManageVO;
import com.study.test.stu.vo.StatusInfoVO;
import com.study.test.stu.vo.StuVO;

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
	
	
	//정보
		@GetMapping("/myInfo")
		public String myInfo(Authentication authentication, String stuNo, String memNo, Model model, StuVO stuVO, MemberVO memberVO, ColleageVO colleageVO) {
			
			User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			stuVO.setMemNo(user.getUsername()); // id임
			memberVO.setMemNo(user.getUsername());
			model.addAttribute("memberVO", stuService.seletStu(memberVO));
			
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
		public String updateMyInfo(StuVO stuVO, MemImgVO memImgVO) {
			stuService.updateStu(stuVO);
			stuService.updateStuImg(memImgVO);
			
			
			return "redirect:/mainPage";
					
		}
		
		//학적 관리
		@GetMapping("myStu")
		private String myStu(Authentication authentication, StuVO stuVO, MemberVO memberVO, Model model, String stuNo) {
			User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			stuVO.setMemNo(user.getUsername()); // id임
			memberVO.setMemNo(user.getUsername());
			stuNo = stuService.seletStu(memberVO).getStuVO().getStuNo();
			
			model.addAttribute("memberVO" , stuService.seletStu(memberVO));
			System.out.println("멤버 브이오 : " + memberVO);
			System.out.println("학생 정보 : " +stuService.seletStu(memberVO));
			
			// 휴학 신청자 조회
			model.addAttribute("stuStatus",stuService.getStatusLeaveInfo(stuNo));

			
			return "/content/stu/stu_myStu/leaveManage";
		}
		
		//교과수업
		@GetMapping("stuClass")
		private String stuClass(Authentication authentication, StuVO stuVO, MemberVO memberVO, Model model) {
			User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			stuVO.setMemNo(user.getUsername()); // id임
			memberVO.setMemNo(user.getUsername());
			model.addAttribute("memberVO", stuService.seletStu(memberVO));
			
			return "/content/stu/stu_class/grade";
		}
		
		
		
		//게시판
		@GetMapping("board")
		private String board(Authentication authentication, Model model, MemberVO memberVO, StuVO stuVO, UniBoardVO uniBoardVO, BoardCategoryVO boardCategoryVO, String cateNo, String menuCode, String subMenuCode, MemberSubMenuVO memberSubMenuVO) {

			memberSubMenuVO.setSubMenuCode("SUB_MENU_011");
			System.out.println("서브메뉴 : " +memberSubMenuVO.getSubMenuCode());
			
			User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			//System.out.println(memName);
			stuVO.setMemNo(user.getUsername()); // id임
			memberVO.setMemNo(user.getUsername());
			stuService.seletStu(memberVO);
			model.addAttribute("memberVO", stuService.seletStu(memberVO));
			System.out.println("학생정보 : " + stuService.seletStu(memberVO));
			
			model.addAttribute("boardCategoryVO", boardService.getBoardCategoryList());
			System.out.println("보드 카테고리 정보 : " +boardService.getBoardCategoryList());
			model.addAttribute("uniBoardVO",boardService.getTotalBoardList()); 
			
			cateNo = boardCategoryVO.getCateNo();
			
			//게시판 상세보기할때 던질 메뉴코드, 서브메뉴코드 데이터
			model.addAttribute("menuCode" , menuCode);
			model.addAttribute("subMenuCode", subMenuCode);
			
			return "/content/stu/stu_board/board";
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
		private String infoManage(Authentication authentication, String memNo, Model model, StuVO stuVO, MemberVO memberVO, String subMenuCode) {
				
			
			  User user = (User)authentication.getPrincipal();
				String memName = user.getUsername();
				stuVO.setMemNo(user.getUsername()); // id임
				memberVO.setMemNo(user.getUsername());
				
				System.out.println("멤버 브이오 : " + memberVO);
				model.addAttribute("memberVO", stuService.seletStu(memberVO));
				model.addAttribute("memberData",stuService.selectMember(memberVO));
				System.out.println("멤버데이터 왜 안나옴 : " +model.addAttribute("memberData",stuService.selectMember(memberVO)));

			System.out.println("아뒤 : " + memName);
			
			MemberMenuVO menuCode = new MemberMenuVO();
			menuCode.setMenuCode("MENU_001");
			
			System.out.println("메뉴코드는 " +menuCode.getMenuCode());
			
			model.addAttribute("menuCode", menuCode);
			model.addAttribute("subMenuCode", subMenuCode);
			
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
			model.addAttribute("memberVO" , stuService.seletStu(memberVO));
		  
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
		private String leaveManage(Authentication authentication,StuVO stuVO, MemberVO memberVO, Model model, String stuNo) {

			
			User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			stuVO.setMemNo(user.getUsername()); // id임
			memberVO.setMemNo(user.getUsername());
			stuNo = stuService.seletStu(memberVO).getStuVO().getStuNo();
			
			model.addAttribute("memberVO" , stuService.seletStu(memberVO));
			System.out.println("멤버 브이오 : " + memberVO);
			System.out.println("학생 정보 : " +stuService.seletStu(memberVO));
			
			// 휴학 신청자 조회
			model.addAttribute("stuStatus",stuService.getStatusLeaveInfo(stuNo));
			
			return "/content/stu/stu_myStu/leaveManage";
		}
		
		// 휴학 신청Ajax
		@ResponseBody
		@PostMapping("/leaveManageAjax")
		public String leaveManageAjax(Authentication authentication, MemberVO memberVO, StuVO stuVO, String memNo, 
				String stuStatus, String applyReason, LeaveManageVO leaveManageVO, StatusInfoVO statusInfoVO, String stuNo) {

			User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			//System.out.println(memName);
			stuVO.setMemNo(user.getUsername()); // id임
			memberVO.setMemNo(user.getUsername());
			stuService.seletStu(memberVO);
			
			System.out.println("학생 정보 : " +stuService.seletStu(memberVO));
			System.out.println( "StuVO 정보 : " +stuService.seletStu(memberVO).getStuVO().getStuNo());
			
			//System.out.println("승인 상태 : " + ingStatus);
			
			
			System.out.println("학적 상태 : "+ stuStatus);
			statusInfoVO.setStuNo(stuService.seletStu(memberVO).getStuVO().getStuNo());
			
			statusInfoVO.setStatusReason(applyReason);
			
			statusInfoVO.setNowStatus(stuStatus);
			System.out.println("상태정보VO : " +statusInfoVO);

			
			//System.out.println("휴학 신청하기 : " +ingStatus);
			
			
			stuService.leav(statusInfoVO);
		
			stuNo = statusInfoVO.getStuNo();
			System.out.println("asfdasfd" +statusInfoVO.getStuNo());
			 
			return statusInfoVO.getStuNo();
		}
		
		// 복학 신청
		@GetMapping("/returnManage")
		private String returnManage(Authentication authentication,StuVO stuVO, MemberVO memberVO, Model model, String stuNo, 
				String menuCode, String subMenuCode, StatusInfoVO statusInfoVO, String ingStatus) {

			User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			stuVO.setMemNo(user.getUsername()); // id임
			memberVO.setMemNo(user.getUsername());
			stuNo = stuService.seletStu(memberVO).getStuVO().getStuNo();
			model.addAttribute("memberVO" , stuService.seletStu(memberVO));
			
			System.out.println("학생 정보 : " +stuService.seletStu(memberVO));
			
			// 복학 신청자 조회
			model.addAttribute("stuStatus",stuService.getStatusLeaveInfo(stuNo));
			
			stuService.getStatusInfo(stuNo);

			System.out.println("statusInfoVO 상태 : " + statusInfoVO);
			
			System.out.println("학번 : " +stuNo);
			System.out.println("승인상태 : " + ingStatus);
			
			//복학 신청 Ajax떄매 던짐
			model.addAttribute("menuCode" , menuCode);
			model.addAttribute("subMenuCode", subMenuCode);
			
			return "/content/stu/stu_myStu/returnManage";
		}
		
		// 복학 신청Ajax
			@ResponseBody
			@PostMapping("/returnManageAjax")
			public Map<String, Object> returnManageAjax(Authentication authentication, MemberVO memberVO, StuVO stuVO, String memNo, String stuNo,
					String stuStatus, String ingStatus, String applyReason, LeaveManageVO leaveManageVO, StatusInfoVO statusInfoVO, String menuCode, String subMenuCode) {
				
				System.out.println(menuCode);
				System.out.println(subMenuCode);
				
				User user = (User)authentication.getPrincipal();
				String memName = user.getUsername();
				//System.out.println(memName);
				stuVO.setMemNo(user.getUsername()); // id임
				memberVO.setMemNo(user.getUsername());
				stuService.seletStu(memberVO);
				
				System.out.println("학생 정보 : " +stuService.seletStu(memberVO));
				System.out.println( "StuVO 정보 : " +stuService.seletStu(memberVO).getStuVO().getStuNo());
				
				System.out.println("학적 상태 : "+ stuStatus);
				System.out.println("승인 상태 : "+ ingStatus);
				statusInfoVO.setStuNo(stuService.seletStu(memberVO).getStuVO().getStuNo());
				statusInfoVO.setStatusReason(applyReason);
				
				statusInfoVO.setNowStatus(stuStatus);
				System.out.println("상태정보VO : " +statusInfoVO);
				
				stuNo = statusInfoVO.getStuNo();
				System.out.println(stuNo);

				if(stuStatus.equals("휴학") && ingStatus.equals("승인완료")) {
					stuService.returnManage(statusInfoVO);
					//승인 대기로 다시 변경
					stuService.ingStatusUpdate(stuNo);
				}
				
				else if(ingStatus.equals("휴학") && ingStatus.equals("승인완료")) {
					stuService.returnManage(statusInfoVO);
					//승인 대기로 다시 변경
					stuService.ingStatusUpdate(stuNo);
					
				}
				
				else{
					statusInfoVO.setIngStatus("승인대기");
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
		private String moveManage(Authentication authentication,StuVO stuVO, MemberVO memberVO, Model model, String collNo, String menuCode, String subMenuCode) {
			User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			stuVO.setMemNo(user.getUsername()); // id임
			memberVO.setMemNo(user.getUsername());
			
			
			stuService.getColl(user.getUsername());
			memberVO.setStuVO(stuService.getColl(user.getUsername()));
			System.out.println(memberVO);
			model.addAttribute("memberVO" , stuService.seletStu(memberVO));
			
			System.out.println(stuService.seletStu(memberVO));

			//대학 리스트 조회
			model.addAttribute("colleageVO", schoolService.getCollList());
			System.out.println("전과신청 학과 조회 :  " + schoolService.getCollList());
			
			//학과 리스트 조회
			System.out.println("대학 코드 : " +memberVO.getStuVO().getCollNo() );
			collNo = memberVO.getStuVO().getCollNo();
			model.addAttribute("deptVO", schoolService.getDept(collNo));
			
			//게시판 상세보기할때 던질 메뉴코드, 서브메뉴코드 데이터
			model.addAttribute("menuCode" , menuCode);
			model.addAttribute("subMenuCode", subMenuCode);
			
			return "/content/stu/stu_myStu/moveManage";
		}
		
		//전과 신청 , 수강신청 전 학과 변경 AJax
		@ResponseBody
		@PostMapping("/deptUpdateAjax")
		public Map<String, Object> deptUpdateAjax(String collNo, DeptVO deptVO, ColleageVO colleageVO, String menuCode, String subMenuCode) {

			colleageVO.setCollNo(collNo);
			System.out.println(menuCode);
			System.out.println(subMenuCode);
			
			Map<String, Object> deptMap = new HashMap<>();
			
			List<DeptVO> deptList = schoolService.getDeptList(colleageVO.getCollNo());
			System.out.println("학과 리스트 : "+deptList);
			
			List<ColleageVO> collList = schoolService.getCollList();
			System.out.println("대학 리스트 : " + collList);
			
			deptMap.put("deptList", deptList);
			deptMap.put("collList", collList);
		
			System.out.println("맵 데이터 :" + deptMap);
			
			return deptMap;
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
		private String doubleMajorManage(Authentication authentication, StuVO stuVO, MemberVO memberVO, Model model) {
			User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			stuVO.setMemNo(user.getUsername()); // id임
			memberVO.setMemNo(user.getUsername());
			model.addAttribute("memberVO", stuService.seletStu(memberVO));

			return "/content/stu/stu_myStu/doubleMajorManage";
		}
		
		// 학적신청현황조회
		@GetMapping("/academicManage")
		private String academicManage(Authentication authentication,String stuNo, DeptManageVO deptManageVO, MemberVO memberVO, Model model, StuVO stuVO, String memNo, String nowStatus, StatusInfoVO statusInfoVO) {
			  User user = (User)authentication.getPrincipal();
				String memName = user.getUsername();
				stuVO.setMemNo(user.getUsername()); // id임
				memberVO.setMemNo(user.getUsername());
				model.addAttribute("memberVO" , stuService.seletStu(memberVO));
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
			private String grade(Authentication authentication, StuVO stuVO, MemberVO memberVO, Model model) {
				User user = (User)authentication.getPrincipal();
				String memName = user.getUsername();
				stuVO.setMemNo(user.getUsername()); // id임
				memberVO.setMemNo(user.getUsername());
				model.addAttribute("memberVO" , stuService.seletStu(memberVO));
				
				
				return "/content/stu/stu_class/grade";
			}
			
		//수강신청
		@GetMapping("application")
		private String application(String menuCode, String subMenuCode, Model model, StuVO stuVO, MemberVO memberVO, Authentication authentication, String collNo, LectureVO lectureVO) {
			User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			stuVO.setMemNo(user.getUsername()); // id임
			memberVO.setMemNo(user.getUsername());
			model.addAttribute("memberVO" , stuService.seletStu(memberVO));
			memberVO.setStuVO(stuService.getColl(user.getUsername()));

			//대학 조회
			model.addAttribute("colleageVO", schoolService.getCollList()); 
			
			//학과 조회
			model.addAttribute("deptVO", schoolService.getDeptList(collNo));

			
			//수강 조회
			model.addAttribute("lectureListVO", schoolService.getLectureList(lectureVO));
			System.out.println("수업데이터 : " +schoolService.getLectureList(lectureVO));
			
			model.addAttribute("menuCode" , menuCode);
			model.addAttribute("subMenuCode", subMenuCode);

			return "/content/stu/stu_class/application";
		}
		
		
		
		//수업평가
		@GetMapping("evaluation")
		private String evaluation(Authentication authentication, StuVO stuVO, MemberVO memberVO, Model model) {
			User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			stuVO.setMemNo(user.getUsername()); // id임
			memberVO.setMemNo(user.getUsername());
			model.addAttribute("memberVO" , stuService.seletStu(memberVO));

			return "/content/stu/stu_class/evaluation";
		}
		
		// 교과수업 끝 } 
			
		// ------ 게시판 {
		//나의 게시판
		@GetMapping("/myBoard")
		private String myBoard(Authentication authentication, Model model, MemberVO memberVO, StuVO stuVO
				, UniBoardVO uniBoardVO, BoardCategoryVO boardCategoryVO, String cateNo, String menuCode
				, String subMenuCode, BoardListSearchVO boardListSearchVO,  String boardNo) {
			
			System.out.println(menuCode);
			System.out.println(subMenuCode);
			
			User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			//System.out.println(memName);
			stuVO.setMemNo(user.getUsername()); // id임
			memberVO.setMemNo(user.getUsername());
			model.addAttribute("memberVO", stuService.seletStu(memberVO));
			System.out.println("학생정보 : " + stuService.seletStu(memberVO));
			
			model.addAttribute("boardCategoryVO", boardService.getBoardCategoryList());
			System.out.println("보드 카테고리 정보 : " +boardService.getBoardCategoryList());
			model.addAttribute("uniBoardVO",boardService.getTotalBoardList()); 
			
			//보드 개시판 개수 조회
			int totalDataCnt = boardService.totalBoardCount();
			System.out.println("보드 개수 : " +  boardService.totalBoardCount());
			
			//System.out.println(boardNo);
			//System.out.println("댓글 수 : " + boardReplyService.replyCount(boardNo));
			
			//boardReplyService.replyCount(boardNo);
			
			
			//페이지 정보 세팅
			boardListSearchVO.setTotalDataCnt(totalDataCnt);
			boardListSearchVO.setPageInfo();
			System.out.println(boardListSearchVO);
			
			cateNo = boardCategoryVO.getCateNo();
			
			//게시판 상세보기할때 던질 메뉴코드, 서브메뉴코드 데이터
			model.addAttribute("menuCode" , menuCode);
			model.addAttribute("subMenuCode", subMenuCode);
			
			
			return "/content/stu/stu_board/myBoard";
		}
		
		
		//전체 게시판
		@GetMapping("/totalBoard")
		private String totalBoard(Authentication authentication, Model model, MemberVO memberVO, StuVO stuVO, UniBoardVO uniBoardVO, BoardCategoryVO boardCategoryVO, String cateNo, String menuCode, String subMenuCode) {
			User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			//System.out.println(memName);
			stuVO.setMemNo(user.getUsername()); // id임
			memberVO.setMemNo(user.getUsername());
			model.addAttribute("memberVO", stuService.seletStu(memberVO));
			System.out.println("학생정보 : " + stuService.seletStu(memberVO));
			
			model.addAttribute("boardCategoryVO", boardService.getBoardCategoryList());
			System.out.println("보드 카테고리 정보 : " +boardService.getBoardCategoryList());
			model.addAttribute("uniBoardVO",boardService.getTotalBoardList()); 
			
			cateNo = boardCategoryVO.getCateNo();
			
			//게시판 상세보기할때 던질 메뉴코드, 서브메뉴코드 데이터
			model.addAttribute("menuCode" , menuCode);
			model.addAttribute("subMenuCode", subMenuCode);
			
			
			return "/content/stu/stu_board/totalBoard";
		}
		
		// 게시글 비밀번호 확인
		@ResponseBody
		@PostMapping("/pwdAjax")
		public Map<String, Object> pwdAjax(String menuCode, String subMenuCode, String isPrivate, String boardNo , Model model, int readCnt ) {
			
			System.out.println(isPrivate);
			
			Map<String, Object> data = new HashMap<>();
			 data.put("menuCode", menuCode);
		     data.put("subMenuCode", subMenuCode);
			
			model.addAttribute("subMenuCode", subMenuCode);
			model.addAttribute("menuCode" , menuCode);
			
			++readCnt;
			
			return data;
		}
		
		//글쓰기
		@ResponseBody
		@PostMapping("/boardWriteAjax")
		public Map<String, Object> boardWrite(String menuCode, String subMenuCode, String boardTitle, String boardContent, String isPrivate, String isNotice, String cateNo,UniBoardVO uniBoardVO, Model model, String inputPwd) {
			
			System.out.println("카테고리 코드 : " + cateNo );
			
			uniBoardVO.setBoardTitle(boardTitle);
			uniBoardVO.setBoardContent(boardContent);
			
			if(inputPwd != null) {
				uniBoardVO.setIsPrivate(inputPwd);
			}
			else {
				uniBoardVO.setIsPrivate(isPrivate);
			}		
			
			uniBoardVO.setIsNotice(isNotice);
			
			System.out.println(uniBoardVO);
			
			 Map<String, Object> data = new HashMap<>();
			 data.put("menuCode", menuCode);
		     data.put("subMenuCode", subMenuCode);
			
			model.addAttribute("subMenuCode", subMenuCode);
			model.addAttribute("menuCode" , menuCode);
			
			boardService.insertBoard(uniBoardVO);
			
			return data;
			
		}
		
		
		
		//게시글 상세보기
		@GetMapping("/boardDetail")
		private String boardDetail(Authentication authentication, String cateNo, String boardNo, Model model, UniBoardVO uniBoardVO, BoardReplyVO boardReplyVO,
				MemberVO memberVO, StuVO stuVO, String menuCode, String subMenuCode, MemberMenuVO memberMenuVO,
				MemberSubMenuVO memberSubMenuVO, int readCnt) {

			
			model.addAttribute("menuCode" , menuCode);
			model.addAttribute("subMenuCode", subMenuCode);
			System.out.println(" @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" +menuCode);
			System.out.println(" @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@" +subMenuCode);
			
			
			User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			//System.out.println(memName);
			stuVO.setMemNo(user.getUsername()); // id임
			memberVO.setMemNo(user.getUsername());
			model.addAttribute("memberVO", stuService.seletStu(memberVO));
			
			
			System.out.println(boardNo);
			boardService.boardDetail(boardNo);
			
			//게시판 조회 수 업데이트
			readCnt +=1;
			uniBoardVO.setReadCnt(readCnt);
			boardService.readCnt(uniBoardVO);
			
			
			
			//댓글 수 업데이트
			System.out.println(boardReplyVO);
			//boardReplyService.replyCnt(boardReplyVO);
			
			//uniBoardVO = (UniBoardVO)boardService.boardDetail(boardNo);
			
			System.out.println("보드VO" +uniBoardVO);
			System.out.println("보드 상세 정보  : " +boardService.boardDetail(boardNo));
			model.addAttribute("uniBoardVO", boardService.boardDetail(boardNo));
			
			//게시글 댓글 수
			System.out.println(boardNo);
			boardReplyService.replyCount(boardNo);
			System.out.println("댓글 수 : " + boardReplyService.replyCount(boardNo));
			
			
			cateNo = uniBoardVO.getCateNo();
			//게시판 카테고리 정보 
			model.addAttribute("boardCategoryVO", boardService.getBoardCategoryList());
			
			//댓글 보기
			model.addAttribute("boardReplyVO" , boardReplyService.selectReply(boardNo) );
			
			return "/content/stu/stu_board/boardDetail";
		}
		
		// 댓글 쓰기
		@GetMapping("/insertReply")
		private String insertReply(BoardReplyVO boardReplyVO, String replyContent) {
			
			System.out.println(replyContent);
			
			return "redirect:/stuMenu/insertReply";
		}
		
		//댓글 등록
		@ResponseBody
		@PostMapping("/replyAjax")
		public Map<String, Object> replyAjax(String menuCode, String subMenuCode, String stuNo ,
				String boardNo, String replyContent, BoardReplyVO boardReplyVO, Model model) {
			
			//댓글 수 ++
			boardReplyService.replyPlus(boardNo);

			
			boardReplyVO.setBoardNo(boardNo);
			boardReplyVO.setReplyContent(replyContent);
			boardReplyVO.setReplyWriter(stuNo);
			System.out.println(boardReplyVO);
			
			 Map<String, Object> data = new HashMap<>();
			 data.put("menuCode", menuCode);
		     data.put("subMenuCode", subMenuCode);
			
			model.addAttribute("subMenuCode", subMenuCode);
			model.addAttribute("menuCode" , menuCode);
			
			boardReplyService.insertReply(boardReplyVO);
			
			return data;
			
		}
		
		
		
		//중고 나눔
		@GetMapping("/donation")
		private String donation(Authentication authentication, String boardNo, Model model, UniBoardVO uniBoardVO, MemberVO memberVO, StuVO stuVO,MemberMenuVO memberMenuVO, MemberSubMenuVO memberSubMenuVO) {

			User user = (User)authentication.getPrincipal();
			String memName = user.getUsername();
			//System.out.println(memName);
			stuVO.setMemNo(user.getUsername()); // id임
			memberVO.setMemNo(user.getUsername());
			model.addAttribute("memberVO", stuService.seletStu(memberVO));

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
