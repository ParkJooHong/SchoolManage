package com.study.test.school.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.school.colleage.ColleageVO;
import com.study.test.school.dept.DeptVO;
import com.study.test.school.double_major.DoubleMajorVO;
import com.study.test.school.semester.SemesterVO;

@Service("schoolService")
public class SchoolServiceImpl implements SchoolService{
	@Autowired
	private SqlSessionTemplate sqlsession;

	//학기 리스트
	@Override
	public List<SemesterVO> getSemeList() {
		return sqlsession.selectList("schoolMapper.getSemeList");
	}

	//대학 리스트
	@Override
	public List<ColleageVO> getCollList() {
		return sqlsession.selectList("schoolMapper.getCollList");
	}

	//학과 리스트
	@Override
	public List<DeptVO> getDeptList(String collNo) {
		return sqlsession.selectList("schoolMapper.getDeptList", collNo);
	}

	//복수전공 리스트
	@Override
	public List<DoubleMajorVO> getDoubleMajorList() {
		return sqlsession.selectList("schoolMapper.getDoubleMajorList");
	}

	//학과에 맞는 리스트 조회
	@Override
	public List<DeptVO> getDept(String collNo) {
		return sqlsession.selectList("schoolMapper.getDept",collNo);
	}
	
	
}
