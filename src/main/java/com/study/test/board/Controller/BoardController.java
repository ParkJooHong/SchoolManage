package com.study.test.board.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.test.board.service.BoardReplyService;
import com.study.test.board.service.BoardService;
import com.study.test.board.vo.UniBoardVO;
import com.study.test.member.service.MemberService;
import com.study.test.member.vo.MemberMenuVO;
import com.study.test.member.vo.MemberSubMenuVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.school.service.SchoolService;
import com.study.test.stu.service.StuService;
import com.study.test.stu.vo.StuVO;

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
	
	
	// 전체 게시판 글쓰기
	@PostMapping("/boardWrite")
	private String boardWrite(Authentication authentication, StuVO stuVO, MemberVO memberVO, UniBoardVO uniBoardVO,
			Model model, MemberMenuVO memberMenuVO, MemberSubMenuVO memberSubMenuVO, String menuCode) {
		
		
		// memberService.stuMenuList();
		 //memberService.stuSubMenuList(menuCode);
		 
		 model.addAttribute("menuCode" , menuCode);
		 //model.addAttribute("subMenuCode", subMenuCode);
		
		User user = (User)authentication.getPrincipal();
		String memName = user.getUsername();
		stuVO.setMemNo(user.getUsername()); // id임
		memberVO.setMemNo(user.getUsername());
		
		//uniBoardVO.setBoardWriter(memberVO.getStuVO().getStuNo());
		
		System.out.println(uniBoardVO);
		
		
		boardService.insertBoard(uniBoardVO);

		
		return "redirect:/stuMenu/totalBoard";
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
	
	
	
}
