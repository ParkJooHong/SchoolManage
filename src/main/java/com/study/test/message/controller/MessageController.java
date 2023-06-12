package com.study.test.message.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.sound.midi.Soundbank;

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
import com.study.test.member.vo.MemberSubMenuVO;
import com.study.test.message.service.MessageService;
import com.study.test.message.vo.MessageVO;
import com.study.test.professor.vo.ProfessorMenuVO;
import com.study.test.util.ConstVariable;

import jakarta.annotation.Resource;

@Controller
@RequestMapping("/message")
public class MessageController {
	@Resource(name = "messageService")
	private MessageService messageService;

	// 메세지 전송(메세지 보내기창에서)
	@GetMapping("/sendMessage")
	public String sendMessage(MessageVO messageVO, String recvName, Authentication authentication) {
		User user = (User) authentication.getPrincipal();

		// 보낼 메세지에 정보 저장
		messageVO.setRecvMemNo(messageVO.getRecvMemNo());
		messageVO.setSendMemNo(user.getUsername());

		System.out.println("보낼 메세지 데이터 확인" + messageVO);

		// 메세지 전송 쿼리 실행
		messageService.sendMessage(messageVO);

		return "redirect:/message/messageList";
	}

	// 메세지 전송(대화창에서)
	@ResponseBody
	@PostMapping("/sendMessageAjax")
	public void sendMessageAjax(MessageVO messageVO, Authentication authentication) {
		User user = (User) authentication.getPrincipal();

		// 보낼 메세지에 정보 저장
		messageVO.setRecvMemNo(messageVO.getRecvMemNo());
		messageVO.setSendMemNo(user.getUsername());

		System.out.println("보낼 메세지 데이터 확인" + messageVO);

		// 메세지 전송 쿼리 실행
		messageService.sendMessage(messageVO);
	}

	// 메세지 목록
	@GetMapping("/messageList")
	public String message_list(Model model, Authentication authentication) {

		// role에 따른 메뉴코드,layout 설정
		User userInfo = (User) authentication.getPrincipal();

		List<String> authorityStrings = userInfo.getAuthorities().stream().map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList());

		System.out.println("@@@@@@@@@@@@@@@@@@@@" + authorityStrings);

		// 메뉴 코드 설정
		getCode(authentication, model);

		// 레이아웃 코드 가져오기
		String layout = getLayout(authentication);

		// 메세지 리스트 조회
		List<Map<String, Object>> msgList = messageService.getMsgList(userInfo.getUsername());

		System.out.println("@@@@@@@@@@@@@@@@@@@@@@msglist" + msgList);

		model.addAttribute("mem_role", layout);
		model.addAttribute("msgList", msgList);

		return "content/message/message_list";
	}

	// 메세지 목록(헤더에서 새로운 메세지 유무에따라 아이콘 변경)
	@ResponseBody
	@PostMapping("/messageListAjax")
	public boolean message_list(Authentication authentication) {

		// 인증 정보 가져오기
		User userInfo = (User) authentication.getPrincipal();

		// 메세지 리스트 조회
		boolean readChk = false;

		List<Map<String, Object>> msgList = messageService.getMsgList(userInfo.getUsername());

		for (int i = 0; i < msgList.size(); i++) {
			System.out.println("Value: " + msgList.get(i).get("READ_CHK"));
			if(msgList.get(i).get("READ_CHK").toString().equals("1")) {
				readChk = true;
			}
		}
		
		System.out.println("@@@@@@@@@@@@@@@@@@@@@@@@리드 체크" + readChk);

		return readChk;
	}

	// 대화 내용 조회
	@ResponseBody
	@PostMapping("/getConversContentAjax")
	public List<Map<String, Object>> getConversContent(MessageVO messageVO, Authentication authentication) {

		// 로그인 아이디 조회
		User user = (User) authentication.getPrincipal();
		String sendMemNo = user.getUsername();

		// 대화 내용 조회에 필요한 데이터 저장
		messageVO.setRecvMemNo(messageVO.getRecvMemNo());
		messageVO.setSendMemNo(sendMemNo);

		// 대화 읽음 으로 업데이트
		messageService.updateReadChk(messageVO);

		// 대화 내용 조회
		List<Map<String, Object>> conversContentList = messageService.getConversContent(messageVO);

		for (Map<String, Object> convers : conversContentList) {
			convers.put("memNo", sendMemNo);
		}

		return conversContentList;
	}

	// ----------------기능을 위한 메소드-------------------//
	// role에 따른 layout문자 반환
	public String getLayout(Authentication authentication) {

		User userInfo = (User) authentication.getPrincipal();

		List<String> authorityStrings = userInfo.getAuthorities().stream().map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList());

		String memRole = "";

		if (authorityStrings.contains("ROLE_PRO")) {
			memRole = "professor";
		} else if (authorityStrings.contains("ROLE_ADMIN")) {
			memRole = "admin";
		} else {
			memRole = "info";
		}

		return memRole;
	}

	// role에 따른 menuCode반환
	public String getMenuCode(Authentication authentication) {
		User userInfo = (User) authentication.getPrincipal();

		List<String> authorityStrings = userInfo.getAuthorities().stream().map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList());

		String menuCode = "";

		if (authorityStrings.contains("ROLE_PRO")) {
			menuCode = ConstVariable.NINE_PROFESSOR_MENU_CODE;
		} else if (authorityStrings.contains("ROLE_ADMIN")) {
			menuCode = ConstVariable.SEVEN_MENU_CODE;
		} else {
			menuCode = ConstVariable.SEVEN_STU_MENU_CODE;
		}

		return menuCode;
	}

	@RequestMapping("/getCode")
	public void getCode(Authentication authentication, Model model) {
		User userInfo = (User) authentication.getPrincipal();
		AdminSubMenuVO adminSubMenuVO = new AdminSubMenuVO();
		ProfessorMenuVO professorMenuVO = new ProfessorMenuVO();
		MemberSubMenuVO memberSubMenuVO = new MemberSubMenuVO();

		List<String> authorityStrings = userInfo.getAuthorities().stream().map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList());

		if (authorityStrings.contains("ROLE_PRO")) {
			professorMenuVO.setMenuCode(ConstVariable.NINE_PROFESSOR_MENU_CODE);
			model.addAttribute("professorMenuVO", professorMenuVO);
		} else if (authorityStrings.contains("ROLE_ADMIN")) {
			adminSubMenuVO.setMenuCode(ConstVariable.SEVEN_MENU_CODE);
			model.addAttribute("adminSubMenuVO", adminSubMenuVO);
		} else {
			memberSubMenuVO.setMenuCode(ConstVariable.SEVEN_STU_MENU_CODE);
			model.addAttribute("memberSubMenuVO", memberSubMenuVO);
		}
	}

}
