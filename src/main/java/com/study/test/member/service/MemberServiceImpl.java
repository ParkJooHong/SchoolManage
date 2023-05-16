package com.study.test.member.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.study.test.member.vo.MemberMenuVO;
import com.study.test.member.vo.MemberVO;

@Service("memberService")
public class MemberServiceImpl implements MemberService {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//학생 메뉴
	@Override
	public List<MemberMenuVO> stuMenuList() {
		return sqlSession.selectList("memberMenuMapper.stuMenuList");
	}

	//학생ㅅㅓ브 메뉴
	@Override
	public List<MemberMenuVO> stuSubMenuList(String menuCode) {
		return sqlSession.selectList("memberMenuMapper.stuSubMenuList", menuCode);
	}

	//회원등록
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void regMember(MemberVO memberVO) {
		sqlSession.insert("memberMapper.regMember", memberVO);
		sqlSession.insert("memberMapper.regImg",memberVO);
		
	}

	//로그인
	@Override
	public MemberVO login(MemberVO memberVO) {
		return sqlSession.selectOne("memberMapper.login", memberVO);
	}
	
	//다음에 들어갈 IMG코드 조회
	@Override
	public String getNextImgCode() {		
		return sqlSession.selectOne("memberMapper.getNextImgCode");
	}
	

	
}
