package com.study.test.professor.service;

import java.util.List;

import com.study.test.admin.vo.AdminMenuVO;
import com.study.test.admin.vo.AdminSubMenuVO;
import com.study.test.professor.vo.LectureTimeVO;
import com.study.test.professor.vo.LectureVO;
import com.study.test.professor.vo.ProfessorMenuVO;
import com.study.test.professor.vo.ProfessorSubMenuVO;
import com.study.test.school.semester.SemesterVO;

public interface ProfessorService {
	//메인메뉴코드 리스트
	List<ProfessorMenuVO> getProfessorMenuList();
	
	//서브메뉴코드 리스트
	List<ProfessorSubMenuVO> getProfessorSubMenuList(String menuCode);
	
	//학기 리스트
	List<SemesterVO> getSemeList();
	
	//다음 강의 넘버 조회
	String getNextLecNo();
	
	//강의 시간 중복 체크
	String lectureTimeCheck(LectureTimeVO lectureTimeVO);

	//강의 등록
	void regLecture(LectureVO lectureVO);
	
}
