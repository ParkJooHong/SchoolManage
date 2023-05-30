package com.study.test.admin.service;

import java.util.List;

import com.study.test.admin.vo.AdminMenuVO;
import com.study.test.admin.vo.AdminSubMenuVO;
import com.study.test.admin.vo.EmpVO;
import com.study.test.admin.vo.ProbationVO;
import com.study.test.admin.vo.StuOutVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.school.colleage.ColleageVO;
import com.study.test.school.dept.DeptManageVO;
import com.study.test.school.dept.DeptVO;
import com.study.test.school.double_major.DoubleMajorVO;
import com.study.test.school.semester.SemesterVO;
import com.study.test.stu.vo.StatusInfoVO;
import com.study.test.stu.vo.StuVO;

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
	//학생 등록
	void regStu(StuVO stuVO);
	//교직원 등록
	void regEmp(EmpVO empVO);
	//학적관리 리스트 조회
	List<DeptManageVO> getDeptManageList(DeptManageVO deptManageVO);
	//학적 변경 대상자 조회
	DeptManageVO getDeptManageData(String applyNo);
	//학적 변경 대상자 인적사항 조회
	MemberVO getMemInfo(String memNo);
	//학적 변경 실행
	void updateStuCollDept(StuVO stuVO, String applyNo);
	//변경 대상자 정보 리스트 조회
	List<DeptManageVO> getApplyNoByStuInfoList(DeptManageVO deptManageVO);
	//대상자들 업데이트
	int updateStuInfoByApplyData(DeptManageVO deptManageVO);
	//휴학 신청 대상자 조회
	List<StatusInfoVO> getLeaveManageList(StatusInfoVO statusInfoVO);
	
	//휴학 신청 대상자 조회
	StatusInfoVO getLeaveManageMember(StatusInfoVO statusInfoVO);
	
	//휴학신청 승인 statusInfo
	int updateStatusInfoByTakeOff(StatusInfoVO statusInfoVO);
	
	//휴학 신청 대상자 인적사항 조회
	MemberVO getMemInfoByState(String memNo);
	
	//휴학 신청 승인 완료 일괄 업데이트
	int updateStatusNoListByTakeOff(StatusInfoVO statusInfoVO);
	
	//복학 신청 대상자 리스트 조회
	List<StatusInfoVO> getRollBackManageList(StatusInfoVO statusInfoVO);
	
	//복학 신청 승인 완료 일괄 업데이트
	int updateStatusNoListByTakeOn(StatusInfoVO statusInfoVO);
	
	//복수 전공 신청자 리스트 조회
	List<DeptManageVO> getDoubleMajorRequestList(DeptManageVO deptManageVO);
	
	//복수 전공 신청 대상자 정보 조회	
	DeptManageVO getDoubletManageData(String applyNo);
	
	//복수전공 코드 조회
	String getDoubleNo(String doubleMajorDeptNo);
	
	//학생 복수전공 업데이트
	int updateStuDouble(DeptManageVO deptManageVO);
	
	//복수전공 코드 리스트 가져오기
	List<DoubleMajorVO> getDoubleNoByDeptList(DoubleMajorVO doubleMajorVO);
	
	//복수전공 리스트 승인
	int updateDoubleMajorList(DeptManageVO deptManageVO);
	
	//학사경고 학생 조회
	List<MemberVO> getProbStuList(MemberVO memberVO);
	
	//학사경고 이력 조회
	List<ProbationVO> getProbationStu(String memNo);
	
	//SEMESTER 코드 가져오기
	String getSemesterNo(SemesterVO semesterVO);
	
	//학사 경고 실행
	void regProbStu(ProbationVO probationVO);
	
	//제적처리
	void regStuOut(StuOutVO stuOutVO);
	
	
	
}
