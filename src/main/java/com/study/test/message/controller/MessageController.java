package com.study.test.message.controller;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.study.test.member.vo.MemberVO;
import com.study.test.message.service.MessageService;
import com.study.test.message.vo.MessageVO;
import com.study.test.professor.vo.ProfessorMenuVO;
import com.study.test.util.ConstVariable;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/message")
public class MessageController {
	@Resource(name = "messageService")
	private MessageService messageService;
	
	//메세지 전송(메세지 보내기창에서)
	@PostMapping("/sendMessage")
	public String sendMessage() {
		
		return "redirect:/message/messageList";
	}
	
	
	//메세지 목록
	@RequestMapping("/messageList")
	public String message_list(Model model, HttpSession session, ProfessorMenuVO professorMenuVO, Authentication authentication) {
		professorMenuVO.setMenuCode(ConstVariable.NINE_PROFESSOR_MENU_CODE);
		
		User userInfo = (User)authentication.getPrincipal();
		
		List<String> authorityStrings = userInfo.getAuthorities().stream()
			    .map(GrantedAuthority::getAuthority)
			    .collect(Collectors.toList());
		
		if(authorityStrings.contains("ROLE_PRO")){
			model.addAttribute("mem_role", "professor");
		}
		
		else if(authorityStrings.contains("ROLE_ADMIN")) {
			model.addAttribute("mem_role", "admin");
		}
		else {
			model.addAttribute("mem_role", "info");
		}

		// System.out.println("현대 사용자 nick : " + session.getAttribute("nick"));
		MemberVO member = (MemberVO) session.getAttribute("memberVO");
		String name = member.getMemName();

		//현재이름 저장
		MessageVO msg = new MessageVO();
		msg.setName(name);
		
		//메세지 리스트
		//List<MessageVO> msgList = messageService.messageList(msg);

		//model.addAttribute("msgList", msgList);

		return "content/message/message_list";
	}
	
	
	

//	//메세지 목록
//	@ResponseBody
//	@RequestMapping("/messageListAjax")
//	public List<MessageVO> message_ajax_list(HttpSession session) {
//		//System.out.println("현대 사용자 nick : " + session.getAttribute("nick"));
//		MemberVO member = (MemberVO) session.getAttribute("memberVO");
//		String name = member.getMemName();
//
//		//현재이름 저장
//		MessageVO msg = new MessageVO();
//		msg.setName(name);
//
//		//메세지 리스트
//		List<MessageVO> msgList = messageService.messageList(msg);
//
//		return msgList;
//	}
//
//	@RequestMapping(value = "/message_content_list.do")
//	public String message_content_list(Model model, MessageVO messageVO, HttpSession session) {
//		MemberVO member = (MemberVO) session.getAttribute("memberVO");
//		String name = member.getMemName();
//
//		int room = messageVO.getMsgRoom();
//
//		messageVO.setMsgRoom(room);
//		messageVO.setName(name);
//
//		// 메세지 내용을 가져온다.
//		List<MessageVO> clist = messageService.roomContentList(messageVO);
//
//		model.addAttribute("clist", clist);
//
//		return "content/message/message_content_list";
//	}
//
//	// 메세지 리스트에서 메세지 보내기
//	@ResponseBody
//	@RequestMapping(value = "/message_send_inlist.do")
//	public int message_send_inlist(@RequestParam int room, @RequestParam String otherName,
//			@RequestParam String content, HttpSession session) {
//		
//		MemberVO member = (MemberVO) session.getAttribute("memberVO");
//		String name = member.getMemName();
//
//		MessageVO msg = new MessageVO();
//		msg.setMsgRoom(room);
//		msg.setSendName(name);
//		msg.setRecvName(otherName);
//		msg.setContent(content);
//
//		int flag = messageService.messageSendInlist(msg);
//
//		return flag;
//	}

}
