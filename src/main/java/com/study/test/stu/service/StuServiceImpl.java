package com.study.test.stu.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.member.vo.MemImgVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.professor.vo.LectureVO;
import com.study.test.school.dept.DeptManageVO;
import com.study.test.school.enrollment.EnrollmentVO;
import com.study.test.stu.vo.LeaveManageVO;
import com.study.test.stu.vo.StatusInfoVO;
import com.study.test.stu.vo.StuVO;

@Service("stuService")
public class StuServiceImpl implements StuService {

	
	@Autowired
	private SqlSessionTemplate sqlSession;

	//멤버 정보
	@Override
	public MemberVO selectMember(MemberVO memberVO) {
		sqlSession.selectOne("stuMapper.selectMember", memberVO);
		return null;
	}
	
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
	@Override
	public void updateMem(MemberVO memberVO) {
		sqlSession.update("stuMapper.updateMem", memberVO);
		
	}
	
	//학생 이미지 변경
	@Override
	public void updateStuImg(MemImgVO memImgVO) {
		sqlSession.update("stuMapper.updateStuImg", memImgVO);
		
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
	
	// 복학에서 휴학신청할 떄 신청상태 변경
	@Override
	public void ingStatusUpdate(String stuNo) {
		sqlSession.update("stuMapper.ingStatusUpdate", stuNo);
		
	}
	
	//학적 상태 조회
	@Override
	public List<StatusInfoVO> getStatusInfo(String stuNo) {
		return sqlSession.selectList("stuMapper.getStatusInfo" , stuNo);
	}

	//개수 조회
	@Override
	public int IngStatusWait(String stuNo) {
		return sqlSession.selectOne("stuMapper.IngStatusWait", stuNo);
	}

	//수강 신청 하기
	@Override
	public void applyLecture(EnrollmentVO enrollmentVO) {
		sqlSession.insert("stuMapper.applyLecture", enrollmentVO);
		
	}
	//수강신청시 인원 제한
	@Override
	public void updateLectureCount(LectureVO lectureVO) {
		sqlSession.update("stuMapper.updateLectureCount",lectureVO );
		
	}

	//수강신청 리스트 조회
	@Override
	public List<LectureVO> applyLectureList(String stuNo) {
		return sqlSession.selectList("stuMapper.applyLectureList", stuNo);
	}

	
	
}
