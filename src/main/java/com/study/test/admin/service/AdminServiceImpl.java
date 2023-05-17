package com.study.test.admin.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.admin.vo.AdminMenuVO;
import com.study.test.admin.vo.AdminSubMenuVO;
import com.study.test.school.colleage.ColleageVO;
import com.study.test.school.dept.DeptVO;
import com.study.test.school.double_major.DoubleMajorVO;
import com.study.test.stu.vo.StuVO;


@Service("adminService")
public class AdminServiceImpl implements AdminService{
	@Autowired
	private SqlSessionTemplate sqlsession;
	//어드민 매뉴
	@Override
	public List<AdminMenuVO> getAdminMenuList() {
		
		return sqlsession.selectList("adminMapper.getAdminMenuList");
	}
	//어드민 서브매뉴
	@Override
	public List<AdminSubMenuVO> getAdminSubMenuList(String menuCode) {
		return sqlsession.selectList("adminMapper.getAdminSubMenuList",menuCode);
	}
	//coll_list 조회
	@Override
	public List<ColleageVO> getCollList() {	
		return sqlsession.selectList("adminMapper.getCollList");
	}
	//dept_list조회
	@Override
	public List<DeptVO> getDeptList() {
		return sqlsession.selectList("adminMapper.getDeptList");
	}
	//doubleMajorList조회
	@Override
	public List<DoubleMajorVO> getDoubleMajorList() {
		return sqlsession.selectList("adminMapper.getDoubleMajorList");
	}
	//학생 등록
	@Override
	public void regStu(StuVO stuVO) {
		sqlsession.insert("adminMapper.regStu",stuVO);
		
	}

	
	
	
}
