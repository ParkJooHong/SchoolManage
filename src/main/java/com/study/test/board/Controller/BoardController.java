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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.test.admin.vo.AdminSubMenuVO;
import com.study.test.board.service.BoardReplyService;
import com.study.test.board.service.BoardService;
import com.study.test.board.vo.BoardCategoryVO;
import com.study.test.board.vo.BoardReplyVO;
import com.study.test.board.vo.UniBoardVO;
import com.study.test.member.service.MemberService;
import com.study.test.member.vo.MemberSubMenuVO;
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
	@GetMapping("/board")
	private String board(Authentication authentication, Model model, UniBoardVO uniBoardVO,
			BoardCategoryVO boardCategoryVO, String cateNo, AdminSubMenuVO adminSubMenuVO, 
			MemberSubMenuVO memberSubMenuVO, ProfessorSubMenuVO professorSubMenuVO) {

		String memLayout = "";
		User user = (User) authentication.getPrincipal();

		// 로그인한 회원의 권한에 따라 layout 변경 진행
		List<String> authorityStrings = user.getAuthorities().stream().map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList());

		if (authorityStrings.contains("ROLE_ADMIN")) {
			memLayout = "admin";
			adminSubMenuVO.setMenuCode(ConstVariable.FOURTH_MENU_CODE);
		} else if (authorityStrings.contains("ROLE_STU")) {
			memLayout = "info";
			memberSubMenuVO.setMenuCode("MENU_004");
		} else if (authorityStrings.contains("ROLE_PRO")) {
			memLayout = "professor";
			professorSubMenuVO.setMenuCode(ConstVariable.FIFTH_MENU_CODE);
		}
		model.addAttribute("memLayOut", memLayout);

		model.addAttribute("boardList", boardService.getBoardCategoryList());
		model.addAttribute("uniBoardList", boardService.searchByBoard(uniBoardVO));

		cateNo = boardCategoryVO.getCateNo();

		return "/content/stu/stu_board/board";
	}
	
	//전체 게시판 검색 기능
	@PostMapping("/searchByStatusInBoardAjax")
	@ResponseBody
	public List<UniBoardVO> searchByStatusInBoardAjax(@RequestBody Map<String, String> searchMap) {
		UniBoardVO uniBoardVO = new UniBoardVO();
		if(searchMap.get("searchSelect").equals("boardWriter")) {
			uniBoardVO.setBoardWriter(searchMap.get("searchValue"));
			uniBoardVO.setToDate(searchMap.get("toDate"));
			uniBoardVO.setFromDate(searchMap.get("fromDate"));
		}
		else if(searchMap.get("searchSelect").equals("boardTitle")) {
			uniBoardVO.setBoardTitle(searchMap.get("searchValue"));
			uniBoardVO.setToDate(searchMap.get("toDate"));
			uniBoardVO.setFromDate(searchMap.get("fromDate"));
		}

		return boardService.searchByBoard(uniBoardVO);
	}
	
	//게시판 상세조회
	@GetMapping("/boardDetail")
	public String boardDetailAjax(Authentication authentication,String boardNo, Model model, AdminSubMenuVO adminSubMenuVO) {
		String memLayout = "";
		User user = (User) authentication.getPrincipal();

		// 로그인한 회원의 권한에 따라 layout 변경 진행
		List<String> authorityStrings = user.getAuthorities().stream().map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList());

		if (authorityStrings.contains("ROLE_ADMIN")) {
			memLayout = "admin";
			adminSubMenuVO.setMenuCode(ConstVariable.FOURTH_MENU_CODE);
		} else if (authorityStrings.contains("ROLE_STU")) {
			memLayout = "info";
		} else if (authorityStrings.contains("ROLE_PRO")) {
			memLayout = "professor";
		}
		model.addAttribute("memLayOut", memLayout);
		
		//상세조회
		Map<String, Object> boardMap = new HashMap<>();
		
		boardMap.put("boardDetail", boardService.getBoardDetail(boardNo));
		boardMap.put("replyList", boardService.getBoardReplyList(boardNo));
		model.addAttribute("boardMap",boardMap);
		
		return "content/publicBoard/board_detail";
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
