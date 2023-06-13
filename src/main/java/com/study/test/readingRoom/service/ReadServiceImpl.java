package com.study.test.readingRoom.service;


import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.readingRoom.vo.ReadVO;

@Service("readService")
public class ReadServiceImpl implements ReadService{
	@Autowired
	private SqlSessionTemplate sqlSession;

	@Override
	public List<ReadVO> getSeatList() {
		return sqlSession.selectList("readMapper.getSeatList");
	}
	
	
	
}
