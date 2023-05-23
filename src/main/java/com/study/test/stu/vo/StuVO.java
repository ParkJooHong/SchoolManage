package com.study.test.stu.vo;

import com.study.test.school.colleage.ColleageVO;
import com.study.test.school.dept.DeptVO;
import com.study.test.school.double_major.DoubleMajorVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Setter
@Getter
public class StuVO {

	private String stuNo;
	private String collNo;
	private String deptNo;
	private String doubleNo;
	private int stuYear;
	private int stuSem;
	private String stuStatus;
	private String memNo;
	private String parentName;
	private String parentTell;
	private String stuBankName;
	private String stuBankAccount;
	private ColleageVO colleageVO;
	private DeptVO deptVO;
	private DoubleMajorVO doubleMajorVO;

	
	
	
}
