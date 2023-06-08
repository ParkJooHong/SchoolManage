package com.study.test.stu.service;

import java.util.List;

import com.study.test.member.vo.MemberVO;
import com.study.test.stu.vo.ScheduleVO;

public interface ScheduleService {

	//학생 일정 등록
	void regMySchedule(ScheduleVO scheduleVO);
	
	//학생 일정 조회
	List<ScheduleVO> selectMySchedule(String memNo);
	
	//일정 삭제
	void deleteSchedule(String memNo);
}
