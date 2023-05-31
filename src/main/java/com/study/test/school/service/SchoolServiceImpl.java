package com.study.test.school.service;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.test.admin.vo.EmpVO;
import com.study.test.professor.vo.LectureVO;
import com.study.test.school.colleage.ColleageVO;
import com.study.test.school.dept.DeptVO;
import com.study.test.school.double_major.DoubleMajorVO;
import com.study.test.school.grade.GradeVO;
import com.study.test.school.semester.SemesterVO;

@Service("schoolService")
public class SchoolServiceImpl implements SchoolService{
	@Autowired
	private SqlSessionTemplate sqlsession;

	//학기 리스트
	@Override
	public List<SemesterVO> getSemeList(SemesterVO semesterVO) {
		return sqlsession.selectList("schoolMapper.getSemeList", semesterVO);
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

	//단과대학에 맞는 리스트 조회
	@Override
	public List<DeptVO> getDept(String collNo) {
		return sqlsession.selectList("schoolMapper.getDept",collNo);
	}

	//학과에 맞는 담당교수님 목록 조회
	@Override
	public List<EmpVO> getProfessor(String deptNo) {
		return sqlsession.selectList("schoolMapper.getProfessorList", deptNo);
	}

	//강의 리스트 조회
	@Override
	public List<LectureVO> getLectureList(LectureVO lectureVO) {
		return sqlsession.selectList("professorMapper.getLectureList", lectureVO);
	}

	//수강 신청 학생 리스트 조회
	@Override
	public List<Map<String, Object>> getLecStuList(LectureVO lectureVO) {
		return sqlsession.selectList("schoolMapper.getLecStuList", lectureVO);
	}

	//성적과(A+, A, B+) 성적에 따른 학점
	@Override
	public List<GradeVO> getGradeScore() {
		return sqlsession.selectList("schoolMapper.getGradeScore");
	}
	 
	
}
