package com.study.test.board.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.test.admin.vo.AdminMenuVO;
import com.study.test.admin.vo.AdminSubMenuVO;
import com.study.test.board.service.BoardReplyService;
import com.study.test.board.service.BoardService;
import com.study.test.board.vo.BoardCategoryVO;
import com.study.test.board.vo.BoardReplyVO;

import com.study.test.board.vo.UniBoardVO;
import com.study.test.member.service.MemberService;
import com.study.test.member.vo.MemberMenuVO;
import com.study.test.member.vo.MemberSubMenuVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.professor.vo.ProfessorMenuVO;
import com.study.test.professor.vo.ProfessorSubMenuVO;
import com.study.test.school.service.SchoolService;
import com.study.test.stu.service.StuService;
import com.study.test.stu.vo.StuVO;
import com.study.test.util.ConstVariable;
import com.study.test.util.DateUtil;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/board")
public class BoardController {

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
	
	@GetMapping("/boardMain")
	public String boardMain(MemberSubMenuVO memberSubMenuVO, Authentication authentication, Model model, MemberVO memberVO, StuVO stuVO) {
		memberSubMenuVO.setMenuCode(ConstVariable.ONE_STU_MENU_CODE);
		memberSubMenuVO.setSubMenuCode(ConstVariable.DEFAULT_STU_SUB_MENU_CODE);
		
		String memLayout = getCode(authentication, model);
		
		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		// System.out.println(memName);
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		model.addAttribute("memberVO", stuService.seletStu(memberVO));
		System.out.println("학생정보 : " + stuService.seletStu(memberVO));
		
		model.addAttribute("memLayOut", memLayout);
		
		return "/content/publicBoard/board_main";
	}
	
	//전체 게시판
	@RequestMapping("/board")
	private String totalBoard(Authentication authentication, AdminMenuVO adminMenuVO, AdminSubMenuVO adminSubMenuVO, ProfessorMenuVO professorMenuVO , Model model, MemberVO memberVO, StuVO stuVO, String toDate,
			String fromDate, UniBoardVO uniBoardVO, BoardCategoryVO boardCategoryVO, String cateNo, MemberSubMenuVO memberSubMenuVO) {

		System.out.println(uniBoardVO.getOrderBy());
		
		memberSubMenuVO.setMenuCode(ConstVariable.ONE_STU_MENU_CODE);
		memberSubMenuVO.setSubMenuCode(ConstVariable.DEFAULT_STU_SUB_MENU_CODE);
		
		String memLayout = getCode(authentication, model);
		
		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		// System.out.println(memName);
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		
		List<String> authorityStrings = user.getAuthorities().stream().map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList());
		
		//인증 정보에 따른 회원 정보 조회
		if(authorityStrings.contains("ROLE_PRO")){
			model.addAttribute("memberVO", memberService.getMemInfoForBoard(memberVO));
			professorMenuVO.setMenuCode(ConstVariable.FIVE_PROFESSOR_MENU_CODE);
		}
		
		else if(authorityStrings.contains("ROLE_ADMIN")){
			model.addAttribute("memberVO", memberService.getMemInfoForBoard(memberVO));
			adminMenuVO.setMenuCode(ConstVariable.FOURTH_MENU_CODE);
		}
		
		else {
			model.addAttribute("memberVO", stuService.seletStu(memberVO));
			System.out.println("학생정보 : " + stuService.seletStu(memberVO));
		}
		
		// 오늘 날짜
		String nowDate = DateUtil.getNowDateToString();

		// 이번달의 첫날
		String firstDate = DateUtil.getFirstDateOfMonth();

		if (uniBoardVO.getOrderBy() == null) {
			uniBoardVO.setOrderBy("REG_BOARD_DATE_ORDER");
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
		
		//카테고리 정렬
		if(uniBoardVO.getCategoryList() == null) {
			uniBoardVO.setCategoryList("CATE_001");
		}
		System.out.println("카테고리 ::::  " + uniBoardVO.getCategoryList());
		
		System.out.println(uniBoardVO.getOrderBy());
		
		// Month랑 toDate, FromDate 함꼐 실행 불가
		/*
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
		*/
		
		System.out.println(uniBoardVO.getFromDate());
		model.addAttribute("uniBoardFromDate", uniBoardVO.getFromDate());
		System.out.println(uniBoardVO.getToDate());
		model.addAttribute("uniBoardToDate", uniBoardVO.getToDate());

		int totalDateCnt = boardService.totalBoardPage(uniBoardVO);
		uniBoardVO.setTotalDataCnt(totalDateCnt);

		// 페이징 정보 세팅
		uniBoardVO.setPageInfo();
		System.out.println("페이징 정보 : " + uniBoardVO);
		
		model.addAttribute("memLayOut", memLayout);
		
		cateNo = boardCategoryVO.getCateNo();
	

		model.addAttribute("boardCategoryVO", boardService.getBoardCategoryList());
		System.out.println("보드 카테고리 정보 : " + boardService.getBoardCategoryList());
		model.addAttribute("uniBoardList", boardService.getTotalBoardList(uniBoardVO));
		
		
				
		return "/content/publicBoard/totalBoard";
	}
	
