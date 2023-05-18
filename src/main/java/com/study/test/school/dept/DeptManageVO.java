package com.study.test.school.dept;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DeptManageVO {
	private String applyNo;
	private String stuNo;
	private String applyCode;
	private String applyDate;
	private String applyReason;
	private String applrovalDate;
	private String processStatus;
	private String fromColl;
	private String toColl;
	private String fromDept;
	private String toDept;
	private String doubleMajorColl;
	private String doubleMajorDept;
	private String stuYear;
	private int stuSem;
}
