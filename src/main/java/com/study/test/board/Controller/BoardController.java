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
import com.study.test.professor.vo.ProfessorMenuVO;
import com.study.test.professor.vo.ProfessorSubMenuVO;
import com.study.test.school.service.SchoolService;
import com.study.test.stu.service.StuService;
import com.study.test.util.ConstVariable;

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
//////////////////////////////////////////////////////////
	
	
	// 게시판
	@RequestMapping("/board")
	private String board(Authentication authentication, Model model, UniBoardVO uniBoardVO,
			BoardCategoryVO boardCategoryVO, String cateNo, AdminSubMenuVO adminSubMenuVO,  MemberMenuVO memberMenuVO,
			MemberSubMenuVO memberSubMenuVO, ProfessorSubMenuVO professorSubMenuVO, AdminMenuVO adminMenuVO, ProfessorMenuVO professorMenuVO, String menuCode, String subMenuCode) {


		String memLayout = "";
		User user = (User) authentication.getPrincipal();
		System.out.println(uniBoardVO);
		
		// 로그인한 회원의 권한에 따라 layout 변경 진행
		List<String> authorityStrings = user.getAuthorities().stream().map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList());
		
		
		int totalDataCnt = boardService.cntBoardList(uniBoardVO);
		System.out.println("@@@@@@@@@@@@@@@@@"+totalDataCnt);
		uniBoardVO.setTotalDataCnt(totalDataCnt);
		uniBoardVO.setPageInfo();
		
		System.out.println("@@@@@@@@@@@@@@@@"+uniBoardVO);

		if (authorityStrings.contains("ROLE_ADMIN")) {
			memLayout = "admin";
			adminMenuVO.setMenuCode(ConstVariable.FOURTH_MENU_CODE);
			adminSubMenuVO.setMenuCode(ConstVariable.FOURTH_MENU_CODE);
		} else if (authorityStrings.contains("ROLE_STU")) {
			memLayout = "info";
			System.out.println("@#!!@#!@#!@#@@");
			memberSubMenuVO.setMenuCode(ConstVariable.FOURTH_STU_MENU_CODE);
			memberMenuVO.setMenuCode(ConstVariable.FOURTH_STU_MENU_CODE);
		} else if (authorityStrings.contains("ROLE_PRO")) {
			memLayout = "professor";
			professorSubMenuVO.setMenuCode(ConstVariable.FIFTH_MENU_CODE);
			professorMenuVO.setMenuCode(ConstVariable.FIFTH_MENU_CODE);
		}

		model.addAttribute("memLayOut", memLayout);

		model.addAttribute("uniBoardList", boardService.searchByBoard(uniBoardVO));
				
		return "/content/stu/stu_board/board";
	}
	
	
	//게시판 상세조회
	@GetMapping("/boardDetail")
	public String boardDetailAjax(Authentication authentication,UniBoardVO uniBoardVO, Model model,AdminMenuVO adminMenuVO, AdminSubMenuVO adminSubMenuVO
									,MemberMenuVO memberMenuVO, MemberSubMenuVO memberSubMenuVO,ProfessorMenuVO professorMenuVO, ProfessorSubMenuVO professorSubMenuVO) {
		String memLayout = "";
		User user = (User) authentication.getPrincipal();

		// 로그인한 회원의 권한에 따라 layout 변경 진행
		List<String> authorityStrings = user.getAuthorities().stream().map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList());
		


		if (authorityStrings.contains("ROLE_ADMIN")) {
			memLayout = "admin";
			adminMenuVO.setMenuCode(ConstVariable.FOURTH_MENU_CODE);
			adminSubMenuVO.setMenuCode(ConstVariable.FOURTH_MENU_CODE);
		} else if (authorityStrings.contains("ROLE_STU")) {
			memLayout = "info";
			System.out.println("@#!!@#!@#!@#@@");
			memberSubMenuVO.setMenuCode(ConstVariable.FOURTH_STU_MENU_CODE);
			memberMenuVO.setMenuCode(ConstVariable.FOURTH_STU_MENU_CODE);
		} else if (authorityStrings.contains("ROLE_PRO")) {
			memLayout = "professor";
			professorSubMenuVO.setMenuCode(ConstVariable.FIFTH_MENU_CODE);
			professorMenuVO.setMenuCode(ConstVariable.FIFTH_MENU_CODE);
		}
		model.addAttribute("memLayOut", memLayout);
		boardService.setReadCnt(uniBoardVO.getBoardNo());
		//상세조회
		Map<String, Object> boardMap = new HashMap<>();
		
		boardMap.put("boardDetail", boardService.getBoardDetail(uniBoardVO.getBoardNo()));
		boardMap.put("replyList", boardService.getBoardReplyList(uniBoardVO.getBoardNo()));
		model.addAttribute("boardMap",boardMap);
		
		return "content/publicBoard/board_detail";
	}
	
	//게시글 등록 페이지 이동
	@GetMapping("/regBoard")
	public String regBoard(Model model, Authentication authentication,AdminMenuVO adminMenuVO, AdminSubMenuVO adminSubMenuVO
			,MemberMenuVO memberMenuVO, MemberSubMenuVO memberSubMenuVO,ProfessorMenuVO professorMenuVO, ProfessorSubMenuVO professorSubMenuVO) {
		
		String memLayout = "";
		User user = (User) authentication.getPrincipal();
		
		// 로그인한 회원의 권한에 따라 layout 변경 진행
		List<String> authorityStrings = user.getAuthorities().stream().map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList());
		
		if (authorityStrings.contains("ROLE_ADMIN")) {
			memLayout = "admin";
			adminMenuVO.setMenuCode(ConstVariable.FOURTH_MENU_CODE);
			adminSubMenuVO.setMenuCode(ConstVariable.FOURTH_MENU_CODE);
			memberSubMenuVO.setMenuCode(ConstVariable.FOURTH_STU_MENU_CODE);
			memberMenuVO.setMenuCode(ConstVariable.FOURTH_STU_MENU_CODE);
			professorSubMenuVO.setMenuCode(ConstVariable.FIFTH_MENU_CODE);
			professorMenuVO.setMenuCode(ConstVariable.FIFTH_MENU_CODE);
		} else if (authorityStrings.contains("ROLE_STU")) {
			memLayout = "info";
			System.out.println("@#!!@#!@#!@#@@");
			adminMenuVO.setMenuCode(ConstVariable.FOURTH_MENU_CODE);
			adminSubMenuVO.setMenuCode(ConstVariable.FOURTH_MENU_CODE);
			memberSubMenuVO.setMenuCode(ConstVariable.FOURTH_STU_MENU_CODE);
			memberMenuVO.setMenuCode(ConstVariable.FOURTH_STU_MENU_CODE);
			professorSubMenuVO.setMenuCode(ConstVariable.FIFTH_MENU_CODE);
			professorMenuVO.setMenuCode(ConstVariable.FIFTH_MENU_CODE);
		} else if (authorityStrings.contains("ROLE_PRO")) {
			memLayout = "professor";
			adminMenuVO.setMenuCode(ConstVariable.FOURTH_MENU_CODE);
			adminSubMenuVO.setMenuCode(ConstVariable.FOURTH_MENU_CODE);
			memberSubMenuVO.setMenuCode(ConstVariable.FOURTH_STU_MENU_CODE);
			memberMenuVO.setMenuCode(ConstVariable.FOURTH_STU_MENU_CODE);
			professorSubMenuVO.setMenuCode(ConstVariable.FIFTH_MENU_CODE);
			professorMenuVO.setMenuCode(ConstVariable.FIFTH_MENU_CODE);
		}

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
		User user = (User) authentication.getPrincipal();
		
		// 로그인한 회원의 권한에 따라 layout 변경 진행
		List<String> authorityStrings = user.getAuthorities().stream().map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList());
		
		if (authorityStrings.contains("ROLE_ADMIN")) {
			memLayout = "admin";
			adminMenuVO.setMenuCode(ConstVariable.FOURTH_MENU_CODE);
			adminSubMenuVO.setMenuCode(ConstVariable.FOURTH_MENU_CODE);
		} else if (authorityStrings.contains("ROLE_STU")) {
			memLayout = "info";
			System.out.println("@#!!@#!@#!@#@@");
			memberSubMenuVO.setMenuCode(ConstVariable.FOURTH_STU_MENU_CODE);
			memberMenuVO.setMenuCode(ConstVariable.FOURTH_STU_MENU_CODE);
		} else if (authorityStrings.contains("ROLE_PRO")) {
			memLayout = "professor";
			professorSubMenuVO.setMenuCode(ConstVariable.FIFTH_MENU_CODE);
			professorMenuVO.setMenuCode(ConstVariable.FIFTH_MENU_CODE);
		}
		model.addAttribute("memLayOut", memLayout);
		
		boardService.insertByBoard(uniBoardVO);
		
		return "redirect:/board/board";
	}
	
	//게시글 수정 페이지
	@GetMapping("/setBoardDetailPage")
	public String setBoardDetailPage(String boardNo, Model model, Authentication authentication, AdminMenuVO adminMenuVO, AdminSubMenuVO adminSubMenuVO
			,MemberMenuVO memberMenuVO, MemberSubMenuVO memberSubMenuVO,ProfessorMenuVO professorMenuVO, ProfessorSubMenuVO professorSubMenuVO) {
		model.addAttribute("boardDetail",boardService.getBoardDetail(boardNo));
		model.addAttribute("cateList",boardService.getBoardCategoryList());
		
		String memLayout = "";
		User user = (User) authentication.getPrincipal();
		
		// 로그인한 회원의 권한에 따라 layout 변경 진행
		List<String> authorityStrings = user.getAuthorities().stream().map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList());
		
		if (authorityStrings.contains("ROLE_ADMIN")) {
			memLayout = "admin";
			adminMenuVO.setMenuCode(ConstVariable.FOURTH_MENU_CODE);
			adminSubMenuVO.setMenuCode(ConstVariable.FOURTH_MENU_CODE);
		} else if (authorityStrings.contains("ROLE_STU")) {
			memLayout = "info";
			System.out.println("@#!!@#!@#!@#@@");
			memberSubMenuVO.setMenuCode(ConstVariable.FOURTH_STU_MENU_CODE);
			memberMenuVO.setMenuCode(ConstVariable.FOURTH_STU_MENU_CODE);
		} else if (authorityStrings.contains("ROLE_PRO")) {
			memLayout = "professor";
			professorSubMenuVO.setMenuCode(ConstVariable.FIFTH_MENU_CODE);
			professorMenuVO.setMenuCode(ConstVariable.FIFTH_MENU_CODE);
		}
		model.addAttribute("memLayOut", memLayout);
		
		
		
		return "content/publicBoard/set_board_detail";
	}
	
	//게시글 수정
	@PostMapping("/setBoardDetail")
	public String setBoardDetail(UniBoardVO uniBoardVO) {
		boardService.setBoardDetail(uniBoardVO);
		return"redirect:/board/board";
	}
	
	//게시글 삭제
	@GetMapping("/delBoardDetail")
	public String delBoardDetail(String boardNo) {
		boardService.delBoard(boardNo);
		return "redirect:/board/board";
	}
	
	//비밀글
	@PostMapping("/checkPwAjax")
	@ResponseBody
	public int checkPwAjax(UniBoardVO uniBoardVO) {
		
		return boardService.getCheckPw(uniBoardVO);
	}
	
	//댓글 등록
	@PostMapping("/regReplyAjax")
	@ResponseBody
	public List<BoardReplyVO> regReplyAjax(BoardReplyVO boardReplyVO, Authentication authentication) {
		String memName = authentication.getName();
		boardReplyVO.setReplyWriter(memName);
		
		boardService.regReply(boardReplyVO);
		
		return boardService.getBoardReplyList(boardReplyVO.getBoardNo());
		
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
	

	

}
