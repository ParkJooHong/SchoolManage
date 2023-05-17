package com.study.test.school.service;

import java.util.List;

import com.study.test.school.colleage.ColleageVO;
import com.study.test.school.dept.DeptVO;
import com.study.test.school.double_major.DoubleMajorVO;
import com.study.test.school.semester.SemesterVO;

public interface SchoolService {
	//학기 리스트
	List<SemesterVO> getSemeList();
	
	//대학 리스트 조회
	List<ColleageVO> getCollList();
	
	//학과 리스트 조회
	List<DeptVO> getDeptList();
	
	//복수전공 리스트 조회
	List<DoubleMajorVO> getDoubleMajorList();
	
}
