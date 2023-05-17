package com.study.test.stu.service;

import java.util.List;

import com.study.test.member.vo.MemberVO;
import com.study.test.stu.vo.StuVO;

public interface StuService {

	
	//학생 정보
	MemberVO seletStu(MemberVO memberVO);
	
	
	//학생, MyInfo 변경
	void updateStu(StuVO stuVO);
	
	//학생 비밀번호 변경
	void updateStuPwd(MemberVO memberVO);
}
