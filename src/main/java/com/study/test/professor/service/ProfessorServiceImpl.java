package com.study.test.professor.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.admin.vo.AdminMenuVO;
import com.study.test.admin.vo.AdminSubMenuVO;
import com.study.test.professor.vo.ProfessorMenuVO;
import com.study.test.professor.vo.ProfessorSubMenuVO;

@Service("professorService")
public class ProfessorServiceImpl implements ProfessorService{
	@Autowired
	private SqlSessionTemplate sqlsession;

	@Override
	public List<ProfessorMenuVO> getProfessorMenuList() {
		return sqlsession.selectList("professorMapper.getProfessorMenuList");
	}

	@Override
	public List<ProfessorSubMenuVO> getProfessorSubMenuList(String menuCode) {
		return sqlsession.selectList("professorMapper.getProfessorSubMenuList",menuCode);
	}
	
	
}
