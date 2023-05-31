package com.study.test.professor.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.study.test.admin.service.AdminService;
import com.study.test.admin.vo.AdminSubMenuVO;
import com.study.test.admin.vo.EmpVO;
import com.study.test.member.service.MemberService;
import com.study.test.member.vo.MemImgVO;

import com.study.test.member.vo.MemberVO;
import com.study.test.professor.service.ProfessorService;
import com.study.test.professor.vo.LecturePdfVO;
import com.study.test.professor.vo.LectureTimeVO;
import com.study.test.professor.vo.LectureVO;
import com.study.test.professor.vo.ProfessorMenuVO;
import com.study.test.school.colleage.ColleageVO;
import com.study.test.school.dept.DeptVO;
import com.study.test.school.enrollment.EnrollmentVO;
import com.study.test.school.grade.GradeVO;
import com.study.test.school.semester.SemesterVO;
import com.study.test.school.service.SchoolService;
import com.study.test.school.stu_grade.StuGradeVO;
import com.study.test.util.ConstVariable;
import com.study.test.util.DateUtil;
import com.study.test.util.UploadUtil;

import groovyjarjarantlr4.v4.codegen.model.LL1PlusBlockSingleAlt;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.websocket.Session;



@Controller
@RequestMapping("/professor")
public class ProfessorController {
	@Resource(name= "memberService")
	private MemberService memberService;
	@Resource(name = "adminService")
	private AdminService adminService;
	@Resource(name = "professorService")
	private ProfessorService professorService;
	@Resource(name = "schoolService")
	private SchoolService schoolService;
	
	//강의등록 페이지로 이동
	@GetMapping("/regLecture")
	public String regLecture(Model model, ProfessorMenuVO professorMenuVO) {
		//메뉴코드 등록
		professorMenuVO.setMenuCode(ConstVariable.DEFAULT_PROFESSOR_MENU_CODE);
		
		
		//지금 학기 조회
		//학기 정보를 지정하기 위해 오늘 날짜 데이터 조회
		SemesterVO currentSemester = new SemesterVO();
		//현재 연도 저장
		String year = Integer.toString(DateUtil.getYear()); 
		currentSemester.setSemYear(year);
		//현재 달에 따른 학기 저장
		if(DateUtil.getMonth()<7) {
			currentSemester.setSemester("1");
		}
		else {
			currentSemester.setSemester("2");
		}
		
		System.out.println("@@@@@@@@@@@@@@@@@데이터 확인 :" + currentSemester);
		
		List<SemesterVO> semester = schoolService.getSemeList(currentSemester);
		model.addAttribute("semester", semester);
		
		//대학리스트 조회
		List<ColleageVO> collList = schoolService.getCollList();
		model.addAttribute("collList", collList);
		
		//첫화면 소속학과 리스트
		String collNo = "COLL_001";
		List<DeptVO> deptList = schoolService.getDeptList(collNo);
		model.addAttribute("deptList", deptList);
		
		//첫화면 소속교수님 리스트
		String deptNo = "DEPT_001";
		List<EmpVO> empList = schoolService.getProfessor(deptNo);
		System.out.println("@@@@@@@@@@@@@데이터 확인 : " + empList);
		model.addAttribute("professorList", empList);
		
        String path = System.getProperty("user.dir")+"\\src\\main\\resources\\static\\";
        System.out.println("현재 작업 경로: " + path);
        System.out.println("현재 작업 경로2: " + ConstVariable.PROFESSOR_UPLOAD_PATH);
		
		return "content/professor/reg_lecture";
	}
	
	//강의등록 페이지 
	//select 학과를 골랐을때 학과에 맞게 목록 및 교수님 목록 가져오기
	@ResponseBody
	@PostMapping("/deptListAjax")
	public Map<String, Object> getDeptList(String collNo){
		//학과 목록과 교수님 목록을 담을 map객체생성
		Map<String, Object> deptEmpMap = new HashMap<>();
		
		//단과 대학에 따른 학과 목록 조회
 		List<DeptVO> deptList = schoolService.getDeptList(collNo);
 		
 		//학과에 따른 교수님 조회(여기서는 학교를 고르면 자동으로 선택되는 학과의 교수님 목록만 불러옴)
 		List<EmpVO> professorList = schoolService.getProfessor(deptList.get(0).getDeptNo());
 		
 		deptEmpMap.put("deptList", deptList);
 		deptEmpMap.put("professorList", professorList);
 		
		return deptEmpMap;
	}
	
	//강의등록 페이지 
	//select 학과를 골랐을때 그 학과에 맞게 교수님 목록 가져오기
	@ResponseBody
	@PostMapping("/professorListAjax")
	public Map<String, Object> getprofessorList(String deptNo){
		//학과 목록과 교수님 목록을 담을 map객체생성
		Map<String, Object> professorpMap = new HashMap<>();
		
 		//학과에 따른 교수님 조회
 		List<EmpVO> professorList = schoolService.getProfessor(deptNo);
 		
 		professorpMap.put("professorList", professorList);
 		
		return professorpMap;
	}
	
