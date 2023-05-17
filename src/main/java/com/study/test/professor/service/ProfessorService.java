package com.study.test.professor.service;

import java.util.List;

import com.study.test.admin.vo.AdminMenuVO;
import com.study.test.admin.vo.AdminSubMenuVO;
import com.study.test.professor.vo.ProfessorMenuVO;
import com.study.test.professor.vo.ProfessorSubMenuVO;

public interface ProfessorService {
	//메인메뉴코드 리스트
	List<ProfessorMenuVO> getProfessorMenuList();
	
	//서브메뉴코드 리스트
	List<ProfessorSubMenuVO> getProfessorSubMenuList(String menuCode);
	
	
}
