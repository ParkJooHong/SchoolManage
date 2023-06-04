package com.study.test.kakao.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.kakao.vo.KakaoVO;




@Service("kakaoService")
public class KakaoServiceImpl implements KakaoService {

	
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	// 카카오 로그인
	@Override
	public void kakaoLogin(KakaoVO kakaoVO) {
		sqlSession.insert("kakaoMapper.kakaoLogin", kakaoVO);
		
	}
}
