package com.study.test.stu.service;

import java.util.List;

import com.study.test.admin.vo.EmpVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.stu.vo.ScheduleVO;
import com.study.test.stu.vo.StuVO;

public interface ScheduleService {

	//학생 일정 등록
	void regMySchedule(ScheduleVO scheduleVO);
	
	//학생 일정 조회
	List<ScheduleVO> selectMySchedule(String memNo);
	
	//학사 일정 조회
	List<ScheduleVO> selectSchoolSchedule();
	
	//일정 삭제
	void deleteSchedule(String memNo);
	
	//학생일떄 dept 조회
	StuVO stuDeptNo(String stuNo);
	
	//교수일떄 dept조회
	EmpVO empDeptNo(String memNo);
}
