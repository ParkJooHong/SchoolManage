package com.study.test.stu.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.admin.vo.EmpVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.stu.vo.ScheduleVO;
import com.study.test.stu.vo.StuVO;

@Service("scheduleService")
public class ScheduleServiceImpl implements ScheduleService {

	@Autowired
	private SqlSessionTemplate sqlSession;

	//학생 일정 등록
	@Override
	public void regMySchedule(ScheduleVO scheduleVO) {
		sqlSession.insert("scheduleMapper.regMySchedule", scheduleVO);
	}
	
	//학사 일정 조회
	@Override
	public List<ScheduleVO> selectSchoolSchedule() {
		return sqlSession.selectList("scheduleMapper.selectSchoolSchedule");
	}

	//학생 일정 조회
	@Override
	public List<ScheduleVO> selectMySchedule(String memNo) {
		return sqlSession.selectList("scheduleMapper.selectMySchedule", memNo);
	}

	//학생 일정 삭제
	@Override
	public void deleteSchedule(String memNo) {
		sqlSession.delete("scheduleMapper.deleteSchedule", memNo);
		
	}

	//학생일때 dept조회
	@Override
	public StuVO stuDeptNo(String stuNo) {
		return sqlSession.selectOne("scheduleMapper.stuDeptNo", stuNo);
	}

	//교수일떄 dept조회
	@Override
	public EmpVO empDeptNo(String memNo) {
		return sqlSession.selectOne("scheduleMapper.empDeptNo", memNo);
	}

	


	
	
}
