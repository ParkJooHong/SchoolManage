package com.study.test.message.controller;


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
import com.study.test.member.vo.MemberMenuVO;
import com.study.test.member.vo.MemberSubMenuVO;
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
	@GetMapping("/sendMessage")
	public String sendMessage(MessageVO messageVO, String recvName, Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		
		//보낼 메세지에 정보 저장
		messageVO.setRecvMemNo(messageVO.getRecvMemNo());
		messageVO.setSendMemNo(user.getUsername());
		
		System.out.println("보낼 메세지 데이터 확인" + messageVO);
		
		//메세지 전송 쿼리 실행
		messageService.sendMessage(messageVO);
		
		return "redirect:/message/messageList";
	}
	
	//메세지 전송(대화창에서)
	@ResponseBody
	@PostMapping("/sendMessageAjax")
	public void sendMessageAjax(MessageVO messageVO, Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		
		//보낼 메세지에 정보 저장
		messageVO.setRecvMemNo(messageVO.getRecvMemNo());
		messageVO.setSendMemNo(user.getUsername());
		
		System.out.println("보낼 메세지 데이터 확인" + messageVO);
		
		//메세지 전송 쿼리 실행
		messageService.sendMessage(messageVO);
	}
	
	
	
	//메세지 목록
	@GetMapping("/messageList")
	public String message_list(Model model, AdminMenuVO adminMenuVO, AdminSubMenuVO adminSubMenuVO, ProfessorMenuVO professorMenuVO, MemberMenuVO memberMenuVO, MemberSubMenuVO memberSubMenuVO, Authentication authentication) {

		//role에 따른 메뉴코드,layout 설정
		User userInfo = (User)authentication.getPrincipal();
		
		List<String> authorityStrings = userInfo.getAuthorities().stream()
			    .map(GrantedAuthority::getAuthority)
			    .collect(Collectors.toList());
		
		System.out.println("@@@@@@@@@@@@@@@@@@@@" + authorityStrings);
		
		//1.메뉴코드,레이아웃 설정
		if(authorityStrings.contains("ROLE_ADMIN")) {
			adminMenuVO.setMenuCode(ConstVariable.SEVEN_MENU_CODE);
			adminSubMenuVO.setMenuCode(ConstVariable.SEVEN_MENU_CODE);
			model.addAttribute("mem_role", getLayout(authentication));
		}
		else if(authorityStrings.contains("ROLE_PRO")) {
			professorMenuVO.setMenuCode(ConstVariable.NINE_PROFESSOR_MENU_CODE);
			model.addAttribute("mem_role", getLayout(authentication));
		}
		else {
			memberMenuVO.setMenuCode(ConstVariable.SEVEN_STU_MENU_CODE);
			memberSubMenuVO.setMenuCode(ConstVariable.SEVEN_STU_MENU_CODE);
			model.addAttribute("mem_role", getLayout(authentication));
		}
		
		//메세지 리스트 조회
		List<Map<String, Object>> msgList = messageService.getMsgList(userInfo.getUsername());
		
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@msglist" + msgList);

		model.addAttribute("msgList", msgList);

		return "content/message/message_list";
	}
	
	//대화 내용 조회
	@ResponseBody
	@PostMapping("/getConversContentAjax")
	public List<Map<String, Object>> getConversContent(MessageVO messageVO, Authentication authentication) {
		
		//로그인 아이디 조회
		User user = (User)authentication.getPrincipal();
		String sendMemNo = user.getUsername();
		
		//대화 내용 조회에 필요한 데이터 저장
		messageVO.setRecvMemNo(messageVO.getRecvMemNo());
		messageVO.setSendMemNo(sendMemNo);
		
		//대화 읽음 으로 업데이트
		messageService.updateReadChk(messageVO);
		
		//대화 내용 조회
		List<Map<String, Object>> conversContentList = messageService.getConversContent(messageVO);
		
		for(Map<String, Object> convers : conversContentList) {
			convers.put("memNo", sendMemNo);
		}
		
		return conversContentList;
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
	
	//----------------기능을 위한 메소드-------------------//
	//role에 따른 layout문자 반환
	public String getLayout(Authentication authentication) {
		
		User userInfo = (User)authentication.getPrincipal();
		
		List<String> authorityStrings = userInfo.getAuthorities().stream()
			    .map(GrantedAuthority::getAuthority)
			    .collect(Collectors.toList());
		
		String memRole = "";
		
		if(authorityStrings.contains("ROLE_PRO")){
			memRole = "professor";
		}
		else if(authorityStrings.contains("ROLE_ADMIN")) {
			memRole = "admin";
		}
		else {
			memRole = "info";
		}
		
		return memRole;
	}
	
	//role에 따른 menuCode반환
	public String getMenuCode(Authentication authentication) {
		User userInfo = (User)authentication.getPrincipal();
		
		List<String> authorityStrings = userInfo.getAuthorities().stream()
			    .map(GrantedAuthority::getAuthority)
			    .collect(Collectors.toList());
		
		String menuCode = "";
		
		if(authorityStrings.contains("ROLE_PRO")){
			menuCode = ConstVariable.NINE_PROFESSOR_MENU_CODE;
		}
		else if(authorityStrings.contains("ROLE_ADMIN")) {
			menuCode = ConstVariable.SEVEN_MENU_CODE;
		}
		else {
			menuCode = ConstVariable.SEVEN_STU_MENU_CODE;
		}
		
		return menuCode;
	}

}
