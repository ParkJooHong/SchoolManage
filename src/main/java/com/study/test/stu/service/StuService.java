package com.study.test.stu.service;

import java.util.List;

import com.study.test.member.vo.MemberVO;
import com.study.test.school.dept.DeptManageVO;
import com.study.test.stu.vo.LeaveManageVO;
import com.study.test.stu.vo.StatusInfoVO;
import com.study.test.stu.vo.StuVO;

public interface StuService {

	
	//학생 정보
	MemberVO seletStu(MemberVO memberVO);
	
	//대학 코드 갖고오기.
	StuVO getColl(String memNo);
	
	//학생, MyInfo 변경
	void updateStu(StuVO stuVO);
	
	//학생 비밀번호 변경
	void updateStuPwd(MemberVO memberVO);
	
	//학생 전과신청
	void moveManage(DeptManageVO deptManageVO);
	
	//학생 휴학 신청
	void leaveManage(LeaveManageVO leaveManageVO);
	
	//학적 상태 조회
	List<StatusInfoVO> getStatusInfo(String memNo);
	
	//테스트
	void leav(StatusInfoVO statusInfoVO);
}
