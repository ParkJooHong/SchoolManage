package com.study.test.stu.service;

import java.util.List;

import com.study.test.member.vo.MemImgVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.school.dept.DeptManageVO;
import com.study.test.stu.vo.LeaveManageVO;
import com.study.test.stu.vo.StatusInfoVO;
import com.study.test.stu.vo.StuVO;

public interface StuService {

	//멤버 정보
	MemberVO selectMember(MemberVO memberVO);
	
	//학생 정보
	MemberVO seletStu(MemberVO memberVO);
	
	//대학 코드 갖고오기.
	StuVO getColl(String memNo);
	
	//학생, MyInfo 변경
	void updateStu(StuVO stuVO);
	
	//학생 IMG 변경
	void updateStuImg(MemImgVO memImgVO);
	
	//학생 비밀번호 변경
	void updateStuPwd(MemberVO memberVO);
	
	//학생 전과신청
	void moveManage(DeptManageVO deptManageVO);
	
	//학생 휴학 신청
	//void leaveManage(LeaveManageVO leaveManageVO);
	
	//학적 상태 조회 (재학 -> 휴학)
	List<StatusInfoVO> getStatusLeaveInfo(String memNo);
	
	//학적 상태 조회 ( 휴학 -> 복학)
	List<StatusInfoVO> getStatusReturnInfo(String memNo);
	
	//학적 상태 조회 ( 전과 신청 조회 )
	List<DeptManageVO> getStatusMoveInfo(String memNo);
	
	//휴학
	void leav(StatusInfoVO statusInfoVO);
	
	//복학 신청
	void returnManage(StatusInfoVO statusInfoVO);
}
