package com.study.test.school.service;

import java.util.List;
import java.util.Map;

import com.study.test.admin.vo.EmpVO;
import com.study.test.professor.vo.LectureVO;
import com.study.test.school.colleage.ColleageVO;
import com.study.test.school.dept.DeptVO;
import com.study.test.school.double_major.DoubleMajorVO;
import com.study.test.school.grade.GradeVO;
import com.study.test.school.semester.SemesterVO;

public interface SchoolService {
	//학기 리스트
	List<SemesterVO> getSemeList(SemesterVO semesterVO);
	
	//대학 리스트 조회
	List<ColleageVO> getCollList();
	
	//학과 리스트 조회
	List<DeptVO> getDeptList(String collNo);
	
	//복수전공 리스트 조회
	List<DoubleMajorVO> getDoubleMajorList();
	
	//단과대학에 맞는 리스트 조회
	List<DeptVO> getDept(String collNo);
	
	//학과에 맞는 담당교수님 리스트 조회
	List<EmpVO> getProfessor(String deptNo);
	
	//강의 목록 조회
	List<LectureVO> getLectureList(LectureVO lectureVO);
	
	//수강 신청한 학생 조회
	List<Map<String, Object>> getLecStuList(LectureVO lectureVO);
	
	//성적과(A+, A, B+) 성적에 따른 학점
	List<GradeVO> getGradeScore();
}
