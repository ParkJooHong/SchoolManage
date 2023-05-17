package com.study.test.member.service;

import java.util.List;


import com.study.test.member.vo.MemberMenuVO;
import com.study.test.member.vo.MemberVO;

public interface MemberService {

	//학생 메뉴
	List<MemberMenuVO> stuMenuList();
	
	//학생 서브 메뉴
	List<MemberMenuVO> stuSubMenuList(String menuCode);
	
	//회원가입
	void regMember(MemberVO memberVO);
	
	//로그인
	MemberVO login(MemberVO memberVO);
	
	//아이디 찾기
	String getMemNo(MemberVO memberVO);
	
	//다음에 들어가는 IMG코드 조회
	String getNextImgCode();
}
