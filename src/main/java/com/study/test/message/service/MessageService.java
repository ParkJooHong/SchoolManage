package com.study.test.message.service;

import java.util.List;
import java.util.Map;

import com.study.test.message.vo.MessageVO;

public interface MessageService {
	//대화 목록 조회
	List<Map<String, Object>> getMsgList(String memNo);
	
	//이름으로 회원아이디 조회
	String getMemNo(String memName);
	
	//메세지 전송
	void sendMessage(MessageVO messageVO);
	
	//대화 내용 조회
	List<Map<String, Object>> getConversContent(MessageVO messageVO);
	
	//대화 내용 읽음으로 업데이트
	void updateReadChk(MessageVO messageVO);
}
