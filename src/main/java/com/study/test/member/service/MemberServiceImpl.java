package com.study.test.member.service;

import java.util.List;
import java.util.Map;
import java.util.Random;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.study.test.member.vo.MemberMenuVO;
import com.study.test.member.vo.MemberSubMenuVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.util.Naver_Sens_V2;

@Service("memberService")
public class MemberServiceImpl implements MemberService {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	//회원 정보 조회
	@Override
	public MemberVO getMemInfo(MemberVO memberVO) {
		return sqlSession.selectOne("memberMapper.getMemInfo", memberVO);
	}
	
	//회원 정보 조회(전체 게시판)
	@Override
	public MemberVO getMemInfoForBoard(MemberVO memberVO) {
		return sqlSession.selectOne("memberMapper.getMemInfoForBoard", memberVO);
	}

	
	//학생 메뉴
	@Override
	public List<MemberMenuVO> stuMenuList() {
		return sqlSession.selectList("memberMenuMapper.stuMenuList");
	}

	//학생서브 메뉴
	@Override
	public List<MemberSubMenuVO> stuSubMenuList(String menuCode) {
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
	
	//아이디 찾기
	@Override
	public String getMemNo(MemberVO memberVO) {
		return sqlSession.selectOne("memberMapper.findId", memberVO);
	}
	
	//다음에 들어갈 IMG코드 조회
	@Override
	public String getNextImgCode() {		
		return sqlSession.selectOne("memberMapper.getNextImgCode");
	}

	//회원 목록조회
	@Override
	public List<Map<String, Object>> getMemList(MemberVO memberVO) {
		return sqlSession.selectList("memberMapper.getMemList", memberVO);
	}
	//비번 업데이트
	@Override
	public int setPw(MemberVO memberVO) {
		return sqlSession.update("memberMapper.setPw",memberVO);
	}

	
	//문자 인증 난수 생성
	@Override
	public String sendRandomMessage(String memTell) {
	    Naver_Sens_V2 message = new Naver_Sens_V2();
	    Random rand = new Random();
	    String numStr = "";
	    for (int i = 0; i < 6; i++) {
	        String ran = Integer.toString(rand.nextInt(10));
	        numStr += ran;
	    }
	    System.out.println("회원가입 문자 인증 => " + numStr);

	    message.send_msg(memTell, numStr);

	    return numStr;
	}

	//문자 인증을 위한 전화번호 조회
	@Override
	public int getMemTell(String memTell) {
		int tell = sqlSession.selectOne("memberMapper.getMemTell", memTell);
		return tell;
	}


	
	
}
