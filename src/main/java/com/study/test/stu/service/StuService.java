package com.study.test.stu.service;

import java.util.List;

import com.study.test.member.vo.MemImgVO;
import com.study.test.member.vo.MemberVO;
import com.study.test.professor.vo.LectureVO;
import com.study.test.school.dept.DeptManageVO;
import com.study.test.school.enrollment.EnrollmentVO;
import com.study.test.school.stu_grade.StuGradeVO;
import com.study.test.stu.vo.LeaveManageVO;
import com.study.test.stu.vo.StatusInfoVO;
import com.study.test.stu.vo.StuVO;

public interface StuService {

	//멤버 정보
	MemberVO selectMember(MemberVO memberVO);
	
	//학생 정보
	MemberVO seletStu(MemberVO memberVO);
	
	
	//대학 코드 갖고오기.
	StuVO getColl(String memNo);
	
	//학생, MyInfo 변경
	void updateStu(StuVO stuVO);
	void updateMem(MemberVO memberVO);
	
	//학생 IMG 변경
	void updateStuImg(MemImgVO memImgVO);
	
	//학생 비밀번호 변경
	void updateStuPwd(MemberVO memberVO);
	
	//학생 전과신청
	void moveManage(DeptManageVO deptManageVO);
	
	//학생 전과신청자 조회
	List<DeptManageVO> getDeptManager(String stuNo);
	
	//학생 휴학 신청
	//void leaveManage(LeaveManageVO leaveManageVO);
	
	//학적 상태 조회
	List<StatusInfoVO> getStatusInfo(String stuNo);
	
	//학적 상태 조회 (재학 -> 휴학)
	List<StatusInfoVO> getStatusLeaveInfo(String memNo);
	
	//학적 상태 조회 ( 휴학 -> 복학)
	List<StatusInfoVO> getStatusReturnInfo(String memNo);
	
	//학적 상태 조회 ( 전과 신청 조회 )
	List<DeptManageVO> getStatusMoveInfo(String memNo);
	
	//휴학
	void leav(StatusInfoVO statusInfoVO);
	
	//복학 신청
	void returnManage(StatusInfoVO statusInfoVO);
	
	// 복학에서 휴학신청할 떄 신청상태 변경
	void ingStatusUpdate(String stuNo);
	
	//수 번호
	int IngStatusWait(String stuNo);
	
	//수강 신청하기
	void applyLecture(EnrollmentVO enrollmentVO);
	
	//수강 신청시 학생 점수 테이블 삽입
	void insertGrade(StuGradeVO stuGradeVO);
	
	//수강신청 시 인원 제한
	void updateLectureCount(LectureVO lectureVO);
	
	//수강신청 리스트 조회
	List<LectureVO> applyLectureList(String stuNo);
	
	//수강 취소
	void lectureCancel(EnrollmentVO enrollmentVO);
	
	//수강 취소시 학생 점수판도 삭제
	void gradeCancel(StuGradeVO stuGradeVO);
	
	//수강취소 시 수강인원 제한
	void lectureCancelUpdateCount(LectureVO lectureVO);
	
	//학사 경고 학생 조회
	List<MemberVO> getProbation(String stuNo);
}
