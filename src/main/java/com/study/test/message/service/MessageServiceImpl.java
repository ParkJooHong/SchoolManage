package com.study.test.message.service;


import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.message.vo.MessageVO;


@Service("messageService")
public class MessageServiceImpl implements MessageService {
	@Autowired
	SqlSessionTemplate sqlsession;
	
	//대화 목록 조회
	@Override
	public List<Map<String, Object>> getMsgList(String memNo) {
		return sqlsession.selectList("messageMapper.getMsgList", memNo);
	}

	//이름으로 회원아이디 조회
	@Override
	public String getMemNo(String memName) {
		return sqlsession.selectOne("messageMapper.getMemNo", memName);
	}

	//메세지 전송
	@Override
	public void sendMessage(MessageVO messageVO) {
		sqlsession.insert("messageMapper.sendMessage", messageVO);
	}

}
