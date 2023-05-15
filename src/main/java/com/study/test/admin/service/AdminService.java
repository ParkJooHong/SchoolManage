package com.study.test.admin.service;

import java.util.List;

import com.study.test.admin.vo.AdminMenuVO;
import com.study.test.admin.vo.AdminSubMenuVO;

public interface AdminService {
	List<AdminMenuVO> getAdminMenuList();
	
	List<AdminSubMenuVO> getAdminSubMenuList();
}
