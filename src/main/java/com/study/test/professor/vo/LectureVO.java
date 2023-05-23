package com.study.test.professor.vo;

import java.util.List;

import com.study.test.school.colleage.ColleageVO;
import com.study.test.school.dept.DeptVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LectureVO {
	private String lecNo;
	private String lecName;
	private int lecScore;
	private String collNo;
	private String deptNo;
	private String empNo;
	private String createDate;
	private int maxMem;
	private int nowMem;
	private String semNo;
	private String lecStatus;
	private String memName;
	private LecturePdfVO lecturePdfVO;
	private List<LectureTimeVO> lectureTimeList;
	private ColleageVO colleageVO;
	private DeptVO deptVO;
}
