package com.study.test.admin.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.admin.vo.AdminMenuVO;
import com.study.test.admin.vo.AdminSubMenuVO;

@Service("adminService")
public class AdminServiceImpl implements AdminService{
	@Autowired
	private SqlSessionTemplate sqlsession;

	@Override
	public List<AdminMenuVO> getAdminMenuList() {
		
		return sqlsession.selectList("adminMapper.getAdminMenuList");
	}

	@Override
	public List<AdminSubMenuVO> getAdminSubMenuList(String menuCode) {
		return sqlsession.selectList("adminMapper.getAdminSubMenuList", menuCode);
	}
	
	
}