	//강의등록 페이지
	//강의 시간 중복 체크
	@ResponseBody
	@PostMapping("/lectureTimeCheckAjax")
	public boolean lectureTimeCheckAjax(@RequestBody List<LectureTimeVO> lectureTimeVO_list) {
		
		boolean timeCheck = true;
		
		for(LectureTimeVO lectureTimeVO : lectureTimeVO_list) {
			if(professorService.lectureTimeCheck(lectureTimeVO) != null) {
				timeCheck = false;
			}
		}
		System.out.println("@@@@@@@@@@데이터확인" + timeCheck);
		
		return timeCheck;
	}
	
	
	//강의 등록
	@PostMapping("/regLecture")
	public String regLecture(LectureVO lectureVO, LectureTimeVO lectureTimeVO, MultipartFile pdfFile) {
		//UploadUtill 객체 호출해서(util패키지에 만들어놓음)LecturePdfVO객체에 받음
		LecturePdfVO attachedPdfVO = UploadUtil.uploadPdfFile(pdfFile);
	
		//다음 강의 넘버값
		String nextLecNo = professorService.getNextLecNo();
		//lecNo값 저장
		lectureVO.setLecNo(nextLecNo);
		//lectureVO안에있는 lecturePdfVO에 UploadUtill로 불러온 데이터 넣음(트랜잭션처리때문에)
		lectureVO.setLecturePdfVO(attachedPdfVO);
		//lectureVO안에있는 lectureTimeVO에 form태그로 가져온 데이터 넣음(트랜잭션처리때문에)
		//lectureTimeVO는 복수로 요일 시간이 들어가므로 List생성
		List<LectureTimeVO> lectureTimeList = new ArrayList<>();
		String[] lecDayArr = lectureTimeVO.getLecDay().split(",");
		String[] lecStartTime = lectureTimeVO.getStartTime().split(",");
		String[] lecFinishDate = lectureTimeVO.getFinishTime().split(",");
		
		for(int i = 0; i < lecDayArr.length; i++) {
			LectureTimeVO lectureTime = new LectureTimeVO();
			lectureTime.setLecDay(lecDayArr[i]);
			lectureTime.setStartTime(lecStartTime[i]);
			lectureTime.setFinishTime(lecFinishDate[i]);
			lectureTimeList.add(lectureTime);
		}
		
		lectureVO.setLectureTimeList(lectureTimeList);
		
		
		
		//강의 등록 쿼리 실행
		professorService.regLecture(lectureVO);
		
		
		return "redirect:/professor/regLecture";
	}
	
	
	//강의 시간표 페이지 이동
	@GetMapping("/lectureSchedule")
	public String lectureSchedule(Model model, ProfessorMenuVO professorMenuVO, HttpSession session) {
		professorMenuVO.setMenuCode(ConstVariable.SECOND_PROFESSOR_MENU_CODE);
		return "content/professor/lecture_schedule";
	}
	
	//강의 시간표 목록 조회 ajax
	@ResponseBody
	@PostMapping("/lectureScheduleAjax")
	public List<Map<String, Object>> lectureScheduleAjax(HttpSession session){
		//강의 목록 조회
		MemberVO member = (MemberVO) session.getAttribute("memberVO");
		LectureVO lecture = new LectureVO();
		lecture.setEmpNo(member.getMemNo());
		List<Map<String, Object>> lectureList = professorService.getLectureListMap(lecture);
		
		System.out.println("@@@@@@@@@@데이터 확인 :" + lectureList);
		
		return lectureList;
	}
	
	//강의 리스트 페이지 이동
	@GetMapping("/lectureList")
	public String lectureList(Model model, ProfessorMenuVO professorMenuVO, HttpSession session) {
		professorMenuVO.setMenuCode(ConstVariable.THIRD_PROFESSOR_MENU_CODE);
		
		//강의 목록 조회
		MemberVO member = (MemberVO)session.getAttribute("memberVO");
		LectureVO lecture = new LectureVO();
		lecture.setEmpNo(member.getMemNo());
		List<LectureVO> lectureList = schoolService.getLectureList(lecture);
		
		//강의 학기 조회
		SemesterVO semesterVO = new SemesterVO();
		List<SemesterVO> semesterList = schoolService.getSemeList(semesterVO);
		model.addAttribute("semesterList", semesterList);
		
		model.addAttribute("lectureList", lectureList);

		return "content/professor/lecture_list";
	}
	
