package com.study.test.admin.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.study.test.admin.vo.AdminMenuVO;
import com.study.test.admin.vo.AdminSubMenuVO;
import com.study.test.admin.vo.EmpVO;
import com.study.test.admin.vo.ProbationVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.school.colleage.ColleageVO;
import com.study.test.school.dept.DeptManageVO;
import com.study.test.school.dept.DeptVO;
import com.study.test.school.double_major.DoubleMajorVO;
import com.study.test.school.semester.SemesterVO;
import com.study.test.stu.vo.StatusInfoVO;
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
	//교직원 등록
	@Override
	public void regEmp(EmpVO empVO) {
		sqlsession.insert("adminMapper.regEmp",empVO);
	}
	//학적 관리대상 리스트
	@Override
	public List<DeptManageVO> getDeptManageList(DeptManageVO deptManageVO) {
		return sqlsession.selectList("adminMapper.getDeptManageList",deptManageVO);
	}
	//학적 관리 대상자 조회
	@Override
	public DeptManageVO getDeptManageData(String applyNo) {
		return sqlsession.selectOne("adminMapper.getDeptManageData",applyNo);
	}
	//학적 관리 대상자 인적사항 조회
	@Override
	public MemberVO getMemInfo(String memNo) {
		return sqlsession.selectOne("adminMapper.getMemInfo",memNo);
	}
	//학적 변경 실행
	@Override
	@Transactional(rollbackFor = Exception.class)
	public void updateStuCollDept(StuVO stuVO, String applyNo) {
		sqlsession.update("adminMapper.updateStuCollDept",stuVO); 
		sqlsession.update("adminMapper.updateProcessStatus",applyNo);
	}
	//변경 대상자 정보 리스트 조회
	@Override
	public List<DeptManageVO> getApplyNoByStuInfoList(DeptManageVO deptManageVO) {
		return sqlsession.selectList("adminMapper.getApplyNoByStuInfoList",deptManageVO);
	}
	//대상자들 stu테이블,deptManage테이블 업데이트
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateStuInfoByApplyData(DeptManageVO deptManageVO) {
		sqlsession.update("adminMapper.updateStuInfoByApplyData",deptManageVO);
		return sqlsession.update("adminMapper.updateByApplyNoList",deptManageVO);

	}
	//휴학 신청자 리스트 조회
	@Override
	public List<StatusInfoVO> getLeaveManageList(StatusInfoVO statusInfoVO) {
		return sqlsession.selectList("adminMapper.getLeaveManageList",statusInfoVO);
	}
	
	//휴학 신청 대상자 조회	
	@Override
	public StatusInfoVO getLeaveManageMember(StatusInfoVO statusInfoVO) {
		return sqlsession.selectOne("adminMapper.getLeaveManageMember",statusInfoVO);
	}
	
	//휴학/복학 신청 승인
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateStatusInfoByTakeOff(StatusInfoVO statusInfoVO) {
		sqlsession.update("adminMapper.updateStatusInfoByTakeOff", statusInfoVO);
		return sqlsession.update("adminMapper.updateStatusInfoByStuTakeOff", statusInfoVO);
		
	}
	//휴학 신청 대상자 인적사항 조회
	@Override
	public MemberVO getMemInfoByState(String memNo) {
		return sqlsession.selectOne("adminMapper.getMemInfoByState",memNo);
	}
	//휴학 신청 일괄 승인
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateStatusNoListByTakeOff(StatusInfoVO statusInfoVO) {
		sqlsession.update("adminMapper.updateStatusNoListByTakeOff", statusInfoVO);	
		return sqlsession.update("adminMapper.updateStatusInfoListByStuTakeOff", statusInfoVO);
	}
	//복학 신청 대상자 리스트 조회
	@Override
	public List<StatusInfoVO> getRollBackManageList(StatusInfoVO statusInfoVO) {
		return sqlsession.selectList("adminMapper.getRollBackManageList",statusInfoVO);
	}
	//복학 신청 일괄 승인
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateStatusNoListByTakeOn(StatusInfoVO statusInfoVO) {
		sqlsession.update("adminMapper.updateStatusNoListByTakeOn",statusInfoVO);
		return sqlsession.update("adminMapper.updateStatusInfoListByStuTakeOn",statusInfoVO);
	}
	//복수 전공 신청자 리스트 조회
	@Override
	public List<DeptManageVO> getDoubleMajorRequestList(DeptManageVO deptManageVO) {
		return sqlsession.selectList("adminMapper.getDoubleMajorRequestList", deptManageVO);
	}
	//복수 전공 신청 대상자 조회
	@Override
	public DeptManageVO getDoubletManageData(String applyNo) {
		return sqlsession.selectOne("adminMapper.getDoubletManageData",applyNo);
	}
	//업데이트할 doubleNo 가져오기
	@Override
	public String getDoubleNo(String doubleMajorDeptNo) {		
		return sqlsession.selectOne("adminMapper.getDoubleNo",doubleMajorDeptNo);
	}
	//학생정보, 복수전공 테이블 업데이트
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateStuDouble(DeptManageVO deptManageVO) {
		sqlsession.update("adminMapper.updateDoubleMajor", deptManageVO);
		return sqlsession.update("adminMapper.updateStuDouble", deptManageVO);
		
	}
	//복수전공 코드 리스트 가져오기
	@Override
	public List<DoubleMajorVO> getDoubleNoByDeptList(DoubleMajorVO doubleMajorVO) {
		return sqlsession.selectList("adminMapper.getDoubleNoByDeptList", doubleMajorVO);
	}
	//복수전공 일괄 업데이트
	@Override
	@Transactional(rollbackFor = Exception.class)
	public int updateDoubleMajorList(DeptManageVO deptManageVO) {
		sqlsession.update("adminMapper.updateDoubleMajorList", deptManageVO);
		return sqlsession.update("adminMapper.updateDoubleMajorStudentList", deptManageVO);
	}
	//학적 경고 대상자 검색
	@Override
	public List<MemberVO> getProbStuList(MemberVO memberVO) {
		return sqlsession.selectList("adminMapper.getProbStuList",memberVO);
	}
	//학사 경고 이력 조회
	@Override
	public List<ProbationVO> getProbationStu(String memNo) {
		return sqlsession.selectList("adminMapper.getProbationStu",memNo);
	}
	//SEMESTER 코드 조회
	@Override
	public String getSemesterNo(SemesterVO semesterVO) {
		return sqlsession.selectOne("adminMapper.getSemesterNo",semesterVO);
	}
	//학사 경고 실행
	@Override
	public int regProbStu(ProbationVO probationVO) {
		return sqlsession.insert("adminMapper.regProbStu",probationVO);
	}

	

	


	
	
	
}