	// 전체게시글 상세보기
		@GetMapping("/boardDetail")
		private String boardDetail(Authentication authentication, ProfessorMenuVO professorMenuVO, AdminMenuVO adminMenuVO, String cateNo, String boardNo, Model model,
				UniBoardVO uniBoardVO, BoardReplyVO boardReplyVO, MemberVO memberVO, StuVO stuVO,MemberMenuVO memberMenuVO, MemberSubMenuVO memberSubMenuVO, int readCnt) {

			memberSubMenuVO.setMenuCode(ConstVariable.FOURTH_STU_MENU_CODE);

			User user = (User) authentication.getPrincipal();
			
			memberVO.setMemNo(user.getUsername());
			model.addAttribute("memberVO", memberService.getMemInfo(memberVO));
			
			List<String> authorityStrings = user.getAuthorities().stream().map(GrantedAuthority::getAuthority)
					.collect(Collectors.toList());
			
			//인증 정보에 따른 회원 정보 조회
			if(authorityStrings.contains("ROLE_PRO")){
				model.addAttribute("memberVO", memberService.getMemInfoForBoard(memberVO));
				professorMenuVO.setMenuCode(ConstVariable.FIVE_PROFESSOR_MENU_CODE);
			}
			
			else if(authorityStrings.contains("ROLE_ADMIN")){
				model.addAttribute("memberVO", memberService.getMemInfoForBoard(memberVO));
				adminMenuVO.setMenuCode(ConstVariable.FOURTH_MENU_CODE);
			}
			
			else {
				model.addAttribute("memberVO", stuService.seletStu(memberVO));
				System.out.println("학생정보 : " + stuService.seletStu(memberVO));
			}
			

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
			
			String memLayout = getCode(authentication, model);
			model.addAttribute("memLayOut", memLayout);

			return "content/publicBoard/boardDetail";
		}
	
