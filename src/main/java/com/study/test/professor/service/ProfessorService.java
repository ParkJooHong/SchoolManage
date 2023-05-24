package com.study.test.professor.service;

import java.util.List;
import java.util.Map;

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
	
	//강의 목록 조회(map 시간표용)
	List<Map<String, Object>> getLectureListMap(LectureVO lectureVO);
	
	//강의 수정
	boolean updateLecture(LectureVO lectureVO);
	
}
