package com.study.test.stu.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.stu.vo.ScheduleVO;

@Service("scheduleService")
public class ScheduleServiceImpl implements ScheduleService {

	@Autowired
	private SqlSessionTemplate sqlSession;

	//학생 일정 등록
	@Override
	public void regMySchedule(ScheduleVO scheduleVO) {
		sqlSession.insert("scheduleMapper.regMySchedule", scheduleVO);
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
	
	
	
}
