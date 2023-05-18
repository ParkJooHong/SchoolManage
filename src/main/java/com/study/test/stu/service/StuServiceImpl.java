package com.study.test.stu.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.member.vo.MemberVO;
import com.study.test.school.dept.DeptManageVO;
import com.study.test.stu.vo.StuVO;

@Service("stuService")
public class StuServiceImpl implements StuService {

	
	@Autowired
	private SqlSessionTemplate sqlSession;

	//학생 정보
	@Override
	public MemberVO seletStu(MemberVO memberVO) {
		return sqlSession.selectOne("stuMapper.seletStu", memberVO);
	}

	// 학생, MyInfo 변경
	@Override
	public void updateStu(StuVO stuVO) {
		sqlSession.update("stuMapper.updateStu", stuVO);
		
	}
	
	//학생 비밀번호 변경
	@Override
	public void updateStuPwd(MemberVO memberVO) {
		sqlSession.update("stuMapper.updateStuPwd", memberVO);
		
	}

	//대학 코드 갖고오기
	@Override
	public StuVO getColl(String memNo) {
		return sqlSession.selectOne("stuMapper.getColl", memNo);
	}

	//전과 신청
	@Override
	public void moveManage(DeptManageVO deptManageVO) {
		sqlSession.insert("stuMapper.moveManage", deptManageVO);
		
	}
	

	
}