		//학과 게시판
	@RequestMapping("/deptBoard")
	private String deptBoard(MemberSubMenuVO memberSubMenuVO, Model model, Authentication authentication, MemberVO memberVO, StuVO stuVO, UniBoardVO uniBoardVO
			,String cateNo, BoardCategoryVO boardCategoryVO, String deptNo) {

		String memLayout = getCode(authentication, model);
		model.addAttribute("memLayOut", memLayout);
		
		User user = (User) authentication.getPrincipal();
		String memName = user.getUsername();
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		model.addAttribute("memberVO", stuService.seletStu(memberVO));
		System.out.println("학생정보 : " + stuService.seletStu(memberVO));

		// 오늘 날짜
				String nowDate = DateUtil.getNowDateToString();

				// 이번달의 첫날
				String firstDate = DateUtil.getFirstDateOfMonth();

				if (uniBoardVO.getOrderBy() == null) {
					uniBoardVO.setOrderBy("REG_BOARD_DATE_ORDER");
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
				/*
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
				*/
				
				//카테고리 정렬
				uniBoardVO.setCategoryList("CATE_002");
				
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

				uniBoardVO.setDeptNo(stuService.seletStu(memberVO).getDeptVO().getDeptNo());
				System.out.println(uniBoardVO.getDeptNo());
				model.addAttribute("uniBoardList", boardService.getTotalDeptBoardList(uniBoardVO));
		
		return "content/publicBoard/deptBoard";
	}
	
	
	
//////////////////////////////////////////////////////////

	// 학사 공지사항
	@RequestMapping("/notice")
	private String board(Authentication authentication, Model model, UniBoardVO uniBoardVO) {

		String memLayout = "";
		User user = (User) authentication.getPrincipal();
		System.out.println(uniBoardVO);
		
		memLayout = getCode(authentication, model);
		
		
		int totalDataCnt = boardService.cntBoardList(uniBoardVO);
		System.out.println("@@@@@@@@@@@@@@@@@"+totalDataCnt);
		uniBoardVO.setTotalDataCnt(totalDataCnt);
		uniBoardVO.setPageInfo();
		
		System.out.println("@@@@@@@@@@@@@@@@"+uniBoardVO);

		model.addAttribute("memLayOut", memLayout);

		model.addAttribute("uniBoardList", boardService.searchByBoard(uniBoardVO));
				
		return "/content/publicBoard/notice";
	}
	
	
	//학사공지사항 상세조회
	@GetMapping("/noticeDetail")
	public String noticeDetailAjax(Authentication authentication,UniBoardVO uniBoardVO, Model model) {
		String memLayout = "";

		// 로그인한 회원의 권한에 따라 layout 변경 진행
		memLayout = getCode(authentication, model);

		model.addAttribute("memLayOut", memLayout);
		boardService.setReadCnt(uniBoardVO.getBoardNo());
		//상세조회
		Map<String, Object> boardMap = new HashMap<>();
		
		boardMap.put("boardDetail", boardService.getBoardDetail(uniBoardVO.getBoardNo()));
		boardMap.put("replyList", boardService.getBoardReplyList(uniBoardVO.getBoardNo()));
		model.addAttribute("boardMap",boardMap);
		
		return "content/publicBoard/notice_detail";
	}
	
	//게시글 등록 페이지 이동
	@GetMapping("/regBoard")
	public String regBoard(Model model, Authentication authentication) {
		
		String memLayout = "";

		memLayout = getCode(authentication, model);
		
		model.addAttribute("memLayOut", memLayout);
		
		model.addAttribute("cateList",boardService.getBoardCategoryList());
		
		return "content/publicBoard/reg_board";
	}
	//게시글 등록
	@PostMapping("/insertByBoard")
	public String insertByBoard(UniBoardVO uniBoardVO,Model model, Authentication authentication, AdminMenuVO adminMenuVO, AdminSubMenuVO adminSubMenuVO
			,MemberMenuVO memberMenuVO, MemberSubMenuVO memberSubMenuVO,ProfessorMenuVO professorMenuVO, ProfessorSubMenuVO professorSubMenuVO) {
		String memId = authentication.getName();
		uniBoardVO.setBoardWriter(memId);
		
		String memLayout = "";
		
		memLayout = getCode(authentication, model);
		
		model.addAttribute("memLayOut", memLayout);
		
		boardService.insertByBoard(uniBoardVO);
		
		return "redirect:/board/notice";
	}
	
	//공지사항 수정 페이지 이동
	@GetMapping("/setBoardDetailPage")
	public String setBoardDetailPage(String boardNo, Model model, Authentication authentication) {
		model.addAttribute("boardDetail",boardService.getBoardDetail(boardNo));
		model.addAttribute("cateList",boardService.getBoardCategoryList());
		
		String memLayout = "";
		memLayout = getCode(authentication, model);
		
		model.addAttribute("memLayOut", memLayout);
		
		
		
		return "content/publicBoard/set_board_detail";
	}
	
	//게시글 수정
	@PostMapping("/setBoardDetail")
	public String setBoardDetail(UniBoardVO uniBoardVO) {
		boardService.setBoardDetail(uniBoardVO);
		return"redirect:/board/notice";
	}
	
	//게시글 삭제
	@GetMapping("/delBoardDetail")
	public String delBoardDetail(String boardNo) {
		boardService.delBoard(boardNo);
		return "redirect:/board/notice";
	}
	
	//비밀글
	@PostMapping("/checkPwAjax")
	@ResponseBody
	public int checkPwAjax(UniBoardVO uniBoardVO) {
		
		return boardService.getCheckPw(uniBoardVO);
	}
	
	
	
///////////////////////////////////////////////////////////////////////////////////////
	// 게시글 수정
	@ResponseBody
	@PostMapping("/boardUpdateAjax")
	private Map<String, Object> boardUpdateAjax(String boardNo, String newBoardContent, String newBoardTitle,
			String menuCode, String subMenuCode, UniBoardVO uniBoardVO) {

		uniBoardVO.setBoardNo(boardNo);
		uniBoardVO.setBoardTitle(newBoardTitle);
		uniBoardVO.setBoardContent(newBoardContent);
		System.out.println(uniBoardVO);

		Map<String, Object> data = new HashMap<>();
		data.put("menuCode", menuCode);
		data.put("subMenuCode", subMenuCode);

		boardService.boardUpdate(uniBoardVO);

		return data;
	}

	// 보드 게시글 삭제
	@ResponseBody
	@PostMapping("/boardDeleteAjax")
	private Map<String, Object> boardDelete(String boardNo, String menuCode, String subMenuCode) {

		Map<String, Object> data = new HashMap<>();
		data.put("menuCode", menuCode);
		data.put("subMenuCode", subMenuCode);

		boardService.boardDelete(boardNo);

		return data;
	}

	// 보드 댓글 삭제
	@ResponseBody
	@PostMapping("/replyDeleteAjax")
	private Map<String, Object> replyDeleteAjax(String replyWriter, String replyNo, String menuCode, String subMenuCode,
			BoardReplyVO boardReplyVO, String boardNo) {

		Map<String, Object> data = new HashMap<>();
		data.put("menuCode", menuCode);
		data.put("subMenuCode", subMenuCode);

		// 댓글 수 감소
		boardReplyService.replyDecrease(boardNo);

		// 댓글 삭제
		boardReplyService.replyDelete(boardReplyVO);

		return data;
	}

	// 보드 댓글 수정
	@ResponseBody
	@PostMapping("/replyUpdateAjax")
	private Map<String, Object> replyUpdateAjax(String replyContent, String replyNo, String menuCode,
			String subMenuCode, BoardReplyVO boardReplyVO) {

		Map<String, Object> data = new HashMap<>();
		data.put("menuCode", menuCode);
		data.put("subMenuCode", subMenuCode);

		boardReplyService.replyUpdate(boardReplyVO);

		return data;
	}
	
	
	
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
	    	 professorSubMenuVO.setMenuCode(ConstVariable.FIFTH_MENU_CODE);
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
