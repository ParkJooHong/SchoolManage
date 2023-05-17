package com.study.test.university.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("universityService")
public class UniversityImpl implements University {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	
}
