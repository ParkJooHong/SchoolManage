package com.study.test.stu.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.member.vo.MemberVO;
import com.study.test.school.dept.DeptManageVO;
import com.study.test.stu.vo.LeaveManageVO;
import com.study.test.stu.vo.StatusInfoVO;
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

	//학적 상태 조회 ( 재학 -> 휴학 신청 현황 조회 )
	@Override
	public List<StatusInfoVO> getStatusLeaveInfo(String memNo) {
		return sqlSession.selectList("stuMapper.getStatusLeaveInfo", memNo);
	}
	
	//학적 상태 조회 ( 휴학 -> 재학 신청 현황 조회 )
		@Override
		public List<StatusInfoVO> getStatusReturnInfo(String memNo) {
			return sqlSession.selectList("stuMapper.getStatusReturnInfo", memNo);
		}
		
	// 학적 상태 조회 ( 전과 신청 조회 )
		@Override
		public List<DeptManageVO> getStatusMoveInfo(String memNo) {		
			return sqlSession.selectList("stuMapper.getStatusMoveInfo", memNo);
		}

	/*
	 * //휴학 신청
	 * 
	 * @Override public void leaveManage(LeaveManageVO leaveManageVO) {
	 * sqlSession.insert("stuMapper.leaveManage", leaveManageVO);
	 * 
	 * }
	 */

	//휴학 신청
	@Override
	public void leav(StatusInfoVO statusInfoVO) {
		sqlSession.insert("stuMapper.leav", statusInfoVO);
		
	}

	//복학 신청
	@Override
	public void returnManage(StatusInfoVO statusInfoVO) {
		sqlSession.insert("stuMapper.returnManage", statusInfoVO);
		
	}

	
	
	

	
}
