package com.study.test.professor.service;

import java.util.List;

import com.study.test.admin.vo.AdminMenuVO;
import com.study.test.admin.vo.AdminSubMenuVO;

public interface ProfessorService {
	List<AdminMenuVO> getProfessorMenuList();
	
	List<AdminSubMenuVO> getProfessorSubMenuList(String menuCode);
}
