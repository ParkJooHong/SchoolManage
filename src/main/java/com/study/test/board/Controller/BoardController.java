package com.study.test.board.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.study.test.board.service.BoardService;
import com.study.test.member.service.MemberService;
import com.study.test.school.service.SchoolService;
import com.study.test.stu.service.StuService;

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
	
	
	
	
	
}
