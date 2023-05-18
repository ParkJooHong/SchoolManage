package com.study.test.stu.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Setter
@Getter
public class LeaveManageVO {

	private String applyNo;
	private String stuNo;
	private String applyDate;
	private String applyReason;
	private String applrovalDate;
	private String processStatus;
	private String stuStatus;
}
