package com.study.test.stu.vo;

import com.study.test.member.vo.MemberVO;
import com.study.test.school.colleage.ColleageVO;
import com.study.test.school.dept.DeptVO;
import com.study.test.school.double_major.DoubleMajorVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class StatusInfoVO {

	private String statusNo;
	private String stuNo;
	private String nowStatus;
	private String afterStatus;
	private String applyDate;
	private String approvalDate;
	private String ingStatus;
	private String statusReason;
	private MemberVO memberVO;
	private StuVO stuVO;
	private ColleageVO colleageVO;
	private DeptVO deptVO;
	private DoubleMajorVO doubleMajorVO;
	private String fromDate;
	private String toDate;

}
