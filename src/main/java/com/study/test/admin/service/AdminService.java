package com.study.test.admin.service;

import java.util.List;

import com.study.test.admin.vo.AdminMenuVO;
import com.study.test.admin.vo.AdminSubMenuVO;
import com.study.test.school.colleage.ColleageVO;
import com.study.test.school.dept.DeptVO;
import com.study.test.school.double_major.DoubleMajorVO;

public interface AdminService {
	//어드민 매뉴
	List<AdminMenuVO> getAdminMenuList();
	//어드민 서브매뉴
	List<AdminSubMenuVO> getAdminSubMenuList(String menuCode);
	//coll_list 조회
	List<ColleageVO> getCollList();
	//dept_list조회
	List<DeptVO> getDeptList();
	//doubleMajorList조회
	List<DoubleMajorVO> getDoubleMajorList();
}
