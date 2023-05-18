package com.study.test.professor.vo;

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
	private LecturePdfVO lecturePdfVO;
}
