package com.study.test.professor.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.admin.vo.AdminMenuVO;
import com.study.test.admin.vo.AdminSubMenuVO;
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
	
	
	
	
}
