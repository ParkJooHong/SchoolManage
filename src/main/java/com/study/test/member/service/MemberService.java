package com.study.test.member.service;

import java.util.List;
import java.util.Map;

import com.study.test.board.vo.SearchVO;
import com.study.test.member.vo.MemberMenuVO;
import com.study.test.member.vo.MemberSubMenuVO;
import com.study.test.member.vo.MemberVO;

public interface MemberService {
	
	//회원 정보 조회
	MemberVO getMemInfo(MemberVO memberVO); 
	
	//회원 정보 조회(전체 게시판)
	MemberVO getMemInfoForBoard(MemberVO memberVO);

	//학생 메뉴
	List<MemberMenuVO> stuMenuList();
	
	//학생 서브 메뉴
	List<MemberSubMenuVO> stuSubMenuList(String menuCode);
	
	//회원가입
	void regMember(MemberVO memberVO);
	
	//로그인
	MemberVO login(MemberVO memberVO);
	
	//아이디 찾기
	String getMemNo(MemberVO memberVO);
	
	//다음에 들어가는 IMG코드 조회
	String getNextImgCode();
	
	//회원 목록 조회 : 메세지
	List<Map<String, Object>> getMemList(MemberVO memberVO);
	
	//회원수 조회 : 회원관리
	int memCnt(MemberVO memberVO);
	
	//회원 목록 조회 : 회원관리
	List<Map<String, Object>> memManageGetMemList(SearchVO searchVO);
	
	//회원 상태 업데이트
	void updateMemStatus(List<MemberVO> memberList);
	
	//회원 정보 업데이트
	int updateMemInfo(MemberVO memberVO);
	
	//비번 업데이트
	int setPw(MemberVO memberVO);
	
	//문자 인증 난수 생성
	String sendRandomMessage(String memTell);
	
	//문자 인증을 위한 전화번호 조회
	int getMemTell(String memTell);
	
	//메일 인증을 위한 전체 메일 카운트
	int getCntMemEmail(String changeMail);
}