	//강의 목록 조회(ajax)
	@ResponseBody
	@PostMapping("/getLectureListAjax")
	public List<LectureVO> getLectureListAjax(@RequestBody LectureVO lectureVO, HttpSession session){
		//로그인 정보 불러오기
		MemberVO member = (MemberVO)session.getAttribute("memberVO");
		lectureVO.setEmpNo(member.getMemNo());
		
		//1.강의 상태에 따른 목록조회
		List<LectureVO> lectureList = schoolService.getLectureList(lectureVO);
		
		return lectureList;
	}
	
	//교과목 클릭시 강의 자료 다운
	@GetMapping("/getPdfAjax")
	public void getPdf(LectureVO lectureVO, HttpServletResponse response) {
		//강의 정보 조회
		List<LectureVO> lectureList = schoolService.getLectureList(lectureVO);
		
		//어짜피 한개 밖에 조회가 안되므로 lectureVO로 변환
		for(LectureVO lecture : lectureList) {
			lectureVO = lecture;
		}
		
		System.out.println("@@@@@@@@@@데잍처" + lectureVO);
		
		UploadUtil.downloadPdfFile(lectureVO, response);
	}
	
	//강의 수정 : 수정할 정보 불러오기(ajax)
	@ResponseBody
	@PostMapping("/updateLectureInfoAjax")
	public List<LectureVO> updateLectureAjax(LectureVO lectureVO) {
		List<LectureVO> lecture = schoolService.getLectureList(lectureVO);
		
		return lecture;
	}
	
	//강의 수정
	@ResponseBody
	@PostMapping("/updateLectureAjax")
	public boolean updateLecture(LectureVO lectureVO, LectureTimeVO lectureTimeVO) {
		
		//데이터 저장할 객체 생성
		List<LectureTimeVO> lecTimeList = new ArrayList<>();
		//lecDay = 월,화,수 이런식으로 넘어오기때문에 다 분할해서 저장
		String[] timeNoArr = lectureTimeVO.getTimeNo().split(",");
		String[] lecDayArr = lectureTimeVO.getLecDay().split(",");
		String[] lecStartTime = lectureTimeVO.getStartTime().split(",");
		String[] lecFinishDate = lectureTimeVO.getFinishTime().split(",");
		
		for(int i = 0; i < lecDayArr.length; i++) {
			LectureTimeVO lectureTime = new LectureTimeVO();
			lectureTime.setTimeNo(timeNoArr[i]);
			lectureTime.setLecDay(lecDayArr[i]);
			lectureTime.setStartTime(lecStartTime[i]);
			lectureTime.setFinishTime(lecFinishDate[i]);
			lecTimeList.add(lectureTime);
		}
		//강의 시간 리스트를 lectureVO에 저장
		lectureVO.setLectureTimeList(lecTimeList);
		
		boolean result = professorService.updateLecture(lectureVO);
		
		return result;
	}
	
	
	//성적 등록 페이지 이동
	@GetMapping("/regGrade")
	public String regGrade(Model model, ProfessorMenuVO professorMenuVO, HttpSession session, LectureVO lectureVO) {
		professorMenuVO.setMenuCode(ConstVariable.FOURTH_PROFESSOR_MENU_CODE);
		
		//로그인 정보 불러오기
		MemberVO member = (MemberVO)session.getAttribute("memberVO");
		lectureVO.setEmpNo(member.getMemNo());
		lectureVO.setLecStatus("Y");
		
		//강의 목록 조회
		List<LectureVO> lectureList = schoolService.getLectureList(lectureVO);
		model.addAttribute("lectureList", lectureList);
		
		//강의 학기 조회
		SemesterVO semesterVO = new SemesterVO();
		List<SemesterVO> semesterList = schoolService.getSemeList(semesterVO);
		model.addAttribute("semesterList", semesterList);

		
		return "content/professor/reg_grade";
	}
	
	//성적등록 탭에서 강의리스트에서 교과목명 선택시 수강목록 조회
	@ResponseBody
	@PostMapping("/getLecStuListAjax")
	public Map<String, Object> getLecStuList(LectureVO lectureVO) {
		//수강신청한 학생 목록 조회
		List<Map<String, Object>> enrollList = schoolService.getLecStuList(lectureVO);
		
		//성적과 성적에따른 학점 목록 조회
		List<GradeVO> gradeScoreList =  schoolService.getGradeScore();
		
		//맵 객체생성
		Map<String, Object> enrollStuList = new HashMap<>();
		
		//수강신청한 학생목록과 A+ A성적 목록 데이터 맵에 저장
		enrollStuList.put("enrollList", enrollList);
		enrollStuList.put("gradeScoreList", gradeScoreList);
		
		return enrollStuList;
	}
	
	//성적 수정
	@ResponseBody
	@PostMapping("/updateStuGradeAjax")
	public void updateStuGrade(StuGradeVO stuGradeVO){
		//학생 성적 수정 쿼리
		professorService.updateStuGrade(stuGradeVO);
		
	}
	
}
