package com.study.test.professor.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.study.test.admin.vo.AdminMenuVO;
import com.study.test.admin.vo.AdminSubMenuVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.professor.vo.LectureTimeVO;
import com.study.test.professor.vo.LectureVO;
import com.study.test.professor.vo.ProfessorMenuVO;
import com.study.test.professor.vo.ProfessorSubMenuVO;
import com.study.test.school.semester.SemesterVO;

@Service("professorService")
public class ProfessorServiceImpl implements ProfessorService{
	@Autowired
	private SqlSessionTemplate sqlsession;

	//메인메뉴코드 리스트
	@Override
	public List<ProfessorMenuVO> getProfessorMenuList() {
		return sqlsession.selectList("professorMapper.getProfessorMenuList");
	}

	//서브메뉴코드 리스트
	@Override
	public List<ProfessorSubMenuVO> getProfessorSubMenuList(String menuCode) {
		return sqlsession.selectList("professorMapper.getProfessorSubMenuList",menuCode);
	}

	//학기 리스트
	@Override
	public List<SemesterVO> getSemeList() {
		return sqlsession.selectList("professorMapper.getSemeList");
	}

	//다음 강의 넘버 조회
	@Override
	public String getNextLecNo() {
		return sqlsession.selectOne("professorMapper.getNextLectureNo");
	}
	
	//강의 시간 중복 체크
	@Override
	public String lectureTimeCheck(LectureTimeVO lectureTimeVO) {
		return sqlsession.selectOne("professorMapper.lectureTimeCheck", lectureTimeVO);
	}

	//강의 등록(상세 정보 까지 등록)
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void regLecture(LectureVO lectureVO) {
		sqlsession.insert("professorMapper.regLecture", lectureVO);
		sqlsession.insert("professorMapper.regLecturePdf", lectureVO);
		sqlsession.insert("professorMapper.regLectureTime", lectureVO);
	}

	//강의 목록 조회(map 시간표용)
	@Override
	public List<Map<String, Object>> getLectureListMap(LectureVO lectureVO) {
		return sqlsession.selectList("professorMapper.getLectureListMap", lectureVO);
	}

	//강의 수정
	@Override
	@Transactional(rollbackFor = Exception.class)
	public boolean updateLecture(LectureVO lectureVO) {
		boolean result = true;
		if(sqlsession.update("professorMapper.updateLecture", lectureVO) == 0) {
			result = false;
		}
		for(LectureTimeVO lectureTimeVO : lectureVO.getLectureTimeList()) {
			if(sqlsession.update("professorMapper.updateLectureTime", lectureTimeVO) == 0) {
				result = false;
			}
		}
		
		return result;
	}
	
}
